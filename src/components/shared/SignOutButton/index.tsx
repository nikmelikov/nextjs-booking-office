"use client"

import { useLogout } from "@/lib/queries/auth/useLogout"
import { Button } from "@mantine/core"
import { useRouter } from "next/navigation"

export function SignOutButton() {
  const { mutateAsync: logout, isPending } = useLogout()
  const router = useRouter()

  const handleSignOut = async () => {
    await logout()
    router.push("/login")
  }

  return (
    <Button variant="outline" onClick={handleSignOut} loading={isPending}>
      Sign Out
    </Button>
  )
}
