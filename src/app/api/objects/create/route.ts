import { createClient } from "@/lib/supabase/server"

import { NextApiResponse } from "next"
import { NextResponse } from "next/server"

export async function POST(req: Request, res: NextApiResponse) {
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) return res.status(401).json({ error: "Unauthorized" })

  const { name, address, capacity } = await req.json()
  const { error } = await supabase.from("objects").insert([
    {
      name,
      address,
      capacity,
      owner_user_id: user.id,
    },
  ])

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  return NextResponse.json({ message: "ok" })
}
