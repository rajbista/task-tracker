"use client";
import { Button, TextArea, TextField } from "@radix-ui/themes";
import React from "react";
import SimpleMDE from "react-simplemde-editor";
import "easymde/dist/easymde.min.css";

function NewTaskPage() {
  return (
    <div className="max-w-xl space-y-3">
      <TextField.Root placeholder="Tasks">
        <TextField.Slot></TextField.Slot>
      </TextField.Root>
      <SimpleMDE placeholder="Description"></SimpleMDE>
      <Button>Submit New Task</Button>
    </div>
  );
}

export default NewTaskPage;
