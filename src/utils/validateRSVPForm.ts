// Type definitions for RSVP form

export type AttendanceStatus = 'yes' | 'no';

export type DinnerChoice = 'chicken' | 'fish' | 'vegetarian';

export type FormStatus = 'idle' | 'sending' | 'success' | 'error';

export interface RSVPFormData {
  fullName: string;
  email: string;
  attendance: AttendanceStatus;
  dinnerChoice?: DinnerChoice;
  dietaryNotes?: string;
  message?: string;
}

// Email regex pattern as specified in the design
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/**
 * Validates RSVP form data and returns an object mapping field names to
 * error message strings. Returns an empty object `{}` when all fields are valid.
 *
 * Does NOT mutate the input `data` object.
 */
export function validateRSVPForm(
  data: RSVPFormData
): Partial<Record<keyof RSVPFormData, string>> {
  const errors: Partial<Record<keyof RSVPFormData, string>> = {};

  // fullName: required, non-empty after trim
  if (!data.fullName || data.fullName.trim() === '') {
    errors.fullName = 'Please enter your full name.';
  }

  // email: required, must match email regex
  if (!data.email || !EMAIL_REGEX.test(data.email)) {
    errors.email = 'Please enter a valid email address.';
  }

  // attendance: required, must be 'yes' or 'no'
  if (data.attendance !== 'yes' && data.attendance !== 'no') {
    errors.attendance = 'Please let us know if you can attend.';
  }

  // dinnerChoice: required only when attendance === 'yes'
  if (data.attendance === 'yes' && (!data.dinnerChoice || data.dinnerChoice === ('' as DinnerChoice))) {
    errors.dinnerChoice = 'Please select your dinner choice.';
  }

  return errors;
}
