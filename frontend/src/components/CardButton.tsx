import { Card } from "./Card";

type BaseProps = {
  primary?: boolean;
};

export type CardButtonProps = React.HTMLAttributes<HTMLButtonElement> & BaseProps;

export type CardSubmitButtonProps = React.HTMLProps<HTMLInputElement> & BaseProps;

export function CardButton({
  children,
  className,
  primary,
  ...props
}: CardButtonProps) {
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

export function CardSubmitButton({ primary, ...props }: CardSubmitButtonProps) {
  return (
    <Card>
      <input
        {...props}
        type="submit"
        className="cursor-pointer disabled:cursor-auto rounded-lg px-6 py-3 text-base text-intent-700 outline-none"
      />
    </Card>
  );
}
