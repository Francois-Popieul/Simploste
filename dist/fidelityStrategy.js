export class EconomyFidelity {
    calculatePoints(distance) {
        return Math.floor(distance / 100) * 1;
    }
}
export class BusinessFidelity {
    calculatePoints(distance) {
        return Math.floor(distance / 100) * 2;
    }
}
export class FirstClassFidelity {
    calculatePoints(distance) {
        return Math.floor(distance / 100) * 3;
    }
}
export class VisaMultiplier {
    getMultiplier() {
        return 1;
    }
}
export class AmexMultiplier {
    getMultiplier() {
        return 2;
    }
}
export class MasterCardMultiplier {
    getMultiplier() {
        return 1.5;
    }
}
export class FidelityManager {
    constructor(strategy, multiplier) {
        this.strategy = strategy;
        this.multiplier = multiplier;
    }
    calculate(distance) {
        const basePoints = this.strategy.calculatePoints(distance);
        return Math.round(basePoints * this.multiplier.getMultiplier());
    }
}
