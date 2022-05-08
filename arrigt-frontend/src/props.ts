import { PropsWithChildren } from "react";

export type PropsWithClassName<T = unknown> = T & { className?: string };

export type PropsWithChildrenAndClassName<T = unknown> = PropsWithChildren<
  PropsWithClassName<T>
>;

export function stringifyBoolean(value: boolean | undefined): "true" | "false" {
  return value ? "true" : "false";
}
