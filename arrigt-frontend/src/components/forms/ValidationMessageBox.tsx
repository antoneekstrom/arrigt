import { PropsWithChildren } from "react";
import { Message } from "../layout/Message";

/**
 * A message box that can be used to show inline error validation for an input field.
 */
export function ValidationMessageBox({ children }: PropsWithChildren<unknown>) {
  return (
    <div className="relative top-4 h-16 w-full">
      {children && <Message>{children}</Message>}
    </div>
  );
}
