import prisma from "@/prisma/client";
import { Button, Table } from "@radix-ui/themes";
import Link from "next/link";
import React from "react";

const TasksPage = async () => {
  const tasks = await prisma.task.findMany();
  return (
    <>
      <div className="mb-5">
        <Button>
          <Link href="/tasks/new">New Task</Link>
        </Button>
      </div>
      <Table.Root variant="surface">
        <Table.Header>
          <Table.ColumnHeaderCell>Task</Table.ColumnHeaderCell>
          <Table.ColumnHeaderCell className="hidden md:table-cell">
            Status
          </Table.ColumnHeaderCell>
          <Table.ColumnHeaderCell className="hidden md:table-cell">
            Created
          </Table.ColumnHeaderCell>
        </Table.Header>
        <Table.Body>
          {tasks.map((task) => (
            <Table.Row key={task.id}>
              <Table.Cell>
                {task.title}
                <div className="block md:hidden">{task.status}</div>
              </Table.Cell>
              <Table.Cell className="hidden md:table-cell">
                {task.status}
              </Table.Cell>
              <Table.Cell className="hidden md:table-cell">
                {task.description}
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table.Root>
    </>
  );
};

export default TasksPage;
