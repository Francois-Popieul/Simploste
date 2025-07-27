import { PayCard } from "./PayCards.js";
import { data } from "./data.js";
import { saveBookingData, getBookingData } from "./storage.js";
import { StandingFactory } from "./StandingFactory.js";
const bookingPage = document.getElementById("bookingPage");
const paymentPage = document.getElementById("paymentPage");
const summaryPage = document.getElementById("summaryPage");
const reservationNumberInputPage = document.getElementById("reservationNumberInputPage");
const bookingForm = document.getElementById("bookingForm");
const destinationCity = document.getElementById("destinationCity");
const departureDate = document.getElementById("departureDate");
const returnDate = document.getElementById("returnDate");
const birthDate = document.getElementById("birthDate");
const cardValidityMessage = document.getElementById("cardValidityMessage");
const paymentDetails = document.getElementById("paymentDetails");
const paymentSummary = document.getElementById("paymentSummary");
const flightData = {
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
};
const paymentData = {
    cardType: "",
    cardNumber: "",
    CSV: "",
    expiryDate: "",
    cardHolder: "",
};
if (departureDate) {
    departureDate.min = getConstraintDate("date-and-time");
}
if (returnDate) {
    returnDate.min = getConstraintDate("date-and-time");
}
if (birthDate) {
    birthDate.max = getConstraintDate("complete-date");
}
function getConstraintDate(length) {
    const currentDate = new Date();
    const yyyy = currentDate.getFullYear().toString();
    const mm = String(currentDate.getMonth() + 1).padStart(2, "0");
    const dd = String(currentDate.getDate()).padStart(2, "0");
    const hh = String(currentDate.getHours()).padStart(2, "0");
    const min = String(currentDate.getMinutes()).padStart(2, "0");
    if (length == "date-and-time") {
        return `${yyyy}-${mm}-${dd}T${hh}:${min}`;
    }
    else if (length == "complete-date") {
        return `${yyyy}-${mm}-${dd}`;
    }
    else {
        return `${yyyy}-${mm}`;
    }
}
if (destinationCity) {
    const filteredAndSortedDestinations = data.destinations.filter(destination => destination.value.toLowerCase() !== "paris").sort((a, b) => a.label.localeCompare(b.label));
    filteredAndSortedDestinations.forEach(destination => {
        const option = document.createElement("option");
        option.value = destination.value;
        option.innerText = destination.label;
        destinationCity.append(option);
    });
}
function updateTotalPrice() {
    const destinationSelect = document.getElementById("destinationCity");
    const travelClassInput = document.querySelector('input[name="travelClass"]:checked');
    const totalPriceField = document.getElementById("totalPrice");
    if (destinationSelect && travelClassInput && totalPriceField) {
        const selectedValue = destinationSelect.value;
        const selectedStanding = travelClassInput.value;
        const destinationObject = data.destinations.find(destination => destination.value === selectedValue);
        const standingObject = data.standing.find(standing => standing.value === selectedStanding);
        if (destinationObject && standingObject) {
            const totalPrice = destinationObject.distanceFromParis * standingObject.pricePerKm;
            totalPriceField.value = totalPrice.toString();
        }
        else {
            totalPriceField.value = "";
        }
    }
}
const destinationSelect = document.getElementById("destinationCity");
if (destinationSelect) {
    destinationSelect.addEventListener("change", updateTotalPrice);
}
const travelClassInputs = document.querySelectorAll('input[name="travelClass"]');
travelClassInputs.forEach(input => {
    input.addEventListener("change", updateTotalPrice);
});
let bookingFormErrors = [];
if (bookingForm) {
    bookingForm.addEventListener("submit", event => {
        var _a, _b;
        event.preventDefault();
        bookingFormErrors = [];
        const bookingErrorDiv = document.getElementById("bookingFormErrors");
        if (bookingErrorDiv) {
            bookingErrorDiv.innerHTML = "";
        }
        const formData = new FormData(bookingForm);
        flightData.forename = formData.get("forename");
        flightData.surname = formData.get("surname");
        const selectedGender = (_a = formData.get("gender")) === null || _a === void 0 ? void 0 : _a.toString();
        if (selectedGender === "male") {
            flightData.gender = "homme";
        }
        else if (selectedGender === "female") {
            flightData.gender = "femme";
        }
        flightData.birthDate = formData.get("birthDate");
        flightData.address = formData.get("address");
        flightData.phone = formData.get("phone");
        flightData.email = formData.get("email");
        flightData.departureDate = formData.get("departureDate");
        flightData.destinationCity = formData.get("destinationCity");
        flightData.returnDate = formData.get("returnDate");
        flightData.travelClass = formData.get("travelClass");
        flightData.totalPrice = formData.get("totalPrice");
        const nameRegEx = /^[A-Za-zÀ-ÿ0-9]{3,}$/;
        const phoneRegEx = /^[0-9]{10}$/;
        const emailRegEx = /^[^\s@]+@[^\s@]+\.[a-z]{2,}$/i;
        const addressRegEx = /^[A-Za-zÀ-ÿ0-9\s,'\-\.\/]{10,150}$/;
        const dateRegEx = /\d{4}\-\d{2}\-\d{2}/;
        if (!flightData.forename || !nameRegEx.test(flightData.forename.toString())) {
            bookingFormErrors.push("Saisissez un prénom valide d'au moins 3 caractères.");
        }
        if (!flightData.surname || !nameRegEx.test(flightData.surname.toString())) {
            bookingFormErrors.push("Saisissez un nom valide d'au moins 3 caractères.");
        }
        if (!flightData.gender || !["homme", "femme"].includes(flightData.gender.toString())) {
            bookingFormErrors.push("Indiquez votre sexe.");
        }
        if (!flightData.birthDate || !dateRegEx.test(flightData.birthDate.toString())) {
            bookingFormErrors.push("Indiquez votre date de naissance." + ((_b = flightData.birthDate) === null || _b === void 0 ? void 0 : _b.toString()));
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
        const departure = flightData.departureDate;
        const returnDate = flightData.returnDate;
        if (returnDate < departure) {
            bookingFormErrors.push("La date de retour doit être postérieure à la date de départ.");
        }
        const destinationValues = data.destinations.map(destination => destination.value.toLowerCase());
        if (!flightData.destinationCity || !destinationValues.includes(flightData.destinationCity.toString())) {
            console.log("Destination sélectionnée :", flightData.destinationCity);
            bookingFormErrors.push("Saisissez une destination valide.");
        }
        if (!flightData.travelClass || flightData.travelClass === null || flightData.travelClass === undefined) {
            bookingFormErrors.push("Saisissez une date de retour valide.");
        }
        if (bookingFormErrors.length > 0) {
            bookingFormErrors.forEach(error => {
                const paragraph = document.createElement("p");
                paragraph.innerText = error;
                bookingErrorDiv === null || bookingErrorDiv === void 0 ? void 0 : bookingErrorDiv.append(paragraph);
            });
        }
        else {
            bookingPage === null || bookingPage === void 0 ? void 0 : bookingPage.classList.toggle("hidden");
            paymentPage === null || paymentPage === void 0 ? void 0 : paymentPage.classList.toggle("hidden");
        }
    });
}
const paymentForm = document.getElementById("paymentForm");
const expiryInput = document.getElementById("expiryDate");
if (expiryInput) {
    expiryInput.min = getConstraintDate();
}
const cardTypeSelect = document.getElementById("cardType");
const securityCodeInput = document.getElementById("securityCode");
const codeCardInput = document.getElementById("cardNumber");
// Change les chiffres de securité en fonction du type de cb
cardTypeSelect.addEventListener("change", () => {
    if (cardTypeSelect.value === "amex") {
        securityCodeInput.maxLength = 4;
        securityCodeInput.placeholder = "4 chiffres";
    }
    else {
        securityCodeInput.maxLength = 3;
        securityCodeInput.placeholder = "3 chiffres";
    }
    expiryInput.value = "";
    securityCodeInput.value = "";
    codeCardInput.value = "";
});
const validateButton = document.getElementById("validateButton");
if (paymentForm && validateButton) {
    validateButton.addEventListener("click", () => {
        var _a, _b, _c, _d;
        const formData = new FormData(paymentForm);
        paymentData.cardType = formData.get("cardType");
        paymentData.cardNumber = formData.get("cardNumber");
        paymentData.cardHolder = formData.get("cardHolder");
        paymentData.expiryDate = formData.get("expiryDate");
        paymentData.CSV = formData.get("securityCode");
        const paymentFormErrors = document.getElementById("paymentFormErrors");
        // nettoie les anciennes erreurs 
        if (paymentFormErrors)
            paymentFormErrors.innerHTML = "";
        let errorFound = false;
        //verification name
        const nameRegEx = /^[A-Za-zÀ-ÿ\s'-]{3,}$/;
        const cardHolder = ((_a = paymentData.cardHolder) === null || _a === void 0 ? void 0 : _a.toString().trim()) || "";
        if (!nameRegEx.test(cardHolder)) {
            const errorText = document.createElement("p");
            errorText.textContent = "Le nom du titulaire est invalide.";
            errorText.style.color = "red";
            errorText.style.zIndex = "1000";
            paymentFormErrors === null || paymentFormErrors === void 0 ? void 0 : paymentFormErrors.appendChild(errorText);
            errorFound = true;
        }
        //Validation du numéro de carte et code secret
        const cardNumber = ((_b = paymentData.cardNumber) === null || _b === void 0 ? void 0 : _b.toString().trim()) || "";
        const csv = ((_c = paymentData.CSV) === null || _c === void 0 ? void 0 : _c.toString().trim()) || "";
        const cardType = (_d = paymentData.cardType) === null || _d === void 0 ? void 0 : _d.toString();
        if (!/^\d{13,19}$/.test(cardNumber.replace(/\s+/g, "")) ||
            (cardType === "amex" && !/^\d{4}$/.test(csv)) ||
            (cardType !== "amex" && !/^\d{3}$/.test(csv))) {
            const errorText = document.createElement("p");
            errorText.textContent = "Le numéro de carte ou le code de sécurité est invalide.";
            errorText.style.color = "red";
            errorText.style.zIndex = "1000";
            paymentFormErrors === null || paymentFormErrors === void 0 ? void 0 : paymentFormErrors.appendChild(errorText);
            errorFound = true;
        }
        // Validation du numero de carte
        if (typeof paymentData.cardNumber === "string") {
            const card = new PayCard(paymentData.cardNumber);
            if (cardValidityMessage) {
                if (card.isValid()) {
                    cardValidityMessage.textContent = "✅";
                    cardValidityMessage.style.color = "green";
                }
                else {
                    cardValidityMessage.textContent = "❌";
                    cardValidityMessage.style.color = "red";
                    errorFound = true;
                }
            }
        }
        // S'il y a une erreur, bloque
        if (errorFound)
            return;
        else {
            const summaryMethod = document.getElementById("summaryMethod");
            const summaryCard = document.getElementById("summaryCard");
            const summaryExpiry = document.getElementById("summaryExpiry");
            const summaryTotal = document.getElementById("summaryTotal");
            if (summaryMethod && paymentData.cardType) {
                summaryMethod.innerText = paymentData.cardType.toString().toUpperCase();
            }
            if (summaryCard && paymentData.cardNumber) {
                summaryCard.innerText = hideCardNumber(paymentData.cardNumber.toString().replace(/[\s-]/g, ''));
            }
            if (summaryExpiry && paymentData.expiryDate) {
                summaryExpiry.innerText = paymentData.expiryDate.toString();
            }
            if (summaryTotal && flightData.totalPrice) {
                summaryTotal.innerText = `${flightData.totalPrice.toString()} €`;
            }
            paymentDetails === null || paymentDetails === void 0 ? void 0 : paymentDetails.classList.add("hidden");
            validateButton.classList.add("hidden");
            paymentSummary === null || paymentSummary === void 0 ? void 0 : paymentSummary.classList.remove("hidden");
        }
    });
    function hideCardNumber(number) {
        const cardNumberLength = number.length;
        const hiddenNumber = number.slice(-4).padStart(cardNumberLength, "*");
        return hiddenNumber;
    }
    paymentForm.addEventListener("submit", event => {
        event.preventDefault();
        const instance = StandingFactory.create(flightData);
        // console.log("Instance créée via factory :", instance);
        // console.log("Résumé :", instance.getSummary());
        if (summaryPage) {
            const data = instance.getSummary();
            saveBookingData(data[13], data);
            fillFlightRecap(data);
            summaryPage === null || summaryPage === void 0 ? void 0 : summaryPage.classList.remove("hidden");
            paymentPage === null || paymentPage === void 0 ? void 0 : paymentPage.classList.add("hidden");
        }
    });
    const cancelButton = document.getElementById("cancelButton");
    const viewReservationButton = document.getElementById("viewReservationButton");
    const reservationNumberInputForm = document.getElementById("reservationNumberInputForm");
    cancelButton === null || cancelButton === void 0 ? void 0 : cancelButton.addEventListener("click", () => {
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
        paymentData.cardType = "";
        paymentData.cardNumber = "";
        paymentData.CSV = "";
        paymentData.expiryDate = "";
        paymentData.cardHolder = "";
        if (cardValidityMessage) {
            cardValidityMessage.textContent = "";
        }
        bookingPage === null || bookingPage === void 0 ? void 0 : bookingPage.classList.remove("hidden");
        viewReservationButton === null || viewReservationButton === void 0 ? void 0 : viewReservationButton.classList.remove("hidden");
        validateButton === null || validateButton === void 0 ? void 0 : validateButton.classList.remove("hidden");
        summaryPage === null || summaryPage === void 0 ? void 0 : summaryPage.classList.add("hidden");
        paymentPage === null || paymentPage === void 0 ? void 0 : paymentPage.classList.add("hidden");
        paymentDetails === null || paymentDetails === void 0 ? void 0 : paymentDetails.classList.remove("hidden");
        paymentSummary === null || paymentSummary === void 0 ? void 0 : paymentSummary.classList.add("hidden");
        reservationNumberInputPage === null || reservationNumberInputPage === void 0 ? void 0 : reservationNumberInputPage.classList.add("hidden");
    });
    viewReservationButton === null || viewReservationButton === void 0 ? void 0 : viewReservationButton.addEventListener("click", () => {
        bookingPage === null || bookingPage === void 0 ? void 0 : bookingPage.classList.add("hidden");
        summaryPage === null || summaryPage === void 0 ? void 0 : summaryPage.classList.add("hidden");
        paymentPage === null || paymentPage === void 0 ? void 0 : paymentPage.classList.add("hidden");
        viewReservationButton === null || viewReservationButton === void 0 ? void 0 : viewReservationButton.classList.add("hidden");
        reservationNumberInputPage === null || reservationNumberInputPage === void 0 ? void 0 : reservationNumberInputPage.classList.remove("hidden");
    });
    if (reservationNumberInputForm) {
        reservationNumberInputForm.addEventListener("submit", event => {
            event.preventDefault();
            const reservationNumberInput = document.getElementById("reservationNumber");
            const reservationNumber = reservationNumberInput === null || reservationNumberInput === void 0 ? void 0 : reservationNumberInput.value;
            const bookingData = getBookingData(reservationNumber);
            if (bookingData) {
                fillFlightRecap(bookingData);
                summaryPage === null || summaryPage === void 0 ? void 0 : summaryPage.classList.remove("hidden");
                viewReservationButton === null || viewReservationButton === void 0 ? void 0 : viewReservationButton.classList.remove("hidden");
                reservationNumberInputPage === null || reservationNumberInputPage === void 0 ? void 0 : reservationNumberInputPage.classList.add("hidden");
            }
        });
    }
    function fillFlightRecap(details) {
        var _a, _b;
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
            recapName.innerText = details[1];
        }
        if (recapGender) {
            recapGender.innerText = details[2];
        }
        if (recapEmail) {
            recapEmail.innerText = details[6];
        }
        if (recapPhone) {
            recapPhone.innerText = details[5];
        }
        if (recapAddress) {
            recapAddress.innerText = details[4];
        }
        if (recapDepartureLocation) {
            recapDepartureLocation.innerText = details[8];
        }
        if (recapDestination) {
            recapDestination.innerText = (_b = (_a = data.destinations.find((destination) => destination.value === details[9])) === null || _a === void 0 ? void 0 : _a.label) !== null && _b !== void 0 ? _b : "";
        }
        if (recapDepartureDate) {
            recapDepartureDate.innerText = details[7].replace(/^(\d{4})-(\d{2})-(\d{2})T(\d{1,2}):(\d{2})$/, "$3/$2/$1 à $4 h $5");
        }
        if (recapReturnDate) {
            recapReturnDate.innerText = details[10].replace(/^(\d{4})-(\d{2})-(\d{2})T(\d{1,2}):(\d{2})$/, "$3/$2/$1 à $4 h $5");
        }
        if (recapDistance) {
            recapDistance.innerText = details[11];
        }
        if (recapClass) {
            recapClass.innerText = details[0];
        }
        if (recapPrice) {
            recapPrice.innerText = details[12];
        }
        if (recapPerks) {
            recapPerks.innerText = details[14].replace(/,/g, ", ").toLowerCase();
        }
        if (recapBookingNumber) {
            recapBookingNumber.innerText = details[13];
        }
    }
}
