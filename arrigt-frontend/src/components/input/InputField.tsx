import { forwardRef, HTMLAttributes } from "react";
import { Card } from "../layout/Card";
import { WithLabel } from "../typography/Label";
import { insertClassName } from "../../classnames";

export type InputFieldProps = HTMLAttributes<HTMLInputElement> & {
  label: string;
  icon?: JSX.Element;
  message?: string;
  disabled?: boolean;
};

/**
 * An input field.
 */
export const InputField = forwardRef<HTMLInputElement, InputFieldProps>(
  function InputField({ label, className, icon, disabled, ...props }, ref) {
    return (
      <WithLabel
        htmlFor={label}
        label={label}
        className={`${className} relative w-full`}>
        <div className={insertClassName("intent-disabled-full", disabled)}>
          <Card focus classNameAll="w-full">
            <div className="flex w-full flex-row place-items-center justify-between pr-3">
              <input
                {...props}
                ref={ref}
                className="w-full bg-transparent py-3 pl-6 pr-3 text-intent-700 caret-intent-700 outline-none"
                id={label}
              />
              {icon}
            </div>
          </Card>
        </div>
      </WithLabel>
    );
  }
);
