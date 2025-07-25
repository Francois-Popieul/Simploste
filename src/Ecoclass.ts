import { AbstractClass } from "./abstractclass.js";

export class EcoClass extends AbstractClass {
  getSummary(): string[] {
    return [
      `Classe : Économique`,
      `Classe : Premium Éco`,
      `Nom complet : ${this.bookingData.forename} ${this.bookingData.surname}`,
      `Départ : Paris`,
      `Arrivée : ${this.bookingData.destinationCity}`,
      `Distance : ${this.getDistance()} km`,
      `Prix : ${this.bookingData.totalPrice} €`,
      `Réservation : ${this.generateReservationCode()}`
    ];
  }
}