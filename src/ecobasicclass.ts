import { AbstractClass } from "./abstractclass.js";

export class EcoBasicClass extends AbstractClass {
  getSummary(): string[] {
    return [
      `Classe : Économique basique`,
      `Destination : ${this.bookingData.destinationCity}`,
      `Nom : ${this.bookingData.forename} ${this.bookingData.surname}`,
      `Date de départ : ${this.bookingData.departureDate}`,
      `Réservation : ${this.generateReservationCode()}`,
      `avantages: ${this.perks.join(", ")}`
    ];
  }
}