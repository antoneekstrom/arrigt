import { PropsWithChildren } from "react";

type WithClassName = {
  className?: string;
};

export type CardProps = PropsWithChildren<{
  className?: string;
  classNameBehind?: string;
  classNameInFront?: string;
}>;

export function Card({
  children,
  className,
  classNameBehind,
  classNameInFront,
}: PropsWithChildren<CardProps>) {
  return (
    <div className={`${className} inline-block`}>
      <CardBehind className={classNameBehind}>
        <CardInFront className={`${classNameInFront} z-0`}>{children}</CardInFront>
      </CardBehind>
    </div>
  );
}

export function CardInFront({
  children,
  className,
}: PropsWithChildren<WithClassName>) {
  return (
    <CardBase
      className={`${className} translate-x-1 -translate-y-1 border-2 border-intent-500 bg-intent-0 transition-transform focus-within:translate-x-0 focus-within:translate-y-0 focus-within:ring-4 focus-within:ring-intent-focus-300 focus-within:ring-offset-4`}>
      {children}
    </CardBase>
  );
}

export function CardBehind({
  children,
  className,
}: PropsWithChildren<WithClassName>) {
  return (
    <CardBase className={`${className} bg-intent-500`}>{children}</CardBase>
  );
}

function CardBase({ children, className }: PropsWithChildren<WithClassName>) {
  return (
    <div className={`${className} inline-block rounded-lg`}>{children}</div>
  );
}
