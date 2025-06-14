// app/contractor/task/components/TaskHeader.tsx
"use client";
import React from "react";

interface TaskHeaderProps {
  total: number;
  onCreate: () => void;
}

export function TaskHeader({ total, onCreate }: TaskHeaderProps) {
  return (
    <div className="flex justify-between items-center w-full">
      <h2 className="font-semibold text-sm leading-[100%] text-black w-[70px] h-[21px]">
        Total task
      </h2>
      <button
        type="button"
        onClick={onCreate}
        className="flex items-center p-1 gap-0.5 w-[90px] h-[30px] bg-[#0070E0] text-white text-xs rounded-lg"
      >
        <span className="text-xl">+</span>
        <span>Create task</span>
      </button>
    </div>
  );
}
