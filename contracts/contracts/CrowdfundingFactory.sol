// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "./Campaign.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/security/Pausable.sol";
import "@openzeppelin/contracts/utils/math/SafeMath.sol";

contract CrowdfundingFactory is Ownable, Pausable {
    using SafeMath for uint256;
    
    struct CampaignSummary {
        address campaignAddress;
        address creator;
        string title;
        string category;
        uint256 goal;
        uint256 totalRaised;
        uint256 deadline;
        bool goalReached;
        bool campaignEnded;
        uint256 contributorCount;
        uint256 createdAt;
    }
    
    Campaign[] public campaigns;
    mapping(address => Campaign[]) public creatorCampaigns;
    mapping(address => bool) public verifiedCreators;
    mapping(string => bool) public categoryExists;
    
    // Platform settings
    uint256 public platformFeePercentage = 25; // 2.5% (25/1000)
    uint256 public minCampaignDuration = 1 days;
    uint256 public maxCampaignDuration = 365 days;
    uint256 public minGoalAmount = 0.01 ether;
    uint256 public maxGoalAmount = 10000 ether;
    
    // Statistics
    uint256 public totalCampaigns;
    uint256 public totalFundsRaised;
    uint256 public totalSuccessfulCampaigns;
    uint256 public platformFeesCollected;
    
    // Categories
    string[] public categories;
    
    event CampaignCreated(
        address indexed campaignAddress,
        address indexed creator,
        string title,
        string category,
        uint256 goal,
        uint256 deadline,
        uint256 timestamp
    );
    
    event CreatorVerified(address indexed creator);
    event CreatorUnverified(address indexed creator);
    event CategoryAdded(string category);
    event CategoryRemoved(string category);
    event PlatformFeeUpdated(uint256 newFee);
    event PlatformFeesWithdrawn(uint256 amount);
    
    modifier validCampaignParams(
        uint256 _goal,
        uint256 _duration,
        string memory _title,
        string memory _category
    ) {
        require(_goal >= minGoalAmount && _goal <= maxGoalAmount, "Invalid goal amount");
        require(_duration >= minCampaignDuration && _duration <= maxCampaignDuration, "Invalid duration");
        require(bytes(_title).length > 0 && bytes(_title).length <= 100, "Invalid title length");
        require(categoryExists[_category], "Category does not exist");
        _;
    }
    
    constructor() {
        // Initialize default categories
        _addCategory("Technology");
        _addCategory("Art");
        _addCategory("Games");
        _addCategory("Music");
        _addCategory("Film");
        _addCategory("Education");
        _addCategory("Community");
        _addCategory("Business");
        _addCategory("Health");
        _addCategory("Environment");
    }
    
    function createCampaign(
        string memory _title,
        string memory _description,
        string memory _imageHash,
        string memory _category,
        uint256 _goal,
        uint256 _duration
    ) external whenNotPaused validCampaignParams(_goal, _duration, _title, _category) {
        
        Campaign newCampaign = new Campaign(
            msg.sender,
            _title,
            _description,
            _imageHash,
            _category,
            _goal,
            _duration
        );
        
        campaigns.push(newCampaign);
        creatorCampaigns[msg.sender].push(newCampaign);
        totalCampaigns++;
        
        emit CampaignCreated(
            address(newCampaign),
            msg.sender,
            _title,
            _category,
            _goal,
            block.timestamp + _duration,
            block.timestamp
        );
    }
    
    function getCampaigns() external view returns (Campaign[] memory) {
        return campaigns;
    }
    
    function getCampaignsByCreator(address _creator) external view returns (Campaign[] memory) {
        return creatorCampaigns[_creator];
    }
    
    function getCampaignsByCategory(string memory _category) external view returns (Campaign[] memory) {
        require(categoryExists[_category], "Category does not exist");
        
        uint256 count = 0;
        
        // First pass: count campaigns in category
        for (uint256 i = 0; i < campaigns.length; i++) {
            if (keccak256(bytes(campaigns[i].category())) == keccak256(bytes(_category))) {
                count++;
            }
        }
        
        // Second pass: populate array
        Campaign[] memory categoryCampaigns = new Campaign[](count);
        uint256 index = 0;
        
        for (uint256 i = 0; i < campaigns.length; i++) {
            if (keccak256(bytes(campaigns[i].category())) == keccak256(bytes(_category))) {
                categoryCampaigns[index] = campaigns[i];
                index++;
            }
        }
        
        return categoryCampaigns;
    }
    
    function getActiveCampaigns() external view returns (Campaign[] memory) {
        uint256 activeCount = 0;
        
        // Count active campaigns
        for (uint256 i = 0; i < campaigns.length; i++) {
            if (block.timestamp < campaigns[i].deadline() && !campaigns[i].campaignEnded()) {
                activeCount++;
            }
        }
        
        // Populate active campaigns array
        Campaign[] memory activeCampaigns = new Campaign[](activeCount);
        uint256 index = 0;
        
        for (uint256 i = 0; i < campaigns.length; i++) {
            if (block.timestamp < campaigns[i].deadline() && !campaigns[i].campaignEnded()) {
                activeCampaigns[index] = campaigns[i];
                index++;
            }
        }
        
        return activeCampaigns;
    }
    
    function getSuccessfulCampaigns() external view returns (Campaign[] memory) {
        uint256 successfulCount = 0;
        
        // Count successful campaigns
        for (uint256 i = 0; i < campaigns.length; i++) {
            if (campaigns[i].goalReached()) {
                successfulCount++;
            }
        }
        
        // Populate successful campaigns array
        Campaign[] memory successfulCampaigns = new Campaign[](successfulCount);
        uint256 index = 0;
        
        for (uint256 i = 0; i < campaigns.length; i++) {
            if (campaigns[i].goalReached()) {
                successfulCampaigns[index] = campaigns[i];
                index++;
            }
        }
        
        return successfulCampaigns;
    }
    
    function getCampaignSummaries(uint256 _offset, uint256 _limit) external view returns (CampaignSummary[] memory) {
        require(_offset < campaigns.length, "Offset exceeds campaign count");
        
        uint256 end = _offset + _limit;
        if (end > campaigns.length) {
            end = campaigns.length;
        }
        
        uint256 length = end - _offset;
        CampaignSummary[] memory summaries = new CampaignSummary[](length);
        
        for (uint256 i = 0; i < length; i++) {
            Campaign campaign = campaigns[_offset + i];
            summaries[i] = CampaignSummary({
                campaignAddress: address(campaign),
                creator: campaign.owner(),
                title: campaign.title(),
                category: campaign.category(),
                goal: campaign.goal(),
                totalRaised: campaign.totalRaised(),
                deadline: campaign.deadline(),
                goalReached: campaign.goalReached(),
                campaignEnded: campaign.campaignEnded(),
                contributorCount: campaign.contributorCount(),
                createdAt: campaign.createdAt()
            });
        }
        
        return summaries;
    }
    
    // Category management
    function addCategory(string memory _category) external onlyOwner {
        _addCategory(_category);
    }
    
    function _addCategory(string memory _category) internal {
        require(bytes(_category).length > 0, "Category name cannot be empty");
        require(!categoryExists[_category], "Category already exists");
        
        categories.push(_category);
        categoryExists[_category] = true;
        
        emit CategoryAdded(_category);
    }
    
    function removeCategory(string memory _category) external onlyOwner {
        require(categoryExists[_category], "Category does not exist");
        
        // Remove from mapping
        categoryExists[_category] = false;
        
        // Remove from array
        for (uint256 i = 0; i < categories.length; i++) {
            if (keccak256(bytes(categories[i])) == keccak256(bytes(_category))) {
                categories[i] = categories[categories.length - 1];
                categories.pop();
                break;
            }
        }
        
        emit CategoryRemoved(_category);
    }
    
    function getCategories() external view returns (string[] memory) {
        return categories;
    }
    
    // Creator verification
    function verifyCreator(address _creator) external onlyOwner {
        require(!verifiedCreators[_creator], "Creator already verified");
        verifiedCreators[_creator] = true;
        emit CreatorVerified(_creator);
    }
    
    function unverifyCreator(address _creator) external onlyOwner {
        require(verifiedCreators[_creator], "Creator not verified");
        verifiedCreators[_creator] = false;
        emit CreatorUnverified(_creator);
    }
    
    function isVerifiedCreator(address _creator) external view returns (bool) {
        return verifiedCreators[_creator];
    }
    
    // Platform settings
    function setPlatformFee(uint256 _feePercentage) external onlyOwner {
        require(_feePercentage <= 100, "Fee cannot exceed 10%"); // 100/1000 = 10%
        platformFeePercentage = _feePercentage;
        emit PlatformFeeUpdated(_feePercentage);
    }
    
    function setCampaignLimits(
        uint256 _minDuration,
        uint256 _maxDuration,
        uint256 _minGoal,
        uint256 _maxGoal
    ) external onlyOwner {
        require(_minDuration > 0 && _minDuration < _maxDuration, "Invalid duration limits");
        require(_minGoal > 0 && _minGoal < _maxGoal, "Invalid goal limits");
        
        minCampaignDuration = _minDuration;
        maxCampaignDuration = _maxDuration;
        minGoalAmount = _minGoal;
        maxGoalAmount = _maxGoal;
    }
    
    // Platform statistics
    function updateStatistics() external {
        uint256 totalRaised = 0;
        uint256 successfulCount = 0;
        
        for (uint256 i = 0; i < campaigns.length; i++) {
            uint256 campaignRaised = campaigns[i].totalRaised();
            totalRaised = totalRaised.add(campaignRaised);
            
            if (campaigns[i].goalReached()) {
                successfulCount++;
            }
        }
        
        totalFundsRaised = totalRaised;
        totalSuccessfulCampaigns = successfulCount;
    }
    
    function getPlatformStatistics() external view returns (
        uint256 _totalCampaigns,
        uint256 _totalFundsRaised,
        uint256 _totalSuccessfulCampaigns,
        uint256 _platformFeesCollected,
        uint256 _successRate
    ) {
        uint256 successRate = totalCampaigns > 0 ? 
            totalSuccessfulCampaigns.mul(100).div(totalCampaigns) : 0;
            
        return (
            totalCampaigns,
            totalFundsRaised,
            totalSuccessfulCampaigns,
            platformFeesCollected,
            successRate
        );
    }
    
    // Platform fee collection
    function collectPlatformFee(address _campaign) external onlyOwner {
        Campaign campaign = Campaign(payable(_campaign));
        require(campaign.goalReached(), "Campaign must reach goal");
        
        uint256 totalRaised = campaign.totalRaised();
        uint256 fee = totalRaised.mul(platformFeePercentage).div(1000);
        
        require(address(campaign).balance >= fee, "Insufficient funds in campaign");
        
        // This would require a function in Campaign contract to pay platform fee
        // Implementation depends on how you want to handle fee collection
        platformFeesCollected = platformFeesCollected.add(fee);
    }
    
    function withdrawPlatformFees() external onlyOwner {
        uint256 balance = address(this).balance;
        require(balance > 0, "No fees to withdraw");
        
        (bool success, ) = payable(owner()).call{value: balance}("");
        require(success, "Transfer failed");
        
        emit PlatformFeesWithdrawn(balance);
    }
    
    // Emergency functions
    function pause() external onlyOwner {
        _pause();
    }
    
    function unpause() external onlyOwner {
        _unpause();
    }
    
    // View functions
    function getCampaignCount() external view returns (uint256) {
        return campaigns.length;
    }
    
    function getCampaignCountByCreator(address _creator) external view returns (uint256) {
        return creatorCampaigns[_creator].length;
    }
    
    function getPlatformSettings() external view returns (
        uint256 _platformFeePercentage,
        uint256 _minCampaignDuration,
        uint256 _maxCampaignDuration,
        uint256 _minGoalAmount,
        uint256 _maxGoalAmount
    ) {
        return (
            platformFeePercentage,
            minCampaignDuration,
            maxCampaignDuration,
            minGoalAmount,
            maxGoalAmount
        );
    }
    
    receive() external payable {
        // Accept platform fees
    }
}
