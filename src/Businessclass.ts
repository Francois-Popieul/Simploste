import { AbstractClass } from "./abstractclass.js";

export class Businessclass extends AbstractClass {
  getSummary(): string[] {
    return [
      `Classe : Businesse`,
      `Nom complet : ${this.bookingData.forename} ${this.bookingData.surname}`,
      `Départ : Paris`,
      `Arrivée : ${this.bookingData.destinationCity}`,
      `Distance : ${this.getDistance()} km`,
      `Prix : ${this.bookingData.totalPrice} €`,
      `Réservation : ${this.generateReservationCode()}`
    ];
  }
}