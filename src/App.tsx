import { WEDDING_CONFIG } from './config'
import Nav from './components/Nav/Nav'
import HeroSection from './components/HeroSection/HeroSection'
import CountdownSection from './components/CountdownSection/CountdownSection'
import OurStorySection from './components/OurStorySection/OurStorySection'
import EventDetailsSection from './components/EventDetailsSection/EventDetailsSection'
import VenueSection from './components/VenueSketchSection/VenueSketchSection'
import DressCodeSection from './components/DressCodeSection/DressCodeSection'
import PhotoGallerySection from './components/PhotoGallerySection/PhotoGallerySection'
import RSVPSection from './components/RSVPSection/RSVPSection'
import GiftRegistrySection from './components/GiftRegistrySection/GiftRegistrySection'
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
        <OurStorySection milestones={[...WEDDING_CONFIG.milestones]} />
        <EventDetailsSection events={WEDDING_CONFIG.events} date={fullDate} />
        <VenueSection
          venueName={WEDDING_CONFIG.venueName}
          venueLocation={WEDDING_CONFIG.venueLocation}
          venueTagline={WEDDING_CONFIG.venueTagline}
        />
        <DressCodeSection
          dressStyle={WEDDING_CONFIG.dressCode.style}
          description={WEDDING_CONFIG.dressCode.description}
          columns={WEDDING_CONFIG.dressCode.columns}
          palette={WEDDING_CONFIG.dressCode.palette}
          avoid={WEDDING_CONFIG.dressCode.avoid}
        />
        <PhotoGallerySection images={[...WEDDING_CONFIG.gallery]} />
        <RSVPSection
          deadline={WEDDING_CONFIG.rsvpDeadline}
          emailjsServiceId={WEDDING_CONFIG.emailjs.serviceId}
          emailjsTemplateId={WEDDING_CONFIG.emailjs.templateId}
          emailjsPublicKey={WEDDING_CONFIG.emailjs.publicKey}
        />
        <GiftRegistrySection registryUrl={WEDDING_CONFIG.registryUrl} />
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
