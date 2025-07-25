import { AbstractClass } from "./abstractclass.js";

export class FirstClass extends AbstractClass {
  getSummary(): string[] {
    return [
      `Classe : FirstClass`,
      `Destination : ${this.bookingData.destinationCity}`,
      `Réservation : ${this.generateReservationCode()}`,
      `avantages: ${this.perks.join(", ")}`
    ];
  }
}