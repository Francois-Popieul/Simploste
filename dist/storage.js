export function saveBookingData(key, data) {
    try {
        localStorage.setItem(key, JSON.stringify(data));
    }
    catch (error) {
        console.error("Erreur lors de la sauvegarde dans Local Storage :", Error);
    }
}
export function getBookingData(key) {
    const raw = localStorage.getItem(key);
    if (!raw) {
        console.log("Local Storage vide");
        return null;
    }
    try {
        const bookingData = JSON.parse(raw);
        return bookingData;
    }
    catch (error) {
        console.error("Erreur lors de l'analyse des données JSON de Local Storage :");
        return null;
    }
}
export function clearBookingData(key) {
    localStorage.removeItem(key);
}
