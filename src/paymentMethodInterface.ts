export interface PaymentMethod {
    cardType: FormDataEntryValue | null;
    cardNumber: FormDataEntryValue | null;
    cardHolder: FormDataEntryValue | null;
    expiryDate: FormDataEntryValue | null;
    CSV: FormDataEntryValue | null;
}