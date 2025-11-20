import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Mail, ArrowRight, Code2, Palette, Database, Zap, ExternalLink } from "lucide-react";
import { FaGithub, FaLinkedin, FaXTwitter, FaReact, FaNodeJs, FaDocker } from "react-icons/fa6";
import { SiTypescript, SiNextdotjs, SiTailwindcss, SiPostgresql } from "react-icons/si";

const skills = [
  { name: "TypeScript", icon: SiTypescript, color: "text-blue-500" },
  { name: "React", icon: FaReact, color: "text-cyan-500" },
  { name: "Next.js", icon: SiNextdotjs, color: "text-foreground" },
  { name: "Node.js", icon: FaNodeJs, color: "text-green-500" },
  { name: "Tailwind CSS", icon: SiTailwindcss, color: "text-sky-500" },
  { name: "PostgreSQL", icon: SiPostgresql, color: "text-blue-600" },
  { name: "Docker", icon: FaDocker, color: "text-blue-400" },
];

const features = [
  {
    icon: Code2,
    title: "Clean Code",
    description: "Writing maintainable and scalable code following best practices",
  },
  {
    icon: Palette,
    title: "Modern Design",
    description: "Creating beautiful and intuitive user interfaces",
  },
  {
    icon: Database,
    title: "Full Stack",
    description: "End-to-end development from frontend to backend",
  },
  {
    icon: Zap,
    title: "Performance",
    description: "Optimized applications for the best user experience",
  },
];

const featuredProjects = [
  {
    title: "E-Commerce Platform",
    description: "Full-stack platform with real-time inventory and payment integration",
    tech: ["Next.js", "TypeScript", "PostgreSQL"],
    link: "/projects",
  },
  {
    title: "AI Dashboard",
    description: "Analytics dashboard with machine learning insights",
    tech: ["React", "Python", "TensorFlow"],
    link: "/projects",
  },
];

export default function Home() {
  return (
    <div className="relative">
      {/* Grid Background */}
      <div className="absolute inset-0 grid-background opacity-50" />

      {/* Hero Section */}
      <section className="relative container mx-auto px-4 py-20 md:py-32">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col lg:flex-row items-center gap-12">
            {/* Avatar with Minimalist Border */}
            <div className="relative group">
              <div className="absolute -inset-1 bg-foreground/20 rounded-full blur opacity-50 group-hover:opacity-75 transition duration-1000"></div>
              <Avatar className="relative h-40 w-40 md:h-56 md:w-56 border-4 border-border">
                <AvatarImage src="/profile.jpg" alt="Your Name" />
                <AvatarFallback className="text-6xl bg-foreground text-background">YN</AvatarFallback>
              </Avatar>
            </div>

            {/* Hero Content */}
            <div className="flex-1 text-center lg:text-left space-y-6">
              <div className="space-y-4">
                <Badge className="bg-foreground text-background border-0 px-4 py-1">
                  Available for work
                </Badge>
                <h1 className="text-5xl md:text-7xl font-bold tracking-tight">
                  <span className="gradient-text">Your Name</span>
                </h1>
                <p className="text-2xl md:text-3xl text-muted-foreground font-medium">
                  Full Stack Developer & UI/UX Enthusiast
                </p>
              </div>

              <p className="text-lg text-muted-foreground leading-relaxed max-w-2xl">
                Passionate about building exceptional digital experiences. Specialized in creating
                scalable web applications with modern technologies and elegant design.
              </p>

              {/* Social Links */}
              <div className="flex gap-3 justify-center lg:justify-start pt-4">
                <Button variant="outline" size="icon" className="shine-effect hover:border-foreground transition-all" asChild>
                  <a href="https://github.com/yourusername" target="_blank" rel="noopener noreferrer" aria-label="GitHub">
                    <FaGithub className="h-5 w-5" />
                  </a>
                </Button>
                <Button variant="outline" size="icon" className="shine-effect hover:border-foreground transition-all" asChild>
                  <a href="https://linkedin.com/in/yourusername" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
                    <FaLinkedin className="h-5 w-5" />
                  </a>
                </Button>
                <Button variant="outline" size="icon" className="shine-effect hover:border-foreground transition-all" asChild>
                  <a href="https://twitter.com/yourusername" target="_blank" rel="noopener noreferrer" aria-label="Twitter">
                    <FaXTwitter className="h-5 w-5" />
                  </a>
                </Button>
                <Button variant="outline" size="icon" className="shine-effect hover:border-foreground transition-all" asChild>
                  <a href="mailto:your.email@example.com" aria-label="Email">
                    <Mail className="h-5 w-5" />
                  </a>
                </Button>
              </div>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 pt-4 justify-center lg:justify-start">
                <Button size="lg" className="bg-foreground text-background hover:shadow-lg hover:shadow-foreground/20 transition-all" asChild>
                  <Link href="/projects">
                    View Projects
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
                <Button size="lg" variant="outline" className="shine-effect" asChild>
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
          <p className="text-muted-foreground text-lg">Technologies I work with</p>
        </div>

        <div className="marquee-container relative flex overflow-x-hidden">
          <div className="flex animate-marquee gap-8 py-4">
            {[...skills, ...skills].map((skill, index) => {
              const Icon = skill.icon;
              return (
                <div
                  key={`${skill.name}-${index}`}
                  className="group shrink-0 flex flex-col items-center gap-3 px-8 py-6 rounded-lg border border-border/50 bg-background/50 backdrop-blur-sm hover:border-foreground/30 transition-all duration-300"
                >
                  <Icon className={`h-12 w-12 ${skill.color} group-hover:scale-110 transition-transform duration-300`} />
                  <p className="font-medium whitespace-nowrap">{skill.name}</p>
                </div>
              );
            })}
          </div>
          <div className="flex absolute top-0 animate-marquee gap-8 py-4" aria-hidden="true">
            {[...skills, ...skills].map((skill, index) => {
              const Icon = skill.icon;
              return (
                <div
                  key={`${skill.name}-duplicate-${index}`}
                  className="group shrink-0 flex flex-col items-center gap-3 px-8 py-6 rounded-lg border border-border/50 bg-background/50 backdrop-blur-sm hover:border-foreground/30 transition-all duration-300"
                >
                  <Icon className={`h-12 w-12 ${skill.color} group-hover:scale-110 transition-transform duration-300`} />
                  <p className="font-medium whitespace-nowrap">{skill.name}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="relative container mx-auto px-4 py-16">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              <span className="gradient-text">What I Do</span>
            </h2>
            <p className="text-muted-foreground text-lg">Building digital solutions with passion</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature) => {
              const Icon = feature.icon;
              return (
                <Card key={feature.title} className="group hover:shadow-xl transition-all duration-300 border-border/50 hover:border-foreground/30 shine-effect">
                  <CardHeader>
                    <div className="p-3 rounded-lg bg-foreground/10 w-fit mb-4 group-hover:bg-foreground/20 transition-all">
                      <Icon className="h-6 w-6" />
                    </div>
                    <CardTitle className="text-xl">{feature.title}</CardTitle>
                    <CardDescription className="text-base">{feature.description}</CardDescription>
                  </CardHeader>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Featured Projects Section */}
      <section className="relative container mx-auto px-4 py-16 pb-32">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              <span className="gradient-text">Featured Projects</span>
            </h2>
            <p className="text-muted-foreground text-lg">Some of my recent work</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            {featuredProjects.map((project) => (
              <Card key={project.title} className="group hover:shadow-xl transition-all duration-300 border-border/50 hover:border-foreground/30 shine-effect">
                <CardHeader>
                  <CardTitle className="text-2xl group-hover:text-foreground transition-colors">
                    {project.title}
                  </CardTitle>
                  <CardDescription className="text-base">{project.description}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex flex-wrap gap-2">
                    {project.tech.map((tech) => (
                      <Badge key={tech} variant="secondary">{tech}</Badge>
                    ))}
                  </div>
                  <Button variant="ghost" className="group-hover:text-foreground" asChild>
                    <Link href={project.link}>
                      View Project <ExternalLink className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="text-center">
            <Button size="lg" variant="outline" className="shine-effect" asChild>
              <Link href="/projects">
                View All Projects
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
