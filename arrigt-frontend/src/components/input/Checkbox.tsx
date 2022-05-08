import React, { forwardRef, HTMLAttributes, PropsWithChildren } from "react";

export type CheckboxProps = PropsWithChildren<HTMLAttributes<HTMLInputElement>>;

export const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(
  function Checkbox({ children, className, ...props }, ref) {
    return (
      <label className={`${className} flex flex-row place-items-center gap-4`}>
        <input
          ref={ref}
          {...props}
          type="checkbox"
          className="accent-intent-focus-700"
        />
        <span className="text-sm">{children}</span>
      </label>
    );
  }
);
