
import type { Booking } from "./bookingInterface.js";
import { data } from "./data.js";

export abstract class AbstractClass {
  protected bookingData: Booking;
  protected perks: string[];

  constructor(bookingData: Booking, perks: string[]) {
    this.bookingData = bookingData;
    this.perks = perks;
  }

  
  abstract getSummary(): string[];

  protected generateReservationCode(): string {
    return Math.random().toString(36).substring(2, 8).toUpperCase();
  }

 
  protected getDistance(): number {
    const destinationKey = this.bookingData.destinationCity?.toString().toLowerCase() ?? "";
    const destination = data.destinations.find(dest => dest.value === destinationKey);
    return destination?.distanceFromParis ?? 0;
  }
}
