export type AppData = {
    destinations: {
        label: string;
        value: string;
        distanceFromParis: number;
    }[];
    standing: {
        label: string;
        value: string;
        pricePerKm: number;
        perks: string[];
    }[];
};