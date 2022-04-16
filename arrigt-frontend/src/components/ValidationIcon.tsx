export function IconEmpty() {
  return <div className="h-8 w-8 flex-shrink-0" />;
}

export function IconValid() {
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

export function IconError() {
  return (
    <div className="group relative grid h-8 w-8 flex-shrink-0 place-items-center rounded-md bg-intent-100 text-intent-500">
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
