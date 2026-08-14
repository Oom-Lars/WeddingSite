import { useState, useRef } from 'react'
import emailjs from '@emailjs/browser'
import useScrollReveal from '../../hooks/useScrollReveal'
import { images } from '../../data/images'
import {
  validateRSVPForm,
  ALLERGENS,
  DINNER_OPTIONS,
  dinnerOptionText,
} from '../../utils/validateRSVPForm'
import type {
  RSVPFormData,
  AttendanceStatus,
  DinnerChoice,
  Allergen,
  FormStatus,
} from '../../utils/validateRSVPForm'
import './RSVPSection.css'

interface RSVPSectionProps {
  deadline: string
  emailjsServiceId?: string
  emailjsTemplateId?: string
  emailjsPublicKey?: string
}

function formatDinnerChoice(choice: DinnerChoice | undefined): string {
  if (!choice) return '—'
  const option = DINNER_OPTIONS.find((o) => o.value === choice)
  return option ? dinnerOptionText(option) : '—'
}

function formatAllergyList(allergies: Allergen[] | undefined, other: string | undefined): string {
  const items: string[] = []
  if (allergies && allergies.length > 0) items.push(...allergies)
  if (other && other.trim()) items.push(other.trim())
  return items.length > 0 ? items.join(', ') : 'None'
}

export default function RSVPSection({
  deadline,
  emailjsServiceId,
  emailjsTemplateId,
  emailjsPublicKey,
}: RSVPSectionProps) {
  const formRef = useRef<HTMLFormElement>(null)
  const [status, setStatus] = useState<FormStatus>('idle')
  const [errors, setErrors] = useState<Partial<Record<keyof RSVPFormData, string>>>({})
  const [attendance, setAttendance] = useState<AttendanceStatus | ''>('')
  const [hasPlusOne, setHasPlusOne] = useState(false)
  const [otherAllergyChecked, setOtherAllergyChecked] = useState(false)
  const [otherPlusOneAllergyChecked, setOtherPlusOneAllergyChecked] = useState(false)

  const headerRef = useScrollReveal<HTMLDivElement>({ threshold: 0.2 })
  const photoRef = useScrollReveal<HTMLDivElement>({ threshold: 0.15 })
  const formWrapRef = useScrollReveal<HTMLDivElement>({ threshold: 0.1 })

  const emailEnabled = !!(emailjsServiceId && emailjsTemplateId && emailjsPublicKey)

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    if (!formRef.current) return

    const formData = new FormData(formRef.current)
    const data: RSVPFormData = {
      fullName: (formData.get('fullName') as string) ?? '',
      email: (formData.get('email') as string) ?? '',
      attendance: (formData.get('attendance') as AttendanceStatus) ?? 'no',
      dinnerChoice: (formData.get('dinnerChoice') as DinnerChoice) || undefined,
      allergies: formData.getAll('allergies') as Allergen[],
      otherAllergy: (formData.get('otherAllergy') as string) || undefined,
      hasPlusOne: formData.get('hasPlusOne') === 'on',
      plusOneName: (formData.get('plusOneName') as string) || undefined,
      plusOneDinnerChoice:
        (formData.get('plusOneDinnerChoice') as DinnerChoice) || undefined,
      plusOneAllergies: formData.getAll('plusOneAllergies') as Allergen[],
      plusOneOtherAllergy: (formData.get('plusOneOtherAllergy') as string) || undefined,
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

    if (emailEnabled) {
      try {
        await emailjs.send(
          emailjsServiceId!,
          emailjsTemplateId!,
          {
            full_name: data.fullName,
            guest_email: data.email,
            attendance: data.attendance === 'yes' ? 'Accepts' : 'Declines',
            dinner_choice: formatDinnerChoice(data.dinnerChoice),
            allergies: formatAllergyList(data.allergies, data.otherAllergy),
            plus_one_name: data.hasPlusOne ? data.plusOneName : 'None',
            plus_one_dinner_choice: data.hasPlusOne
              ? formatDinnerChoice(data.plusOneDinnerChoice)
              : '—',
            plus_one_allergies: data.hasPlusOne
              ? formatAllergyList(data.plusOneAllergies, data.plusOneOtherAllergy)
              : '—',
            dietary_notes: data.dietaryNotes ?? '—',
            message: data.message ?? '—',
          },
          { publicKey: emailjsPublicKey! }
        )
        setStatus('success')
      } catch {
        setStatus('error')
      }
    } else {
      // Demo mode — simulate a round-trip then succeed.
      await new Promise((r) => setTimeout(r, 800))
      setStatus('success')
    }
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

        <div className="rsvp__layout">
          <aside className="rsvp__photo reveal" ref={photoRef} aria-hidden="true">
            <div className="rsvp__photo-frame">
              <img
                src={images.gallery[0]}
                alt=""
                loading="lazy"
              />
              <div className="rsvp__photo-stamp">
                <span className="rsvp__photo-stamp-line">Save the date</span>
                <span className="rsvp__photo-stamp-rule" />
                <span className="rsvp__photo-stamp-line rsvp__photo-stamp-line--small">
                  Plettenberg Bay
                </span>
              </div>
            </div>
            <p className="rsvp__photo-caption">
              <em>"The greatest happiness of life is the conviction that we are loved."</em>
            </p>
          </aside>

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
                    {DINNER_OPTIONS.map((o) => (
                      <option key={o.value} value={o.value}>
                        {dinnerOptionText(o)}
                      </option>
                    ))}
                  </select>
                  {errors.dinnerChoice && (
                    <span id="dinnerChoice-error" className="rsvp__error" role="alert">
                      {errors.dinnerChoice}
                    </span>
                  )}
                </div>
              )}

              {attendance === 'yes' && (
                <fieldset className="rsvp__allergies rsvp__field--animate">
                  <legend className="rsvp__label">
                    Dietary requirements <span className="rsvp__hint">— optional</span>
                  </legend>
                  <p className="rsvp__hint-block">
                    Tick anything you cannot eat. We'll make sure the kitchen knows.
                  </p>
                  <div className="rsvp__allergy-grid">
                    {ALLERGENS.map((a) => (
                      <label key={a} className="rsvp__chip">
                        <input type="checkbox" name="allergies" value={a} />
                        <span className="rsvp__chip-label">{a}</span>
                      </label>
                    ))}
                    <label className="rsvp__chip">
                      <input
                        type="checkbox"
                        checked={otherAllergyChecked}
                        onChange={(e) => setOtherAllergyChecked(e.target.checked)}
                      />
                      <span className="rsvp__chip-label">Other</span>
                    </label>
                  </div>
                  {otherAllergyChecked && (
                    <input
                      type="text"
                      name="otherAllergy"
                      className="rsvp__input rsvp__field--animate"
                      placeholder="Please specify (e.g. sesame, soy, eggs)"
                      aria-label="Other allergy or dietary requirement"
                    />
                  )}
                </fieldset>
              )}

              {attendance === 'yes' && (
                <fieldset className="rsvp__plusone rsvp__field--animate">
                  <legend className="rsvp__label">Plus one</legend>
                  <p className="rsvp__hint-block">
                    Plus-ones are only available if you were personally invited with one.
                    If unsure, please leave this unchecked.
                  </p>
                  <label className="rsvp__toggle">
                    <input
                      type="checkbox"
                      name="hasPlusOne"
                      checked={hasPlusOne}
                      onChange={(e) => setHasPlusOne(e.target.checked)}
                    />
                    <span className="rsvp__toggle-mark" aria-hidden="true" />
                    <span className="rsvp__toggle-label">
                      I was invited with a plus one and will be bringing them
                    </span>
                  </label>

                  {hasPlusOne && (
                    <div className="rsvp__plusone-fields">
                      <div className="rsvp__field">
                        <label htmlFor="plusOneName" className="rsvp__label">
                          Plus-one's name
                          <span className="rsvp__req" aria-hidden="true">*</span>
                        </label>
                        <input
                          id="plusOneName"
                          name="plusOneName"
                          type="text"
                          className={`rsvp__input ${errors.plusOneName ? 'rsvp__input--error' : ''}`}
                          aria-required="true"
                          aria-invalid={!!errors.plusOneName}
                        />
                        {errors.plusOneName && (
                          <span className="rsvp__error" role="alert">{errors.plusOneName}</span>
                        )}
                      </div>

                      <div className="rsvp__field">
                        <label htmlFor="plusOneDinnerChoice" className="rsvp__label">
                          Their dinner selection
                          <span className="rsvp__req" aria-hidden="true">*</span>
                        </label>
                        <select
                          id="plusOneDinnerChoice"
                          name="plusOneDinnerChoice"
                          className={`rsvp__select ${errors.plusOneDinnerChoice ? 'rsvp__input--error' : ''}`}
                          aria-required="true"
                          aria-invalid={!!errors.plusOneDinnerChoice}
                          defaultValue=""
                        >
                          <option value="" disabled>Select their preference</option>
                          {DINNER_OPTIONS.map((o) => (
                            <option key={o.value} value={o.value}>
                              {dinnerOptionText(o)}
                            </option>
                          ))}
                        </select>
                        {errors.plusOneDinnerChoice && (
                          <span className="rsvp__error" role="alert">
                            {errors.plusOneDinnerChoice}
                          </span>
                        )}
                      </div>

                      <fieldset className="rsvp__allergies">
                        <legend className="rsvp__label">
                          Their dietary requirements <span className="rsvp__hint">— optional</span>
                        </legend>
                        <div className="rsvp__allergy-grid">
                          {ALLERGENS.map((a) => (
                            <label key={a} className="rsvp__chip">
                              <input type="checkbox" name="plusOneAllergies" value={a} />
                              <span className="rsvp__chip-label">{a}</span>
                            </label>
                          ))}
                          <label className="rsvp__chip">
                            <input
                              type="checkbox"
                              checked={otherPlusOneAllergyChecked}
                              onChange={(e) => setOtherPlusOneAllergyChecked(e.target.checked)}
                            />
                            <span className="rsvp__chip-label">Other</span>
                          </label>
                        </div>
                        {otherPlusOneAllergyChecked && (
                          <input
                            type="text"
                            name="plusOneOtherAllergy"
                            className="rsvp__input rsvp__field--animate"
                            placeholder="Please specify"
                            aria-label="Other plus-one allergy or dietary requirement"
                          />
                        )}
                      </fieldset>
                    </div>
                  )}
                </fieldset>
              )}

              <div className="rsvp__field">
                <label htmlFor="dietaryNotes" className="rsvp__label">
                  Anything else? <span className="rsvp__hint">— optional</span>
                </label>
                <textarea
                  id="dietaryNotes"
                  name="dietaryNotes"
                  className="rsvp__textarea"
                  rows={2}
                  placeholder="Other notes for the kitchen, accessibility, etc."
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
      </div>
    </section>
  )
}
