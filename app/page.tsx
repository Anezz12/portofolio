"use client";
import Link from "next/link";
import dynamic from "next/dynamic";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Mail, ArrowRight, Briefcase, Calendar } from "lucide-react";

const FloatingShapes = dynamic(() => import("@/components/FloatingShapes"), {
  ssr: false,
});
import {
  FaGithub,
  FaLinkedin,
  FaXTwitter,
  FaReact,
  FaNodeJs,
  FaDocker,
  FaLaravel,
  FaVuejs,
} from "react-icons/fa6";
import {
  SiTypescript,
  SiNextdotjs,
  SiTailwindcss,
  SiPostgresql,
} from "react-icons/si";
import Image from "next/image";

const skills = [
  { name: "TypeScript", icon: SiTypescript, color: "text-blue-500" },
  { name: "React", icon: FaReact, color: "text-cyan-500" },
  { name: "Next.js", icon: SiNextdotjs, color: "text-foreground" },
  { name: "Node.js", icon: FaNodeJs, color: "text-green-500" },
  { name: "Tailwind CSS", icon: SiTailwindcss, color: "text-sky-500" },
  { name: "PostgreSQL", icon: SiPostgresql, color: "text-blue-600" },
  { name: "Docker", icon: FaDocker, color: "text-blue-400" },
  { name: "Laravel", icon: FaLaravel, color: "text-red-400" },
  { name: "Vue.js", icon: FaVuejs, color: "text-green-400" },
];

const experiences = [
  {
    company: "Aksa Digital Group",
    position: "Web Developer",
    period: "Sep 2025 - Present",
    type: "Internship",
  },
  {
    company: "Forum Asisten - Amikom",
    position: "Practice Assistant",
    period: "Mar 2025 - Aug 2025",
    type: "Contract",
  },
  {
    company: "Dicoding Indonesia",
    position: "Frontend & Backend Cohort",
    period: "Sep 2024 - Dec 2024",
    type: "Internship",
  },
];

const stats = [
  { label: "Projects Completed", value: "10+" },
  { label: "Technologies", value: "15+" },
  { label: "Months Experience", value: "12+" },
];

export default function Home() {
  return (
    <div className="relative">
      {/* 3D Background */}
      <FloatingShapes />
      <div className="absolute inset-0 grid-background opacity-30" />

      {/* Hero Section */}
      <section className="relative container mx-auto px-4 py-20 md:py-32">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col lg:flex-row items-center gap-12">
            {/* Avatar with Minimalist Border */}
            <div className="relative group">
              <div className="absolute -inset-1 bg-foreground/20 rounded-full blur opacity-50 group-hover:opacity-75 transition duration-1000"></div>
              <Avatar className="relative h-40 w-40 md:h-56 md:w-56 border-4 border-border">
                <AvatarImage src="/profile.jpg" alt="Your Name" />
                <AvatarFallback className="text-6xl bg-foreground text-background">
                  <Image
                    src="/sena.jpg"
                    alt="Your Name"
                    width={224}
                    height={224}
                    className="object-cover"
                  />
                </AvatarFallback>
              </Avatar>
            </div>

            {/* Hero Content */}
            <div className="flex-1 text-center lg:text-left space-y-6">
              <div className="space-y-4">
                <Badge className="bg-foreground text-background border-0 px-4 py-1">
                  Available for work
                </Badge>
                <h1 className="text-5xl md:text-7xl font-bold tracking-tight">
                  <span className="gradient-text">Harsena Argretya</span>
                </h1>
                <p className="text-2xl md:text-3xl text-muted-foreground font-medium">
                  Full Stack Developer
                </p>
              </div>

              <p className="text-lg text-muted-foreground leading-relaxed max-w-2xl">
                Passionate about building exceptional digital experiences.
                Specialized in creating scalable web applications with modern
                technologies and elegant design.
              </p>

              {/* Social Links */}
              <div className="flex gap-3 justify-center lg:justify-start pt-4">
                <Button
                  variant="outline"
                  size="icon"
                  className="shine-effect hover:border-foreground transition-all"
                  asChild>
                  <Link
                    href="https://github.com/Anezz12"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="GitHub">
                    <FaGithub className="h-5 w-5" />
                  </Link>
                </Button>
                <Button
                  variant="outline"
                  size="icon"
                  className="shine-effect hover:border-foreground transition-all"
                  asChild>
                  <Link
                    href="https://www.linkedin.com/in/harsenaargretya/"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="LinkedIn">
                    <FaLinkedin className="h-5 w-5" />
                  </Link>
                </Button>
                <Button
                  variant="outline"
                  size="icon"
                  className="shine-effect hover:border-foreground transition-all"
                  asChild>
                  <a
                    href="https://twitter.com/yourusername"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Twitter">
                    <FaXTwitter className="h-5 w-5" />
                  </a>
                </Button>
                <Button
                  variant="outline"
                  size="icon"
                  className="shine-effect hover:border-foreground transition-all"
                  asChild>
                  <Link
                    href="mailto:harsenaargrtya1@gmail.com"
                    aria-label="Email">
                    <Mail className="h-5 w-5" />
                  </Link>
                </Button>
              </div>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 pt-4 justify-center lg:justify-start">
                <Button
                  size="lg"
                  className="bg-foreground text-background hover:shadow-lg hover:shadow-foreground/20 transition-all"
                  asChild>
                  <Link href="/projects">
                    View Projects
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="shine-effect"
                  asChild>
                  <Link href="/contact">Contact Me</Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Skills Section - Marquee */}
      <section className="relative py-16 overflow-hidden">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            <span className="gradient-text">Tech Stack</span>
          </h2>
          <p className="text-muted-foreground text-lg">
            Technologies I work with
          </p>
        </div>

        <div className="marquee-container relative flex overflow-x-hidden">
          <div className="flex animate-marquee gap-8 py-4">
            {[...skills, ...skills].map((skill, index) => {
              const Icon = skill.icon;
              return (
                <div
                  key={`${skill.name}-${index}`}
                  className="group shrink-0 flex flex-col items-center gap-3 px-8 py-6 rounded-lg border border-border/50 bg-background/50 backdrop-blur-sm hover:border-foreground/30 transition-all duration-300">
                  <Icon
                    className={`h-12 w-12 ${skill.color} group-hover:scale-110 transition-transform duration-300`}
                  />
                  <p className="font-medium whitespace-nowrap">{skill.name}</p>
                </div>
              );
            })}
          </div>
          <div
            className="flex absolute top-0 animate-marquee gap-8 py-4"
            aria-hidden="true">
            {[...skills, ...skills].map((skill, index) => {
              const Icon = skill.icon;
              return (
                <div
                  key={`${skill.name}-duplicate-${index}`}
                  className="group shrink-0 flex flex-col items-center gap-3 px-8 py-6 rounded-lg border border-border/50 bg-background/50 backdrop-blur-sm hover:border-foreground/30 transition-all duration-300">
                  <Icon
                    className={`h-12 w-12 ${skill.color} group-hover:scale-110 transition-transform duration-300`}
                  />
                  <p className="font-medium whitespace-nowrap">{skill.name}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="relative container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6">
            {stats.map((stat) => (
              <div
                key={stat.label}
                className="text-center p-4 sm:p-6 rounded-lg border border-border/50 bg-background/50 backdrop-blur-sm">
                <p className="text-3xl sm:text-4xl md:text-5xl font-bold gradient-text mb-2">
                  {stat.value}
                </p>
                <p className="text-muted-foreground text-sm md:text-base">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Experience Section */}
      <section className="relative container mx-auto px-4 py-16 pb-32">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              <span className="gradient-text">Experience</span>
            </h2>
            <p className="text-muted-foreground text-lg">
              My professional journey
            </p>
          </div>

          <div className="space-y-4">
            {experiences.map((exp) => (
              <Card
                key={exp.company}
                className="group hover:shadow-xl transition-all duration-300 border-border/50 hover:border-foreground/30 shine-effect">
                <CardHeader className="pb-4">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                    <div className="flex items-center gap-3">
                      <div className="p-2 rounded-lg bg-foreground/10 group-hover:bg-foreground/20 transition-all">
                        <Briefcase className="h-5 w-5" />
                      </div>
                      <div>
                        <CardTitle className="text-lg">
                          {exp.position}
                        </CardTitle>
                        <CardDescription>{exp.company}</CardDescription>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Calendar className="h-4 w-4" />
                      <span>{exp.period}</span>
                      <Badge variant="secondary" className="ml-2">
                        {exp.type}
                      </Badge>
                    </div>
                  </div>
                </CardHeader>
              </Card>
            ))}
          </div>

          <div className="text-center mt-8">
            <Button
              size="lg"
              variant="outline"
              className="shine-effect"
              asChild>
              <Link href="/experience">
                View Full Experience
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
