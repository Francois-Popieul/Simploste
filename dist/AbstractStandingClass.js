import { data } from "./data.js";
export class AbstractStandingClass {
    constructor(bookingData, perks) {
        this.bookingData = bookingData;
        this.perks = perks;
    }
    generateReservationCode() {
        return Math.random().toString(36).substring(2, 8).toUpperCase();
    }
    getDistance() {
        var _a, _b, _c;
        const destinationKey = (_b = (_a = this.bookingData.destinationCity) === null || _a === void 0 ? void 0 : _a.toString().toLowerCase()) !== null && _b !== void 0 ? _b : "";
        const destination = data.destinations.find(dest => dest.value === destinationKey);
        return (_c = destination === null || destination === void 0 ? void 0 : destination.distanceFromParis) !== null && _c !== void 0 ? _c : 0;
    }
}
