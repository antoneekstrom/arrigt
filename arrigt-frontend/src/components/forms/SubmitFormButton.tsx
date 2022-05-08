import { HTMLProps } from "react";
import { Button } from "../input/Button";

export type SubmitFormButtonProps = HTMLProps<HTMLInputElement>;

export function SubmitFormButton({
  disabled,
  ...props
}: SubmitFormButtonProps) {
  return (
    <Button disabled={disabled}>
      <input {...props} disabled={disabled} type="submit" />
    </Button>
  );
}
