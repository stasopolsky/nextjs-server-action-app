"use client";

import { updateTodoAction } from "@/app/_action";
import { Todo } from "@prisma/client";
import { useState, useTransition } from "react";

type EditInputProps = {
  todo: Todo;
};

export default function EditInput({ todo }: EditInputProps) {
  const [isPending, startTransition] = useTransition();
  const [title, setTitle] = useState(todo.title);
  console.log("DD");
  return (
    <input
      type="text"
      value={title}
      name="completed"
      onChange={(e) => {
        setTitle(e.target.value);
        startTransition(() =>
          updateTodoAction(
            todo.id,
            {
              title: title,
            },
            "/with-server-actions"
          )
        );
      }}
      disabled={isPending}
      className={`px-2 py-1 flex-1 text-left ${
        todo.completed ? "line-through" : ""
      }`}
    />
  );
}
