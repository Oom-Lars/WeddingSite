import { WEDDING_CONFIG } from './config'
import Nav from './components/Nav/Nav'
import HeroSection from './components/HeroSection/HeroSection'
import CountdownSection from './components/CountdownSection/CountdownSection'
import EventDetailsSection from './components/EventDetailsSection/EventDetailsSection'
import VenueSection from './components/VenueSketchSection/VenueSketchSection'
import DressCodeSection from './components/DressCodeSection/DressCodeSection'
import PhotoGallerySection from './components/PhotoGallerySection/PhotoGallerySection'
import FAQSection from './components/FAQSection/FAQSection'
import PlettFavouritesSection from './components/PlettFavouritesSection/PlettFavouritesSection'
import RSVPSection from './components/RSVPSection/RSVPSection'
import HoneymoonFundSection from './components/HoneymoonFundSection/HoneymoonFundSection'
import Footer from './components/Footer/Footer'

function App() {
  const fullDate = WEDDING_CONFIG.weddingDate.toLocaleDateString('en-GB', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  })

  const [first, second] = WEDDING_CONFIG.coupleNames.split(/\s*&\s*/)
  const monogram = `${first?.[0] ?? ''}${second?.[0] ?? ''}`

  return (
    <>
      <Nav monogram={monogram} />
      <main>
        <HeroSection
          coupleNames={WEDDING_CONFIG.coupleNames}
          weddingDate={WEDDING_CONFIG.weddingDate}
          venueName={WEDDING_CONFIG.venueName}
          venueLocation={WEDDING_CONFIG.venueLocation}
        />
        <CountdownSection weddingDate={WEDDING_CONFIG.weddingDate} />
        <EventDetailsSection events={WEDDING_CONFIG.events} date={fullDate} />
        <VenueSection
          venueName={WEDDING_CONFIG.venueName}
          venueLocation={WEDDING_CONFIG.venueLocation}
          venueTagline={WEDDING_CONFIG.venueTagline}
          venueMapsUrl={WEDDING_CONFIG.venueMapsUrl}
        />
        <DressCodeSection
          dressStyle={WEDDING_CONFIG.dressCode.style}
          columns={WEDDING_CONFIG.dressCode.columns}
          palette={WEDDING_CONFIG.dressCode.palette}
          avoid={WEDDING_CONFIG.dressCode.avoid}
        />
        <PhotoGallerySection images={[...WEDDING_CONFIG.gallery]} />
        <FAQSection faqs={WEDDING_CONFIG.faqs} />
        <PlettFavouritesSection
          eat={WEDDING_CONFIG.plettFavourites.eat}
          do={WEDDING_CONFIG.plettFavourites.do}
        />
        <RSVPSection
          deadline={WEDDING_CONFIG.rsvpDeadline}
          emailjsServiceId={WEDDING_CONFIG.emailjs.serviceId}
          emailjsTemplateId={WEDDING_CONFIG.emailjs.templateId}
          emailjsPublicKey={WEDDING_CONFIG.emailjs.publicKey}
        />
        <HoneymoonFundSection
          bank={WEDDING_CONFIG.honeymoonFund.bank}
          accountHolder={WEDDING_CONFIG.honeymoonFund.accountHolder}
          accountNumberParts={WEDDING_CONFIG.honeymoonFund.accountNumberParts}
          branchCode={WEDDING_CONFIG.honeymoonFund.branchCode}
          accountType={WEDDING_CONFIG.honeymoonFund.accountType}
          referenceSuffix={WEDDING_CONFIG.honeymoonFund.referenceSuffix}
        />
      </main>
      <Footer
        coupleNames={WEDDING_CONFIG.coupleNames}
        weddingDate={fullDate}
        monogram={monogram}
        venueLocation={WEDDING_CONFIG.venueLocation}
      />
    </>
  )
}

export default App
