import { login, signup } from './actions'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { AlertCircle, CheckCircle } from 'lucide-react'

export default async function LoginPage({
    searchParams,
}: {
    searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}) {
    const { message, error } = (await searchParams) as { message?: string; error?: string }

    return (
        <div className="flex min-h-screen items-center justify-center bg-gray-50 dark:bg-gray-950 p-4">
            <Card className="w-full max-w-sm">
                <CardHeader className="text-center">
                    <CardTitle className="text-2xl">Welcome back</CardTitle>
                    <CardDescription>
                        Enter your email below to login to your account
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <form className="flex flex-col gap-4">
                        <div className="grid gap-2">
                            <label htmlFor="email" className="text-sm font-medium">Email</label>
                            <Input id="email" name="email" type="email" placeholder="m@example.com" required />
                        </div>
                        <div className="grid gap-2">
                            <label htmlFor="password" className="text-sm font-medium">Password</label>
                            <Input id="password" name="password" type="password" required />
                        </div>

                        {message && (
                            <div className="p-3 text-sm bg-green-50 text-green-600 rounded-md flex items-center gap-2 border border-green-200">
                                <CheckCircle className="w-4 h-4 shrink-0" />
                                <span>{message}</span>
                            </div>
                        )}

                        {error && (
                            <div className="p-3 text-sm bg-red-50 text-red-600 rounded-md flex items-center gap-2 border border-red-200">
                                <AlertCircle className="w-4 h-4 shrink-0" />
                                <span>{error}</span>
                            </div>
                        )}

                        <div className="flex flex-col gap-2 mt-2">
                            <Button formAction={login}>Log in</Button>
                            <Button variant="outline" formAction={signup}>Sign up</Button>
                        </div>
                    </form>
                </CardContent>
            </Card>
        </div>
    )
}

