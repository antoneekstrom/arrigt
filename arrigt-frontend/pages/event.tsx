import { EventDetails } from "../src/components/EventDetails";
import { RegistrationForm } from "../src/components/RegistrationForm";
import { SubTitle } from "../src/components/Subtitle";

/**
 * A page that shows the event information.
 */
export default function EventPage() {
  return (
    <div className="flex flex-col gap-16 3xl:grid 3xl:grid-cols-3 3xl:gap-32">
      <div className="col-span-2">
        <EventDetails />
      </div>
      <div>
        <SubTitle>Anmälan</SubTitle>
        <RegistrationForm />
      </div>
    </div>
  );
}
