import { PropsWithChildren } from "react";
import { LayeredCard, LayeredCardProps } from "./LayeredCard";

export function CardButtonBase({
  children,
  ...props
}: PropsWithChildren<LayeredCardProps>) {
  return (
    <LayeredCard {...props}>
      <div className="px-12 py-3">{children}</div>
    </LayeredCard>
  );
}
