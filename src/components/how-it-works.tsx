import { type JSX } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Rocket, Users, Vote, Coins, type LucideIcon } from "lucide-react";

interface Step {
  icon: LucideIcon;
  title: string;
  description: string;
}

export function HowItWorks(): JSX.Element {
  const steps: Step[] = [
    {
      icon: Rocket,
      title: "Create Project",
      description: "Launch your project with clear milestones and funding goals on the blockchain",
    },
    {
      icon: Users,
      title: "Get Backers",
      description: "Community members discover and fund projects they believe in",
    },
    {
      icon: Vote,
      title: "Community Votes",
      description: "Backers vote on milestone completion to ensure accountability",
    },
    {
      icon: Coins,
      title: "Funds Released",
      description: "Smart contracts automatically release funds when milestones are approved",
    },
  ];

  return (
    <section className="py-16 bg-muted/50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">How Fund Forge Works</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Our transparent, milestone-based funding system ensures projects deliver on their promises while protecting
            backer investments
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((step, index) => (
            <Card key={index} className="text-center">
              <CardContent className="p-6">
                <div className="w-16 h-16 mx-auto mb-4 bg-primary/10 rounded-full flex items-center justify-center">
                  <step.icon className="w-8 h-8 text-primary" />
                </div>
                <h3 className="font-semibold mb-2">{step.title}</h3>
                <p className="text-sm text-muted-foreground">{step.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}

export default HowItWorks;
