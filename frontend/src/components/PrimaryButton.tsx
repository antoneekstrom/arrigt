import { PropsWithChildren } from "react";

export function PrimaryButton({ children }: PropsWithChildren<unknown>) {
  return (
    <button
      className="
        bg-turqoise-50
        text-gray-10
        px-24
        py-3
        uppercase
        font-semibold
        rounded-md
        shadow-turqoise-50/40
        shadow-lg
        w-full">
      <span>{children}</span>
    </button>
  );
}
