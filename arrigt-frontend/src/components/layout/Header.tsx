import Link from "next/link";
import { gql, useQuery } from "urql";
import { Wordmark } from "../typography/Wordmark";

export function Header() {
  const [{ data: isLoggedInData, fetching: fetchingIsLoggedIn }] = useQuery({
    query: gql`
      query {
        isLoggedIn
      }
    `,
  });

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
      <nav className="flex flex-row place-items-center gap-8">
        {!fetchingIsLoggedIn && (
          <div>
            {isLoggedInData?.isLoggedIn ? (
              <a href="http://localhost:3001/api/auth/logout">Logout</a>
            ) : (
              <a href="http://localhost:3001/api/auth/login">Login</a>
            )}
          </div>
        )}
      </nav>
    </div>
  );
}
