import { EcoClass } from "./EcoClass.js";
import { BusinessClass } from "./BusinessClass.js";
import { FirstClass } from "./FirstClass.js";
import { data } from "./data.js";
export class StandingFactory {
    static create(booking) {
        var _a, _b;
        const standingData = data.standing.find(s => s.value === booking.travelClass);
        const perks = (_a = standingData === null || standingData === void 0 ? void 0 : standingData.perks) !== null && _a !== void 0 ? _a : [];
        console.log("Classe choisie :", booking.travelClass);
        switch ((_b = booking.travelClass) === null || _b === void 0 ? void 0 : _b.toString()) {
            case "business":
                return new BusinessClass(booking, perks);
            case "first":
                return new FirstClass(booking, perks);
            default:
                return new EcoClass(booking, perks);
        }
    }
}
