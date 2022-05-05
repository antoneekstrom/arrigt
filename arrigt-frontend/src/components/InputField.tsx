import { forwardRef, HTMLProps, PropsWithChildren } from "react";
import {
  RegisterOptions,
  useFormContext,
  useFormState,
} from "react-hook-form";
import { Card } from "./Card";
import { WithLabel } from "./Label";
import { MessageBox } from "./MessageBox";
import { IconEmpty, IconError, IconValid } from "./ValidationIcon";

export type InputFieldProps = HTMLProps<HTMLInputElement> & {
  label: string;
  icon?: JSX.Element;
  message?: string;
};

export type FormInputFieldProps = Omit<
  InputFieldProps,
  "classNameWrapper" | "icon"
> & {
  options?: RegisterOptions<Record<string, string>>;
  name: string;
};

/**
 * An input field for a form, that is wrapped together with a box for an error message.
 */
export function FormInputFieldWithMessageBox({
  className,
  ...props
}: FormInputFieldProps) {
  return (
    <div className={className}>
      <FormInputField {...props} />
      <ValidationMessageBox>{useErrorMessage(props.name)}</ValidationMessageBox>
    </div>
  );
}

/**
 * An input field for a form.
 */
export function FormInputField({ ...props }: FormInputFieldProps) {
  const isRequired = props.options?.required;
  const label = `${props.label}${isRequired ? "*" : ""}`;

  const registerWithProps = useRegisterWithProps(props);
  const errorMessage = useErrorMessage(props.name);
  const isTouched = useIsFieldTouched(props.name);

  return (
    <InputField
      {...props}
      {...registerWithProps()}
      label={label}
      icon={getInputStateIcon(errorMessage, isTouched)}
      message={errorMessage}
      className={getInputStateIntent(errorMessage, isTouched)}
    />
  );
}

/**
 * An input field.
 */
export const InputField = forwardRef<HTMLInputElement, InputFieldProps>(
  function InputField({ label, className, icon, ...props }, ref) {
    return (
      <WithLabel
        htmlFor={label}
        label={label}
        className={`${className} relative w-full`}>
        <Card focus classNameAll={"w-full"}>
          <div className="flex w-full flex-row place-items-center justify-between pr-3">
            <input
              {...props}
              ref={ref}
              className="w-full bg-transparent py-3 pl-6 pr-3 text-intent-700 caret-intent-700 outline-none"
              id={label}
            />
            {icon}
          </div>
        </Card>
      </WithLabel>
    );
  }
);

/**
 * A message box that can be used to show inline error validation for an input field.
 */
export function ValidationMessageBox({ children }: PropsWithChildren<unknown>) {
  return (
    <div className="relative top-4 h-16 w-full">
      {children && <MessageBox>{children}</MessageBox>}
    </div>
  );
}

function useErrorMessage(name: string) {
  const { errors } = useFormState();

  return errors[name]?.message;
}

function useIsFieldTouched(name: string) {
  const { touchedFields } = useFormState();
  return touchedFields[name];
}

export function useInputStateIntent(name: string) {
  return getInputStateIntent(useErrorMessage(name), useIsFieldTouched(name));
}

export function getInputStateIntent(errorMessage: boolean, touched: boolean) {
  if (errorMessage) {
    return "intent-error";
  } else if (touched) {
    return "intent-primary";
  }
  return "intent-neutral";
}

function getInputStateIcon(errorMessage: boolean, touched: boolean) {
  if (errorMessage) {
    return <IconError />;
  } else if (touched) {
    return <IconValid />;
  }
  return <IconEmpty />;
}

function useRegisterWithProps({ name, options }: FormInputFieldProps) {
  const { register } = useFormContext();
  return () => register(name, options);
}
