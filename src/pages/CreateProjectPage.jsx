import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import MainLayout from '../layouts/MainLayout';
import Button from '../components/common/Button';
import { useWallet } from '../contexts/WalletContext';
import { createProject } from '../services/blockchain/thirdweb';
import LoadingSpinner from '../components/ui/LoadingSpinner';

export default function CreateProjectPage() {
  const navigate = useNavigate();
  const { account, signer } = useWallet();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);
  
  const [form, setForm] = useState({
    title: '',
    description: '',
    goal: '',
    deadline: '',
    image: '',
    milestones: [{ description: '', percentage: '25' }]
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleMilestoneChange = (idx, field, value) => {
    const newMilestones = form.milestones.map((ms, i) =>
      i === idx ? { ...ms, [field]: value } : ms
    );
    setForm({ ...form, milestones: newMilestones });
  };

  const addMilestone = () => {
    setForm({ ...form, milestones: [...form.milestones, { description: '', percentage: '25' }] });
  };

  const removeMilestone = (idx) => {
    setForm({ ...form, milestones: form.milestones.filter((_, i) => i !== idx) });
  };

  const validateMilestones = () => {
    // Check if all milestones have descriptions
    const allHaveDescriptions = form.milestones.every(m => m.description.trim() !== '');
    
    // Check if percentages sum to 100
    const sum = form.milestones.reduce((total, m) => total + parseInt(m.percentage || 0), 0);
    
    if (!allHaveDescriptions) {
      setError('All milestones must have descriptions');
      return false;
    }
    
    if (sum !== 100) {
      setError(`Milestone percentages must sum to 100%. Current total: ${sum}%`);
      return false;
    }
    
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!account) {
      setError('Please connect your wallet first');
      return;
    }
    
    if (!validateMilestones()) {
      return;
    }
    
    setIsSubmitting(true);
    setError(null);
    
    try {
      await createProject(signer, form);
      navigate('/explore');
    } catch (err) {
      console.error(err);
      setError('Failed to create project. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <MainLayout>
      <div className="max-w-2xl mx-auto py-12 px-4">
        <h2 className="text-2xl font-bold mb-6">Create a New Project</h2>
        
        {!account ? (
          <div className="bg-yellow-100 text-yellow-800 p-4 rounded-md mb-6">
            Please connect your wallet to create a project.
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block mb-1 font-medium">Title</label>
              <input
                type="text"
                name="title"
                value={form.title}
                onChange={handleChange}
                className="w-full border rounded p-2"
                required
              />
            </div>
            <div>
              <label className="block mb-1 font-medium">Description</label>
              <textarea
                name="description"
                value={form.description}
                onChange={handleChange}
                className="w-full border rounded p-2"
                rows={4}
                required
              />
            </div>
            <div>
              <label className="block mb-1 font-medium">Funding Goal (MATIC)</label>
              <input
                type="number"
                name="goal"
                value={form.goal}
                onChange={handleChange}
                className="w-full border rounded p-2"
                min="0.01"
                step="0.01"
                required
              />
            </div>
            <div>
              <label className="block mb-1 font-medium">Deadline</label>
              <input
                type="date"
                name="deadline"
                value={form.deadline}
                onChange={handleChange}
                className="w-full border rounded p-2"
                required
              />
            </div>
            <div>
              <label className="block mb-1 font-medium">Image URL</label>
              <input
                type="url"
                name="image"
                value={form.image}
                onChange={handleChange}
                className="w-full border rounded p-2"
              />
            </div>
            <div>
              <label className="block mb-1 font-medium">Milestones</label>
              <p className="text-sm text-gray-500 mb-2">Define project milestones. Percentages must sum to 100%.</p>
              {form.milestones.map((ms, idx) => (
                <div key={idx} className="flex gap-2 mb-2">
                  <input
                    type="text"
                    placeholder="Milestone description"
                    value={ms.description}
                    onChange={e => handleMilestoneChange(idx, 'description', e.target.value)}
                    className="flex-1 border rounded p-2"
                    required
                  />
                  <input
                    type="number"
                    placeholder="%"
                    value={ms.percentage}
                    onChange={e => handleMilestoneChange(idx, 'percentage', e.target.value)}
                    className="w-20 border rounded p-2"
                    min="1"
                    max="100"
                    required
                  />
                  {form.milestones.length > 1 && (
                    <button 
                      type="button" 
                      onClick={() => removeMilestone(idx)} 
                      className="text-red-500 font-bold"
                      aria-label="Remove milestone"
                    >
                      ×
                    </button>
                  )}
                </div>
              ))}
              <button 
                type="button" 
                onClick={addMilestone} 
                className="text-blue-600 mt-2"
              >
                + Add Milestone
              </button>
            </div>
            
            {error && (
              <div className="bg-red-100 text-red-800 p-3 rounded">
                {error}
              </div>
            )}
            
            <Button 
              type="submit" 
              fullWidth 
              disabled={isSubmitting}
              className="flex items-center justify-center"
            >
              {isSubmitting ? (
                <>
                  <LoadingSpinner size="sm" color="white" className="mr-2" />
                  Creating Project...
                </>
              ) : (
                'Create Project'
              )}
            </Button>
          </form>
        )}
      </div>
    </MainLayout>
  );
}
