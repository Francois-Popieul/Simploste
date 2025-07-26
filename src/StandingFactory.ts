import type { Booking } from "./bookingInterface.js";
import { AbstractStandingClass } from "./AbstractStandingClass.js";
import { EcoClass } from "./EcoClass.js";
import { BusinessClass } from "./BusinessClass.js";
import { FirstClass } from "./FirstClass.js";
import { data } from "./data.js";

export class StandingFactory {
  static create(booking: Booking): AbstractStandingClass {
    const standingData = data.standing.find(
      s => s.value === booking.travelClass
    );
    const perks: string[] = standingData?.perks ?? [];

    console.log("Classe choisie :", booking.travelClass);

    switch (booking.travelClass?.toString()) {
      case "business":
        return new BusinessClass(booking, perks);
      case "first":
        return new FirstClass(booking, perks);
      default:
        return new EcoClass(booking, perks);
    }
  }
}