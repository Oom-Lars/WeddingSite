import { useState, useRef } from 'react'
import useScrollReveal from '../../hooks/useScrollReveal'
import { validateRSVPForm } from '../../utils/validateRSVPForm'
import type {
  RSVPFormData,
  AttendanceStatus,
  DinnerChoice,
  FormStatus,
} from '../../utils/validateRSVPForm'
import './RSVPSection.css'

interface RSVPSectionProps {
  deadline: string
  // Reserved for future EmailJS / Formspree wiring. Submission currently
  // resolves locally so the demo works without a configured backend.
  emailjsServiceId?: string
  emailjsTemplateId?: string
  emailjsPublicKey?: string
}

export default function RSVPSection({ deadline }: RSVPSectionProps) {
  const formRef = useRef<HTMLFormElement>(null)
  const [status, setStatus] = useState<FormStatus>('idle')
  const [errors, setErrors] = useState<Partial<Record<keyof RSVPFormData, string>>>({})
  const [attendance, setAttendance] = useState<AttendanceStatus | ''>('')
  const headerRef = useScrollReveal<HTMLDivElement>({ threshold: 0.2 })
  const formWrapRef = useScrollReveal<HTMLDivElement>({ threshold: 0.1 })

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

    // Demo mode: simulate a network round-trip then succeed.
    // Wire this to EmailJS / Formspree / your backend when ready.
    await new Promise((r) => setTimeout(r, 800))
    setStatus('success')
  }

  if (status === 'success') {
    return (
      <section id="rsvp" className="rsvp">
        <div className="rsvp__inner">
          <div className="rsvp__success">
            <div className="rsvp__success-mark" aria-hidden="true">
              <svg viewBox="0 0 64 64" fill="none">
                <circle cx="32" cy="32" r="30" stroke="currentColor" strokeWidth="1" opacity="0.4" />
                <circle cx="32" cy="32" r="24" stroke="currentColor" strokeWidth="1.2" />
                <path
                  d="M20 33 L29 42 L46 24"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
            <h2 className="rsvp__success-title">
              <em>Thank you</em>
            </h2>
            <p className="rsvp__success-msg">
              Your reply is in. We'll be in touch with the finer details closer to the day —
              we cannot wait to celebrate with you.
            </p>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section id="rsvp" className="rsvp">
      <div className="rsvp__inner">
        <header className="rsvp__header reveal" ref={headerRef}>
          <span className="eyebrow">Reply</span>
          <h2 className="section-title">
            Kindly <em>respond</em>
          </h2>
          <p className="rsvp__deadline">
            We'd love your reply by <strong>{deadline}</strong>.
          </p>
        </header>

        <div className="rsvp__form-wrap reveal" ref={formWrapRef}>
          <form
            ref={formRef}
            className="rsvp__form"
            onSubmit={handleSubmit}
            noValidate
            aria-label="RSVP form"
          >
            <div className="rsvp__row">
              <div className="rsvp__field">
                <label htmlFor="fullName" className="rsvp__label">
                  Full name<span className="rsvp__req" aria-hidden="true">*</span>
                </label>
                <input
                  id="fullName"
                  name="fullName"
                  type="text"
                  className={`rsvp__input ${errors.fullName ? 'rsvp__input--error' : ''}`}
                  aria-required="true"
                  aria-invalid={!!errors.fullName}
                  aria-describedby={errors.fullName ? 'fullName-error' : undefined}
                  autoComplete="name"
                />
                {errors.fullName && (
                  <span id="fullName-error" className="rsvp__error" role="alert">
                    {errors.fullName}
                  </span>
                )}
              </div>

              <div className="rsvp__field">
                <label htmlFor="email" className="rsvp__label">
                  Email<span className="rsvp__req" aria-hidden="true">*</span>
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  className={`rsvp__input ${errors.email ? 'rsvp__input--error' : ''}`}
                  aria-required="true"
                  aria-invalid={!!errors.email}
                  aria-describedby={errors.email ? 'email-error' : undefined}
                  autoComplete="email"
                />
                {errors.email && (
                  <span id="email-error" className="rsvp__error" role="alert">
                    {errors.email}
                  </span>
                )}
              </div>
            </div>

            <fieldset className="rsvp__attendance">
              <legend className="rsvp__label">
                Will you join us?<span className="rsvp__req" aria-hidden="true">*</span>
              </legend>
              <div className="rsvp__choice-group">
                <label
                  className={`rsvp__choice ${attendance === 'yes' ? 'rsvp__choice--active' : ''}`}
                >
                  <input
                    type="radio"
                    name="attendance"
                    value="yes"
                    onChange={() => setAttendance('yes')}
                  />
                  <span className="rsvp__choice-title">Joyfully accept</span>
                  <span className="rsvp__choice-sub">We'll be there</span>
                </label>
                <label
                  className={`rsvp__choice ${attendance === 'no' ? 'rsvp__choice--active' : ''}`}
                >
                  <input
                    type="radio"
                    name="attendance"
                    value="no"
                    onChange={() => setAttendance('no')}
                  />
                  <span className="rsvp__choice-title">Regretfully decline</span>
                  <span className="rsvp__choice-sub">Sending love</span>
                </label>
              </div>
              {errors.attendance && (
                <span className="rsvp__error" role="alert">{errors.attendance}</span>
              )}
            </fieldset>

            {attendance === 'yes' && (
              <div className="rsvp__field rsvp__field--animate">
                <label htmlFor="dinnerChoice" className="rsvp__label">
                  Dinner selection<span className="rsvp__req" aria-hidden="true">*</span>
                </label>
                <select
                  id="dinnerChoice"
                  name="dinnerChoice"
                  className={`rsvp__select ${errors.dinnerChoice ? 'rsvp__input--error' : ''}`}
                  aria-required="true"
                  aria-invalid={!!errors.dinnerChoice}
                  defaultValue=""
                >
                  <option value="" disabled>Select your preference</option>
                  <option value="chicken">Chicken</option>
                  <option value="fish">Fish</option>
                  <option value="vegetarian">Vegetarian</option>
                </select>
                {errors.dinnerChoice && (
                  <span id="dinnerChoice-error" className="rsvp__error" role="alert">
                    {errors.dinnerChoice}
                  </span>
                )}
              </div>
            )}

            <div className="rsvp__field">
              <label htmlFor="dietaryNotes" className="rsvp__label">
                Dietary notes <span className="rsvp__hint">— optional</span>
              </label>
              <textarea
                id="dietaryNotes"
                name="dietaryNotes"
                className="rsvp__textarea"
                rows={2}
                placeholder="Allergies or anything we should know"
              />
            </div>

            <div className="rsvp__field">
              <label htmlFor="message" className="rsvp__label">
                A note to the couple <span className="rsvp__hint">— optional</span>
              </label>
              <textarea
                id="message"
                name="message"
                className="rsvp__textarea"
                rows={3}
                placeholder="Share a wish for the day"
              />
            </div>

            {status === 'error' && (
              <p className="rsvp__submit-error" role="alert">
                Something went wrong sending your reply. Please try again, or email us directly.
              </p>
            )}

            <button
              type="submit"
              className="rsvp__submit"
              disabled={status === 'sending'}
              aria-busy={status === 'sending'}
            >
              <span>{status === 'sending' ? 'Sending…' : 'Send reply'}</span>
              <svg viewBox="0 0 16 16" aria-hidden="true">
                <path
                  d="M2 8h12M9 3l5 5-5 5"
                  stroke="currentColor"
                  strokeWidth="1.25"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
          </form>
        </div>
      </div>
    </section>
  )
}
