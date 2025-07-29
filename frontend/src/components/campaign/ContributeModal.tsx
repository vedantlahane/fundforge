import React, { useState } from 'react';
import { X, DollarSign, Info } from 'lucide-react';
import Button from '../ui/Button';
import { useWeb3 } from '../../contexts/Web3Context';

interface ContributeModalProps {
  campaign: any;
  onContribute: (amount: string) => void;
  onClose: () => void;
}

const ContributeModal: React.FC<ContributeModalProps> = ({
  campaign,
  onContribute,
  onClose,
}) => {
  const { account } = useWeb3();
  const [amount, setAmount] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!amount || parseFloat(amount) <= 0) return;

    setLoading(true);
    try {
      await onContribute(amount);
    } finally {
      setLoading(false);
    }
  };

  const predefinedAmounts = ['0.1', '0.5', '1', '2', '5'];

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white dark:bg-gray-800 rounded-xl max-w-md w-full max-h-90vh overflow-y-auto">
        <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white">
            Back This Project
          </h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          <div>
            <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
              {campaign.title}
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Support this project and receive reward tokens
            </p>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Contribution Amount (ETH)
            </label>
            <div className="relative">
              <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="number"
                step="0.01"
                min="0.01"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                placeholder="0.00"
                className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
              />
            </div>
          </div>

          <div>
            <div className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
              Quick amounts:
            </div>
            <div className="grid grid-cols-5 gap-2">
              {predefinedAmounts.map((presetAmount) => (
                <button
                  key={presetAmount}
                  type="button"
                  onClick={() => setAmount(presetAmount)}
                  className="px-3 py-2 text-sm border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300"
                >
                  {presetAmount} ETH
                </button>
              ))}
            </div>
          </div>

          <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
            <div className="flex items-start space-x-3">
              <Info className="h-5 w-5 text-blue-600 mt-0.5" />
              <div>
                <h4 className="text-sm font-medium text-blue-900 dark:text-blue-100">
                  What you get:
                </h4>
                <ul className="text-xs text-blue-700 dark:text-blue-200 mt-1 space-y-1">
                  <li>• {amount || '0'} reward tokens (1:1 ratio with ETH)</li>
                  <li>• Voting rights on project milestones</li>
                  <li>• Updates from the project creator</li>
                  <li>• Refund eligibility if project fails</li>
                </ul>
              </div>
            </div>
          </div>

          <div className="space-y-3">
            <Button
              type="submit"
              loading={loading}
              disabled={!amount || parseFloat(amount) <= 0}
              className="w-full"
            >
              Contribute {amount || '0'} ETH
            </Button>
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              className="w-full"
            >
              Cancel
            </Button>
          </div>

          <div className="text-xs text-gray-500 dark:text-gray-400 text-center">
            By contributing, you agree to our terms and conditions. 
            Your wallet address: {account?.slice(0, 6)}...{account?.slice(-4)}
          </div>
        </form>
      </div>
    </div>
  );
};

export default ContributeModal;
