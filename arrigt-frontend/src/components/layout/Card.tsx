import { PropsWithChildren } from "react";
import { insertClassName } from "../../util/classnames";
import { PropsWithChildrenAndClassName } from "../../util/props";

export type CardProps = PropsWithChildrenAndClassName<{
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
    <div
      className={`${insertClassName(className)} ${insertClassName(
        classNameAll
      )} inline-block`}>
      <CardBehind
        className={`${insertClassName(classNameBehind)} ${insertClassName(
          classNameAll
        )} translate-y-2`}>
        <CardInFront
          className={`${insertClassName(classNameInFront)} ${insertClassName(
            classNameAll
          )} ${insertClassName(focusClassNames, focus)} z-0`}>
          {children}
        </CardInFront>
      </CardBehind>
    </div>
  );
}

/**
 * The main container of the card.
 */
export function CardInFront({
  children,
  className,
}: PropsWithChildrenAndClassName) {
  return (
    <CardBase
      className={`${insertClassName(
        className
      )} translate-x-1 -translate-y-1 overflow-clip border-2 border-intent-500 bg-intent-0`}>
      {children}
    </CardBase>
  );
}

/**
 * The card that is behind the main container.
 */
export function CardBehind({
  children,
  className,
}: PropsWithChildrenAndClassName) {
  return (
    <CardBase className={`${insertClassName(className)} bg-intent-500`}>
      {children}
    </CardBase>
  );
}

/**
 * The base of a card.
 */
function CardBase({ children, className }: PropsWithChildrenAndClassName) {
  return (
    <div className={`${insertClassName(className)} inline-block rounded-lg`}>
      {children}
    </div>
  );
}
