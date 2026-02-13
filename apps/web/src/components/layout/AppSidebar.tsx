"use client"

import * as React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import {
    LayoutDashboard,
    PenTool,
    Image as ImageIcon,
    CalendarDays,
    Users,
    GalleryHorizontalEnd,
    Library,
    Settings,
    ChevronRight,
    Menu,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuItem,
    SidebarMenuButton,
    SidebarRail,
    SidebarTrigger,
    SidebarProvider,
    SidebarGroup,
    SidebarGroupLabel,
    SidebarGroupContent,
} from "@/components/ui/sidebar"
import { UserMenu } from "./UserMenu"

// Navigation items based on Product Roadmap
const navItems = [
    {
        title: "Create",
        items: [
            {
                title: "Content Creator",
                url: "/creator",
                icon: PenTool,
            },
            {
                title: "Carousel Builder",
                url: "/carousel",
                icon: GalleryHorizontalEnd,
            },
            {
                title: "Image Generator",
                url: "/images",
                icon: ImageIcon,
            },
        ],
    },
    {
        title: "Organize",
        items: [
            {
                title: "Content Calendar",
                url: "/calendar",
                icon: CalendarDays,
            },
            {
                title: "Canvas",
                url: "/canvas",
                icon: LayoutDashboard,
            },
            {
                title: "Content Sources",
                url: "/sources",
                icon: Library,
            },
        ],
    },
    {
        title: "Strategy",
        items: [
            {
                title: "Brand & Avatar",
                url: "/brand",
                icon: Users,
            },
            {
                title: "Settings",
                url: "/settings",
                icon: Settings,
            },
        ],
    },
]

interface AppSidebarProps {
    user?: {
        name: string
        email?: string
        avatarUrl?: string
    }
}

export function AppSidebar({ user }: AppSidebarProps) {
    const pathname = usePathname()

    return (
        <Sidebar collapsible="icon">
            <SidebarHeader>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton size="lg" asChild>
                            <Link href="/">
                                <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
                                    <GalleryHorizontalEnd className="size-4" />
                                </div>
                                <div className="grid flex-1 text-left text-sm leading-tight">
                                    <span className="truncate font-semibold">Linkreator</span>
                                    <span className="truncate text-xs">Content OS</span>
                                </div>
                            </Link>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarHeader>
            <SidebarContent>
                {navItems.map((group) => (
                    <SidebarGroup key={group.title}>
                        <SidebarGroupLabel>{group.title}</SidebarGroupLabel>
                        <SidebarGroupContent>
                            <SidebarMenu>
                                {group.items.map((item) => (
                                    <SidebarMenuItem key={item.title}>
                                        <SidebarMenuButton asChild isActive={pathname === item.url} tooltip={item.title}>
                                            <Link href={item.url}>
                                                <item.icon />
                                                <span>{item.title}</span>
                                            </Link>
                                        </SidebarMenuButton>
                                    </SidebarMenuItem>
                                ))}
                            </SidebarMenu>
                        </SidebarGroupContent>
                    </SidebarGroup>
                ))}
            </SidebarContent>
            <SidebarFooter>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <UserMenu user={user} />
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarFooter>
            <SidebarRail />
        </Sidebar>
    )
}
