import { EventDetails } from "../src/components/EventDetails";
import { RegistrationForm } from "../src/components/RegistrationForm";

/**
 * A page that shows the event information.
 */
export default function EventPage() {
  return (
    <div className="flex flex-col gap-16 lg:gap-4">
      <EventDetails />
      <RegistrationForm />
    </div>
  );
}
