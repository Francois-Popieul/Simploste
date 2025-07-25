import { AbstractStandingClass } from "./AbstractStandingClass.js";

export class EcoClass extends AbstractStandingClass {
  getSummary(): string[] {
    return [
      `économique`, // Classe
      `${this.bookingData.forename} ${this.bookingData.surname}`, // Nom complet
      `${this.bookingData.gender}`, // Sexe
      `${this.bookingData.birthDate}`, // Date de naissance
      `${this.bookingData.address}`, // Adresse postale
      `${this.bookingData.phone}`, // Numéro de téléphone
      `${this.bookingData.email}`, // Adresse e-mail
      `${this.bookingData.departureDate}`, // Date de départ
      `Paris`, // Lieu de départ
      `${this.bookingData.destinationCity}`, // Date d'arrivée
      `${this.bookingData.returnDate}`, // Date de retour
      `${this.getDistance()} km`, // Distance
      `${this.bookingData.totalPrice} €`, // Prix
      `${this.generateReservationCode()}`, // Numéro de réservation
      `${this.perks}` // Avantages
    ]
  }
}