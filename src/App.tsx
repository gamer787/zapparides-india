import React, { useState } from 'react';
import { Toaster } from 'react-hot-toast';
import { Modal } from './components/ui/Modal';
import { LoginButton } from './components/ui/LoginButton';
import { WaitlistForm } from './components/WaitlistForm';
import { ContactForm } from './components/ContactForm';
import { Hero } from './components/sections/Hero';
import { Features } from './components/sections/Features';
import { WhyUsSection } from './components/sections/WhyUsSection';
import { AboutSection } from './components/sections/AboutSection';
import { ContactSection } from './components/sections/ContactSection';
import { FAQSection } from './components/sections/FAQSection';
import { EnterpriseSection } from './components/sections/EnterpriseSection';
import { ParentCompanySection } from './components/sections/ParentCompanySection';
import { SocialLinks } from './components/sections/SocialLinks';
import { DriversSection } from './components/sections/DriversSection';
import { DriverIntakeSection } from './components/sections/DriverIntakeSection';

export default function App() {
  const [showWaitlist, setShowWaitlist] = useState(false);
  const [showContact, setShowContact] = useState(false);

  return (
    <div className="min-h-screen bg-black text-white">
      <Toaster position="top-center" />
      
      <div className="fixed top-4 right-4 z-50">
        <LoginButton />
      </div>
      
      <Hero onWaitlistClick={() => setShowWaitlist(true)} />
      <Features />
      <AboutSection />
      <WhyUsSection />
      <DriversSection />
      <DriverIntakeSection />
      <ContactSection />
      <EnterpriseSection />
      <FAQSection />
      <ParentCompanySection />
      <SocialLinks onContactClick={() => setShowContact(true)} />

      {showWaitlist && (
        <Modal title="Join the Waitlist" onClose={() => setShowWaitlist(false)}>
          <WaitlistForm />
        </Modal>
      )}

      {showContact && (
        <Modal title="Contact Us" onClose={() => setShowContact(false)}>
          <ContactForm />
        </Modal>
      )}
    </div>
  );
}