import { PropsWithChildrenAndClassName } from "../../props";

/**
 * A container styled as a message.
 */
export function Message({
  children,
  className,
}: PropsWithChildrenAndClassName) {
  return (
    <div
      className={`${className} rounded-md bg-intent-100 px-4 py-3 text-sm text-intent-700`}>
      {children}
    </div>
  );
}
