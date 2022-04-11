import { PropsWithChildren } from "react";

/**
 *
 */
export function MessageBox({
  children,
  className,
}: PropsWithChildren<{ className?: string }>) {
  return (
    <div
      className={`${className} rounded-md bg-intent-100 px-4 py-3 text-sm text-intent-700`}>
      {children}
    </div>
  );
}
