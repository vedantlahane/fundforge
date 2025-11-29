import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Plus, Trash2, Upload, Info, FileText, Target, Flag } from "lucide-react"
import { useCreateProject } from "@/hooks/use-create-project"

interface Milestone {
  title: string
  description: string
  fundingRequired: string
  dueDate: string
}

export function CreateProjectForm() {
  const navigate = useNavigate()
  const { createProject, loading } = useCreateProject()

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "",
    targetFunding: "",
    duration: "",
    image: "",
  })

  const [milestones, setMilestones] = useState<Milestone[]>([
    { title: "", description: "", fundingRequired: "", dueDate: "" },
  ])

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handleMilestoneChange = (index: number, field: keyof Milestone, value: string) => {
    const updated = [...milestones]
    updated[index][field] = value
    setMilestones(updated)
  }

  const addMilestone = () => {
    setMilestones([...milestones, { title: "", description: "", fundingRequired: "", dueDate: "" }])
  }

  const removeMilestone = (index: number) => {
    if (milestones.length > 1) {
      setMilestones(milestones.filter((_, i) => i !== index))
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    const projectData = {
      ...formData,
      targetFunding: Number.parseFloat(formData.targetFunding),
      duration: Number.parseInt(formData.duration),
      milestones: milestones.map((m, i) => ({
        ...m,
        id: String(i + 1),
        fundingRequired: Number.parseFloat(m.fundingRequired),
        status: "pending" as const,
      })),
    }

    const success = await createProject(projectData)
    if (success) {
      navigate("/dashboard")
    }
  }

  const totalMilestoneFunding = milestones.reduce((sum, m) => sum + (Number.parseFloat(m.fundingRequired) || 0), 0)

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Project Details Card */}
      <Card className="border-border/50 overflow-hidden">
        <div className="h-1 bg-gradient-to-r from-indigo-500 to-purple-500" />
        <CardHeader>
          <CardTitle className="flex items-center gap-2 font-heading">
            <FileText className="w-5 h-5 text-indigo-500" />
            Project Details
          </CardTitle>
          <CardDescription>Provide basic information about your project</CardDescription>
        </CardHeader>
        <CardContent className="space-y-5">
          <div className="space-y-2">
            <Label htmlFor="title">Project Title</Label>
            <Input
              id="title"
              placeholder="Enter your project title"
              value={formData.title}
              onChange={(e) => handleInputChange("title", e.target.value)}
              className="h-11"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              placeholder="Describe your project in detail..."
              value={formData.description}
              onChange={(e) => handleInputChange("description", e.target.value)}
              rows={6}
              required
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="category">Category</Label>
              <Select value={formData.category} onValueChange={(value: string) => handleInputChange("category", value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="defi">DeFi</SelectItem>
                  <SelectItem value="nft">NFT</SelectItem>
                  <SelectItem value="gaming">Gaming</SelectItem>
                  <SelectItem value="infrastructure">Infrastructure</SelectItem>
                  <SelectItem value="dao">DAO</SelectItem>
                  <SelectItem value="social">Social</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="image">Project Image URL</Label>
              <div className="flex gap-2">
                <Input
                  id="image"
                  placeholder="https://example.com/image.png"
                  value={formData.image}
                  onChange={(e) => handleInputChange("image", e.target.value)}
                  className="h-11"
                />
                <Button type="button" variant="outline" size="icon" className="h-11 w-11 shrink-0">
                  <Upload className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Funding Details Card */}
      <Card className="border-border/50 overflow-hidden">
        <div className="h-1 bg-gradient-to-r from-indigo-500 to-purple-500" />
        <CardHeader>
          <CardTitle className="flex items-center gap-2 font-heading">
            <Target className="w-5 h-5 text-indigo-500" />
            Funding Details
          </CardTitle>
          <CardDescription>Set your funding goal and campaign duration</CardDescription>
        </CardHeader>
        <CardContent className="space-y-5">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="targetFunding">Funding Goal (ETH)</Label>
              <Input
                id="targetFunding"
                type="number"
                placeholder="10"
                value={formData.targetFunding}
                onChange={(e) => handleInputChange("targetFunding", e.target.value)}
                step="0.1"
                min="0.1"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="duration">Campaign Duration (days)</Label>
              <Select value={formData.duration} onValueChange={(value: string) => handleInputChange("duration", value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select duration" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="14">14 days</SelectItem>
                  <SelectItem value="30">30 days</SelectItem>
                  <SelectItem value="45">45 days</SelectItem>
                  <SelectItem value="60">60 days</SelectItem>
                  <SelectItem value="90">90 days</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {formData.targetFunding && totalMilestoneFunding > 0 && (
            <div className="p-4 bg-muted/50 rounded-lg border border-border/50 flex items-start gap-3">
              <Info className="w-5 h-5 text-indigo-500 mt-0.5" />
              <div className="text-sm">
                <p className="font-medium">Milestone Funding Summary</p>
                <p className="text-muted-foreground">
                  Total milestone funding: <span className="text-foreground font-medium">{totalMilestoneFunding} ETH</span> / {formData.targetFunding} ETH goal
                  {totalMilestoneFunding !== Number.parseFloat(formData.targetFunding) && (
                    <span className="text-purple-500 ml-2">(should match your funding goal)</span>
                  )}
                </p>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Milestones Card */}
      <Card className="border-border/50 overflow-hidden">
        <div className="h-1 bg-gradient-to-r from-indigo-500 to-purple-500" />
        <CardHeader>
          <CardTitle className="flex items-center gap-2 font-heading">
            <Flag className="w-5 h-5 text-purple-500" />
            Milestones
          </CardTitle>
          <CardDescription>Define project milestones for fund release</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {milestones.map((milestone, index) => (
            <div key={index} className="space-y-4 p-4 rounded-lg bg-muted/30 border border-border/50">
              <div className="flex items-center justify-between">
                <h4 className="font-semibold flex items-center gap-2">
                  <span className="w-6 h-6 rounded-full bg-gradient-to-r from-indigo-500 to-purple-500 text-white text-xs flex items-center justify-center">
                    {index + 1}
                  </span>
                  Milestone {index + 1}
                </h4>
                {milestones.length > 1 && (
                  <Button type="button" variant="ghost" size="sm" onClick={() => removeMilestone(index)}>
                    <Trash2 className="w-4 h-4" />
                  </Button>
                )}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Title</Label>
                  <Input
                    placeholder="Milestone title"
                    value={milestone.title}
                    onChange={(e) => handleMilestoneChange(index, "title", e.target.value)}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label>Funding Required (ETH)</Label>
                  <Input
                    type="number"
                    placeholder="2.5"
                    value={milestone.fundingRequired}
                    onChange={(e) => handleMilestoneChange(index, "fundingRequired", e.target.value)}
                    step="0.1"
                    min="0.1"
                    required
                  />
                </div>

                <div className="space-y-2 md:col-span-2">
                  <Label>Description</Label>
                  <Textarea
                    placeholder="Describe what will be accomplished in this milestone"
                    value={milestone.description}
                    onChange={(e) => handleMilestoneChange(index, "description", e.target.value)}
                    rows={2}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label>Due Date</Label>
                  <Input
                    type="date"
                    value={milestone.dueDate}
                    onChange={(e) => handleMilestoneChange(index, "dueDate", e.target.value)}
                    required
                  />
                </div>
              </div>
            </div>
          ))}

          <Button type="button" variant="outline" onClick={addMilestone} className="w-full h-11 border-dashed">
            <Plus className="w-4 h-4 mr-2" />
            Add Another Milestone
          </Button>
        </CardContent>
      </Card>

      {/* Submit Buttons */}
      <div className="flex justify-end gap-3 pt-4">
        <Button type="button" variant="outline" onClick={() => navigate("/projects")} className="h-11 px-6">
          Cancel
        </Button>
        <Button 
          type="submit" 
          disabled={loading}
          className="h-11 px-8 bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-600 hover:to-purple-600"
        >
          {loading ? "Creating..." : "Create Project"}
        </Button>
      </div>
    </form>
  )
}
