import React, { useState } from 'react';
import { Header } from './components/Header.tsx';
import { Hero } from './components/Hero.tsx';
import { CategorySection } from './components/CategorySection.tsx';
import { AboutSection } from './components/AboutSection.tsx';
import { FeaturedProducts } from './components/FeaturedProducts.tsx';
import { CustomCakeSection } from './components/CustomCakeSection.tsx';
import { HowToOrder } from './components/HowToOrder.tsx';
import { GallerySection } from './components/GallerySection.tsx';
import { ReviewsSection } from './components/ReviewsSection.tsx';
import { LocationSection } from './components/LocationSection.tsx';
import { ContactFormSection } from './components/ContactFormSection.tsx';
import { SpecialOccasionCTA } from './components/SpecialOccasionCTA.tsx';
import { Footer } from './components/Footer.tsx';
import { FloatingWhatsApp } from './components/FloatingWhatsApp.tsx';
import { AdminInboxModal } from './components/AdminInboxModal.tsx';

export default function App() {
  const [selectedProductCategory, setSelectedProductCategory] = useState<
    'all' | 'cakes' | 'cupcakes' | 'custom' | 'treats'
  >('all');
  const [isAdminModalOpen, setIsAdminModalOpen] = useState(false);

  const scrollToSection = (sectionId: string) => {
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleCategoryExplore = (catKey: 'cakes' | 'cupcakes' | 'custom' | 'treats') => {
    setSelectedProductCategory(catKey);
    scrollToSection('menu');
  };

  return (
    <div className="min-h-screen bg-[#FAF7F2] text-[#2C1810] flex flex-col font-sans selection:bg-[#E8D6CB]">
      {/* Sticky Header Navigation */}
      <Header 
        onNavigate={scrollToSection} 
        onOpenAdmin={() => setIsAdminModalOpen(true)} 
      />

      <main className="flex-grow">
        {/* 1. Hero Section */}
        <Hero onExploreMenu={() => scrollToSection('menu')} />

        {/* 2. Quick Category Cards Section */}
        <CategorySection onSelectCategory={handleCategoryExplore} />

        {/* 3. About Section */}
        <AboutSection onContactClick={() => scrollToSection('contact')} />

        {/* 4. Featured Products Grid */}
        <FeaturedProducts
          selectedCategory={selectedProductCategory}
          onCategoryChange={setSelectedProductCategory}
        />

        {/* 5. Custom Cake Section */}
        <CustomCakeSection />

        {/* 6. How To Order (3 Steps) */}
        <HowToOrder />

        {/* 7. Gallery Section */}
        <GallerySection />

        {/* 8. Customer Reviews Section */}
        <ReviewsSection />

        {/* 9. Location & Contact Info */}
        <LocationSection />

        {/* 10. Direct Enquiry Form with Firebase Persistence */}
        <ContactFormSection />

        {/* 11. Special Occasion Conversion CTA */}
        <SpecialOccasionCTA onContactClick={() => scrollToSection('contact')} />
      </main>

      {/* 12. Footer */}
      <Footer 
        onNavigate={scrollToSection} 
        onOpenAdmin={() => setIsAdminModalOpen(true)} 
      />

      {/* 13. Mobile & Desktop Floating WhatsApp Action */}
      <FloatingWhatsApp />

      {/* 14. Bakery Owner Orders & Enquiries Portal (Firebase Auth & Firestore) */}
      <AdminInboxModal 
        isOpen={isAdminModalOpen} 
        onClose={() => setIsAdminModalOpen(false)} 
      />
    </div>
  );
}
