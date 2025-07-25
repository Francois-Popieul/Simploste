import type { Booking } from "./bookingInterface";

const STORAGE_KEY = "flightData";

// Sauvgarde la réservation
export function saveBookingData(data: Booking): void {
    try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    } catch (error) {
        console.error("Erreur lors de la sauvegarde dans le localStorage :", Error);
    }
}

// Récupère la réservation
export function getBookingData(): Booking | null {
    const raw = localStorage.getItem(STORAGE_KEY);
    
    if (!raw) {
        console.log("localStorage vide");
        return null;
    }
    try {
        const bookingData = JSON.parse(raw);
            return bookingData as Booking;
        } catch (error) {
            console.error(
            "Erreur lors de l'analyse des données JSON du localStorage :"
            );
            return null;
        }
    }

//     return JSON.parse(raw);}
// catch {return null;}

// Supprime la réservation
export function clearBookingData(): void {
    localStorage.removeItem(STORAGE_KEY);
}
