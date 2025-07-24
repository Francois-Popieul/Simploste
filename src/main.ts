import { PayCard } from "./PayCards.js";
import { PaymentMethod } from "./paymentMethodInterface.js";
import { Booking } from "./bookingInterface.js";
import { data } from "./data.js";

const bookingForm: HTMLFormElement = document.getElementById("bookingForm") as HTMLFormElement;

const destinationCity: HTMLElement | null = document.getElementById("destinationCity");

if (destinationCity) {
  data.destinations.forEach(destination => {
    const option = document.createElement("option");
    option.value = destination.value;
    option.innerText = destination.label;
    destinationCity.append(option);
  });
}

let bookingFormErrors: string[] = [];
if (bookingForm) {
  bookingForm.addEventListener("submit", event => {
    event.preventDefault();
    bookingFormErrors = [];
    const bookingErrorDiv: HTMLElement | null = document.getElementById("bookingFormErrors");
    if (bookingErrorDiv) {
      bookingErrorDiv.innerHTML = "";
    }
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
      destinationCity: formData.get("destinationCity"),
      returnDate: formData.get("returnDate"),
      travelClass: formData.get("travelClass"),
      totalPrice: formData.get("totalPrice"),
    }
    // console.log(flightData);
    const nameRegEx: RegExp = /^[A-Za-zÀ-ÿ0-9]{3,}$/;
    const phoneRegEx: RegExp = /^[0-9]{10}$/;
    const emailRegEx: RegExp = /^[^\s@]+@[^\s@]+\.[a-z]{2,}$/i;
    const addressRegEx: RegExp = /^[A-Za-zÀ-ÿ0-9\s,'\-\.\/]{10,150}$/;
    const dateRegEx: RegExp = /\d{4}\-\d{2}\-\d{2}/;

    if (!flightData.forename || !nameRegEx.test(flightData.forename.toString())) {
      bookingFormErrors.push("Saisissez un prénom valide d'au moins 3 caractères.");
    }
    if (!flightData.surname || !nameRegEx.test(flightData.surname.toString())) {
      bookingFormErrors.push("Saisissez un nom valide d'au moins 3 caractères.");
    }
    if (!flightData.gender || flightData.gender == null || flightData.gender == undefined) {
      bookingFormErrors.push("Indiquez votre sexe.");
    }
    if (!flightData.birthDate || !dateRegEx.test(flightData.birthDate.toString())) {
      bookingFormErrors.push("Indiquez votre date de naissance." + flightData.birthDate?.toString());
    }
    if (!flightData.email || !emailRegEx.test(flightData.email.toString())) {
      bookingFormErrors.push("Saisissez une adresse e-mail valide.");
    }
    if (!flightData.phone || !phoneRegEx.test(flightData.phone.toString())) {
      bookingFormErrors.push("Saisissez un numéro de téléphone valide de 10 chiffres.");
    }
    if (!flightData.address || !addressRegEx.test(flightData.address.toString())) {
      bookingFormErrors.push("Saisissez une adresse valide comprise entre 10 et 150 caractères.");
    }
    if (!flightData.departureDate || !dateRegEx.test(flightData.departureDate.toString())) {
      bookingFormErrors.push("Saisissez une date de départ valide.");
    }
    if (!flightData.returnDate || !dateRegEx.test(flightData.returnDate.toString())) {
      bookingFormErrors.push("Saisissez une date de retour valide.");
    }
    const destinationValues: string[] = data.destinations.map(dest => dest.value.toLowerCase());
    if (!flightData.destinationCity || !destinationValues.includes(flightData.destinationCity.toString())) {
      console.log("Destination sélectionnée :", flightData.destinationCity);
      bookingFormErrors.push("Saisissez une destination valide.");
    }
    if (!flightData.travelClass || flightData.travelClass === null || flightData.travelClass === undefined) {
      bookingFormErrors.push("Saisissez une date de retour valide.");
    }
    if (bookingFormErrors.length > 0) {
      bookingFormErrors.forEach(error => {
        const paragraph: HTMLParagraphElement = document.createElement("p");
        paragraph.innerText = error;
        bookingErrorDiv?.append(paragraph);
      })
    }
    else {
      const bookingPage: HTMLElement | null = document.getElementById("bookingPage");
      const paymentPage: HTMLElement | null = document.getElementById("paymentPage");
      bookingPage?.classList.toggle("hidden");
      paymentPage?.classList.toggle("hidden");
    }
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
      const cardValidityMessage: HTMLElement | null = document.getElementById("cardValidityMessage");

      if (card.isValid() && cardValidityMessage) {
        cardValidityMessage.textContent = "Carte valide ✅";
        cardValidityMessage.style.color = "green";
      } else if (cardValidityMessage) {
        cardValidityMessage.textContent = "Numéro de carte invalide ❌";
        cardValidityMessage.style.color = "red";
      }
    }
  });
}