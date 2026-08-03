import { normalizeBookedBy, getBookedByLabel } from './appointmentUtils';

describe('appointment bookedBy helpers', () => {
  it('normalizes empty or unknown values to patient', () => {
    expect(normalizeBookedBy('')).toBe('patient');
    expect(normalizeBookedBy('Unknown')).toBe('patient');
  });

  it('normalizes mixed-case values and returns a display label', () => {
    expect(normalizeBookedBy('Doctor')).toBe('doctor');
    expect(getBookedByLabel('Staff')).toBe('Staff');
    expect(getBookedByLabel('admin')).toBe('Admin');
  });
});
