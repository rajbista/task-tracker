"use client";
import { Button, Callout, Text, TextField } from "@radix-ui/themes";
import React, { useState } from "react";
import SimpleMDE from "react-simplemde-editor";
import "easymde/dist/easymde.min.css";
import { useForm, Controller } from "react-hook-form";
import axios from "axios";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { crateTasksSchema } from "@/app/validationSchemas";
import { z } from "zod";

type TaskForm = z.infer<typeof crateTasksSchema>;

function NewTaskPage() {
  const [error, setError] = useState("");
  const {
    register,
    control,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<TaskForm>({
    resolver: zodResolver(crateTasksSchema),
  });
  const router = useRouter();

  return (
    <div className="max-w-xl">
      {error && (
        <Callout.Root color="red" className="mb-5">
          <Callout.Text>{error}</Callout.Text>
        </Callout.Root>
      )}
      <form
        className="space-y-3"
        onSubmit={handleSubmit(async (data) => {
          try {
            await axios.post("/api/tasks", data);
            router.push("/tasks");
          } catch (error) {
            setError("An unexpected error occured");
          }
        })}
      >
        <TextField.Root placeholder="Tasks" {...register("title")}>
          <TextField.Slot></TextField.Slot>
        </TextField.Root>
        {errors?.title && <Text color="red">{errors.title.message}</Text>}
        <Controller
          name="description"
          control={control}
          render={({ field }) => (
            <SimpleMDE placeholder="Description" {...field} />
          )}
        />
        {errors?.description && (
          <Text color="red" as="p">
            {errors.description.message}
          </Text>
        )}

        <Button disabled={!isValid}>Submit New Task</Button>
      </form>
    </div>
  );
}

export default NewTaskPage;
