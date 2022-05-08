import { insertClassName } from "../../util/classnames";
import { PropsWithClassName } from "../../util/props";
import { Card, CardProps } from "./Card";

export type ShimmerListProps = PropsWithClassName & {
  count: number;
};

export function Shimmer({ className }: PropsWithClassName) {
  return (
    <div className={`${insertClassName(className)}`}>
      <div className="h-full w-full overflow-clip rounded-lg bg-gray-200">
        <div className="shimmer h-full w-full" />
      </div>
    </div>
  );
}

export function ShimmerList({ count, ...props }: ShimmerListProps) {
  return (
    <>
      {[...Array(count)].map((_, i) => (
        <Shimmer {...props} key={i} />
      ))}
    </>
  );
}

export function ShimmerCard(props: CardProps) {
  return (
    <Card {...props}>
      <Shimmer className="h-full w-full" />
    </Card>
  );
}
