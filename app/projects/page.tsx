import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ExternalLink, Github } from "lucide-react";

const projects = [
  {
    id: 1,
    title: "GoMealSaver",
    description: "A platform to reduce food waste by connecting surplus food sellers with buyers. Winner of Dicoding Capstone Batch 7.",
    technologies: ["Next.js", "MongoDB", "Cloudinary", "API Routes"],
    githubUrl: "https://github.com/Anezz12/gomealsaver-v2",
    liveUrl: "https://github.com/Anezz12/gomealsaver-v2",
  },
  {
    id: 2,
    title: "CheersLabs",
    description: "A modern and responsive landing page for a technology company.",
    technologies: ["Next.js", "Tailwind CSS", "TypeScript"],
    githubUrl: "https://www.cheerslabs.my.id/",
    liveUrl: "https://www.cheerslabs.my.id/",
  },
  {
    id: 3,
    title: "Super Cluster",
    description: "A Web3 application for interacting with smart contracts on the blockchain using wallet connectivity.",
    technologies: ["Next.js", "Wagmi", "Solidity", "Web3"],
    githubUrl: "https://super-cluster.vercel.app",
    liveUrl: "https://super-cluster.vercel.app",
  },
  {
    id: 4,
    title: "ISPU Monitor",
    description: "An air quality monitoring application for Indonesia with data visualization powered by a Flask backend.",
    technologies: ["Next.js", "Flask", "Python", "REST API"],
    githubUrl: "https://ispu.vercel.app/",
    liveUrl: "https://ispu.vercel.app/",
  },
];

export default function Projects() {
  return (
    <div className="relative">
      {/* Grid Background */}
      <div className="absolute inset-0 grid-background opacity-50" />

      <div className="relative container mx-auto px-4 py-16">
        <div className="max-w-6xl mx-auto">
          <div className="mb-12 text-center">
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">
              <span className="gradient-text">Projects</span>
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              A collection of projects I've worked on. From web applications to open source libraries.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map((project) => (
              <Card
                key={project.id}
                className="group flex flex-col hover:shadow-xl transition-all duration-300 border-border/50 hover:border-foreground/30 shine-effect"
              >
                <CardHeader>
                  <CardTitle className="text-xl group-hover:text-foreground transition-colors">
                    {project.title}
                  </CardTitle>
                  <CardDescription className="text-sm">{project.description}</CardDescription>
                </CardHeader>
                <CardContent className="flex-1">
                  <div className="flex flex-wrap gap-2">
                    {project.technologies.map((tech) => (
                      <Badge key={tech} variant="secondary" className="text-xs">
                        {tech}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
                <CardFooter className="flex gap-2">
                  <Button variant="outline" size="sm" asChild className="flex-1 shine-effect">
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Github className="h-4 w-4 mr-2" />
                      Code
                    </a>
                  </Button>
                  <Button size="sm" asChild className="flex-1 bg-foreground text-background hover:shadow-lg hover:shadow-foreground/20">
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <ExternalLink className="h-4 w-4 mr-2" />
                      Demo
                    </a>
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
