export class PayCard {
  constructor(private cardNumber: string) { }

  private algoLuhn(value: string): boolean {
    // Programme tout le tableau avant de faire la boucle
    const digits = value.replace(/\D/g, '').split('').map(Number).reverse();
    let sum = 0;

    for (let i = 0; i < digits.length; i++) {

      let digit = digits[i];
      // Si c'est une position impaire (1, 3, 5...), on le double
      if (i % 2 === 1) {
        digit *= 2;
        // Si en additionnant cela depasse 9, alors on soustrait 9
        if (digit > 9) digit -= 9;
      }
      sum += digit;
    }

    return sum % 10 === 0;
  }
  
  public isValid(): boolean {
    const cleaned = this.cardNumber.replace(/\D/g, '');

    // Doit contenir entre 13 et 19 chiffres
    if (!/^\d{13,19}$/.test(cleaned)) {
      return false;
    }

    const isValid = this.algoLuhn(cleaned);
    return isValid;
  }
}

