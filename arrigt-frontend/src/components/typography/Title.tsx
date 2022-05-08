import { insertClassName } from "../../classnames";
import { PropsWithChildrenAndClassName } from "../../props";

export function Title({ className, children }: PropsWithChildrenAndClassName) {
  return (
    <h1
      className={`${insertClassName(
        className
      )} "mb-8 leading-none" text-xl font-semibold`}>
      {children}
    </h1>
  );
}
