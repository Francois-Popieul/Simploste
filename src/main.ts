import { PayCard } from "./PayCards.js";
import { PaymentMethod } from "./paymentMethodInterface.js";
import { Booking } from "./bookingInterface.js";
import { data } from "./data.js";
import { saveBookingData, getBookingData, clearBookingData } from "./storage.js";
import { StandingFactory } from "./StandingFactory.js";
import { AppData } from "./Types/AppData.js";

const bookingPage: HTMLElement | null = document.getElementById("bookingPage");
const paymentPage: HTMLElement | null = document.getElementById("paymentPage");
const summaryPage: HTMLElement | null = document.getElementById("summaryPage");
const bookingForm: HTMLFormElement = document.getElementById("bookingForm") as HTMLFormElement;
const destinationCity: HTMLElement | null = document.getElementById("destinationCity") as HTMLSelectElement;
const departureDate = document.getElementById("departureDate") as HTMLInputElement;
const returnDate = document.getElementById("returnDate") as HTMLInputElement;
const birthDate = document.getElementById("birthDate") as HTMLInputElement;
const flightData: Booking = {
  forename: "",
  surname: "",
  gender: "",
  birthDate: "",
  address: "",
  phone: "",
  email: "",
  departureDate: "",
  destinationCity: "",
  returnDate: "",
  travelClass: "",
  totalPrice: "",
}

if (departureDate) {
  departureDate.min = getConstraintDate("long");
}

if (returnDate) {
  returnDate.min = getConstraintDate("long");
}

if (birthDate) {
  birthDate.max = getConstraintDate("long");
}

function getConstraintDate(length?: string) {
  const currentDate = new Date();
  const yyyy: string = currentDate.getFullYear().toString();
  const mm: string = String(currentDate.getMonth() + 1).padStart(2, "0");
  const dd: string = String(currentDate.getDate()).padStart(2, "0");
  if (length == "long") {
    return `${yyyy}-${mm}-${dd}`;
  }
  else {
    return `${yyyy}-${mm}`;
  }
}

if (destinationCity) {
  const filteredAndSortedDestinations: any[] = data.destinations.filter(destination => destination.value.toLowerCase() !== "paris").sort((a, b) => a.label.localeCompare(b.label));
  filteredAndSortedDestinations.forEach(destination => {
    const option = document.createElement("option");
    option.value = destination.value;
    option.innerText = destination.label;
    destinationCity.append(option);
  });
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

    flightData.forename = formData.get("forename");
    flightData.surname = formData.get("surname");
    flightData.gender = formData.get("gender");
    flightData.birthDate = formData.get("birthDate");
    flightData.address = formData.get("address");
    flightData.phone = formData.get("phone");
    flightData.email = formData.get("email");
    flightData.departureDate = formData.get("departureDate");
    flightData.destinationCity = formData.get("destinationCity");
    flightData.returnDate = formData.get("returnDate");
    flightData.travelClass = formData.get("travelClass");
    flightData.totalPrice = formData.get("totalPrice");

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

    const destinationValues: string[] = data.destinations.map(destination => destination.value.toLowerCase());

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
      bookingPage?.classList.toggle("hidden");
      paymentPage?.classList.toggle("hidden");
    }
  })
}

const paymentForm: HTMLFormElement = document.getElementById("paymentForm") as HTMLFormElement;

const expiryInput = document.getElementById("expiryDate") as HTMLInputElement;

if (expiryInput) {
  expiryInput.min = getConstraintDate();
}

const cardTypeSelect = document.getElementById("cardType") as HTMLSelectElement;
const securityCodeInput = document.getElementById("securityCode") as HTMLInputElement;
const codeCardInput = document.getElementById("cardNumber") as HTMLInputElement;


// change les chiffre de securité en fonction du type de cb//
cardTypeSelect.addEventListener("change", () => {
  if (cardTypeSelect.value === "amex") {
    securityCodeInput.maxLength = 4;
    securityCodeInput.placeholder = "4 chiffres";
  } else {
    securityCodeInput.maxLength = 3;
    securityCodeInput.placeholder = "3 chiffres";
  }

  expiryInput.value = "";
  securityCodeInput.value = "";
  codeCardInput.value = "";
});

if (paymentForm) {
  paymentForm.addEventListener("submit", event => {
    event.preventDefault();
    const formData = new FormData(paymentForm);
    const paymentData = {
      cardType: formData.get("cardType"),
      cardNumber: formData.get("cardNumber"),
      cardHolder: formData.get("cardHolder"),
      expiryDate: formData.get("expiryDate"),
      CSV: formData.get("securityCode"),
    };



    const paymentFormErrors = document.getElementById("paymentFormErrors");
    // nettoie les anciennes erreurs 
    if (paymentFormErrors) paymentFormErrors.innerHTML = "";

    let errorFound = false;

    //verification name
    const nameRegEx: RegExp = /^[A-Za-zÀ-ÿ\s'-]{3,}$/;
    const cardHolder = paymentData.cardHolder?.toString().trim() || "";

    if (!nameRegEx.test(cardHolder)) {
      const errorText = document.createElement("p");
      errorText.textContent = "Le nom du titulaire est invalide.";
      errorText.style.color = "red";
      errorText.style.zIndex = "1000";
      paymentFormErrors?.appendChild(errorText);
      errorFound = true;
    }

    //Validation du numéro de carte et code secret
    const cardNumber = paymentData.cardNumber?.toString().trim() || "";
    const csv = paymentData.CSV?.toString().trim() || "";
    const cardType = paymentData.cardType?.toString();

    if (
      !/^\d{13,19}$/.test(cardNumber.replace(/\s+/g, "")) ||
      (cardType === "amex" && !/^\d{4}$/.test(csv)) ||
      (cardType !== "amex" && !/^\d{3}$/.test(csv))
    ) {
      const errorText = document.createElement("p");
      errorText.textContent = "Le numéro de carte ou le code de sécurité est invalide.";
      errorText.style.color = "red";
      errorText.style.zIndex = "1000";
      paymentFormErrors?.appendChild(errorText);
      errorFound = true;
    }

    // Validation du numero de carte
    if (typeof paymentData.cardNumber === "string") {
      const card = new PayCard(paymentData.cardNumber);
      const cardValidityMessage: HTMLElement | null = document.getElementById("cardValidityMessage");

      if (cardValidityMessage) {
        if (card.isValid()) {
          cardValidityMessage.textContent = "✅";
          cardValidityMessage.style.color = "green";
        } else {
          cardValidityMessage.textContent = "❌";
          cardValidityMessage.style.color = "red";
          errorFound = true;
        }
      }
    }

    // si il y a une erreur bloque
    if (errorFound) return;


    const paymentPage = document.getElementById("paymentPage");

    const instance = StandingFactory.create(flightData);
    console.log("Instance créée via factory :", instance);
    console.log("Résumé :", instance.getSummary());
    
    if (summaryPage) {
      const data = instance.getSummary();
      const recapName = document.getElementById("recapName");
      const recapEmail = document.getElementById("recapEmail");
      const recapPhone = document.getElementById("recapPhone");
      const recapDestination = document.getElementById("recapDestination");
      const recapDepartureDate = document.getElementById("recapDepartureDate");
      const recapReturnDate = document.getElementById("recapReturnDate");
      const recapClass = document.getElementById("recapClass");
      const recapPrice = document.getElementById("recapPrice");
      const recapPerks = document.getElementById("recapPerks");
      const recapDepartureLocation = document.getElementById("recapDepartureLocation");
      const recapBookingNumber = document.getElementById("recapBookingNumber");
      const recapGender = document.getElementById("recapGender");
      const recapAddress = document.getElementById("recapAddress");
      const recapDistance = document.getElementById("recapDistance");

      if (recapName) {
        recapName.innerText = data[1];
      }
      if (recapGender) {
        recapGender.innerText = data[2];
      }
      if (recapEmail) {
        recapEmail.innerText = data[6];
      }
      if (recapPhone) {
        recapPhone.innerText = data[5];
      }
      if (recapAddress) {
        recapAddress.innerText = data[4];
      }
      if (recapDepartureLocation) {
        recapDepartureLocation.innerText = data[8];
      }
      if (recapDestination) {
        recapDestination.innerText = data[9];
      }
      if (recapDepartureDate) {
        recapDepartureDate.innerText = data[7];
      }
      if (recapReturnDate) {
        recapReturnDate.innerText = data[10];
      }
      if (recapDistance) {
        recapDistance.innerText = data[11];
      }
      if (recapClass) {
        recapClass.innerText = data[0];
      }
      if (recapPrice) {
        recapPrice.innerText = data[12];
      }
      if (recapPerks) {
        recapPerks.innerText = data[14];
      }
      if (recapBookingNumber) {
        recapBookingNumber.innerText = data[13];
      }
      summaryPage?.classList.toggle("hidden");
      paymentPage?.classList.toggle("hidden");
    }
  });
  const cancelButton = document.getElementById("cancelButton");
  const viewReservationButton = document.getElementById("viewReservationButton");
  cancelButton?.addEventListener("click", () => {
    bookingForm.reset();
    paymentForm.reset();
    flightData.forename = "";
    flightData.surname = "";
    flightData.gender = "";
    flightData.birthDate = "";
    flightData.address = "";
    flightData.phone = "";
    flightData.email = "";
    flightData.departureDate = "";
    flightData.destinationCity = "";
    flightData.returnDate = "";
    flightData.travelClass = "";
    flightData.totalPrice = "";    
    bookingPage?.classList.remove("hidden");
    summaryPage?.classList.add("hidden");
    paymentPage?.classList.add("hidden");
  });
  viewReservationButton?.addEventListener("click", () => {

  })
}