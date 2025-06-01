import { SignOutButton } from "@/components/shared/SignOutButton"
import { createClient } from "@/lib/supabase/server"
import Link from "next/link"
import { redirect } from "next/navigation"

export default async function DashboardPage() {
  const supabase = await createClient()
  const { data, error } = await supabase.auth.getUser()
  if (error || !data?.user) {
    redirect("/login")
  }
  return (
    <div>
      <p>Hello {data.user.email}</p>
      <SignOutButton />
      <Link href="/dashboard/create">create new object</Link>
    </div>
  )
}
