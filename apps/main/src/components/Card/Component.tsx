import { cn } from "@repo/utils";
import { PropsWithChildren } from "react";

interface Props {
  title: string;
  className?: string;
  onClick?: VoidFunction;
}

export default function Component({
  children,
  className,
  onClick,
  title,
}: PropsWithChildren<Props>) {
  return (
    <div
      className={cn("card bg-primary text-primary-content", className, {
        "hover:shadow-2xl": !!onClick,
      })}
      onClick={onClick}
    >
      <div className="card-body">
        <h2 className="card-title first-letter:uppercase">{title}</h2>
        {children}
      </div>
    </div>
  );
}
