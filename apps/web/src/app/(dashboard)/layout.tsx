import { AppShell } from "@/components/layout/AppShell";
import { createClient } from "@/lib/supabase/server";

export default async function DashboardLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    const userData = user ? {
        name: user.email?.split('@')[0] || "User",
        email: user.email,
    } : undefined;

    return (
        <AppShell user={userData}>
            {children}
        </AppShell>
    );
}
