import { PropsWithChildren } from "react";

export type WithLabelProps = PropsWithChildren<{
  label: string;
}>;

export function WithLabel({ children, label }: WithLabelProps) {
  return (
    <div className="inline-flex flex-col gap-y-2">
      <label className="uppercase font-medium">{label}</label>
      {children}
    </div>
  );
}
