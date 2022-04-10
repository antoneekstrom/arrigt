import { PropsWithChildren } from "react";

export type WithLabelProps = PropsWithChildren<{
  label: string;
}>;

/**
 * A component that wraps its children together with a label.
 */
export function WithLabel({ children, label }: WithLabelProps) {
  return (
    <div className="inline-flex flex-col gap-y-3">
      <label className="uppercase font-medium">{label}</label>
      {children}
    </div>
  );
}
