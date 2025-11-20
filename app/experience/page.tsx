import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Briefcase, Calendar } from "lucide-react";

const experiences = [
  {
    id: 1,
    company: "Company Name 1",
    position: "Senior Full Stack Developer",
    period: "Jan 2022 - Present",
    description: "Leading development of enterprise web applications using modern technologies. Mentoring junior developers and conducting code reviews.",
    achievements: [
      "Architected and implemented a microservices-based system that improved performance by 40%",
      "Led a team of 5 developers in delivering major features on schedule",
      "Introduced CI/CD pipelines reducing deployment time by 60%",
    ],
    technologies: ["Next.js", "Node.js", "PostgreSQL", "AWS", "Docker"],
  },
  {
    id: 2,
    company: "Company Name 2",
    position: "Full Stack Developer",
    period: "Jun 2020 - Dec 2021",
    description: "Developed and maintained multiple client-facing web applications with focus on performance and user experience.",
    achievements: [
      "Built responsive web applications serving 100K+ daily active users",
      "Optimized database queries reducing load time by 50%",
      "Collaborated with design team to implement pixel-perfect UI components",
    ],
    technologies: ["React", "TypeScript", "Express", "MongoDB", "Redis"],
  },
  {
    id: 3,
    company: "Company Name 3",
    position: "Junior Developer",
    period: "Jan 2019 - May 2020",
    description: "Started career developing internal tools and contributing to various projects.",
    achievements: [
      "Developed internal dashboard used by 50+ employees",
      "Fixed critical bugs and improved code quality",
      "Participated in agile development practices and daily standups",
    ],
    technologies: ["JavaScript", "React", "Node.js", "MySQL"],
  },
];

export default function Experience() {
  return (
    <div className="relative">
      {/* Grid Background */}
      <div className="absolute inset-0 grid-background opacity-50" />

      <div className="relative container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
          <div className="mb-12 text-center">
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">
              <span className="gradient-text">Experience</span>
            </h1>
            <p className="text-lg text-muted-foreground">
              My professional journey and career highlights
            </p>
          </div>

          <div className="relative space-y-8">
            {/* Timeline Line */}
            <div className="absolute left-6 md:left-8 top-0 bottom-0 w-px bg-border/50 hidden sm:block" />

            {experiences.map((exp) => (
              <div key={exp.id} className="relative">
                <Card className="group hover:shadow-xl transition-all duration-300 border-border/50 hover:border-foreground/30 shine-effect ml-0 sm:ml-16">
                  {/* Timeline Dot */}
                  <div className="absolute -left-16 top-8 hidden sm:flex items-center justify-center">
                    <div className="w-12 h-12 rounded-full bg-foreground/10 flex items-center justify-center group-hover:bg-foreground/20 transition-all">
                      <Briefcase className="h-6 w-6" />
                    </div>
                  </div>

                  <CardHeader>
                    <div className="flex flex-col sm:flex-row sm:items-start gap-4">
                      <div className="sm:hidden p-3 bg-foreground/10 rounded-lg w-fit">
                        <Briefcase className="h-6 w-6" />
                      </div>
                      <div className="flex-1">
                        <CardTitle className="text-2xl mb-1 group-hover:text-foreground transition-colors">
                          {exp.position}
                        </CardTitle>
                        <CardDescription className="text-base font-medium text-foreground">
                          {exp.company}
                        </CardDescription>
                        <div className="flex items-center gap-2 mt-2 text-sm text-muted-foreground">
                          <Calendar className="h-4 w-4" />
                          <span>{exp.period}</span>
                        </div>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <p className="text-muted-foreground">{exp.description}</p>

                    <div>
                      <h4 className="font-semibold mb-2">Key Achievements:</h4>
                      <ul className="list-disc list-inside space-y-1 text-muted-foreground">
                        {exp.achievements.map((achievement, i) => (
                          <li key={i}>{achievement}</li>
                        ))}
                      </ul>
                    </div>

                    <div>
                      <h4 className="font-semibold mb-2">Technologies:</h4>
                      <div className="flex flex-wrap gap-2">
                        {exp.technologies.map((tech) => (
                          <Badge key={tech} variant="secondary">
                            {tech}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
