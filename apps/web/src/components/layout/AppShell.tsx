"use client"

import * as React from "react"
import {
    SidebarInset,
    SidebarProvider,
    SidebarTrigger,
} from "@/components/ui/sidebar"
import { Separator } from "@/components/ui/separator"
import { AppSidebar } from "./AppSidebar"

interface AppShellProps {
    children: React.ReactNode
    user?: {
        name: string
        email?: string
        avatarUrl?: string
    }
}

export function AppShell({ children, user }: AppShellProps) {
    return (
        <SidebarProvider>
            <AppSidebar user={user} />
            <SidebarInset>
                <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12 border-b border-sidebar-border bg-sidebar px-4 md:px-6">
                    <div className="flex items-center gap-2">
                        <SidebarTrigger className="-ml-1" />
                        <Separator orientation="vertical" className="mr-2 h-4" />
                        <div className="text-sm font-medium text-sidebar-foreground/70">
                            Workspace
                        </div>
                    </div>
                </header>
                <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
                    <div className="flex-1 rounded-xl bg-background/50 md:min-h-min p-4 md:p-6 lg:p-8">
                        {children}
                    </div>
                </div>
            </SidebarInset>
        </SidebarProvider>
    )
}
