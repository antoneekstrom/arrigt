import { DataPrivacyAgreement } from "arrigt-backend/src/model/privacypolicy";
import { Event } from "arrigt-backend/src/model";

/**
 *
 * @param agreement
 * @param event
 * @returns
 */
export function agreementTemplate(
  agreement: DataPrivacyAgreement,
  event?: Event
) {
  return [
    intro(agreement, event),
    data(agreement),
    shared(agreement),
    statistics(agreement),
    photos(),
    rights(),
  ];
}

function intro(
  { purpose, responsible, lastDeletion }: DataPrivacyAgreement,
  event?: Event
) {
  return `
    ${
      responsible.name
    } will store the collected data in conjunction with the event${
    event?.name ? " " + event.name : ""
  }${
    event?.date ? " on " + event.date : ""
  }. The data will not be deleted later than ${lastDeletion.toDateString()}. ${purpose}
  `;
}

function data({ dataGathered }: DataPrivacyAgreement) {
  return dataGathered
    .map(
      ({ description, usage }) => `
      ${description} is saved ${usage[0].toLowerCase() + usage.slice(1)}
    `
    )
    .join("\n");
}

function shared({ sharedWith }: DataPrivacyAgreement) {
  return (sharedWith ?? [])
    .map(
      ({ name, email, phone, adress }) => `
      The data may be shared with ${name} (${email}).
    `
    )
    .join("\n");
}

function statistics({ collectStatistics }: DataPrivacyAgreement) {
  return collectStatistics
    ? `
    Anonymised statistics will also be collected from your answers, stored indefinitely, and may also be publicized.
    `
    : "";
}

function photos() {
  return ``;
}

function rights() {
  return `
  You have the right to retrieve and delete your personal data collected by IT, and to complain to the Swedish Authority for Privacy Protection (Integritetsskyddsmyndigheten) if you are dissatisfied with the management of your data. If you have other questions about GDPR, please contact the student division board (styrIT) at styrit@chalmers.it or sponken, chairman of IT, at ordf@chalmers.it.`;
}
