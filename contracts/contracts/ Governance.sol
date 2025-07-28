// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";
import "@openzeppelin/contracts/utils/math/SafeMath.sol";
import "./Campaign.sol";

contract Governance is Ownable, ReentrancyGuard {
    using SafeMath for uint256;
    
    enum ProposalType {
        MilestoneRelease,
        CampaignRefund,
        CreatorRemoval,
        PlatformUpdate
    }
    
    enum ProposalStatus {
        Active,
        Approved,
        Rejected,
        Executed,
        Cancelled
    }
    
    struct Proposal {
        uint256 id;
        ProposalType proposalType;
        address creator;
        address targetCampaign;
        string title;
        string description;
        uint256 targetAmount;
        uint256 votingDeadline;
        uint256 requiredQuorum;
        uint256 votesFor;
        uint256 votesAgainst;
        uint256 totalVoters;
        ProposalStatus status;
        mapping(address => bool) hasVoted;
        mapping(address => bool) voteChoice;
        uint256 createdAt;
        uint256 executedAt;
    }
    
    struct GovernanceToken {
        mapping(address => uint256) balances;
        mapping(address => mapping(address => uint256)) allowances;
        uint256 totalSupply;
        string name;
        string symbol;
    }
    
    mapping(uint256 => Proposal) public proposals;
    mapping(address => uint256[]) public userProposals;
    mapping(address => uint256) public userVotingPower;
    mapping(address => bool) public authorizedCampaigns;
    
    GovernanceToken public governanceToken;
    
    uint256 public proposalCount;
    uint256 public constant VOTING_PERIOD = 7 days;
    uint256 public constant MIN_QUORUM_PERCENTAGE = 20; // 20%
    uint256 public constant PROPOSAL_THRESHOLD = 1000 * 10**18; // 1000 tokens to create proposal
    
    event ProposalCreated(
        uint256 indexed proposalId,
        ProposalType proposalType,
        address indexed creator,
        address indexed targetCampaign,
        string title
    );
    
    event VoteCast(
        uint256 indexed proposalId,
        address indexed voter,
        bool support,
        uint256 weight
    );
    
    event ProposalExecuted(uint256 indexed proposalId);
    event ProposalCancelled(uint256 indexed proposalId);
    event GovernanceTokenMinted(address indexed to, uint256 amount);
    
    modifier onlyAuthorizedCampaign() {
        require(authorizedCampaigns[msg.sender], "Not authorized campaign");
        _;
    }
    
    modifier validProposal(uint256 _proposalId) {
        require(_proposalId < proposalCount, "Invalid proposal ID");
        _;
    }
    
    constructor() {
        governanceToken.name = "Fund Forge Governance Token";
        governanceToken.symbol = "FFG";
        governanceToken.totalSupply = 0;
    }
    
    function createProposal(
        ProposalType _type,
        address _targetCampaign,
        string memory _title,
        string memory _description,
        uint256 _targetAmount
    ) external returns (uint256) {
        require(governanceToken.balances[msg.sender] >= PROPOSAL_THRESHOLD, "Insufficient governance tokens");
        require(bytes(_title).length > 0, "Title cannot be empty");
        require(bytes(_description).length > 0, "Description cannot be empty");
        
        if (_type == ProposalType.MilestoneRelease || _type == ProposalType.CampaignRefund) {
            require(_targetCampaign != address(0), "Target campaign required");
            require(authorizedCampaigns[_targetCampaign], "Campaign not authorized");
        }
        
        uint256 proposalId = proposalCount++;
        Proposal storage proposal = proposals[proposalId];
        
        proposal.id = proposalId;
        proposal.proposalType = _type;
        proposal.creator = msg.sender;
        proposal.targetCampaign = _targetCampaign;
        proposal.title = _title;
        proposal.description = _description;
        proposal.targetAmount = _targetAmount;
        proposal.votingDeadline = block.timestamp + VOTING_PERIOD;
        proposal.requiredQuorum = governanceToken.totalSupply.mul(MIN_QUORUM_PERCENTAGE).div(100);
        proposal.status = ProposalStatus.Active;
        proposal.createdAt = block.timestamp;
        
        userProposals[msg.sender].push(proposalId);
        
        emit ProposalCreated(proposalId, _type, msg.sender, _targetCampaign, _title);
        
        return proposalId;
    }
    
    function vote(uint256 _proposalId, bool _support) external validProposal(_proposalId) nonReentrant {
        Proposal storage proposal = proposals[_proposalId];
        
        require(proposal.status == ProposalStatus.Active, "Proposal not active");
        require(block.timestamp <= proposal.votingDeadline, "Voting period ended");
        require(!proposal.hasVoted[msg.sender], "Already voted");
        require(governanceToken.balances[msg.sender] > 0, "No voting power");
        
        uint256 weight = governanceToken.balances[msg.sender];
        
        proposal.hasVoted[msg.sender] = true;
        proposal.voteChoice[msg.sender] = _support;
        proposal.totalVoters++;
        
        if (_support) {
            proposal.votesFor = proposal.votesFor.add(weight);
        } else {
            proposal.votesAgainst = proposal.votesAgainst.add(weight);
        }
        
        emit VoteCast(_proposalId, msg.sender, _support, weight);
        
        // Auto-execute if conditions are met
        _checkProposalExecution(_proposalId);
    }
    
    function _checkProposalExecution(uint256 _proposalId) internal {
        Proposal storage proposal = proposals[_proposalId];
        
        uint256 totalVotes = proposal.votesFor.add(proposal.votesAgainst);
        
        // Check if quorum is reached and voting period ended
        if (totalVotes >= proposal.requiredQuorum || block.timestamp > proposal.votingDeadline) {
            if (proposal.votesFor > proposal.votesAgainst) {
                proposal.status = ProposalStatus.Approved;
                _executeProposal(_proposalId);
            } else {
                proposal.status = ProposalStatus.Rejected;
            }
        }
    }
    
    function _executeProposal(uint256 _proposalId) internal {
        Proposal storage proposal = proposals[_proposalId];
        
        require(proposal.status == ProposalStatus.Approved, "Proposal not approved");
        
        if (proposal.proposalType == ProposalType.MilestoneRelease) {
            Campaign campaign = Campaign(payable(proposal.targetCampaign));
            // This would require implementing a governance-controlled milestone release
            // in the Campaign contract
        } else if (proposal.proposalType == ProposalType.CampaignRefund) {
            Campaign campaign = Campaign(payable(proposal.targetCampaign));
            // Trigger emergency refund mechanism
        }
        
        proposal.status = ProposalStatus.Executed;
        proposal.executedAt = block.timestamp;
        
        emit ProposalExecuted(_proposalId);
    }
    
    function executeProposal(uint256 _proposalId) external validProposal(_proposalId) {
        Proposal storage proposal = proposals[_proposalId];
        
        require(proposal.status == ProposalStatus.Approved, "Proposal not approved");
        require(block.timestamp > proposal.votingDeadline, "Voting still active");
        
        _executeProposal(_proposalId);
    }
    
    function cancelProposal(uint256 _proposalId) external validProposal(_proposalId) {
        Proposal storage proposal = proposals[_proposalId];
        
        require(msg.sender == proposal.creator || msg.sender == owner(), "Not authorized");
        require(proposal.status == ProposalStatus.Active, "Cannot cancel executed proposal");
        
        proposal.status = ProposalStatus.Cancelled;
        
        emit ProposalCancelled(_proposalId);
    }
    
    // Governance token functions
    function mintGovernanceTokens(address _to, uint256 _amount) external onlyAuthorizedCampaign {
        require(_to != address(0), "Cannot mint to zero address");
        require(_amount > 0, "Amount must be greater than 0");
        
        governanceToken.balances[_to] = governanceToken.balances[_to].add(_amount);
        governanceToken.totalSupply = governanceToken.totalSupply.add(_amount);
        
        emit GovernanceTokenMinted(_to, _amount);
    }
    
    function burnGovernanceTokens(address _from, uint256 _amount) external onlyAuthorizedCampaign {
        require(_from != address(0), "Cannot burn from zero address");
        require(governanceToken.balances[_from] >= _amount, "Insufficient balance");
        
        governanceToken.balances[_from] = governanceToken.balances[_from].sub(_amount);
        governanceToken.totalSupply = governanceToken.totalSupply.sub(_amount);
    }
    
    function authorizeCampaign(address _campaign) external onlyOwner {
        authorizedCampaigns[_campaign] = true;
    }
    
    function unauthorizeCampaign(address _campaign) external onlyOwner {
        authorizedCampaigns[_campaign] = false;
    }
    
    // View functions
    function getProposal(uint256 _proposalId) external view validProposal(_proposalId) returns (
        uint256 id,
        ProposalType proposalType,
        address creator,
        address targetCampaign,
        string memory title,
        string memory description,
        uint256 targetAmount,
        uint256 votingDeadline,
        uint256 votesFor,
        uint256 votesAgainst,
        uint256 totalVoters,
        ProposalStatus status,
        uint256 createdAt
    ) {
        Proposal storage proposal = proposals[_proposalId];
        
        return (
            proposal.id,
            proposal.proposalType,
            proposal.creator,
            proposal.targetCampaign,
            proposal.title,
            proposal.description,
            proposal.targetAmount,
            proposal.votingDeadline,
            proposal.votesFor,
            proposal.votesAgainst,
            proposal.totalVoters,
            proposal.status,
            proposal.createdAt
        );
    }
    
    function hasVoted(uint256 _proposalId, address _voter) external view validProposal(_proposalId) returns (bool) {
        return proposals[_proposalId].hasVoted[_voter];
    }
    
    function getVoteChoice(uint256 _proposalId, address _voter) external view validProposal(_proposalId) returns (bool) {
        require(proposals[_proposalId].hasVoted[_voter], "User hasn't voted");
        return proposals[_proposalId].voteChoice[_voter];
    }
    
    function getGovernanceTokenBalance(address _user) external view returns (uint256) {
        return governanceToken.balances[_user];
    }
    
    function getGovernanceTokenInfo() external view returns (
        string memory name,
        string memory symbol,
        uint256 totalSupply
    ) {
        return (
            governanceToken.name,
            governanceToken.symbol,
            governanceToken.totalSupply
        );
    }
    
    function getUserProposals(address _user) external view returns (uint256[] memory) {
        return userProposals[_user];
    }
    
    function getActiveProposals() external view returns (uint256[] memory) {
        uint256 activeCount = 0;
        
        // Count active proposals
        for (uint256 i = 0; i < proposalCount; i++) {
            if (proposals[i].status == ProposalStatus.Active && 
                block.timestamp <= proposals[i].votingDeadline) {
                activeCount++;
            }
        }
        
        // Create array of active proposal IDs
        uint256[] memory activeProposals = new uint256[](activeCount);
        uint256 index = 0;
        
        for (uint256 i = 0; i < proposalCount; i++) {
            if (proposals[i].status == ProposalStatus.Active && 
                block.timestamp <= proposals[i].votingDeadline) {
                activeProposals[index] = i;
                index++;
            }
        }
        
        return activeProposals;
    }
}
