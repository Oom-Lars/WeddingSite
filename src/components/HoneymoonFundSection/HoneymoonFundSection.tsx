import { useState } from 'react'
import useScrollReveal from '../../hooks/useScrollReveal'
import './HoneymoonFundSection.css'

interface HoneymoonFundSectionProps {
  bank: string
  accountHolder: string
  // Account number split into fragments. Concatenated only after the user
  // clicks "Show details" — keeps the full number out of static HTML and
  // out of reach of dumb scrapers that don't execute JS or don't wait
  // for interaction.
  accountNumberParts: readonly string[]
  branchCode: string
  accountType: string
  referenceSuffix: string
}

function Row({ label, value }: { label: string; value: string }) {
  const [copied, setCopied] = useState(false)
  return (
    <div className="fund__row">
      <span className="fund__row-label">{label}</span>
      <div className="fund__row-value-wrap">
        <span className="fund__row-value">{value}</span>
        <button
          type="button"
          className="fund__copy"
          aria-label={`Copy ${label}`}
          onClick={async () => {
            try {
              await navigator.clipboard.writeText(value)
              setCopied(true)
              setTimeout(() => setCopied(false), 1600)
            } catch {
              // Clipboard API can fail in older browsers / over http —
              // value is still visible on screen as a fallback.
            }
          }}
        >
          {copied ? 'Copied' : 'Copy'}
        </button>
      </div>
    </div>
  )
}

export default function HoneymoonFundSection({
  bank,
  accountHolder,
  accountNumberParts,
  branchCode,
  accountType,
  referenceSuffix,
}: HoneymoonFundSectionProps) {
  const ref = useScrollReveal<HTMLDivElement>({ threshold: 0.2 })
  const [revealed, setRevealed] = useState(false)

  const accountNumber = revealed ? accountNumberParts.join('') : ''

  return (
    <section id="gift" className="fund">
      <div className="fund__inner reveal" ref={ref}>
        <span className="eyebrow">Honeymoon Fund</span>
        <h2 className="section-title">
          Your presence <em>is the gift</em>
        </h2>
        <p className="fund__note">
          Truly. But if you'd like to mark the day with something more,
          we would gratefully appreciate a contribution to our honeymoon fund.
        </p>

        {!revealed ? (
          <button
            type="button"
            className="fund__reveal-btn"
            onClick={() => setRevealed(true)}
          >
            <span>Show banking details</span>
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
        ) : (
          <div className="fund__card" role="region" aria-label="Banking details">
            <Row label="Bank" value={bank} />
            <Row label="Account holder" value={accountHolder} />
            <Row label="Account number" value={accountNumber} />
            <Row label="Branch code" value={branchCode} />
            <Row label="Account type" value={accountType} />

            <div className="fund__reference">
              <span className="fund__reference-label">Reference</span>
              <p className="fund__reference-rule">
                Please use <strong>your surname + "{referenceSuffix}"</strong> as your payment
                reference so we know who the gift is from. For example:{' '}
                <em>Smith&nbsp;{referenceSuffix}</em>.
              </p>
            </div>
          </div>
        )}
      </div>
    </section>
  )
}
