export const data = {
    destinations: [
        { label: "Paris", value: "paris", distanceFromParis: 0 },
        { label: "Londres", value: "london", distanceFromParis: 340 },
        { label: "Berlin", value: "berlin", distanceFromParis: 1050 },
        { label: "Madrid", value: "madrid", distanceFromParis: 1250 },
        { label: "Rome", value: "rome", distanceFromParis: 1100 },
        { label: "Lisbonne", value: "lisbon", distanceFromParis: 1450 },
        { label: "Vienne", value: "vienna", distanceFromParis: 1230 },
        { label: "Amsterdam", value: "amsterdam", distanceFromParis: 510 },
        { label: "Bruxelles", value: "brussels", distanceFromParis: 300 },
        { label: "Copenhague", value: "copenhagen", distanceFromParis: 1380 },
    ],
    standing: [
        {
            label: "Économie",
            value: "economy",
            pricePerKm: 0.1,
            perks: ["Siège standard"],
        },
        {
            label: "Affaires",
            value: "business",
            pricePerKm: 0.25,
            perks: ["Siège large", "Repas chaud", "Accès salon"],
        },
        {
            label: "Première classe",
            value: "first",
            pricePerKm: 0.5,
            perks: ["Chauffeur", "Service à la place", "Champagne", "Siège premium"],
        },
    ],
};
