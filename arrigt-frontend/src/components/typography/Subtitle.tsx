import { insertClassName } from "../../classnames";
import { PropsWithChildrenAndClassName } from "../../props";

export function SubTitle({
  className,
  children,
}: PropsWithChildrenAndClassName) {
  return (
    <h1
      className={`${insertClassName(
        className
      )} mb-8 text-lg font-semibold leading-none`}>
      {children}
    </h1>
  );
}
