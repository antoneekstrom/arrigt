import { Card } from "./Card";

type BaseProps = unknown;

export type CardButtonProps = React.HTMLAttributes<HTMLButtonElement> &
  BaseProps;

export type CardSubmitButtonProps = React.HTMLProps<HTMLInputElement> &
  BaseProps & {
    disabled?: boolean;
  };

export function Button({ children, className, ...props }: CardButtonProps) {
  return (
    <Card>
      <button
        {...props}
        className={`${className} rounded-lg px-6 py-3 outline-none`}>
        <span>{children}</span>
      </button>
    </Card>
  );
}

export function SubmitFormButton({
  disabled = false,
  ...props
}: CardSubmitButtonProps) {
  return (
    <Card
      focus
      className={`${!disabled ? "jiggle" : ""} ${
        disabled ? "intent-disabled-full" : "intent-primary-full"
      }`}
      classNameAll="w-full">
      <div className="relative">
        <div
          className={`${
            !disabled ? "shine" : ""
          } absolute left-0 top-0 z-0 h-full w-full`}
        />
        <input
          {...props}
          type="submit"
          aria-disabled={disabled ? "true" : "false"}
          className={`${
            !disabled ? "cursor-pointer" : ""
          } relative z-10 w-full rounded-lg px-6 py-3 text-base text-intent-700 outline-none`}
        />
      </div>
    </Card>
  );
}
