import { PropsWithChildren } from "react";

export type WithLabelProps = PropsWithChildren<{
  label: string;
  className?: string;
}>;

/**
 * A component that wraps its children together with a label.
 */
export function WithLabel({ children, className, label }: WithLabelProps) {
  return (
    <div className={`${className} inline-flex flex-col gap-y-3`}>
      <label className="uppercase font-medium">{label}</label>
      {children}
    </div>
  );
}
