"use client"

import { Button, Paper, PasswordInput, TextInput, Title } from "@mantine/core"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { useForm } from "react-hook-form"

type FormData = {
  email: string
  password: string
}

export default function LoginForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>()
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  const onSubmit = async (data: FormData) => {
    setLoading(true)
    const res = await fetch("/api/auth/login", {
      method: "POST",
      body: JSON.stringify(data),
      headers: { "Content-Type": "application/json" },
    })

    if (res.ok) {
      router.push("/dashboard")
    } else {
      const { error } = await res.json()
      alert(error)
    }

    setLoading(false)
  }

  return (
    <Paper maw={400} mx="auto" mt="lg" withBorder p="xl" radius="md">
      <Title order={3} mb="md">
        Login
      </Title>
      <form onSubmit={handleSubmit(onSubmit)}>
        <TextInput
          label="Email"
          {...register("email", {
            required: "Email is required",
            pattern: {
              value: /^\S+@\S+$/,
              message: "Invalid email",
            },
          })}
          error={errors.email?.message}
          required
          mb="sm"
        />

        <PasswordInput
          label="Password"
          {...register("password", {
            required: "Password required",
            minLength: {
              value: 6,
              message: "Minimum 6 characters",
            },
          })}
          error={errors.password?.message}
          required
          mb="md"
        />

        <Button fullWidth type="submit" loading={loading}>
          Login
        </Button>
      </form>
    </Paper>
  )
}
