import type { Booking } from "./bookingInterface.js";
import { AbstractClass } from "./abstractclass.js";
import { EcoClass } from "./Ecoclass.js";
import { Businessclass } from "./Businessclass.js";
import { FirstClass } from "./firstclass.js";
import { data } from "./data.js";


export class EconomyClassFactory {
  static create(booking: Booking): AbstractClass {
    const standingData = data.standing.find(
      s => s.value === booking.travelClass
    );
    const perks = standingData?.perks ?? [];

      console.log("Classe choisie :", booking.travelClass);

 switch (booking.travelClass?.toString()) {
  case "businessclass":
      
  return new Businessclass(booking, perks);
  case "first":

  return new FirstClass(booking, perks);
          
  default:
   
    return new EcoClass(booking, perks);
}
  }
}