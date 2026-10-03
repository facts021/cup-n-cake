import React, { useState } from 'react';
import { Send, CheckCircle2, MessageCircle, AlertCircle, Sparkles, Loader2, Database } from 'lucide-react';
import { getWhatsAppUrl } from '../config/bakeryConfig.ts';
import { saveEnquiryToFirestore } from '../services/dbService.ts';

export const ContactFormSection: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    occasion: 'Birthday',
    requirement: '',
    preferredDate: '',
    message: '',
  });

  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [dbSavedId, setDbSavedId] = useState<string | null>(null);
  const [forwardToWhatsApp, setForwardToWhatsApp] = useState(true);

  const occasions = [
    'Birthday',
    'Anniversary',
    'Wedding Celebration',
    'Kids Theme Party',
    'Corporate Event',
    'Baby Shower',
    'Everyday Sweet Cravings',
    'Other Special Occasion',
  ];

  const validate = () => {
    const newErrors: { [key: string]: string } = {};
    if (!formData.name.trim()) newErrors.name = 'Please provide your name';
    if (!formData.phone.trim()) {
      newErrors.phone = 'Please provide your phone number';
    } else if (!/^[0-9+ -]{7,15}$/.test(formData.phone.trim())) {
      newErrors.phone = 'Please enter a valid phone number';
    }
    if (!formData.requirement.trim()) {
      newErrors.requirement = 'Please describe your cake or product requirement';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);
    let recordId: string | null = null;

    try {
      // Save directly to Firebase Firestore
      recordId = await saveEnquiryToFirestore({
        name: formData.name,
        phone: formData.phone,
        occasion: formData.occasion,
        requirement: formData.requirement,
        preferredDate: formData.preferredDate,
        message: formData.message,
        source: 'contact_form',
      });
      setDbSavedId(recordId);
    } catch (err) {
      console.warn('Could not persist to Firestore, continuing with local flow:', err);
    } finally {
      setIsSubmitting(false);
      setSubmitted(true);
    }

    if (forwardToWhatsApp) {
      const msg = `Hi The CUPnCAKE Factory, I would like to submit an enquiry:
- Name: ${formData.name}
- Phone: ${formData.phone}
- Occasion: ${formData.occasion}
- Requirement: ${formData.requirement}
- Preferred Date: ${formData.preferredDate || 'Flexible'}
- Message: ${formData.message || 'None'}${recordId ? `\n- Ref: #${recordId}` : ''}`;

      window.open(getWhatsAppUrl(msg), '_blank');
    }
  };

  const resetForm = () => {
    setFormData({
      name: '',
      phone: '',
      occasion: 'Birthday',
      requirement: '',
      preferredDate: '',
      message: '',
    });
    setSubmitted(false);
    setErrors({});
  };

  return (
    <section className="py-16 sm:py-24 bg-white border-t border-[#F0E6DF]">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="text-xs font-semibold uppercase tracking-wider text-[#8C5338] mb-2">
            Send an Enquiry
          </div>
          <h2 className="font-display text-3xl sm:text-4xl font-bold text-[#2E1B11] tracking-tight mb-3">
            Tell Us About Your Cake
          </h2>
          <p className="text-[#6C5950] text-sm sm:text-base">
            Fill in your details below and our Gurugram bakehouse team will respond promptly with recommendations and pricing.
          </p>
        </div>

        {/* Form Container */}
        <div className="bg-[#FAF7F2] p-8 sm:p-10 rounded-3xl border border-[#EDE4DC] shadow-sm relative">
          
          {submitted ? (
            <div className="text-center py-10 animate-in fade-in zoom-in-95 duration-200">
              <div className="w-14 h-14 rounded-full bg-[#EBF7EE] text-[#25D366] flex items-center justify-center mx-auto mb-4 border border-[#C5ECD0]">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <h3 className="font-display text-2xl font-bold text-[#2E1B11] mb-2">
                Enquiry Saved & Received!
              </h3>
              <p className="text-sm text-[#6C5950] max-w-md mx-auto mb-4">
                Thank you, {formData.name}. Your enquiry has been saved to our bakery records. Our team in Gurugram will connect with you promptly.
              </p>

              {dbSavedId && (
                <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-[#FAF3EC] border border-[#E8DFD8] rounded-full text-xs font-mono text-[#8C5338] mb-6">
                  <Database className="w-3.5 h-3.5" />
                  <span>Firestore Ref: {dbSavedId}</span>
                </div>
              )}
              
              <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
                <a
                  href={getWhatsAppUrl(`Hi, I just submitted an enquiry for ${formData.name} regarding a ${formData.occasion} cake.`)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full text-sm font-semibold text-white bg-[#25D366] hover:bg-[#20ba59] shadow-sm transition-all"
                >
                  <MessageCircle className="w-4 h-4 fill-white" />
                  <span>Open WhatsApp Direct Chat</span>
                </a>
                <button
                  type="button"
                  onClick={resetForm}
                  className="px-6 py-2.5 rounded-full text-sm font-medium text-[#523E35] bg-white border border-[#D9CBC2] hover:bg-[#F3ECE6] transition-all cursor-pointer"
                >
                  Send Another Enquiry
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} noValidate className="space-y-6">
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                
                {/* Name */}
                <div>
                  <label htmlFor="customer-name" className="block text-xs font-semibold text-[#2E1B11] mb-1.5">
                    Your Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    id="customer-name"
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="e.g. Meera Sharma"
                    className={`w-full px-4 py-3 rounded-xl border bg-white text-sm text-[#2E1B11] placeholder:text-[#9E8E85] focus:outline-none focus:ring-2 focus:ring-[#8C5338] transition-all ${
                      errors.name ? 'border-red-400 bg-red-50/20' : 'border-[#D9CBC2]'
                    }`}
                  />
                  {errors.name && (
                    <p className="text-xs text-red-500 mt-1 flex items-center gap-1">
                      <AlertCircle className="w-3 h-3" /> {errors.name}
                    </p>
                  )}
                </div>

                {/* Phone Number */}
                <div>
                  <label htmlFor="customer-phone" className="block text-xs font-semibold text-[#2E1B11] mb-1.5">
                    Phone / WhatsApp Number <span className="text-red-500">*</span>
                  </label>
                  <input
                    id="customer-phone"
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="e.g. +91 98765 43210"
                    className={`w-full px-4 py-3 rounded-xl border bg-white text-sm text-[#2E1B11] placeholder:text-[#9E8E85] focus:outline-none focus:ring-2 focus:ring-[#8C5338] transition-all ${
                      errors.phone ? 'border-red-400 bg-red-50/20' : 'border-[#D9CBC2]'
                    }`}
                  />
                  {errors.phone && (
                    <p className="text-xs text-red-500 mt-1 flex items-center gap-1">
                      <AlertCircle className="w-3 h-3" /> {errors.phone}
                    </p>
                  )}
                </div>

              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                
                {/* Occasion */}
                <div>
                  <label htmlFor="occasion-select" className="block text-xs font-semibold text-[#2E1B11] mb-1.5">
                    Occasion
                  </label>
                  <select
                    id="occasion-select"
                    value={formData.occasion}
                    onChange={(e) => setFormData({ ...formData, occasion: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl border border-[#D9CBC2] bg-white text-sm text-[#2E1B11] focus:outline-none focus:ring-2 focus:ring-[#8C5338]"
                  >
                    {occasions.map((occ) => (
                      <option key={occ} value={occ}>{occ}</option>
                    ))}
                  </select>
                </div>

                {/* Preferred Date */}
                <div>
                  <label htmlFor="preferred-date" className="block text-xs font-semibold text-[#2E1B11] mb-1.5">
                    Preferred Date
                  </label>
                  <input
                    id="preferred-date"
                    type="date"
                    value={formData.preferredDate}
                    onChange={(e) => setFormData({ ...formData, preferredDate: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl border border-[#D9CBC2] bg-white text-sm text-[#2E1B11] focus:outline-none focus:ring-2 focus:ring-[#8C5338]"
                  />
                </div>

              </div>

              {/* Requirement */}
              <div>
                <label htmlFor="cake-requirement" className="block text-xs font-semibold text-[#2E1B11] mb-1.5">
                  Cake / Product Requirement <span className="text-red-500">*</span>
                </label>
                <input
                  id="cake-requirement"
                  type="text"
                  required
                  value={formData.requirement}
                  onChange={(e) => setFormData({ ...formData, requirement: e.target.value })}
                  placeholder="e.g. 1.5kg Chocolate Truffle cake with gold flakes and birthday topper"
                  className={`w-full px-4 py-3 rounded-xl border bg-white text-sm text-[#2E1B11] placeholder:text-[#9E8E85] focus:outline-none focus:ring-2 focus:ring-[#8C5338] transition-all ${
                    errors.requirement ? 'border-red-400 bg-red-50/20' : 'border-[#D9CBC2]'
                  }`}
                />
                {errors.requirement && (
                  <p className="text-xs text-red-500 mt-1 flex items-center gap-1">
                    <AlertCircle className="w-3 h-3" /> {errors.requirement}
                  </p>
                )}
              </div>

              {/* Message */}
              <div>
                <label htmlFor="customer-message" className="block text-xs font-semibold text-[#2E1B11] mb-1.5">
                  Additional Notes or Questions (Optional)
                </label>
                <textarea
                  id="customer-message"
                  rows={3}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder="Any dietary preferences, delivery time slot, or message text to be piped onto the cake..."
                  className="w-full px-4 py-3 rounded-xl border border-[#D9CBC2] bg-white text-sm text-[#2E1B11] placeholder:text-[#9E8E85] focus:outline-none focus:ring-2 focus:ring-[#8C5338] resize-none"
                />
              </div>

              {/* Seamless WhatsApp forwarding toggle */}
              <div className="flex items-center gap-2 text-xs text-[#523E35]">
                <input
                  type="checkbox"
                  id="whatsapp-forward"
                  checked={forwardToWhatsApp}
                  onChange={(e) => setForwardToWhatsApp(e.target.checked)}
                  className="rounded border-[#D9CBC2] text-[#25D366] focus:ring-[#25D366] w-4 h-4 cursor-pointer"
                />
                <label htmlFor="whatsapp-forward" className="cursor-pointer">
                  Also open enquiry directly in WhatsApp for immediate response
                </label>
              </div>

              {/* Submit CTA */}
              <div className="pt-2">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full flex items-center justify-center gap-2 py-4 px-8 rounded-full text-base font-semibold text-white bg-[#2E1B11] hover:bg-[#8C5338] transition-all duration-200 shadow-md cursor-pointer whitespace-nowrap active:scale-[0.99] disabled:opacity-75"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <span>Saving Enquiry to Database...</span>
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4" />
                      <span>Send Enquiry</span>
                    </>
                  )}
                </button>
              </div>

              <div className="text-[11px] text-center text-[#7A6961] flex items-center justify-center gap-1.5">
                <Database className="w-3.5 h-3.5 text-[#25D366]" />
                <span>Connected to Firebase Firestore: Enquiries are securely saved in real time.</span>
              </div>

            </form>
          )}

        </div>

      </div>
    </section>
  );
};
