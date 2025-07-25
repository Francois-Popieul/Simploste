import { AbstractStandingClass } from "./AbstractStandingClass.js";

export class EcoClass extends AbstractStandingClass {
  getSummary(): string[] {
    return [
      `Classe : économique`,
   `Nom complet : ${this.bookingData.forename} ${this.bookingData.surname}`,
      `Genre : ${this.bookingData.gender}`,
      `Année de naissance : ${this.bookingData.birthDate}`,
      `Adresse : ${this.bookingData.address}`,
      `Phone : ${this.bookingData.phone}`,
      `email : ${this.bookingData.email}`,
      `Départ : ${this.bookingData.departureDate}`,
      `Départ  Paris`,
      `Arrivée : ${this.bookingData.destinationCity}`,
      `Date de retour : ${this.bookingData.returnDate}`,
      `Distance : ${this.getDistance()} km`,
      `Prix : ${this.bookingData.totalPrice} €`,
      `Réservation : ${this.generateReservationCode()}`,
      `Avantages : ${this.perks}`
    ]
  }
}