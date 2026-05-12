import { WEDDING_CONFIG } from './config'
import Nav from './components/Nav/Nav'
import HeroSection from './components/HeroSection/HeroSection'
import CountdownSection from './components/CountdownSection/CountdownSection'
import OurStorySection from './components/OurStorySection/OurStorySection'
import EventDetailsSection from './components/EventDetailsSection/EventDetailsSection'
import type { EventInfo } from './components/EventDetailsSection/EventDetailsSection'
import VenueSketchSection from './components/VenueSketchSection/VenueSketchSection'
import DressCodeSection from './components/DressCodeSection/DressCodeSection'
import type { DressCodeColumn } from './components/DressCodeSection/DressCodeSection'
import PhotoGallerySection from './components/PhotoGallerySection/PhotoGallerySection'
import RSVPSection from './components/RSVPSection/RSVPSection'
import GiftRegistrySection from './components/GiftRegistrySection/GiftRegistrySection'
import Footer from './components/Footer/Footer'
import type { TimelineMilestone } from './components/OurStorySection/OurStorySection'
import type { GalleryImage } from './components/PhotoGallerySection/PhotoGallerySection'

function App() {
  const formattedDate = WEDDING_CONFIG.weddingDate.toLocaleDateString('en-US', {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  })

  return (
    <>
      <Nav />
      <main>
        <HeroSection />
        <CountdownSection weddingDate={WEDDING_CONFIG.weddingDate} />
        <OurStorySection milestones={WEDDING_CONFIG.milestones as unknown as TimelineMilestone[]} />
        <EventDetailsSection events={WEDDING_CONFIG.events as unknown as [EventInfo, EventInfo]} />
        <VenueSketchSection venueName={WEDDING_CONFIG.venueName} />
        <DressCodeSection
          dressStyle={WEDDING_CONFIG.dressCode.style}
          columns={WEDDING_CONFIG.dressCode.columns as unknown as [DressCodeColumn, DressCodeColumn]}
        />
        <PhotoGallerySection images={WEDDING_CONFIG.gallery as unknown as GalleryImage[]} />
        <RSVPSection
          emailjsServiceId={WEDDING_CONFIG.emailjs.serviceId}
          emailjsTemplateId={WEDDING_CONFIG.emailjs.templateId}
          emailjsPublicKey={WEDDING_CONFIG.emailjs.publicKey}
        />
        <GiftRegistrySection registryUrl={WEDDING_CONFIG.registryUrl} />
      </main>
      <Footer
        coupleNames={WEDDING_CONFIG.coupleNames}
        weddingDate={formattedDate}
      />
    </>
  )
}

export default App
