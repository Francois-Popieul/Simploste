import { PayCard } from "./PayCards.js";
import { PaymentMethod } from "./paymentMethodInterface.js";
import { Booking } from "./bookingInterface.js";

const bookingForm: HTMLFormElement = document.getElementById("bookingForm") as HTMLFormElement;

if (bookingForm) {
  bookingForm.addEventListener("submit", event => {
    event.preventDefault();
    const formData = new FormData(bookingForm);
    const flightData: Booking = {
      forename: formData.get("firstName"),
      surname: formData.get("lastName"),
      gender: formData.get("gender"),
      birthDate: formData.get("birthDate"),
      address: formData.get("address"),
      phone: formData.get("phone"),
      email: formData.get("email"),
      flightDate: formData.get("departureDate"),
      departureCity: formData.get("departureDate"),
      arrivalTime: formData.get("departureDate"),
      destinationCity: formData.get("destination"),
      returnDate: formData.get("returnDate"),
      standing: formData.get("travelClass"),
      totalPrice: formData.get("totalPrice"),
    }
    console.log(flightData);
  })
}

const paymentForm: HTMLFormElement = document.getElementById("paymentForm") as HTMLFormElement;

if (paymentForm) {
  paymentForm.addEventListener("submit", event => {
    event.preventDefault();
    const formData = new FormData(paymentForm);
    const paymentData: PaymentMethod = {
      cardType: formData.get("cardType"),
      cardNumber: formData.get("cardNumber"),
      cardHolder: formData.get("cardHolder"),
      expiryDate: formData.get("expiryDate"),
      CSV: formData.get("securityCode"),
    }

    if (typeof paymentData.cardNumber !== "string") {
      // throw new Error("Numéro de carte invalide ou manquant");
    }
    else {
      const card = new PayCard(paymentData.cardNumber);
      const invalidCardMessage: HTMLElement | null = document.getElementById("invalidCardMessage");

      if (card.isValid() && invalidCardMessage) {
        invalidCardMessage.textContent = 'Carte valide ✅';
        invalidCardMessage.style.color = 'green';
      } else if (invalidCardMessage) {
        invalidCardMessage.textContent = 'Numéro de carte invalide ❌';
        invalidCardMessage.style.color = 'red';
      }
    }
  });
}