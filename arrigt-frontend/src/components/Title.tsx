import { PropsWithChildren } from "react";

export type TitleProps = PropsWithChildren<unknown>;

export function Title({ children }: TitleProps) {
  return (
    <h1 className="mb-8 text-xl font-semibold leading-none">{children}</h1>
  );
}
