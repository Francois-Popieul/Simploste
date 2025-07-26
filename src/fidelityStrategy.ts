interface FidelityStrategy {
  calculatePoints(distance: number): number;
}

export class EconomyFidelity implements FidelityStrategy {
  calculatePoints(distance: number): number {
    return Math.floor(distance / 100) * 1;
  }
}

export class BusinessFidelity implements FidelityStrategy {
  calculatePoints(distance: number): number {
    return Math.floor(distance / 100) * 2;
  }
}

export class FirstClassFidelity implements FidelityStrategy {
  calculatePoints(distance: number): number {
    return Math.floor(distance / 100) * 3;
  }
}

export interface CardMultiplier {
  getMultiplier(): number;
}

export class VisaMultiplier implements CardMultiplier {
  getMultiplier() {
    return 1;
  }
}

export class AmexMultiplier implements CardMultiplier {
  getMultiplier() {
    return 2;
  }
}

export class MasterCardMultiplier implements CardMultiplier {
  getMultiplier() {
    return 1.5;
  }
}

export class FidelityManager {
  private strategy: FidelityStrategy;
  private multiplier: CardMultiplier;

  constructor(strategy: FidelityStrategy, multiplier: CardMultiplier) {
    this.strategy = strategy;
    this.multiplier = multiplier;
  }

  calculate(distance: number): number {
    const basePoints = this.strategy.calculatePoints(distance);
    return Math.round(basePoints * this.multiplier.getMultiplier());
  }
}