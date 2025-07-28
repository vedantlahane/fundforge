const Campaign = artifacts.require("Campaign");
const RewardToken = artifacts.require("RewardToken");
const { expectRevert, time } = require('@openzeppelin/test-helpers');

contract("Campaign", accounts => {
  let campaign;
  let rewardToken;
  const creator = accounts[0];
  const contributor1 = accounts[1];
  const contributor2 = accounts[2];
  
  const title = "Test Campaign";
  const description = "Test Description";
  const imageHash = "QmTest";
  const category = "Technology";
  const goal = web3.utils.toWei("10", "ether");
  const duration = 86400; // 1 day
  
  beforeEach(async () => {
    campaign = await Campaign.new(
      creator,
      title,
      description,
      imageHash,
      category,
      goal,
      duration,
      { from: creator }
    );
    
    const rewardTokenAddress = await campaign.rewardToken();
    rewardToken = await RewardToken.at(rewardTokenAddress);
  });
  
  describe("Campaign Creation", () => {
    it("should create campaign with correct parameters", async () => {
      assert.equal(await campaign.title(), title);
      assert.equal(await campaign.description(), description);
      assert.equal(await campaign.goal(), goal);
      assert.equal(await campaign.owner(), creator);
    });
  });
  
  describe("Contributions", () => {
    it("should accept contributions", async () => {
      const contributionAmount = web3.utils.toWei("1", "ether");
      
      await campaign.contribute({ 
        from: contributor1, 
        value: contributionAmount 
      });
      
      const contribution = await campaign.contributions(contributor1);
      assert.equal(contribution.amount, contributionAmount);
      
      const totalRaised = await campaign.totalRaised();
      assert.equal(totalRaised, contributionAmount);
    });
    
    it("should mint reward tokens for contributors", async () => {
      const contributionAmount = web3.utils.toWei("1", "ether");
      
      await campaign.contribute({ 
        from: contributor1, 
        value: contributionAmount 
      });
      
      const tokenBalance = await rewardToken.balanceOf(contributor1);
      assert.equal(tokenBalance, contributionAmount);
    });
    
    it("should not allow creator to contribute", async () => {
      await expectRevert(
        campaign.contribute({ 
          from: creator, 
          value: web3.utils.toWei("1", "ether") 
        }),
        "Creator cannot contribute to own campaign"
      );
    });
  });
  
  describe("Milestones", () => {
    beforeEach(async () => {
      // Contribute to reach goal
      await campaign.contribute({ 
        from: contributor1, 
        value: web3.utils.toWei("5", "ether") 
      });
      await campaign.contribute({ 
        from: contributor2, 
        value: web3.utils.toWei("5", "ether") 
      });
    });
    
    it("should create milestones after goal is reached", async () => {
      const milestoneAmount = web3.utils.toWei("2", "ether");
      const milestoneDescription = "First milestone";
      
      await campaign.createMilestone(milestoneAmount, milestoneDescription, { from: creator });
      
      const milestone = await campaign.getMilestone(0);
      assert.equal(milestone.amount, milestoneAmount);
      assert.equal(milestone.description, milestoneDescription);
    });
    
    it("should allow voting on milestones", async () => {
      const milestoneAmount = web3.utils.toWei("2", "ether");
      await campaign.createMilestone(milestoneAmount, "Test milestone", { from: creator });
      
      await campaign.voteOnMilestone(0, true, { from: contributor1 });
      await campaign.voteOnMilestone(0, true, { from: contributor2 });
      
      const milestone = await campaign.getMilestone(0);
      assert.equal(milestone.approved, true);
    });
  });
  
  describe("Refunds", () => {
    it("should allow refunds if goal not reached after deadline", async () => {
      const contributionAmount = web3.utils.toWei("1", "ether");
      
      await campaign.contribute({ 
        from: contributor1, 
        value: contributionAmount 
      });
      
      // Fast forward past deadline
      await time.increase(duration + 1);
      
      const initialBalance = await web3.eth.getBalance(contributor1);
      
      await campaign.requestRefund({ from: contributor1 });
      
      const contribution = await campaign.contributions(contributor1);
      assert.equal(contribution.refunded, true);
    });
  });
});
