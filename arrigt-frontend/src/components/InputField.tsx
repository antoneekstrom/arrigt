import { forwardRef, HTMLProps, PropsWithChildren } from "react";
import { FormState, RegisterOptions, UseFormRegister } from "react-hook-form";
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
  register: UseFormRegister<any>;
  state: FormState<any>;
  options?: RegisterOptions<any>;
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
      <ValidationMessageBox>{getErrorMessage(props)}</ValidationMessageBox>
    </div>
  );
}

/**
 * An input field for a form.
 */
export function FormInputField({ ...props }: FormInputFieldProps) {
  const isRequired = props.options?.required;
  const label = `${props.label}${isRequired ? "*" : ""}`;

  return (
    <InputField
      {...props}
      {...registerWithProps(props)}
      label={label}
      icon={getInputStateIcon(props)}
      message={getErrorMessage(props)}
      className={getInputStateIntent(props)}
    />
  );
}

/**
 * An input field.
 */
export const InputField = forwardRef<HTMLInputElement, InputFieldProps>(
  ({ label, className, icon, message, ...props }, ref) => {
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
              className="w-full bg-transparent py-3 pl-6 pr-3 text-intent-700 outline-none caret-intent-700"
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

function getErrorMessage({ name, state: { errors } }: FormInputFieldProps) {
  return errors[name]?.message;
}

function isFieldTouched({
  name,
  state: { touchedFields },
}: FormInputFieldProps) {
  return touchedFields[name];
}

function getInputStateIntent(props: FormInputFieldProps) {
  if (getErrorMessage(props)) {
    return "intent-error";
  } else if (isFieldTouched(props)) {
    return "intent-primary";
  }
  return "intent-neutral";
}

function getInputStateIcon(props: FormInputFieldProps) {
  if (getErrorMessage(props)) {
    return <IconError />;
  } else if (isFieldTouched(props)) {
    return <IconValid />;
  }
  return <IconEmpty />;
}

function registerWithProps({ register, name, options }: FormInputFieldProps) {
  return register(name, options);
}
