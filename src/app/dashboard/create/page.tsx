import { CreateObjectForm } from "@/components/objects/CreateObjectForm"
import Link from "next/link"

export default async function CreateObject() {
  return (
    <div>
      <CreateObjectForm />
      <Link href="/dashboard">back</Link>
    </div>
  )
}
