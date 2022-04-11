import { forwardRef, PropsWithChildren } from "react";
import { FormState, RegisterOptions, UseFormRegister } from "react-hook-form";
import { Card } from "./Card";
import { WithLabel } from "./WithLabel";

export type CardInputProps = React.HTMLAttributes<HTMLInputElement> & {
  label: string;
  classNameWrapper?: string;
  icon?: JSX.Element;
};

export type FormCardInputProps = Omit<
  CardInputProps,
  "classNameWrapper" | "icon"
> & {
  register: UseFormRegister<any>;
  state: FormState<any>;
  options?: RegisterOptions<any>;
  name: string;
};

export function FormCardInput({
  register,
  name,
  state: { errors, touchedFields },
  options,
  ...props
}: FormCardInputProps) {
  let intent = "intent-neutral";
  let icon = <EmptyIcon />;

  if (errors[name]) {
    intent = "intent-error";
    icon = <InvalidIcon>{errors[name].message}</InvalidIcon>;
  } else if (touchedFields[name]) {
    intent = "intent-primary";
    icon = <ValidIcon />;
  }

  return (
    <CardInput
      {...props}
      {...register(name, options)}
      classNameWrapper={intent}
      icon={icon}
    />
  );
}

export const CardInput = forwardRef<HTMLInputElement, CardInputProps>(
  ({ label, classNameWrapper, icon, ...props }, ref) => {
    return (
      <WithLabel label={label} className="w-full">
        <Card className={`${classNameWrapper} w-full`}>
          <Wrapper>
            <input
              {...props}
              ref={ref}
              className="w-full bg-transparent py-3 pl-6 text-intent-700 outline-none"
            />
            {icon}
          </Wrapper>
        </Card>
      </WithLabel>
    );
  }
);

function Wrapper({ children }: PropsWithChildren<unknown>) {
  return (
    <div className="flex w-full flex-row place-items-center justify-between pr-3">
      {children}
    </div>
  );
}

function EmptyIcon() {
  return <div className="h-8 w-8 flex-shrink-0" />;
}

function ValidIcon() {
  return (
    <div className="grid h-8 w-8 flex-shrink-0 place-items-center rounded-md bg-intent-100 text-intent-500">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-6 w-6"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
      </svg>
    </div>
  );
}

function InvalidIcon({ children }: PropsWithChildren<unknown>) {
  const Message = () => (
    <div className="absolute z-10 left-14 hidden w-max max-w-md rounded-md bg-intent-100 px-4 py-3 text-intent-700 group-hover:block">
      {children}
    </div>
  );

  return (
    <div className="group relative grid h-8 w-8 flex-shrink-0 place-items-center rounded-md bg-intent-100 text-intent-500">
      <Message />
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-6 w-6"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={2}>
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M6 18L18 6M6 6l12 12"
        />
      </svg>
    </div>
  );
}
