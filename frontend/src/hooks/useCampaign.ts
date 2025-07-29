import { useState, useEffect } from 'react';
import { useWeb3 } from '../contexts/Web3Context';
import toast from 'react-hot-toast';

export const useCampaign = (address: string) => {
  const { web3, account, isConnected, createCampaignContract } = useWeb3();
  const [campaign, setCampaign] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (address && isConnected && web3) {
      loadCampaign();
    }
  }, [address, isConnected, web3]);

  const loadCampaign = async () => {
    try {
      setLoading(true);
      setError(null);

      const campaignContract = createCampaignContract(address);
      const campaignInfo = await campaignContract.methods.getCampaignInfo().call();
      
      setCampaign({
        address: address,
        title: campaignInfo.title,
        description: campaignInfo.description,
        imageHash: campaignInfo.imageHash,
        category: campaignInfo.category,
        goal: web3.utils.fromWei(campaignInfo.goal, 'ether'),
        totalRaised: web3.utils.fromWei(campaignInfo.totalRaised, 'ether'),
        deadline: new Date(campaignInfo.deadline * 1000).toISOString(),
        goalReached: campaignInfo.goalReached,
        campaignEnded: campaignInfo.campaignEnded,
        contributorCount: campaignInfo.contributorCount,
        creator: campaignInfo.creator,
        createdAt: new Date(campaignInfo.createdAt * 1000).toISOString(),
      });
    } catch (err) {
      console.error('Error loading campaign:', err);
      setError('Failed to load campaign details');
      toast.error('Failed to load campaign details');
    } finally {
      setLoading(false);
    }
  };

  const contribute = async (amount: string) => {
    if (!isConnected || !web3) {
      throw new Error('Wallet not connected');
    }

    const campaignContract = createCampaignContract(address);
    const amountWei = web3.utils.toWei(amount, 'ether');
    
    const tx = await campaignContract.methods.contribute().send({
      from: account,
      value: amountWei,
    });

    await loadCampaign(); // Refresh campaign data
    return tx;
  };

  return {
    campaign,
    loading,
    error,
    refetch: loadCampaign,
    contribute,
  };
};
