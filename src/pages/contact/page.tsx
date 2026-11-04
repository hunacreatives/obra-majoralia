import { useState, useRef } from 'react';
import Navbar from '@/components/feature/Navbar';
import Footer from '@/components/feature/Footer';

type SubmitState = 'idle' | 'sending' | 'success' | 'error';

const ContactPage = () => {
  const [submitState, setSubmitState] = useState<SubmitState>('idle');
  const [fileName, setFileName] = useState<string>('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    setFileName(file ? file.name : '');
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const file = e.dataTransfer.files?.[0];
    if (file && fileInputRef.current) {
      const dt = new DataTransfer();
      dt.items.add(file);
      fileInputRef.current.files = dt.files;
      setFileName(file.name);
    }
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitState('sending');

    const form = e.currentTarget;
    const data = new URLSearchParams();

    const firstName = (form.elements.namedItem('first_name') as HTMLInputElement)?.value || '';
    const lastName = (form.elements.namedItem('last_name') as HTMLInputElement)?.value || '';
    const email = (form.elements.namedItem('email') as HTMLInputElement)?.value || '';
    const phone = (form.elements.namedItem('phone') as HTMLInputElement)?.value || '';
    const subject = (form.elements.namedItem('subject') as HTMLInputElement)?.value || '';
    const message = (form.elements.namedItem('message') as HTMLTextAreaElement)?.value || '';

    data.append('first_name', firstName);
    data.append('last_name', lastName);
    data.append('email', email);
    data.append('phone', phone);
    data.append('subject', subject);
    data.append('message', message);
    if (fileName) {
      data.append('attachment', `Uncollectable (${fileName})`);
    }

    try {
      const res = await fetch('https://readdy.ai/api/form/d78i55j2hsar0k5m0arg', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: data.toString(),
      });
      if (res.ok) {
        setSubmitState('success');
        form.reset();
        setFileName('');
      } else {
        setSubmitState('error');
      }
    } catch {
      setSubmitState('error');
    }
  };

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <Navbar />

      <main className="flex-1 pt-20">

        {/* Hero */}
        <section className="relative w-full overflow-hidden h-[44svh] md:h-[60vh]" data-theme="dark">
          <img
            src="/images/fringe-hero.webp"
            alt="Obra Majoralia"
            className="w-full h-full object-cover object-center"
            style={{ animation: 'heroScale 2s cubic-bezier(0.4,0,0.2,1) forwards', transformOrigin: 'center center' }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#383838]/60 via-[#383838]/20 to-transparent" />
          <div className="absolute bottom-6 md:bottom-10 left-6 md:left-16 lg:left-20 right-6 md:right-10">
            <h1
              className="font-bold text-title text-white"
            >
              Contact
            </h1>
          </div>
        </section>

        {/* Details (left, sticky on desktop) + form (right) */}
        <section className="grid grid-cols-1 lg:grid-cols-[5fr_7fr] border-b border-[#e4e3e2]">
          <aside className="px-6 md:px-16 lg:px-20 pt-12 md:pt-16 pb-2 lg:py-20 lg:border-r border-[#e4e3e2]">
            <div className="lg:sticky lg:top-32 flex flex-col gap-8 md:gap-14">
              <div className="flex flex-col gap-4 md:gap-5">
                <h2 className="font-bold text-heading text-[#383838]">
                  Have something <span className="text-[#797979] whitespace-nowrap">in mind?</span>
                </h2>
                <p className="text-[14px] md:text-[15px] leading-[1.6] text-[#797979] max-w-sm">
                  We&apos;d love to hear about your project. Reach out and let&apos;s start a conversation.
                </p>
              </div>

              <dl className="flex flex-col border-t border-[#e4e3e2]">
                {[
                  { label: 'Project inquiries', value: 'obra.majoralia@gmail.com', href: 'mailto:obra.majoralia@gmail.com' },
                  { label: 'Contact number', value: '+63 967 234 0041', href: 'tel:+639672340041' },
                ].map(row => (
                  <div key={row.label} className="flex flex-col py-4 md:py-5 border-b border-[#e4e3e2]">
                    <dt className="text-[11px] tracking-[2px] text-[#797979] uppercase">{row.label}</dt>
                    <dd>
                      <a href={row.href} className="inline-block py-2 font-bold text-[20px] md:text-[26px] tracking-[-0.02em] text-[#383838] hover:text-[#797979] transition-colors duration-200 break-all">
                        {row.value}
                      </a>
                    </dd>
                  </div>
                ))}
                <div className="flex flex-col gap-1 pt-4 md:pt-5 pb-2 md:pb-3 border-b border-[#e4e3e2]">
                  <dt className="text-[11px] tracking-[2px] text-[#797979] uppercase">Follow</dt>
                  <dd className="flex items-center gap-6 text-[12px] tracking-[2px] uppercase">
                    <a href="https://www.instagram.com/obra.majoralia/" target="_blank" rel="nofollow noopener noreferrer" className="py-3 text-[#383838] hover:text-[#797979] transition-colors duration-200">Instagram</a>
                    <a href="https://www.facebook.com/obramajoralia/" target="_blank" rel="nofollow noopener noreferrer" className="py-3 text-[#383838] hover:text-[#797979] transition-colors duration-200">Facebook</a>
                    <a href="https://www.linkedin.com/in/jbcruz2006/" target="_blank" rel="nofollow noopener noreferrer" className="py-3 text-[#383838] hover:text-[#797979] transition-colors duration-200">LinkedIn</a>
                  </dd>
                </div>
              </dl>
            </div>
          </aside>

        {/* Form */}
        <form
          id="contact-form"
          data-readdy-form
          onSubmit={handleSubmit}
          className="px-6 md:px-16 lg:px-20 pt-6 pb-16 md:pt-10 lg:py-20"
        >
          {/* Row 1: First Name + Last Name */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-0 mb-0">
            <div className="border-b border-[#e4e3e2] pt-5 pb-2 md:pr-10">
              <label htmlFor="contact-first_name" className="block text-[13px] tracking-[1.5px] text-[#383838] mb-1 uppercase font-semibold cursor-pointer">
                First Name <span className="text-[#797979]">(required)</span>
              </label>
              <input
                type="text"
                id="contact-first_name"
                name="first_name"
                required
                className="w-full h-11 bg-transparent text-base text-[#383838] tracking-normal outline-none placeholder-transparent"
              />
            </div>
            <div className="border-b border-[#e4e3e2] pt-5 pb-2 md:pl-10">
              <label htmlFor="contact-last_name" className="block text-[13px] tracking-[1.5px] text-[#383838] mb-1 uppercase font-semibold cursor-pointer">
                Last Name
              </label>
              <input
                type="text"
                id="contact-last_name"
                name="last_name"
                className="w-full h-11 bg-transparent text-base text-[#383838] tracking-normal outline-none placeholder-transparent"
              />
            </div>
          </div>

          {/* Row 2: Email + Phone */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-0 mb-0">
            <div className="border-b border-[#e4e3e2] pt-5 pb-2 md:pr-10">
              <label htmlFor="contact-email" className="block text-[13px] tracking-[1.5px] text-[#383838] mb-1 uppercase font-semibold cursor-pointer">
                Email Address <span className="text-[#797979]">(required)</span>
              </label>
              <input
                type="email"
                id="contact-email"
                name="email"
                required
                className="w-full h-11 bg-transparent text-base text-[#383838] tracking-normal outline-none placeholder-transparent"
              />
            </div>
            <div className="border-b border-[#e4e3e2] pt-5 pb-2 md:pl-10">
              <label htmlFor="contact-phone" className="block text-[13px] tracking-[1.5px] text-[#383838] mb-1 uppercase font-semibold cursor-pointer">
                Phone Number
              </label>
              <input
                type="tel"
                id="contact-phone"
                name="phone"
                className="w-full h-11 bg-transparent text-base text-[#383838] tracking-normal outline-none placeholder-transparent"
              />
            </div>
          </div>

          {/* Row 3: Subject */}
          <div className="border-b border-[#e4e3e2] pt-5 pb-2">
            <label htmlFor="contact-subject" className="block text-[13px] tracking-[1.5px] text-[#383838] mb-1 uppercase font-semibold cursor-pointer">
              What Can We Help You With?
            </label>
            <input
              type="text"
              id="contact-subject"
              name="subject"
              className="w-full h-11 bg-transparent text-base text-[#383838] tracking-normal outline-none placeholder-transparent"
            />
          </div>

          {/* Row 4: Message */}
          <div className="border-b border-[#e4e3e2] pt-5 pb-2">
            <label htmlFor="contact-message" className="block text-[13px] tracking-[1.5px] text-[#383838] mb-1 uppercase font-semibold cursor-pointer">
              Message <span className="text-[#797979]">(required)</span>
            </label>
            <textarea
              id="contact-message"
              name="message"
              required
              rows={5}
              maxLength={500}
              className="w-full py-2 bg-transparent text-base text-[#383838] tracking-normal outline-none resize-none placeholder-transparent"
            />
          </div>

          {/* Row 5: Attachment */}
          <div className="py-8">
            <label className="block text-[13px] tracking-[1.5px] text-[#383838] mb-4 uppercase font-semibold">
              Additional Attachment
            </label>
            <div
              className="border border-[#e4e3e2] rounded-sm h-24 flex items-center justify-center relative cursor-pointer hover:border-[#797979] transition-colors duration-200"
              onDrop={handleDrop}
              onDragOver={handleDragOver}
              onClick={() => fileInputRef.current?.click()}
            >
              {fileName ? (
                <span className="text-base tracking-[1px] text-[#383838] px-8 text-center truncate">
                  {fileName}
                </span>
              ) : (
                <>
                  <span className="hidden md:inline text-[12px] tracking-[1.5px] text-[#797979] uppercase">
                    Drag &amp; Drop Files Here
                  </span>
                  <span className="md:hidden text-[12px] tracking-[1.5px] text-[#797979] uppercase">
                    Tap to Upload File
                  </span>
                </>
              )}
              <div className="absolute right-4 bottom-4 w-5 h-5 flex items-center justify-center text-[#797979]">
                <i className="ri-attachment-2 text-base" />
              </div>
              <input
                ref={fileInputRef}
                type="file"
                className="hidden"
                onChange={handleFileChange}
              />
            </div>
          </div>

          {/* Submit row */}
          <div className="flex flex-col-reverse md:flex-row md:items-center justify-between gap-4 pt-2">
            {/* Feedback */}
            <div className="text-base tracking-[1.5px]">
              {submitState === 'success' && (
                <span className="text-[#383838]">Message sent. We&apos;ll be in touch soon.</span>
              )}
              {submitState === 'error' && (
                <span className="font-bold text-[#383838]">Something went wrong. Please try again.</span>
              )}
            </div>

            {/* Send button */}
            <button
              type="submit"
              disabled={submitState === 'sending'}
              className="w-full md:w-auto h-12 md:h-auto border border-[#383838] md:border-0 rounded-sm md:rounded-none text-[14px] md:text-base tracking-[2px] font-semibold text-[#383838] hover:text-[#797979] hover:border-[#797979] md:hover:border-0 transition-colors duration-200 uppercase whitespace-nowrap cursor-pointer disabled:opacity-40"
            >
              {submitState === 'sending' ? 'SENDING...' : 'SEND'}
            </button>
          </div>
        </form>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default ContactPage;
