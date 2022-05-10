import { insertClassName } from "../../util/classnames";
import { PropsWithChildrenAndClassName } from "../../util/props";

export function SubTitle({
  className,
  children,
}: PropsWithChildrenAndClassName) {
  return (
    <h1
      className={`${insertClassName(
        className
      )} text-lg font-semibold leading-none`}>
      {children}
    </h1>
  );
}
