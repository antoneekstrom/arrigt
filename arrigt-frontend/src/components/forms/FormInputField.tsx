import { RegisterOptions, useFormContext, useFormState } from "react-hook-form";
import { IconEmpty, IconError, IconValid } from "../input/ValidationIcon";
import { InputFieldProps, InputField } from "../input/InputField";
import { ValidationMessageBox } from "./ValidationMessageBox";

export type FormInputFieldProps = Omit<InputFieldProps, "icon"> & {
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

function useErrorMessage(name: string) {
  const { errors } = useFormState();

  return errors[name]?.message;
}

function useIsFieldTouched(name: string) {
  const { touchedFields } = useFormState();
  return touchedFields[name];
}

function getInputStateIntent(errorMessage: boolean, touched: boolean) {
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

export function useInputStateIntent(name: string) {
  return getInputStateIntent(useErrorMessage(name), useIsFieldTouched(name));
}
