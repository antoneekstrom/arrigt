import Link from "next/link";
import { Wordmark } from "./Wordmark";

export function Header() {
  return (
    <div className="flex flex-row place-items-center justify-between py-8">
      <Wordmark />
      <nav className="flex flex-row place-items-center gap-8">
        <Link href="/">Arret</Link>
        <Link href="/registrations">Registrations</Link>
      </nav>
    </div>
  );
}
