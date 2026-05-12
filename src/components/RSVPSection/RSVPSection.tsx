import { useState, useRef } from 'react'
import emailjs from '@emailjs/browser'
import { validateRSVPForm } from '../../utils/validateRSVPForm'
import type { RSVPFormData, AttendanceStatus, DinnerChoice, FormStatus } from '../../utils/validateRSVPForm'
import './RSVPSection.css'

interface RSVPSectionProps {
  emailjsServiceId: string
  emailjsTemplateId: string
  emailjsPublicKey: string
}

export default function RSVPSection({ emailjsServiceId, emailjsTemplateId, emailjsPublicKey }: RSVPSectionProps) {
  const formRef = useRef<HTMLFormElement>(null)
  const [status, setStatus] = useState<FormStatus>('idle')
  const [errors, setErrors] = useState<Partial<Record<keyof RSVPFormData, string>>>({})
  const [attendance, setAttendance] = useState<AttendanceStatus | ''>('')

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    if (!formRef.current) return

    const formData = new FormData(formRef.current)
    const data: RSVPFormData = {
      fullName: (formData.get('fullName') as string) ?? '',
      email: (formData.get('email') as string) ?? '',
      attendance: (formData.get('attendance') as AttendanceStatus) ?? 'no',
      dinnerChoice: (formData.get('dinnerChoice') as DinnerChoice) || undefined,
      dietaryNotes: (formData.get('dietaryNotes') as string) || undefined,
      message: (formData.get('message') as string) || undefined,
    }

    const validationErrors = validateRSVPForm(data)
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors)
      return
    }

    setErrors({})
    setStatus('sending')

    try {
      await emailjs.sendForm(emailjsServiceId, emailjsTemplateId, formRef.current, emailjsPublicKey)
      setStatus('success')
    } catch {
      setStatus('error')
    }
  }

  if (status === 'success') {
    return (
      <section id="rsvp" className="rsvp">
        <div className="rsvp__inner">
          <div className="rsvp__success">
            <div className="rsvp__success-icon" aria-hidden="true">
              <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="24" cy="24" r="22" stroke="currentColor" strokeWidth="2"/>
                <path d="M14 24l7 7 13-14" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            <h2 className="rsvp__success-title">We can't wait to celebrate with you!</h2>
            <p className="rsvp__success-msg">Your RSVP has been received. We'll be in touch with more details closer to the day.</p>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section id="rsvp" className="rsvp">
      <div className="rsvp__inner">
        <div className="rsvp__header">
          <p className="rsvp__eyebrow">Kindly Reply</p>
          <h2 className="rsvp__title">RSVP</h2>
          <hr className="rsvp__divider" />
          <p className="rsvp__subtitle">Please respond by August 1st, 2026</p>
        </div>

        <form
          ref={formRef}
          className="rsvp__form"
          onSubmit={handleSubmit}
          noValidate
          aria-label="RSVP form"
        >
          {/* Full Name */}
          <div className="rsvp__field">
            <label htmlFor="fullName" className="rsvp__label">
              Full Name <span aria-hidden="true">*</span>
            </label>
            <input
              id="fullName"
              name="fullName"
              type="text"
              className={`rsvp__input ${errors.fullName ? 'rsvp__input--error' : ''}`}
              aria-required="true"
              aria-describedby={errors.fullName ? 'fullName-error' : undefined}
              placeholder="Your full name"
              autoComplete="name"
            />
            {errors.fullName && (
              <span id="fullName-error" className="rsvp__error" role="alert">{errors.fullName}</span>
            )}
          </div>

          {/* Email */}
          <div className="rsvp__field">
            <label htmlFor="email" className="rsvp__label">
              Email Address <span aria-hidden="true">*</span>
            </label>
            <input
              id="email"
              name="email"
              type="email"
              className={`rsvp__input ${errors.email ? 'rsvp__input--error' : ''}`}
              aria-required="true"
              aria-describedby={errors.email ? 'email-error' : undefined}
              placeholder="your@email.com"
              autoComplete="email"
            />
            {errors.email && (
              <span id="email-error" className="rsvp__error" role="alert">{errors.email}</span>
            )}
          </div>

          {/* Attendance */}
          <div className="rsvp__field">
            <fieldset className="rsvp__fieldset">
              <legend className="rsvp__label">
                Will you be attending? <span aria-hidden="true">*</span>
              </legend>
              <div className="rsvp__radio-group">
                <label className="rsvp__radio-label">
                  <input
                    type="radio"
                    name="attendance"
                    value="yes"
                    className="rsvp__radio"
                    aria-required="true"
                    onChange={() => setAttendance('yes')}
                  />
                  <span>Joyfully accepts</span>
                </label>
                <label className="rsvp__radio-label">
                  <input
                    type="radio"
                    name="attendance"
                    value="no"
                    className="rsvp__radio"
                    onChange={() => setAttendance('no')}
                  />
                  <span>Regretfully declines</span>
                </label>
              </div>
              {errors.attendance && (
                <span className="rsvp__error" role="alert">{errors.attendance}</span>
              )}
            </fieldset>
          </div>

          {/* Dinner Choice — only shown when attending */}
          {attendance === 'yes' && (
            <div className="rsvp__field rsvp__field--animate">
              <label htmlFor="dinnerChoice" className="rsvp__label">
                Dinner Selection <span aria-hidden="true">*</span>
              </label>
              <select
                id="dinnerChoice"
                name="dinnerChoice"
                className={`rsvp__select ${errors.dinnerChoice ? 'rsvp__input--error' : ''}`}
                aria-required="true"
                aria-describedby={errors.dinnerChoice ? 'dinnerChoice-error' : undefined}
                defaultValue=""
              >
                <option value="" disabled>Select your preference</option>
                <option value="chicken">Chicken</option>
                <option value="fish">Fish</option>
                <option value="vegetarian">Vegetarian</option>
              </select>
              {errors.dinnerChoice && (
                <span id="dinnerChoice-error" className="rsvp__error" role="alert">{errors.dinnerChoice}</span>
              )}
            </div>
          )}

          {/* Dietary Notes */}
          <div className="rsvp__field">
            <label htmlFor="dietaryNotes" className="rsvp__label">
              Dietary Requirements <span className="rsvp__optional">(optional)</span>
            </label>
            <textarea
              id="dietaryNotes"
              name="dietaryNotes"
              className="rsvp__textarea"
              rows={2}
              placeholder="Any allergies or dietary needs?"
              aria-describedby={errors.dietaryNotes ? 'dietaryNotes-error' : undefined}
            />
          </div>

          {/* Message */}
          <div className="rsvp__field">
            <label htmlFor="message" className="rsvp__label">
              Message to the Couple <span className="rsvp__optional">(optional)</span>
            </label>
            <textarea
              id="message"
              name="message"
              className="rsvp__textarea"
              rows={3}
              placeholder="Share your well wishes..."
              aria-describedby={errors.message ? 'message-error' : undefined}
            />
          </div>

          {/* Error state */}
          {status === 'error' && (
            <p className="rsvp__submit-error" role="alert">
              Something went wrong. Please try again or contact us directly.
            </p>
          )}

          {/* Submit */}
          <button
            type="submit"
            className="rsvp__submit"
            disabled={status === 'sending'}
            aria-busy={status === 'sending'}
          >
            {status === 'sending' ? 'Sending...' : 'Send RSVP'}
          </button>
        </form>
      </div>
    </section>
  )
}
