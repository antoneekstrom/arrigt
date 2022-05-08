import { insertClassName } from "../../classnames";
import { Card } from "../layout/Card";

export type ButtonProps = React.HTMLAttributes<HTMLButtonElement> & {
  disabled?: boolean;
};

export function Button({
  children,
  className,
  disabled,
  ...props
}: ButtonProps) {
  return (
    <Card
      focus
      className={`${insertClassName(className)} ${insertClassName(
        "jiggle",
        !disabled
      )} ${disabled ? "intent-disabled-full" : "intent-primary-full"}`}
      classNameAll="w-full">
      <div className="relative">
        <div
          className={`${insertClassName(
            "shine",
            !disabled
          )} absolute left-0 top-0 z-0 h-full w-full`}
        />
        <button
          {...props}
          aria-disabled={disabled}
          className={`${insertClassName(
            "cursor-pointer",
            !disabled
          )} relative z-10 w-full rounded-lg px-6 py-3 text-base text-intent-700 outline-none`}>
          {children}
        </button>
      </div>
    </Card>
  );
}
