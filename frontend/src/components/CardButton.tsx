import { Card } from "./Card";

type BaseProps = {
  primary?: boolean;
};

export type CardButtonProps = React.HTMLAttributes<HTMLButtonElement> & BaseProps;

export type SubmitCardButtonProps = React.HTMLProps<HTMLInputElement> & BaseProps;

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

export function SubmitCardButton({ primary, ...props }: SubmitCardButtonProps) {
  return (
    <Card>
      <div className="bg-intent-primary-100 rounded-md">
        <input
          {...props}
          type="submit"
          className="cursor-pointer disabled:cursor-auto rounded-lg px-6 py-3 text-base text-intent-primary-500 outline-none"
        />
      </div>
    </Card>
  );
}
