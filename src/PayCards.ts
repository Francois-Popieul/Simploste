export class PayCard {
  constructor(private cardNumber: string) { }

  private algoLuhn(value: string): boolean {
    //programme tout le tableau avant de faire la bouche
    const digits = value.replace(/\D/g, '').split('').map(Number).reverse();
    let sum = 0;

    for (let i = 0; i < digits.length; i++) {

      let digit = digits[i];
      // Si c'est une position impaire (1, 3, 5...), on le double
      if (i % 2 === 1) {
        digit *= 2;
        //si en additionnant cela depasse 9 alors on soustrait 9//
        if (digit > 9) digit -= 9;
      }
      sum += digit;
    }

    return sum % 10 === 0;
  }

  public isValid(): boolean {
    const isValid = this.algoLuhn(this.cardNumber);
    if (!isValid) {
      // alert("Erreur : numéro de carte invalide.");
 
      return false;
    }

    return true;
  }
}

