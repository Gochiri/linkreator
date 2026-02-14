'use client'

import { Settings, User, CreditCard, Bell, Moon, Sun } from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from '@/components/ui/card'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { Switch } from '@/components/ui/switch'

export default function SettingsPage() {
    return (
        <div className="max-w-4xl mx-auto p-6 space-y-8">
            {/* Header */}
            <div className="mb-6">
                <h1 className="text-2xl font-bold text-stone-900 dark:text-stone-100 flex items-center gap-2">
                    <Settings className="w-6 h-6" />
                    Settings
                </h1>
                <p className="text-stone-500 dark:text-stone-400 mt-1">
                    Manage your account settings and preferences.
                </p>
            </div>

            <div className="grid gap-6">
                {/* Profile Settings */}
                <Card>
                    <CardHeader>
                        <CardTitle>Profile</CardTitle>
                        <CardDescription>
                            This is how others will see you on the site.
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="space-y-2">
                            <Label htmlFor="name">Display Name</Label>
                            <Input id="name" placeholder="Your name" defaultValue="John Doe" />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="email">Email</Label>
                            <Input id="email" placeholder="Your email" type="email" defaultValue="john@example.com" />
                        </div>
                    </CardContent>
                    <CardFooter className="border-t px-6 py-4">
                        <Button>Save Changes</Button>
                    </CardFooter>
                </Card>

                {/* Notifications */}
                <Card>
                    <CardHeader>
                        <CardTitle>Notifications</CardTitle>
                        <CardDescription>
                            Configure how you receive notifications.
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="flex items-center justify-between space-x-2">
                            <Label htmlFor="marketing-emails" className="flex flex-col space-y-1">
                                <span>Marketing emails</span>
                                <span className="font-normal text-xs text-muted-foreground">Receive emails about new products, features, and more.</span>
                            </Label>
                            <Switch id="marketing-emails" />
                        </div>
                        <div className="flex items-center justify-between space-x-2">
                            <Label htmlFor="security-emails" className="flex flex-col space-y-1">
                                <span>Security emails</span>
                                <span className="font-normal text-xs text-muted-foreground">Receive emails about your account security.</span>
                            </Label>
                            <Switch id="security-emails" defaultChecked />
                        </div>
                    </CardContent>
                </Card>

                {/* Theme */}
                <Card>
                    <CardHeader>
                        <CardTitle>Appearance</CardTitle>
                        <CardDescription>
                            Customize the look and feel of the application.
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="flex items-center justify-between space-x-2">
                            <Label htmlFor="theme-mode" className="flex flex-col space-y-1">
                                <span>Dark Mode</span>
                                <span className="font-normal text-xs text-muted-foreground">Switch between light and dark themes.</span>
                            </Label>
                            <div className="flex items-center gap-2">
                                <Sun className="h-4 w-4 text-muted-foreground" />
                                <Switch id="theme-mode" />
                                <Moon className="h-4 w-4 text-muted-foreground" />
                            </div>
                        </div>
                    </CardContent>
                </Card>

            </div>
        </div>
    )
}
