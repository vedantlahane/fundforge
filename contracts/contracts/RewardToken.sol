// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/security/Pausable.sol";

contract RewardToken is ERC20, Ownable, Pausable {
    address public campaign;
    uint256 public totalMinted;
    uint256 public totalBurned;
    
    mapping(address => uint256) public mintedAmount;
    mapping(address => uint256) public burnedAmount;
    
    event TokensMinted(address indexed to, uint256 amount);
    event TokensBurned(address indexed from, uint256 amount);
    
    modifier onlyCampaign() {
        require(msg.sender == campaign, "Only campaign can call this function");
        _;
    }
    
    constructor(
        string memory _name,
        string memory _symbol,
        address _campaign
    ) ERC20(_name, _symbol) {
        campaign = _campaign;
        _transferOwnership(_campaign);
    }
    
    function mint(address _to, uint256 _amount) external onlyCampaign whenNotPaused {
        require(_to != address(0), "Cannot mint to zero address");
        require(_amount > 0, "Amount must be greater than 0");
        
        _mint(_to, _amount);
        totalMinted += _amount;
        mintedAmount[_to] += _amount;
        
        emit TokensMinted(_to, _amount);
    }
    
    function burn(address _from, uint256 _amount) external onlyCampaign {
        require(_from != address(0), "Cannot burn from zero address");
        require(balanceOf(_from) >= _amount, "Insufficient balance to burn");
        
        _burn(_from, _amount);
        totalBurned += _amount;
        burnedAmount[_from] += _amount;
        
        emit TokensBurned(_from, _amount);
    }
    
    function pause() external onlyOwner {
        _pause();
    }
    
    function unpause() external onlyOwner {
        _unpause();
    }
    
    function getTokenInfo() external view returns (
        string memory name,
        string memory symbol,
        uint256 totalSupply,
        uint256 totalMintedAmount,
        uint256 totalBurnedAmount,
        address campaignAddress
    ) {
        return (
            name(),
            symbol(),
            totalSupply(),
            totalMinted,
            totalBurned,
            campaign
        );
    }
    
    function getUserTokenInfo(address _user) external view returns (
        uint256 balance,
        uint256 minted,
        uint256 burned
    ) {
        return (
            balanceOf(_user),
            mintedAmount[_user],
            burnedAmount[_user]
        );
    }
    
    // Override transfer functions to add pause functionality
    function transfer(address to, uint256 amount) public virtual override whenNotPaused returns (bool) {
        return super.transfer(to, amount);
    }
    
    function transferFrom(address from, address to, uint256 amount) public virtual override whenNotPaused returns (bool) {
        return super.transferFrom(from, to, amount);
    }
}
