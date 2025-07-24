import { AbstractClass } from "./abstractclass.js";

export class buisenessclass extends AbstractClass {
  getSummary(): string[] {
    return [
      `Classe : Business`,
      `Destination : ${this.bookingData.destinationCity}`,
      `Réservation : ${this.generateReservationCode()}`,
      `avantages: ${this.perks.join(", ")}`
    ];
  }
}