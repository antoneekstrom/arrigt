import { FieldErrors } from "react-hook-form";
import { MessageBox } from "./MessageBox";

export type FormErrorsProps = {
  errors: FieldErrors;
};

export function FormErrors({ errors }: FormErrorsProps) {
  const messages = Object.entries(errors).map(([_, { message }]) => message);

  return (
    <div className="flex min-h-[8rem] flex-col gap-2">
      {messages.map((message) => (
        <MessageBox className="intent-error">{message}</MessageBox>
      ))}
    </div>
  );
}
