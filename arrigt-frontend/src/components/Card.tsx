import { PropsWithChildren } from "react";

export type CardProps = PropsWithChildren<{
  className?: string;
  classNameAll?: string;
  classNameBehind?: string;
  classNameInFront?: string;
  focus?: boolean;
}>;

/**
 * A card that can be used to wrap other components.
 */
export function Card({
  children,
  className,
  classNameBehind,
  classNameInFront,
  classNameAll,
  focus,
}: PropsWithChildren<CardProps>) {
  const focusClassNames =
    "transition-transform focus-within:translate-x-0 focus-within:translate-y-0 focus-within:ring-4 focus-within:ring-intent-focus-300 focus-within:ring-offset-4";

  return (
    <div className={`${className} ${classNameAll} inline-block`}>
      <CardBehind
        className={`${classNameBehind} ${classNameAll} translate-y-2`}>
        <CardInFront
          className={`${classNameInFront} ${classNameAll} ${
            focus ? focusClassNames : ""
          } z-0`}>
          {children}
        </CardInFront>
      </CardBehind>
    </div>
  );
}

export function CardInFront({
  children,
  className,
}: PropsWithChildren<{ className?: string }>) {
  return (
    <CardBase
      className={`${className} translate-x-1 -translate-y-1 overflow-clip border-2 border-intent-500 bg-intent-0`}>
      {children}
    </CardBase>
  );
}

export function CardBehind({
  children,
  className,
}: PropsWithChildren<{ className?: string }>) {
  return (
    <CardBase className={`${className} bg-intent-500`}>{children}</CardBase>
  );
}

function CardBase({
  children,
  className,
}: PropsWithChildren<{ className?: string }>) {
  return (
    <div className={`${className} inline-block rounded-lg`}>{children}</div>
  );
}
