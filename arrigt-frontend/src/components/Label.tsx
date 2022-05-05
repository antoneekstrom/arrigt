import React, { PropsWithChildren } from "react";

export type WithLabelProps = PropsWithChildren<{
  label: string;
  className?: string;
  htmlFor?: string;
}>;

/**
 * A label that can be used to describe a form field.
 */
export function Label({ className, ...props }: React.HTMLProps<HTMLLabelElement>) {
  return <label {...props} className={`${className} text-sm font-medium uppercase`} />;
}

/**
 * A component that wraps its children together with a label.
 */
export function WithLabel({ children, className, label, htmlFor }: WithLabelProps) {
  return (
    <div className={`${className} inline-flex flex-col gap-y-2`}>
      <Label htmlFor={htmlFor}>{label}</Label>
      {children}
    </div>
  );
}

export function NoLabel({ children, className }: PropsWithChildren<{ className?: string }>) {
  return <div className={`${className} mt-8`}>{children}</div>;
}