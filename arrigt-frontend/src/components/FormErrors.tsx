import { useFormState } from "react-hook-form";
import { MessageBox } from "./MessageBox";

export function FormErrors() {
  const { errors } = useFormState();
  const messages = Object.entries(errors).map(([, { message }]) => message);

  return (
    <div className="flex min-h-[8rem] flex-col gap-2 overflow-y-auto ">
      {messages.map((message) => (
        <MessageBox key={message} className="intent-error">
          {message}
        </MessageBox>
      ))}
    </div>
  );
}
