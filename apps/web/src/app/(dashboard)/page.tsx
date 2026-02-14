import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowRight, PenTool, LayoutDashboard, Image as ImageIcon, CalendarDays, Library, Users, Palette, Settings } from "lucide-react";
import Link from "next/link";

export default function Home() {
  const creativeTools = [
    {
      title: "Content Creator",
      description: "Generate engaging LinkedIn posts with AI.",
      icon: PenTool,
      href: "/creator",
      cta: "Create Post",
      variant: "default" as const,
    },
    {
      title: "Carousel Builder",
      description: "Design visual carousels with drag-and-drop.",
      icon: LayoutDashboard,
      href: "/carousel",
      cta: "New Carousel",
      variant: "secondary" as const,
    },
    {
      title: "Image Generator",
      description: "Create stunning visuals using AI prompts.",
      icon: ImageIcon,
      href: "/images",
      cta: "Generate Image",
      variant: "outline" as const,
    }
  ];

  const strategyTools = [
    {
      title: "Content Calendar",
      description: "Schedule and organize your posts.",
      icon: CalendarDays,
      href: "/calendar",
      cta: "Go to Calendar",
      variant: "ghost" as const,
    },
    {
      title: "Canvas",
      description: "Organize your notes and ideas visually.",
      icon: LayoutDashboard, // Or StickyNote logic
      href: "/canvas",
      cta: "Go to Canvas",
      variant: "ghost" as const,
    },
    {
      title: "Content Sources",
      description: "Manage your inspiration sources.",
      icon: Library,
      href: "/sources",
      cta: "Manage Sources",
      variant: "ghost" as const,
    },
    {
      title: "Brand & Avatar",
      description: "Define your voice and audience.",
      icon: Users,
      href: "/brand",
      cta: "Configure Brand",
      variant: "ghost" as const,
    }
  ];

  return (
    <div className="flex flex-col gap-8">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold tracking-tight">Welcome to Linkreator</h1>
        <p className="text-muted-foreground">
          Your Advanced LinkedIn Content Operating System. Build, Plan, and Grow.
        </p>
      </div>

      <div>
        <h2 className="text-lg font-semibold mb-4">Creative Tools</h2>
        <div className="grid gap-4 md:grid-cols-3">
          {creativeTools.map((action) => (
            <Card key={action.title} className="flex flex-col">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  {action.title}
                </CardTitle>
                <action.icon className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-xs text-muted-foreground mt-2">
                  {action.description}
                </div>
              </CardContent>
              <CardFooter className="mt-auto pt-4">
                <Button asChild size="sm" variant={action.variant} className="w-full">
                  <Link href={action.href}>
                    {action.cta}
                    {action.variant === 'default' && <ArrowRight className="ml-2 h-4 w-4" />}
                  </Link>
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>

      <div>
        <h2 className="text-lg font-semibold mb-4">Strategy & Organization</h2>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {strategyTools.map((action) => (
            <Card key={action.title} className="flex flex-col">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  {action.title}
                </CardTitle>
                <action.icon className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-xs text-muted-foreground mt-2">
                  {action.description}
                </div>
              </CardContent>
              <CardFooter className="mt-auto pt-4">
                <Button asChild size="sm" variant={action.variant} className="w-full">
                  <Link href={action.href}>
                    {action.cta}
                  </Link>
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <Card className="col-span-4">
          <CardHeader>
            <CardTitle>Recent Content</CardTitle>
            <CardDescription>
              Your latest drafts and published posts.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col gap-4 text-center py-8">
              <p className="text-sm text-muted-foreground">No recent content found.</p>
              <Button variant="outline" className="w-fit mx-auto">
                Start Creating
              </Button>
            </div>
          </CardContent>
        </Card>
        <Card className="col-span-3">
          <CardHeader>
            <CardTitle>Calendar Overview</CardTitle>
            <CardDescription>
              Upcoming scheduled posts.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col gap-4 text-center py-8">
              <p className="text-sm text-muted-foreground">Nothing scheduled yet.</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
