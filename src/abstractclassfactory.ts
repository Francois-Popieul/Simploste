import type { Booking } from "./bookingInterface.js";
import { AbstractClass } from "./abstractclass.js";
import { EcoBasicClass } from "./ecobasicclass.js";
import { BusinessClass } from "./buisenessclass.js";
import { FirstClass } from "./firstclass.js";
import { data } from "./data.js";

export class EconomyClassFactory {
  static create(booking: Booking): AbstractClass {
    const standingData = data.standing.find(
      s => s.value === booking.travelClass
    );
    const perks = standingData?.perks ?? [];

 switch (booking.travelClass?.toString().toLowerCase()) {
  case "BusinessClass":
    return new BusinessClass(booking, perks);
  case "firstclass":
    return new FirstClass(booking, perks);
  default:
    return new EcoBasicClass(booking, perks);
}
  }
}