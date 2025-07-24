import type { Booking } from "./bookingInterface";


const STORAGE_KEY = "flightData";

// Sauvgarde la réservation
export function saveBookingData(data: Booking): void {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
}

// Récupère la réservation
export function getBookingData(): Booking | null {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    try {return JSON.parse(raw);}
    catch { return null;}
}

// Supprime la réservation
export function clearBookingData(): void {
    localStorage.removeItem(STORAGE_KEY);
}