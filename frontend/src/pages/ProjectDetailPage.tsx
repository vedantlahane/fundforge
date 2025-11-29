import { useParams } from "react-router-dom"
import { ProjectDetails } from "@/components/project-details"
import { FundingPanel } from "@/components/funding-panel"
import { ProjectMilestones } from "@/components/project-milestones"
import { ProjectUpdates } from "@/components/project-updates"
import { VotingPanel } from "@/components/voting-panel"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Flag, MessageSquare, Vote } from "lucide-react"

export function ProjectDetailPage() {
  const { id } = useParams<{ id: string }>()

  if (!id) {
    return <div>Project not found</div>
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          <ProjectDetails projectId={id} />
          
          <Accordion type="multiple" defaultValue={["milestones"]} className="space-y-4">
            <AccordionItem value="milestones" className="border border-border/50 rounded-xl overflow-hidden bg-card">
              <AccordionTrigger className="px-6 py-4 hover:no-underline hover:bg-muted/50">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-gradient-to-br from-indigo-500 to-purple-500">
                    <Flag className="w-4 h-4 text-white" />
                  </div>
                  <span className="font-heading font-semibold">Project Milestones</span>
                </div>
              </AccordionTrigger>
              <AccordionContent className="px-6 pb-6 pt-2">
                <ProjectMilestones projectId={id} isEmbedded />
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="updates" className="border border-border/50 rounded-xl overflow-hidden bg-card">
              <AccordionTrigger className="px-6 py-4 hover:no-underline hover:bg-muted/50">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-gradient-to-br from-indigo-500 to-purple-500">
                    <MessageSquare className="w-4 h-4 text-white" />
                  </div>
                  <span className="font-heading font-semibold">Project Updates</span>
                </div>
              </AccordionTrigger>
              <AccordionContent className="px-6 pb-6 pt-2">
                <ProjectUpdates projectId={id} isEmbedded />
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="voting" className="border border-border/50 rounded-xl overflow-hidden bg-card">
              <AccordionTrigger className="px-6 py-4 hover:no-underline hover:bg-muted/50">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-gradient-to-br from-indigo-500 to-purple-500">
                    <Vote className="w-4 h-4 text-white" />
                  </div>
                  <span className="font-heading font-semibold">Community Voting</span>
                </div>
              </AccordionTrigger>
              <AccordionContent className="px-6 pb-6 pt-2">
                <VotingPanel projectId={id} isEmbedded />
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
        <div className="lg:col-span-1">
          <FundingPanel projectId={id} />
        </div>
      </div>
    </div>
  )
}
