import { calculatePrice, calculatePenalty } from './priceCalculator';

describe('Price Calculator', () => {
  test('calculatePrice returns correct base price for standard duration', () => {
    const duration = 60; // 1 hour in minutes
    const baseRate = 500; // 500 руб/час
    expect(calculatePrice(duration, baseRate)).toBe(500);
  });

  test('calculatePrice handles partial hours correctly', () => {
    const duration = 90; // 1.5 hours in minutes
    const baseRate = 500;
    expect(calculatePrice(duration, baseRate)).toBe(750);
  });

  test('calculatePrice applies minimum charge for short durations', () => {
    const duration = 15; // 15 minutes
    const baseRate = 500;
    const minimumCharge = 200;
    expect(calculatePrice(duration, baseRate, minimumCharge)).toBe(200);
  });

  test('calculatePenalty returns correct penalty for restricted zone', () => {
    const isRestrictedZone = true;
    const basePenalty = 1000;
    expect(calculatePenalty(isRestrictedZone, basePenalty)).toBe(1000);
  });

  test('calculatePenalty returns 0 for allowed zone', () => {
    const isRestrictedZone = false;
    const basePenalty = 1000;
    expect(calculatePenalty(isRestrictedZone, basePenalty)).toBe(0);
  });
}); 