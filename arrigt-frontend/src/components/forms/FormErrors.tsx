import { useFormState } from "react-hook-form";
import { Message } from "../layout/Message";

export type FormErrorsProps = {
  className?: string;
};

export function FormErrors({ className }: FormErrorsProps) {
  const { errors } = useFormState();
  const messages = Object.entries(errors).map(([, { message }]) => message);

  return (
    <div className={className}>
      <div className="flex min-h-[8rem] flex-col gap-2 overflow-y-auto">
        {messages.map((message) => (
          <Message key={message} className="intent-error">
            {message}
          </Message>
        ))}
      </div>
    </div>
  );
}
