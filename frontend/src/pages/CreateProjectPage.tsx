import { CreateProjectForm } from "@/components/create-project-form"

export function CreateProjectPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl md:text-4xl font-heading font-bold">Create New Project</h1>
        <p className="text-muted-foreground mt-2">Launch your project on the blockchain and start raising funds</p>
      </div>

      <div className="max-w-4xl">
        <CreateProjectForm />
      </div>
    </div>
  )
}
