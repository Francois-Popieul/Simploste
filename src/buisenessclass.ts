import { AbstractClass } from "./abstractclass.js";

export class buisenessclass extends AbstractClass {
  getSummary(): string[] {
    return [
      `Classe : Business`,
      `Destination : ${this.bookingData.destinationCity}`,
      `Nom : ${this.bookingData.forename} ${this.bookingData.surname}`,
      `Date de départ : ${this.bookingData.departureDate}`,
      `Réservation : ${this.generateReservationCode()}`,
      `avantages: ${this.perks.join(", ")}`
    ];
  }
}