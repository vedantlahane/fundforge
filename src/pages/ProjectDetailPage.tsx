
import { useParams } from "react-router-dom"
import { ProjectDetails } from "@/components/project-details"
import { FundingPanel } from "@/components/funding-panel"
import { ProjectMilestones } from "@/components/project-milestones"
import { ProjectUpdates } from "@/components/project-updates"
import { VotingPanel } from "@/components/voting-panel"

export default function ProjectDetailPage() {
  const { id } = useParams<{ id: string }>()

  if (!id) {
    return <div>Project not found</div>
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          <ProjectDetails projectId={id} />
          <ProjectMilestones projectId={id} />
          <ProjectUpdates projectId={id} />
          <VotingPanel projectId={id} />
        </div>
        <div className="lg:col-span-1">
          <FundingPanel projectId={id} />
        </div>
      </div>
    </div>
  )
}
