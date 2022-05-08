import { Wordmark } from "../typography/Wordmark";

export function Header() {
  return (
    <div className="flex flex-row place-items-center justify-between py-6">
      <div className="flex flex-row place-items-center gap-4">
        <img
          src="/itlogo.svg"
          className="h-16 w-16"
          alt="Logotype of the IT student union."
        />
        <Wordmark />
      </div>
      {/* <nav className="flex flex-row place-items-center gap-8"></nav> */}
    </div>
  );
}
