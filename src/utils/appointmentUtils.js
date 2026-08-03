const BOOKED_BY_VALUES = ['patient', 'doctor', 'staff', 'admin'];

export const normalizeBookedBy = (value) => {
  if (typeof value !== 'string') return 'patient';

  const normalized = value.trim().toLowerCase();
  return BOOKED_BY_VALUES.includes(normalized) ? normalized : 'patient';
};

export const getBookedByLabel = (value) => {
  const normalized = normalizeBookedBy(value);
  return normalized.charAt(0).toUpperCase() + normalized.slice(1);
};
