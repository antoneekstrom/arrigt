import { PropsWithChildren } from "react";

export type LayeredCardProps = PropsWithChildren<{
  primary?: boolean;
  depress?: boolean;
  hover?: boolean;
}>;

export function LayeredCard({
  children,
  primary,
  depress,
  hover,
}: LayeredCardProps) {
  const outerClassName = primary ? "bg-turquoise-70" : "bg-turquoise-50";

  const innerClassName = primary
    ? `bg-turquoise-50 text-white ${
        hover && "hover:bg-turquoise-60 hover:border-turquoise-60"
      }`
    : `bg-white text-turquoise-50 ${hover && "hover:bg-turquoise-10"}`;

  const depressClassName =
    "transition-transform active:translate-x-0 active:translate-y-0 focus-within:translate-x-0 focus-within:translate-y-0";

  return (
    <div className="inline-block">
      <div className={`rounded-lg ${outerClassName}`}>
        <div
          className={`translate-x-1 -translate-y-1 rounded-lg border-2 border-turquoise-50 ${
            depress && depressClassName
          } ${innerClassName}`}>
          {children}
        </div>
      </div>
    </div>
  );
}
