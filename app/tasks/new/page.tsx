"use client";
import { Button, Callout, Spinner, Text, TextField } from "@radix-ui/themes";
import React, { useState } from "react";
import SimpleMDE from "react-simplemde-editor";
import "easymde/dist/easymde.min.css";
import { useForm, Controller } from "react-hook-form";
import axios from "axios";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { crateTasksSchema } from "@/app/validationSchemas";
import { z } from "zod";
import ErrorMessage from "@/app/components/ErrorMessage";

type TaskForm = z.infer<typeof crateTasksSchema>;

function NewTaskPage() {
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

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
            setIsLoading(true);
            await axios.post("/api/tasks", data);
            router.push("/tasks");
            setIsLoading(false);
          } catch (error) {
            setIsLoading(false);
            setError("An unexpected error occured");
          }
        })}
      >
        <TextField.Root placeholder="Tasks" {...register("title")}>
          <TextField.Slot></TextField.Slot>
        </TextField.Root>
        <ErrorMessage>{errors.title?.message}</ErrorMessage>
        <Controller
          name="description"
          control={control}
          render={({ field }) => (
            <SimpleMDE placeholder="Description" {...field} />
          )}
        />
        <ErrorMessage>{errors.description?.message}</ErrorMessage>

        <Button disabled={isLoading}>
          Submit New Task {isLoading && <Spinner />}
        </Button>
      </form>
    </div>
  );
}

export default NewTaskPage;
