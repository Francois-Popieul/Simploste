import { AbstractStandingClass } from "./AbstractStandingClass.js";

export class BusinessClass extends AbstractStandingClass {
  getSummary(): string[] {
    return [
      `Classe : affaires`,
      `Nom complet : ${this.bookingData.forename} ${this.bookingData.surname}`,
      `Départ  Paris`,
      `Arrivée : ${this.bookingData.destinationCity}`,
      `Distance : ${this.getDistance()} km`,
      `Prix : ${this.bookingData.totalPrice} €`,
      `Réservation : ${this.generateReservationCode()}`
    ];
  }
}