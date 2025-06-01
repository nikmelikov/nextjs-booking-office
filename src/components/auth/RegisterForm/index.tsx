"use client"

import { RegisterInput, useRegister } from "@/lib/queries/auth/useRegister"
import { Button, Paper, PasswordInput, TextInput, Title } from "@mantine/core"
import { useRouter } from "next/navigation"
import { useForm } from "react-hook-form"

export default function RegisterForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterInput>()
  const router = useRouter()
  const { mutateAsync, isPending } = useRegister()

  const onSubmit = async (data: RegisterInput) => {
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
        Register
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
          Register
        </Button>
      </form>
    </Paper>
  )
}
