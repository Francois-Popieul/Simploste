import { AbstractClass } from "./abstractclass.js";

export class EcoBasicClass extends AbstractClass {
  getSummary(): string[] {
    return [
      `Classe : Économique basique`,
      `Destination : ${this.bookingData.destinationCity}`,
      `Réservation : ${this.generateReservationCode()}`,
      `avantages: ${this.perks.join(", ")}`
    ];
  }
}