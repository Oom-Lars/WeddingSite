import { useState } from 'react'
import useScrollReveal from '../../hooks/useScrollReveal'
import './FAQSection.css'

export interface FAQItem {
  q: string
  a: string
}

interface FAQSectionProps {
  faqs: readonly FAQItem[]
}

function Item({ faq, index }: { faq: FAQItem; index: number }) {
  const [open, setOpen] = useState(false)
  const id = `faq-${index}`

  return (
    <div className={`faq__item ${open ? 'faq__item--open' : ''}`}>
      <button
        type="button"
        className="faq__q"
        aria-expanded={open}
        aria-controls={id}
        onClick={() => setOpen((v) => !v)}
      >
        <span className="faq__q-text">{faq.q}</span>
        <span className="faq__q-icon" aria-hidden="true">
          <svg viewBox="0 0 16 16">
            <path
              d="M3 6l5 5 5-5"
              stroke="currentColor"
              strokeWidth="1.25"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </span>
      </button>
      <div id={id} className="faq__a-wrap" role="region" aria-hidden={!open}>
        <p className="faq__a">{faq.a}</p>
      </div>
    </div>
  )
}

export default function FAQSection({ faqs }: FAQSectionProps) {
  const headerRef = useScrollReveal<HTMLDivElement>({ threshold: 0.2 })

  return (
    <section id="faq" className="faq">
      <div className="faq__inner">
        <header className="faq__header reveal" ref={headerRef}>
          <span className="eyebrow">Good to know</span>
          <h2 className="section-title">
            A few <em>questions</em>, answered
          </h2>
        </header>

        <div className="faq__list">
          {faqs.map((f, i) => (
            <Item key={f.q} faq={f} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}
