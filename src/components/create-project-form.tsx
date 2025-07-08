import React, { useState, type JSX } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Plus, X, Upload, Target, FileText } from "lucide-react";
import { useCreateProject } from "@/hooks/use-create-project";

interface Milestone {
  id: string;
  title: string;
  description: string;
  fundingRequired: number;
  dueDate: string;
}

interface FormData {
  title: string;
  description: string;
  category: string;
  targetFunding: string;
  duration: string;
  image: File | null;
}

interface CurrentMilestone {
  title: string;
  description: string;
  fundingRequired: string;
  dueDate: string;
}

export function CreateProjectForm(): JSX.Element {
  const [formData, setFormData] = useState<FormData>({
    title: "",
    description: "",
    category: "",
    targetFunding: "",
    duration: "",
    image: null,
  });

  const [milestones, setMilestones] = useState<Milestone[]>([]);
  const [currentMilestone, setCurrentMilestone] = useState<CurrentMilestone>({
    title: "",
    description: "",
    fundingRequired: "",
    dueDate: "",
  });

  const { createProject, loading } = useCreateProject();

  const categories = [
    "Technology",
    "Art & Design",
    "Games",
    "Film",
    "Music",
    "Publishing",
    "Food",
    "Fashion",
    "Health",
    "Education",
  ];

  const addMilestone = (): void => {
    if (!currentMilestone.title || !currentMilestone.fundingRequired) return;

    const milestone: Milestone = {
      id: Date.now().toString(),
      title: currentMilestone.title,
      description: currentMilestone.description,
      fundingRequired: Number.parseFloat(currentMilestone.fundingRequired),
      dueDate: currentMilestone.dueDate,
    };

    setMilestones([...milestones, milestone]);
    setCurrentMilestone({
      title: "",
      description: "",
      fundingRequired: "",
      dueDate: "",
    });
  };

  const removeMilestone = (id: string): void => {
    setMilestones(milestones.filter((m) => m.id !== id));
  };

  const handleSubmit = async (e: React.FormEvent): Promise<void> => {
    e.preventDefault();

    const projectData = {
      ...formData,
      targetFunding: Number.parseFloat(formData.targetFunding),
      duration: Number.parseInt(formData.duration),
      milestones,
    };

    await createProject(projectData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileText className="w-5 h-5" />
            Project Details
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="title">Project Title</Label>
              <Input
                id="title"
                placeholder="Enter your project title"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="category">Category</Label>
              <Select
                value={formData.category}
                onValueChange={(value) => setFormData({ ...formData, category: value })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((category) => (
                    <SelectItem key={category} value={category.toLowerCase()}>
                      {category}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              placeholder="Describe your project in detail..."
              rows={4}
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              required
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="target">Target Funding (ETH)</Label>
              <Input
                id="target"
                type="number"
                step="0.01"
                placeholder="10.0"
                value={formData.targetFunding}
                onChange={(e) => setFormData({ ...formData, targetFunding: e.target.value })}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="duration">Duration (Days)</Label>
              <Input
                id="duration"
                type="number"
                placeholder="30"
                value={formData.duration}
                onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="image">Project Image</Label>
            <div className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-6 text-center">
              <Upload className="w-8 h-8 mx-auto mb-2 text-muted-foreground" />
              <p className="text-sm text-muted-foreground">Click to upload or drag and drop</p>
              <Input
                id="image"
                type="file"
                accept="image/*"
                className="hidden"
                onChange={(e) => setFormData({ ...formData, image: e.target.files?.[0] || null })}
              />
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Target className="w-5 h-5" />
            Milestones
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="milestone-title">Milestone Title</Label>
              <Input
                id="milestone-title"
                placeholder="Development Phase 1"
                value={currentMilestone.title}
                onChange={(e) => setCurrentMilestone({ ...currentMilestone, title: e.target.value })}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="milestone-funding">Funding Required (ETH)</Label>
              <Input
                id="milestone-funding"
                type="number"
                step="0.01"
                placeholder="2.5"
                value={currentMilestone.fundingRequired}
                onChange={(e) => setCurrentMilestone({ ...currentMilestone, fundingRequired: e.target.value })}
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="milestone-description">Description</Label>
            <Textarea
              id="milestone-description"
              placeholder="Describe what will be accomplished in this milestone..."
              rows={2}
              value={currentMilestone.description}
              onChange={(e) => setCurrentMilestone({ ...currentMilestone, description: e.target.value })}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="milestone-date">Due Date</Label>
              <Input
                id="milestone-date"
                type="date"
                value={currentMilestone.dueDate}
                onChange={(e) => setCurrentMilestone({ ...currentMilestone, dueDate: e.target.value })}
              />
            </div>

            <div className="flex items-end">
              <Button type="button" onClick={addMilestone} className="w-full">
                <Plus className="w-4 h-4 mr-2" />
                Add Milestone
              </Button>
            </div>
          </div>

          {milestones.length > 0 && (
            <>
              <Separator />
              <div className="space-y-3">
                <h4 className="font-semibold">Added Milestones</h4>
                {milestones.map((milestone) => (
                  <div key={milestone.id} className="flex items-center justify-between p-3 border rounded-lg">
                    <div>
                      <h5 className="font-medium">{milestone.title}</h5>
                      <p className="text-sm text-muted-foreground">
                        {milestone.fundingRequired} ETH • Due: {milestone.dueDate}
                      </p>
                    </div>
                    <Button type="button" variant="ghost" size="sm" onClick={() => removeMilestone(milestone.id)}>
                      <X className="w-4 h-4" />
                    </Button>
                  </div>
                ))}
              </div>
            </>
          )}
        </CardContent>
      </Card>

      <div className="flex justify-end gap-4">
        <Button type="button" variant="outline">
          Save Draft
        </Button>
        <Button type="submit" disabled={loading}>
          {loading ? "Creating..." : "Launch Project"}
        </Button>
      </div>
    </form>
  );
}

export default CreateProjectForm;
