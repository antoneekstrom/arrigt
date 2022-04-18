import React, { forwardRef, HTMLProps, PropsWithChildren } from "react";

export type CheckboxProps = PropsWithChildren<HTMLProps<HTMLInputElement>>;

export const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(
  ({ children, className, ...props }, ref) => {
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
