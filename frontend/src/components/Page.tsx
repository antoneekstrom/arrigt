import { PropsWithChildren } from "react";

export default function Page({ children }: PropsWithChildren<unknown>) {
  const Logo = () => (
    <a href="/" className="text-lg font-medium">
      arr<span className="text-turqoise-50">I</span>g
      <span className="text-turqoise-50">T</span>
    </a>
  );

  return (
    <div className="grid place-items-center w-full">
      <div className="p-8 lg:p-24 pt-0 lg:pt-0 max-w-screen-sm lg:max-w-screen-xl w-full">
        <div className="flex flex-row place-items-center justify-start py-12">
          <Logo />
        </div>
        {children}
      </div>
    </div>
  );
}
