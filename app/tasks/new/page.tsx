"use client";
import { Button, TextArea, TextField } from "@radix-ui/themes";
import React from "react";

function NewTaskPage() {
  return (
    <div className="max-w-xl space-y-3">
      <TextField.Root placeholder="Tasks">
        <TextField.Slot></TextField.Slot>
      </TextField.Root>
      <TextArea placeholder="Description"></TextArea>
      <Button>Submit New Task</Button>
    </div>
  );
}

export default NewTaskPage;
