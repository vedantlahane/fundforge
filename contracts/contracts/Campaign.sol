// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/math/SafeMath.sol";

contract Campaign is ReentrancyGuard, Ownable {
    using SafeMath for uint256;

    struct Milestone {
        uint256 amount;
        string description;
        bool approved;
        bool released;
        uint256 votesFor;
        uint256 votesAgainst;
        uint256 votingDeadline;
        mapping(address => bool) hasVoted;
        mapping(address => bool) voteChoice; // true = for, false = against
    }
    
    struct Contribution {
        uint256 amount;
        uint256 timestamp;
        bool refunded;
    }

    struct CampaignInfo {
        string title;
        string description;
        string imageHash;
        string category;
        uint256 goal;
        uint256 deadline;
        uint256 totalRaised;
        uint256 totalWithdrawn;
        bool goalReached;
        bool campaignEnded;
        uint256 contributorCount;
        uint256 milestoneCount;
        address creator;
        uint256 createdAt;
    }
    
    // Campaign details
    string public title;
    string public description;
    string public imageHash;
    string public category;
    uint256 public goal;
    uint256 public deadline;
    uint256 public totalRaised;
    uint256 public totalWithdrawn;
    bool public goalReached;
    bool public campaignEnded;
    uint256 public createdAt;
    
    // Milestone management
    Milestone[] public milestones;
    uint256 public currentMilestone;
    uint256 public constant VOTING_PERIOD = 7 days;
    uint256 public constant MIN_VOTE_PERCENTAGE = 30; // 30% of contributors must vote
    
    // Contributor tracking
    mapping(address => Contribution) public contributions;
    address[] public contributors;
    uint256 public contributorCount;
    
    // Reward tokens
    RewardToken public rewardToken;
    
    // Emergency controls
    bool public emergencyStop = false;
    uint256 public constant REFUND_PERIOD = 30 days;
    
    // Events
    event ContributionMade(address indexed contributor, uint256 amount, uint256 timestamp);
    event MilestoneCreated(uint256 indexed milestoneId, uint256 amount, string description);
    event MilestoneVoted(uint256 indexed milestoneId, address indexed voter, bool vote, uint256 voteWeight);
    event MilestoneApproved(uint256 indexed milestoneId, uint256 amount);
    event MilestoneRejected(uint256 indexed milestoneId);
    event FundsReleased(uint256 indexed milestoneId, uint256 amount, address recipient);
    event RefundIssued(address indexed contributor, uint256 amount);
    event CampaignEnded(bool successful, uint256 totalRaised);
    event EmergencyStopToggled(bool status);
    
    modifier onlyContributors() {
        require(contributions[msg.sender].amount > 0, "Not a contributor");
        _;
    }
    
    modifier campaignActive() {
        require(block.timestamp < deadline && !campaignEnded && !emergencyStop, "Campaign not active");
        _;
    }
    
    modifier campaignEnded() {
        require(block.timestamp >= deadline || campaignEnded, "Campaign still active");
        _;
    }
    
    modifier onlyAfterGoalReached() {
        require(goalReached, "Goal not reached");
        _;
    }
    
    modifier notInEmergency() {
        require(!emergencyStop, "Emergency stop activated");
        _;
    }
    
    constructor(
        address _creator,
        string memory _title,
        string memory _description,
        string memory _imageHash,
        string memory _category,
        uint256 _goal,
        uint256 _duration
    ) {
        require(_goal > 0, "Goal must be greater than 0");
        require(_duration > 0, "Duration must be greater than 0");
        require(bytes(_title).length > 0, "Title cannot be empty");
        
        _transferOwnership(_creator);
        title = _title;
        description = _description;
        imageHash = _imageHash;
        category = _category;
        goal = _goal;
        deadline = block.timestamp + _duration;
        createdAt = block.timestamp;
        
        // Deploy reward token for this campaign
        string memory tokenName = string(abi.encodePacked("Fund", _title));
        string memory tokenSymbol = string(abi.encodePacked("F", _title));
        rewardToken = new RewardToken(tokenName, tokenSymbol, address(this));
    }
    
    function contribute() external payable campaignActive nonReentrant {
        require(msg.value > 0, "Contribution must be greater than 0");
        require(msg.sender != owner(), "Creator cannot contribute to own campaign");
        
        // Record contribution
        if (contributions[msg.sender].amount == 0) {
            contributors.push(msg.sender);
            contributorCount++;
        }
        
        contributions[msg.sender].amount = contributions[msg.sender].amount.add(msg.value);
        contributions[msg.sender].timestamp = block.timestamp;
        totalRaised = totalRaised.add(msg.value);
        
        // Mint reward tokens (1:1 ratio with ETH contribution)
        rewardToken.mint(msg.sender, msg.value);
        
        // Check if goal is reached
        if (totalRaised >= goal && !goalReached) {
            goalReached = true;
        }
        
        emit ContributionMade(msg.sender, msg.value, block.timestamp);
    }
    
    function createMilestone(
        uint256 _amount,
        string memory _description
    ) external onlyOwner onlyAfterGoalReached {
        require(_amount > 0, "Invalid milestone amount");
        require(bytes(_description).length > 0, "Description cannot be empty");
        require(totalWithdrawn.add(_amount) <= totalRaised, "Milestone amount exceeds available funds");
        
        milestones.push();
        uint256 milestoneId = milestones.length - 1;
        
        Milestone storage milestone = milestones[milestoneId];
        milestone.amount = _amount;
        milestone.description = _description;
        milestone.votingDeadline = block.timestamp + VOTING_PERIOD;
        
        emit MilestoneCreated(milestoneId, _amount, _description);
    }
    
    function voteOnMilestone(uint256 _milestoneId, bool _approve) 
        external 
        onlyContributors 
        notInEmergency
    {
        require(_milestoneId < milestones.length, "Invalid milestone");
        require(block.timestamp <= milestones[_milestoneId].votingDeadline, "Voting period ended");
        require(!milestones[_milestoneId].hasVoted[msg.sender], "Already voted");
        require(!milestones[_milestoneId].approved && !milestones[_milestoneId].released, "Milestone already processed");
        
        Milestone storage milestone = milestones[_milestoneId];
        milestone.hasVoted[msg.sender] = true;
        milestone.voteChoice[msg.sender] = _approve;
        
        // Weight vote by contribution amount and time (early contributors get slight bonus)
        uint256 baseWeight = contributions[msg.sender].amount;
        uint256 timeBonus = 0;
        
        if (contributions[msg.sender].timestamp <= createdAt + 7 days) {
            timeBonus = baseWeight.mul(5).div(100); // 5% bonus for early contributors
        }
        
        uint256 voteWeight = baseWeight.add(timeBonus);
        
        if (_approve) {
            milestone.votesFor = milestone.votesFor.add(voteWeight);
        } else {
            milestone.votesAgainst = milestone.votesAgainst.add(voteWeight);
        }
        
        emit MilestoneVoted(_milestoneId, msg.sender, _approve, voteWeight);
        
        // Auto-approve if conditions are met
        _checkMilestoneApproval(_milestoneId);
    }
    
    function _checkMilestoneApproval(uint256 _milestoneId) internal {
        Milestone storage milestone = milestones[_milestoneId];
        
        // Calculate total votes cast
        uint256 totalVotes = milestone.votesFor.add(milestone.votesAgainst);
        uint256 requiredParticipation = totalRaised.mul(MIN_VOTE_PERCENTAGE).div(100);
        
        // Check if minimum participation reached and voting period ended
        if (totalVotes >= requiredParticipation || block.timestamp > milestone.votingDeadline) {
            if (milestone.votesFor > milestone.votesAgainst) {
                milestone.approved = true;
                emit MilestoneApproved(_milestoneId, milestone.amount);
            } else {
                emit MilestoneRejected(_milestoneId);
            }
        }
    }
    
    function releaseMilestoneFunds(uint256 _milestoneId) 
        external 
        onlyOwner 
        nonReentrant 
        notInEmergency
    {
        require(_milestoneId < milestones.length, "Invalid milestone");
        Milestone storage milestone = milestones[_milestoneId];
        
        require(milestone.approved, "Milestone not approved");
        require(!milestone.released, "Already released");
        require(goalReached, "Goal not reached");
        
        // Final check for approval if voting period ended
        if (block.timestamp > milestone.votingDeadline && !milestone.approved) {
            _checkMilestoneApproval(_milestoneId);
            require(milestone.approved, "Milestone not approved after voting period");
        }
        
        uint256 amount = milestone.amount;
        require(address(this).balance >= amount, "Insufficient funds");
        
        milestone.released = true;
        totalWithdrawn = totalWithdrawn.add(amount);
        
        (bool success, ) = payable(owner()).call{value: amount}("");
        require(success, "Transfer failed");
        
        emit FundsReleased(_milestoneId, amount, owner());
    }
    
    function requestRefund() external nonReentrant campaignEnded {
        require(!goalReached || block.timestamp > deadline + REFUND_PERIOD, "Refund not available");
        require(contributions[msg.sender].amount > 0, "No contribution found");
        require(!contributions[msg.sender].refunded, "Already refunded");
        
        uint256 refundAmount = contributions[msg.sender].amount;
        
        // Calculate refund amount if some funds were already withdrawn
        if (totalWithdrawn > 0) {
            uint256 remainingFunds = address(this).balance;
            refundAmount = refundAmount.mul(remainingFunds).div(totalRaised.sub(totalWithdrawn));
        }
        
        require(address(this).balance >= refundAmount, "Insufficient funds for refund");
        
        contributions[msg.sender].refunded = true;
        
        // Burn reward tokens
        uint256 tokenBalance = rewardToken.balanceOf(msg.sender);
        if (tokenBalance > 0) {
            rewardToken.burn(msg.sender, tokenBalance);
        }
        
        (bool success, ) = payable(msg.sender).call{value: refundAmount}("");
        require(success, "Refund failed");
        
        emit RefundIssued(msg.sender, refundAmount);
    }
    
    function endCampaign() external {
        require(msg.sender == owner() || block.timestamp >= deadline, "Cannot end campaign yet");
        require(!campaignEnded, "Campaign already ended");
        
        campaignEnded = true;
        
        if (totalRaised >= goal) {
            goalReached = true;
        }
        
        emit CampaignEnded(goalReached, totalRaised);
    }
    
    function toggleEmergencyStop() external onlyOwner {
        emergencyStop = !emergencyStop;
        emit EmergencyStopToggled(emergencyStop);
    }
    
    // View functions
    function getCampaignInfo() external view returns (CampaignInfo memory) {
        return CampaignInfo({
            title: title,
            description: description,
            imageHash: imageHash,
            category: category,
            goal: goal,
            deadline: deadline,
            totalRaised: totalRaised,
            totalWithdrawn: totalWithdrawn,
            goalReached: goalReached,
            campaignEnded: campaignEnded,
            contributorCount: contributorCount,
            milestoneCount: milestones.length,
            creator: owner(),
            createdAt: createdAt
        });
    }
    
    function getMilestone(uint256 _milestoneId) external view returns (
        uint256 amount,
        string memory description,
        bool approved,
        bool released,
        uint256 votesFor,
        uint256 votesAgainst,
        uint256 votingDeadline,
        bool votingActive
    ) {
        require(_milestoneId < milestones.length, "Invalid milestone");
        Milestone storage milestone = milestones[_milestoneId];
        
        return (
            milestone.amount,
            milestone.description,
            milestone.approved,
            milestone.released,
            milestone.votesFor,
            milestone.votesAgainst,
            milestone.votingDeadline,
            block.timestamp <= milestone.votingDeadline && !milestone.approved && !milestone.released
        );
    }
    
    function hasVotedOnMilestone(uint256 _milestoneId, address _voter) external view returns (bool) {
        require(_milestoneId < milestones.length, "Invalid milestone");
        return milestones[_milestoneId].hasVoted[_voter];
    }
    
    function getVoteChoice(uint256 _milestoneId, address _voter) external view returns (bool) {
        require(_milestoneId < milestones.length, "Invalid milestone");
        require(milestones[_milestoneId].hasVoted[_voter], "User hasn't voted");
        return milestones[_milestoneId].voteChoice[_voter];
    }
    
    function getMilestoneCount() external view returns (uint256) {
        return milestones.length;
    }
    
    function getContributors() external view returns (address[] memory) {
        return contributors;
    }
    
    function getContribution(address _contributor) external view returns (
        uint256 amount,
        uint256 timestamp,
        bool refunded,
        uint256 rewardTokens
    ) {
        Contribution memory contribution = contributions[_contributor];
        uint256 tokens = rewardToken.balanceOf(_contributor);
        
        return (
            contribution.amount,
            contribution.timestamp,
            contribution.refunded,
            tokens
        );
    }
    
    function getProgress() external view returns (uint256 progressPercentage, uint256 timeRemaining) {
        progressPercentage = goal > 0 ? totalRaised.mul(100).div(goal) : 0;
        timeRemaining = block.timestamp >= deadline ? 0 : deadline - block.timestamp;
    }
    
    function isRefundAvailable() external view returns (bool) {
        return (block.timestamp >= deadline && !goalReached) || 
               (goalReached && block.timestamp > deadline + REFUND_PERIOD);
    }
}
