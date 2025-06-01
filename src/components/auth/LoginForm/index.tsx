"use client"

import { LoginInput, useLogin } from "@/lib/queries/auth/useLogin"
import { Button, Paper, PasswordInput, TextInput, Title } from "@mantine/core"
import { useRouter } from "next/navigation"
import { useForm } from "react-hook-form"

export default function LoginForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginInput>()
  const router = useRouter()
  const { mutateAsync, isPending } = useLogin()

  const onSubmit = async (data: LoginInput) => {
    try {
      await mutateAsync(data)
      router.push("/dashboard")
    } catch (error) {
      console.error(error)
    }
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

        <Button fullWidth type="submit" loading={isPending}>
          Login
        </Button>
      </form>
    </Paper>
  )
}
