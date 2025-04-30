import React, { ReactNode } from "react";

interface WidgetContainerProps {
  children: ReactNode;
}

function WidgetContainer({ children }: WidgetContainerProps) {
  return (
    <div className="mt-4 justify-center shadow-md flex flex-col w-[390px] mx-auto p-8 rounded-[30px] bg-white">
      <div className="flex flex-col gap-4">{children}</div>
    </div>
  );
}

export default WidgetContainer;
