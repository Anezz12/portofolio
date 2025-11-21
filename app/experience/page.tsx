"use client";

import dynamic from "next/dynamic";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Briefcase, Calendar } from "lucide-react";

const FloatingShapes = dynamic(() => import("@/components/FloatingShapes"), {
  ssr: false,
});

const experiences = [
  {
    id: 1,
    company: "Aksa Digital Group",
    position: "Web Developer",
    period: "Sep 2025 - Present",
    description:
      "Building scalable web applications using Laravel and Vue.js with focus on clean architecture and best practices.",
    achievements: [
      "Developed full-stack web applications using Laravel and Vue.js",
      "Designed and integrated RESTful APIs for frontend-backend communication",
      "Implemented manual and automated testing workflows for application stability",
      "Used Postman for API testing and documentation",
      "Managed version control with Git and GitLab including CI/CD integration",
    ],
    technologies: ["Laravel", "Vue.js", "REST API", "Git", "GitLab", "Postman"],
  },
  {
    id: 2,
    company: "Forum Asisten - Amikom Yogyakarta",
    position: "Practice Assistant",
    period: "Mar 2025 - Aug 2025",
    description:
      "Teaching assistant for Web Programming and Data Structure courses.",
    achievements: [
      "Web Programming Assistant: Teaching HTML5, CSS, JavaScript, and PHP",
      "Data Structure Assistant: Teaching C and C++ programming concepts",
      "Developed public speaking and mentoring skills",
    ],
    technologies: ["HTML5", "CSS", "JavaScript", "PHP", "C", "C++"],
  },
  {
    id: 3,
    company: "Dicoding Indonesia",
    position: "Frontend and Backend Cohort",
    period: "Sep 2024 - Dec 2024",
    description:
      "Internship program focused on full-stack web development through Kampus Merdeka MSIB Batch 7.",
    achievements: [
      "Developed web apps including portfolio, Notes App, Bookshelf App, and E-Commerce Catalog",
      "Mastered PWA, clean code practices, and web performance optimization",
      "Implemented responsive layouts using Flexbox, CSS Grid, and media queries",
      "Contributed to Capstone project (GoMealSaver) using Next.js 14 - selected as one of the best capstones",
    ],
    technologies: [
      "Next.js",
      "Node.js",
      "JavaScript",
      "HTML",
      "CSS",
      "REST API",
    ],
  },
  {
    id: 4,
    company: "Kampus Merdeka",
    position: "Tribe MSIB Batch VII",
    period: "Oct 2024 - Jan 2025",
    description:
      "Student representative for Studi Independen program from PT Presentologics (Dicoding).",
    achievements: [
      "Served as liaison between MSIB program and students (mentees) at partner company",
      "Facilitated communication and coordination between stakeholders",
    ],
    technologies: ["Leadership", "Communication", "Coordination"],
  },
];

export default function Experience() {
  return (
    <div className="relative">
      {/* 3D Background */}
      <FloatingShapes />
      <div className="absolute inset-0 grid-background opacity-30" />

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
