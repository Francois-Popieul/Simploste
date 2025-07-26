export function saveBookingData(key: string, data: string[]): void {
    try {
        localStorage.setItem(key, JSON.stringify(data));
    } catch (error) {
        console.error("Erreur lors de la sauvegarde dans Local Storage :", Error);
    }
}

export function getBookingData(key: string): string[] | null {
    const raw = localStorage.getItem(key);

    if (!raw) {
        console.log("Local Storage vide");
        return null;
    }
    try {
        const bookingData = JSON.parse(raw);
        return bookingData as string[];
    } catch (error) {
        console.error(
            "Erreur lors de l'analyse des données JSON de Local Storage :"
        );
        return null;
    }
}

export function clearBookingData(key: string): void {
    localStorage.removeItem(key);
}
