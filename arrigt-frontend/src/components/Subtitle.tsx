import { PropsWithChildren } from "react";

export type SubTitleProps = PropsWithChildren<unknown>;

export function SubTitle({ children }: SubTitleProps) {
  return (
    <h1 className="mb-8 text-lg font-semibold leading-none">{children}</h1>
  );
}
