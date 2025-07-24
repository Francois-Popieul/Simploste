import { PayCard } from "./PayCards.js";
import { PaymentMethod } from "./paymentMethodInterface.js";
import { Booking } from "./bookingInterface.js";
import { data } from "./data.js";

const bookingForm: HTMLFormElement = document.getElementById("bookingForm") as HTMLFormElement;

const destinationCity: HTMLElement | null = document.getElementById("destinationCity") as HTMLSelectElement;
const travelClass = document.querySelector('input[name="travelClass"]:checked') as HTMLInputElement | null;


const departureDate = document.getElementById("departureDate") as HTMLInputElement;
const returnDate = document.getElementById("returnDate") as HTMLInputElement;
const birthDate = document.getElementById("birthDate") as HTMLInputElement;
if (departureDate) {
  setMinimumDate(departureDate);
}
if (returnDate) {
  setMinimumDate(returnDate);
}
if (birthDate) {
  setMaximumDate(birthDate);
}

function setMinimumDate(input: HTMLInputElement) {
  const currentDate = new Date();
  const currentYear = currentDate.getFullYear();
  const currentMonth = currentDate.getMonth() + 1;
  const currentDay = currentDate.getDate();
  let month: string;
  if (currentMonth < 10) {
    month = "0" + currentMonth;
  } else {
    month = String(currentMonth);
  }
  const minDate = `${currentYear}-${month}-${currentDay}`;
  input.min = minDate;
}

function setMaximumDate(input: HTMLInputElement) {
  const currentDate = new Date();
  const currentYear = currentDate.getFullYear();
  const currentMonth = currentDate.getMonth() + 1;
  const currentDay = currentDate.getDate();
  let month: string;
  if (currentMonth < 10) {
    month = "0" + currentMonth;
  } else {
    month = String(currentMonth);
  }
  const minDate = `${currentYear}-${month}-${currentDay}`;
  input.max = minDate;
}

if (destinationCity) {
  data.destinations.forEach(destination => {
    const option = document.createElement("option");
    option.value = destination.value;
    option.innerText = destination.label;
    destinationCity.append(option);
  });
}

if (travelClass) {
  console.log("TravelClass existe");
}

function updateTotalPrice() {
  const destinationSelect = document.getElementById("destinationCity") as HTMLSelectElement;
  const travelClassInput = document.querySelector('input[name="travelClass"]:checked') as HTMLInputElement | null;
  const totalPriceField = document.getElementById("totalPrice") as HTMLInputElement;

  if (destinationSelect && travelClassInput && totalPriceField) {
    const selectedValue = destinationSelect.value;
    const selectedStanding = travelClassInput.value;
    const destinationObject = data.destinations.find(destination => destination.value === selectedValue);
    const standingObject = data.standing.find(standing => standing.value === selectedStanding);

    if (destinationObject && standingObject) {
      const totalPrice = destinationObject.distanceFromParis * standingObject.pricePerKm;
      totalPriceField.value = totalPrice.toString();
    } else {
      totalPriceField.value = "";
    }
  }
}

const destinationSelect = document.getElementById("destinationCity") as HTMLSelectElement;
if (destinationSelect) {
  destinationSelect.addEventListener("change", updateTotalPrice);
}

const travelClassInputs = document.querySelectorAll('input[name="travelClass"]');
travelClassInputs.forEach(input => {
  input.addEventListener("change", updateTotalPrice);
});

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

    const departure = flightData.departureDate as string;
    const returnDate = flightData.returnDate as string;

    if (returnDate < departure) {
      bookingFormErrors.push("La date de retour doit être postérieure à la date de départ.");
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