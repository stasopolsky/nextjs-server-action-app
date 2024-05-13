"use client";

import { createTodoAction } from "@/app/_action";
import { useEffect, useTransition } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { TodoSchema, type TodoSchemaType } from "@/lib/schema";

export default function TodoForm() {
  const [isPending, startTransition] = useTransition();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitSuccessful },
  } = useForm<TodoSchemaType>({
    resolver: zodResolver(TodoSchema),
  });

  const onSubmit: SubmitHandler<TodoSchemaType> = async (data) => {
    startTransition(async () => {
      await createTodoAction({
        title: data.title,
        path: "/with-client-actions",
      });
    });
  };

  useEffect(() => {
    reset();
  }, [isSubmitSuccessful]);

  return (
    <>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex items-center space-x-2 mb-2"
      >
        <input
          type="text"
          className="border rounded px-2 py-1 flex-1"
          {...register("title")}
        />
        <button
          className="px-4 py-1 text-white rounded bg-green-500 disabled:bg-slate-400"
          disabled={isPending}
        >
          Add
        </button>
      </form>
      <p className="text-sm text-red-500  mb-4">
        {errors.title && (errors.title.message as string)}
      </p>
    </>
  );
}
