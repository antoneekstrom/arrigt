import { insertClassName } from "../../util/classnames";
import { PropsWithChildrenAndClassName } from "../../util/props";

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
