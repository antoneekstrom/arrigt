import { PropsWithChildren, useState } from "react";
import { LayeredCard } from "./LayeredCard";
import { WithLabel } from "./WithLabel";

type Validate = (value: string) => {
  isValid: boolean;
  message?: string;
};

export type TextInputProps = {
  label: string;
  validate?: Validate;
};

export function TextInput({ label, validate }: TextInputProps) {
  const [value, setValue] = useState("");
  const [hasTyped, setHasTyped] = useState(false);
  const [hasBlurred, setHasBlurred] = useState(false);

  const isValidated = validate !== undefined;
  const showError = isValidated && hasTyped && hasBlurred;
  const showValid = isValidated && hasTyped;

  const { isValid, message } = validate?.(value) ?? { isValid: true };

  const StatusIcon = () => {
    if (showError && !isValid) {
      return <InvalidIcon>{message}</InvalidIcon>;
    }

    if (showValid && isValid) {
      return <ValidIcon />;
    }

    return <EmptyIcon />;
  };

  return (
    <WithLabel label={label}>
      <LayeredCard depress>
        <div className="flex flex-row place-items-center justify-between pr-3">
          <input
            type="text"
            className="rounded-lg bg-none py-3 pl-12 outline-none"
            value={value}
            onChange={(e) => {
              setValue(e.target.value);
              setHasTyped(true);
            }}
            onBlur={() => setHasBlurred(true)}
          />
          <StatusIcon />
        </div>
      </LayeredCard>
    </WithLabel>
  );
}

function EmptyIcon() {
  return <div className="h-8 w-8" />;
}

function ValidIcon() {
  return (
    <div className="grid h-8 w-8 place-items-center rounded-md bg-turquoise-10">
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
  return (
    <div className="z-10 group relative grid h-8 w-8 place-items-center rounded-md bg-red-10 text-red-50">
      <span className="absolute hidden group-hover:block left-14 bg-red-10 px-4 py-3 rounded-md w-max max-w-md">{children}</span>
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
