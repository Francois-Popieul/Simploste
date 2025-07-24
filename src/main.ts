import { PayCard } from "./PayCards.js";
import { PaymentMethod } from "./paymentMethodInterface.js";
import { Booking } from "./bookingInterface.js";

const bookingForm: HTMLFormElement = document.getElementById("bookingForm") as HTMLFormElement;

if (bookingForm) {
  bookingForm.addEventListener("submit", event => {
    event.preventDefault();
    const formData = new FormData(bookingForm);
    const flightData: Booking = {
      forename: formData.get("forename"),
      surname: formData.get("surname"),
      gender: formData.get("gender"),
      birthDate: formData.get("birthDate"),
      address: formData.get("address"),
      phone: formData.get("phone"),
      email: formData.get("email"),
      departureDate: formData.get("departureDate"),
      destinationCity: formData.get("destination"),
      returnDate: formData.get("returnDate"),
      travelClass: formData.get("travelClass"),
      totalPrice: formData.get("totalPrice"),
    }
    console.log(flightData);
  })
}

const paymentForm: HTMLFormElement = document.getElementById("paymentForm") as HTMLFormElement;


const expiryInput = document.getElementById("expiryDate") as HTMLInputElement;

          if (expiryInput) {
  const today = new Date();// met la date de maintenant 
  const year = today.getFullYear();//recupe que l'année en brut
  const rawMonth = today.getMonth() + 1;//+1 car l'index commence qui est en brut ex "7"
  let month: string;
          if (rawMonth < 10) { //si le number récuperer est moin de 10 alors tu me rajoute un 0 avant le chiffre pour faire "07"
  month = "0" + rawMonth;
          } else {
  month = String(rawMonth); //sinon c'est plus de dix alors tu me le renvoi en format string
          }

  // Format : "YYYY-MM" tu me met le mois actuel sur l'input quand je clique
  const minMonth = `${year}-${month}`;
  expiryInput.min = minMonth;
}


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
    
      const cardValidityMessage: HTMLElement | null = document.getElementById("cardValidityMessage");

      if (card.isValid() && cardValidityMessage) {
        console.log(cardValidityMessage)
        cardValidityMessage.textContent = "✅";
        cardValidityMessage.style.color = "green";
      } else if (cardValidityMessage) {
        cardValidityMessage.textContent = " ❌";
        cardValidityMessage.style.color = "red";
      }
    }

   




  });
}