import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Upload, 
  DollarSign, 
  Calendar, 
  FileText, 
  Tag,
  Info,
  CheckCircle
} from 'lucide-react';
import Button from '../components/ui/Button';
import Card from '../components/ui/Card';
import { useWeb3 } from '../contexts/Web3Context';
import toast from 'react-hot-toast';

const CreateCampaign: React.FC = () => {
  const { isConnected, factoryContract, account, web3 } = useWeb3();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: '',
    goal: '',
    duration: '30',
    imageFile: null as File | null,
    imagePreview: '',
    tags: [] as string[],
  });

  const categories = [
    'Technology', 'Art', 'Games', 'Music', 'Film', 
    'Education', 'Community', 'Business', 'Health', 'Environment'
  ];

  const steps = [
    { number: 1, title: 'Basic Info', description: 'Campaign details' },
    { number: 2, title: 'Funding', description: 'Goal and timeline' },
    { number: 3, title: 'Media', description: 'Images and content' },
    { number: 4, title: 'Review', description: 'Final check' },
  ];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFormData(prev => ({ ...prev, imageFile: file }));
      
      const reader = new FileReader();
      reader.onload = (e) => {
        setFormData(prev => ({ ...prev, imagePreview: e.target?.result as string }));
      };
      reader.readAsDataURL(file);
    }
  };

  const validateStep = (step: number) => {
    switch (step) {
      case 1:
        return formData.title && formData.description && formData.category;
      case 2:
        return formData.goal && parseFloat(formData.goal) > 0 && formData.duration;
      case 3:
        return true; // Images are optional
      default:
        return true;
    }
  };

  const nextStep = () => {
    if (validateStep(currentStep)) {
      setCurrentStep(prev => Math.min(prev + 1, 4));
    } else {
      toast.error('Please fill in all required fields');
    }
  };

  const prevStep = () => {
    setCurrentStep(prev => Math.max(prev - 1, 1));
  };

  const handleSubmit = async () => {
    if (!isConnected || !factoryContract || !web3) {
      toast.error('Please connect your wallet');
      return;
    }

    try {
      setLoading(true);
      
      // Convert values
      const goalInWei = web3.utils.toWei(formData.goal, 'ether');
      const durationInSeconds = parseInt(formData.duration) * 24 * 60 * 60;
      
      // For demo, using a placeholder IPFS hash
      const imageHash = formData.imageFile ? 'QmPlaceholder...' : '';
      
      const tx = await factoryContract.methods.createCampaign(
        formData.title,
        formData.description,
        imageHash,
        formData.category,
        goalInWei,
        durationInSeconds
      ).send({ from: account });

      toast.success('Campaign created successfully!');
      navigate('/dashboard');
      
    } catch (error) {
      console.error('Error creating campaign:', error);
      toast.error('Failed to create campaign');
    } finally {
      setLoading(false);
    }
  };

  if (!isConnected) {
    return (
      <div className="max-w-2xl mx-auto">
        <Card className="text-center" padding="lg">
          <div className="w-16 h-16 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center mx-auto mb-4">
            <DollarSign className="w-8 h-8 text-blue-600" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
            Connect Your Wallet
          </h2>
          <p className="text-gray-600 dark:text-gray-300 mb-6">
            You need to connect your wallet to create a campaign and interact with the blockchain.
          </p>
          <Button size="lg">
            Connect Wallet
          </Button>
        </Card>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto">
      {/* Progress Steps */}
      <div className="mb-8">
        <div className="flex items-center justify-between">
          {steps.map((step, index) => (
            <div key={step.number} className="flex items-center">
              <div className={`flex items-center justify-center w-10 h-10 rounded-full text-sm font-medium ${
                currentStep >= step.number
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-400'
              }`}>
                {currentStep > step.number ? (
                  <CheckCircle className="w-6 h-6" />
                ) : (
                  step.number
                )}
              </div>
              <div className="ml-3 text-left">
                <div className={`text-sm font-medium ${
                  currentStep >= step.number
                    ? 'text-blue-600 dark:text-blue-400'
                    : 'text-gray-600 dark:text-gray-400'
                }`}>
                  {step.title}
                </div>
                <div className="text-xs text-gray-500 dark:text-gray-400">
                  {step.description}
                </div>
              </div>
              {index < steps.length - 1 && (
                <div className={`flex-1 h-px mx-4 ${
                  currentStep > step.number
                    ? 'bg-blue-600'
                    : 'bg-gray-200 dark:bg-gray-700'
                }`} />
              )}
            </div>
          ))}
        </div>
      </div>

      <Card padding="lg">
        {/* Step 1: Basic Info */}
        {currentStep === 1 && (
          <div className="space-y-6">
            <div>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                Campaign Basics
              </h2>
              <p className="text-gray-600 dark:text-gray-300">
                Tell us about your project and what makes it special.
              </p>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Campaign Title *
              </label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleInputChange}
                placeholder="Enter a compelling title for your campaign"
                className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                maxLength={100}
              />
              <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                {formData.title.length}/100 characters
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Description *
              </label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                placeholder="Describe your project, its goals, and why people should support it"
                rows={6}
                className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                maxLength={1000}
              />
              <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                {formData.description.length}/1000 characters
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Category *
              </label>
              <select
                name="category"
                value={formData.category}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="">Select a category</option>
                {categories.map(category => (
                  <option key={category} value={category}>{category}</option>
                ))}
              </select>
            </div>
          </div>
        )}

        {/* Step 2: Funding */}
        {currentStep === 2 && (
          <div className="space-y-6">
            <div>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                Funding Details
              </h2>
              <p className="text-gray-600 dark:text-gray-300">
                Set your funding goal and campaign duration.
              </p>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Funding Goal (ETH) *
              </label>
              <div className="relative">
                <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type="number"
                  name="goal"
                  value={formData.goal}
                  onChange={handleInputChange}
                  placeholder="0.00"
                  min="0.01"
                  step="0.01"
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                Minimum goal: 0.01 ETH
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Campaign Duration (Days) *
              </label>
              <div className="relative">
                <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <select
                  name="duration"
                  value={formData.duration}
                  onChange={handleInputChange}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="7">7 days</option>
                  <option value="14">14 days</option>
                  <option value="30">30 days</option>
                  <option value="60">60 days</option>
                  <option value="90">90 days</option>
                </select>
              </div>
            </div>

            <Card className="bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800" padding="md">
              <div className="flex items-start space-x-3">
                <Info className="h-5 w-5 text-blue-600 mt-0.5" />
                <div>
                  <h4 className="text-sm font-medium text-blue-900 dark:text-blue-100">
                    Funding Information
                  </h4>
                  <p className="text-xs text-blue-700 dark:text-blue-200 mt-1">
                    Funds will be released through milestone-based voting. Contributors will vote on each milestone before funds are released to ensure project accountability.
                  </p>
                </div>
              </div>
            </Card>
          </div>
        )}

        {/* Step 3: Media */}
        {currentStep === 3 && (
          <div className="space-y-6">
            <div>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                Campaign Media
              </h2>
              <p className="text-gray-600 dark:text-gray-300">
                Add images to make your campaign more appealing to potential backers.
              </p>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Campaign Image
              </label>
              <div className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg p-6 text-center">
                {formData.imagePreview ? (
                  <div className="space-y-4">
                    <img
                      src={formData.imagePreview}
                      alt="Campaign preview"
                      className="max-h-64 mx-auto rounded-lg"
                    />
                    <Button
                      variant="outline"
                      onClick={() => setFormData(prev => ({ ...prev, imageFile: null, imagePreview: '' }))}
                    >
                      Remove Image
                    </Button>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <Upload className="h-12 w-12 text-gray-400 mx-auto" />
                    <div>
                      <label htmlFor="image-upload" className="cursor-pointer">
                        <span className="text-blue-600 hover:text-blue-700 font-medium">
                          Click to upload
                        </span>
                        <span className="text-gray-600 dark:text-gray-400"> or drag and drop</span>
                      </label>
                      <input
                        id="image-upload"
                        type="file"
                        accept="image/*"
                        onChange={handleImageUpload}
                        className="hidden"
                      />
                    </div>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      PNG, JPG, GIF up to 10MB
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Step 4: Review */}
        {currentStep === 4 && (
          <div className="space-y-6">
            <div>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                Review Your Campaign
              </h2>
              <p className="text-gray-600 dark:text-gray-300">
                Please review all details before launching your campaign.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div>
                  <h3 className="font-medium text-gray-900 dark:text-white">Title</h3>
                  <p className="text-gray-600 dark:text-gray-300">{formData.title}</p>
                </div>
                <div>
                  <h3 className="font-medium text-gray-900 dark:text-white">Category</h3>
                  <p className="text-gray-600 dark:text-gray-300">{formData.category}</p>
                </div>
                <div>
                  <h3 className="font-medium text-gray-900 dark:text-white">Goal</h3>
                  <p className="text-gray-600 dark:text-gray-300">{formData.goal} ETH</p>
                </div>
                <div>
                  <h3 className="font-medium text-gray-900 dark:text-white">Duration</h3>
                  <p className="text-gray-600 dark:text-gray-300">{formData.duration} days</p>
                </div>
              </div>
              <div>
                <h3 className="font-medium text-gray-900 dark:text-white mb-2">Description</h3>
                <p className="text-gray-600 dark:text-gray-300 text-sm">
                  {formData.description}
                </p>
                {formData.imagePreview && (
                  <div className="mt-4">
                    <h3 className="font-medium text-gray-900 dark:text-white mb-2">Image</h3>
                    <img
                      src={formData.imagePreview}
                      alt="Campaign"
                      className="w-full max-h-32 object-cover rounded-lg"
                    />
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Navigation Buttons */}
        <div className="flex justify-between pt-6 border-t border-gray-200 dark:border-gray-700">
          <Button
            variant="outline"
            onClick={prevStep}
            disabled={currentStep === 1}
          >
            Previous
          </Button>
          
          {currentStep < 4 ? (
            <Button onClick={nextStep}>
              Next
            </Button>
          ) : (
            <Button
              onClick={handleSubmit}
              loading={loading}
              disabled={!validateStep(currentStep)}
            >
              Launch Campaign
            </Button>
          )}
        </div>
      </Card>
    </div>
  );
};

export default CreateCampaign;
