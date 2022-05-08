import { PropsWithChildrenAndClassName } from "../../util/props";

export type WithLabelProps = PropsWithChildrenAndClassName<{
  label: string;
  htmlFor?: string;
}>;

/**
 * A label that can be used to describe a form field.
 */
export function Label({
  className,
  ...props
}: React.HTMLProps<HTMLLabelElement>) {
  return (
    <label
      {...props}
      className={`${className} text-sm font-medium uppercase`}
    />
  );
}

/**
 * A component that wraps its children together with a label.
 */
export function WithLabel({
  children,
  className,
  label,
  htmlFor,
}: WithLabelProps) {
  return (
    <div className={`${className} inline-flex flex-col gap-y-2`}>
      <Label htmlFor={htmlFor}>{label}</Label>
      {children}
    </div>
  );
}

export function NoLabel({
  children,
  className,
}: PropsWithChildrenAndClassName) {
  return <div className={`${className} mt-8`}>{children}</div>;
}
