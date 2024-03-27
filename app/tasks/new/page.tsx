"use client";
import { Button, TextField } from "@radix-ui/themes";
import React from "react";
import SimpleMDE from "react-simplemde-editor";
import "easymde/dist/easymde.min.css";
import { useForm, Controller } from "react-hook-form";
import axios from "axios";
import { useRouter } from "next/navigation";
interface Task {
  title: string;
  description: string;
}
function NewTaskPage() {
  const { register, control, handleSubmit } = useForm<Task>();
  const router = useRouter();
  return (
    <form
      className="max-w-xl space-y-3"
      onSubmit={handleSubmit(async (data) => {
        await axios.post("/api/tasks", data);
        router.push("/tasks");
      })}
    >
      <TextField.Root placeholder="Tasks" {...register("title")}>
        <TextField.Slot></TextField.Slot>
      </TextField.Root>
      <Controller
        name="description"
        control={control}
        render={({ field }) => (
          <SimpleMDE placeholder="Description" {...field} />
        )}
      />

      <Button>Submit New Task</Button>
    </form>
  );
}

export default NewTaskPage;
