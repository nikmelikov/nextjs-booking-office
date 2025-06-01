"use client"

import { useCreateObject } from "@/lib/queries/objects/useCreateObject"
import { Button, NumberInput, Paper, TextInput, Title } from "@mantine/core"
import { useRouter } from "next/navigation"
import { Controller, useForm } from "react-hook-form"

type ObjectForm = {
  name: string
  address: string
  capacity: number
}

export function CreateObjectForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
  } = useForm<ObjectForm>()
  const { mutateAsync: createObject, isPending } = useCreateObject()
  const router = useRouter()

  const onSubmit = async (data: ObjectForm) => {
    console.log("data: ", data)
    try {
      await createObject(data)
      router.push("/dashboard")
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <Paper maw={500} mx="auto" p="xl" withBorder radius="md" mt="xl">
      <Title order={3} mb="md">
        Create Object
      </Title>
      <form onSubmit={handleSubmit(onSubmit)}>
        <TextInput
          label="Name"
          {...register("name", { required: "Name is required" })}
          error={errors.name?.message}
          mb="sm"
        />
        <TextInput
          label="Address"
          {...register("address", { required: "Address is required" })}
          error={errors.address?.message}
          mb="sm"
        />
        <Controller
          name="capacity"
          control={control}
          rules={{ required: "Capacity is required" }}
          render={({ field }) => (
            <NumberInput
              label="Capacity"
              min={1}
              {...field}
              value={field.value || ""}
              onChange={(value) => field.onChange(Number(value))}
              error={errors.capacity?.message}
              mb="md"
            />
          )}
        />
        <Button fullWidth type="submit" loading={isPending}>
          Create
        </Button>
      </form>
    </Paper>
  )
}
