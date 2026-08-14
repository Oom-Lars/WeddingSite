// Type definitions for RSVP form

export type AttendanceStatus = 'yes' | 'no';

export type DinnerChoice = 'chicken' | 'fish' | 'porkBelly';

export interface DinnerOption {
  value: DinnerChoice;
  /** The main itself. */
  label: string;
  /** What it is served with — shown to guests and included in the RSVP email. */
  sides: string;
}

export const DINNER_OPTIONS: readonly DinnerOption[] = [
  { value: 'chicken', label: 'Chicken', sides: 'flavoured spiced rice and veg' },
  { value: 'fish', label: 'Fish', sides: 'crispy layered potato' },
  { value: 'porkBelly', label: 'Pork Belly', sides: 'mash and veg' },
];

/** Full menu line for a main, e.g. "Fish — with crispy layered potato". */
export function dinnerOptionText(option: DinnerOption): string {
  return `${option.label} — with ${option.sides}`;
}

export type Allergen = 'Dairy' | 'Gluten' | 'Shellfish' | 'Nuts';

export const ALLERGENS: readonly Allergen[] = ['Dairy', 'Gluten', 'Shellfish', 'Nuts'];

export type FormStatus = 'idle' | 'sending' | 'success' | 'error';

export interface RSVPFormData {
  fullName: string;
  email: string;
  attendance: AttendanceStatus;
  dinnerChoice?: DinnerChoice;
  allergies?: Allergen[];
  otherAllergy?: string;
  hasPlusOne?: boolean;
  plusOneName?: string;
  plusOneDinnerChoice?: DinnerChoice;
  plusOneAllergies?: Allergen[];
  plusOneOtherAllergy?: string;
  dietaryNotes?: string;
  message?: string;
}

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function validateRSVPForm(
  data: RSVPFormData
): Partial<Record<keyof RSVPFormData, string>> {
  const errors: Partial<Record<keyof RSVPFormData, string>> = {};

  if (!data.fullName || data.fullName.trim() === '') {
    errors.fullName = 'Please enter your full name.';
  }

  if (!data.email || !EMAIL_REGEX.test(data.email)) {
    errors.email = 'Please enter a valid email address.';
  }

  if (data.attendance !== 'yes' && data.attendance !== 'no') {
    errors.attendance = 'Please let us know if you can attend.';
  }

  if (data.attendance === 'yes' && (!data.dinnerChoice || data.dinnerChoice === ('' as DinnerChoice))) {
    errors.dinnerChoice = 'Please select your dinner choice.';
  }

  if (data.attendance === 'yes' && data.hasPlusOne) {
    if (!data.plusOneName || data.plusOneName.trim() === '') {
      errors.plusOneName = "Please enter your plus-one's name.";
    }
    if (!data.plusOneDinnerChoice || data.plusOneDinnerChoice === ('' as DinnerChoice)) {
      errors.plusOneDinnerChoice = "Please select your plus-one's dinner choice.";
    }
  }

  return errors;
}
