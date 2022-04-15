import { PropsWithChildren } from "react";
import { Header } from "./Header";

/**
 * A component that wraps its children within a page layout with a header.
 */
export default function Page({ children }: PropsWithChildren<unknown>) {
  return (
    <div className="grid w-full place-items-center">
      <div className="w-full max-w-screen-sm p-8 pt-0 lg:max-w-screen-xl lg:p-24 lg:pt-0">
        <Header />
        {children}
      </div>
    </div>
  );
}
