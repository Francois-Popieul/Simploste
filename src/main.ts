import { PayCard } from "./class payCards.js";
interface PayementMethode{
cardType:string;
cardNumber:string;
cardHolder:string;
CSV:number;
}

const form = document.getElementById('card-form') as HTMLFormElement;
const input = document.getElementById('cardNumber') as HTMLInputElement;
const message = document.getElementById('message') as HTMLParagraphElement;

form.addEventListener('submit', (event) => {
  event.preventDefault();

  const cardNumber = input.value;
  const card = new PayCard(cardNumber);

  if (card.isValid()) {
    message.textContent = 'Carte valide ✅';
    message.style.color = 'green';
  } else {
    message.textContent = 'Numéro de carte invalide ❌';
    message.style.color = 'red';
  }
});
