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
        {/* Header row — same padding as form */}
        <div className="px-10 md:px-16 lg:px-20 pt-10 pb-6 border-b border-[#e4e3e2]">
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-8">
            {/* Title */}
            <h1
              className="text-[42px] md:text-[56px] lg:text-[68px] leading-none tracking-[-2px] text-[#383838] font-bold"
              style={{ fontFamily: 'var(--font-serif)' }}
            >
              Contact
            </h1>

            {/* Contact info — flush right, aligned to form edge */}
            <div className="flex flex-col sm:flex-row gap-10 lg:gap-16 lg:pb-1">
              <div className="flex flex-col gap-1">
                <span className="text-[11px] tracking-[1.5px] text-[#383838] uppercase font-semibold" style={{ fontFamily: 'var(--font-sans)' }}>
                  Project Inquiries
                </span>
                <a
                  href="mailto:obra.majoralia@gmail.com"
                  className="text-sm tracking-[0.5px] text-[#383838] hover:text-[#797979] transition-colors duration-200"
                  style={{ fontFamily: 'var(--font-sans)' }}
                >
                  obra.majoralia@gmail.com
                </a>
              </div>
              <div className="flex flex-col gap-1">
                <span className="text-[11px] tracking-[1.5px] text-[#383838] uppercase font-semibold" style={{ fontFamily: 'var(--font-sans)' }}>
                  Contact Number
                </span>
                <a
                  href="tel:+639672340041"
                  className="text-sm tracking-[0.5px] text-[#383838] hover:text-[#797979] transition-colors duration-200"
                  style={{ fontFamily: 'var(--font-sans)' }}
                >
                  +63 967 234 0041
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Form */}
        <form
          id="contact-form"
          data-readdy-form
          onSubmit={handleSubmit}
          className="px-10 md:px-16 lg:px-20 py-14"
        >
          {/* Row 1: First Name + Last Name */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-0 mb-0">
            <div className="border-b border-[#d0d0d0] py-5 md:pr-10">
              <label className="block text-[11px] tracking-[1.5px] text-[#383838] mb-3 uppercase font-semibold">
                First Name <span className="text-[#999]">(required)</span>
              </label>
              <input
                type="text"
                name="first_name"
                required
                className="w-full bg-transparent text-sm text-[#383838] tracking-[0.5px] outline-none placeholder-transparent"
                style={{ fontFamily: 'var(--font-sans)' }}
              />
            </div>
            <div className="border-b border-[#d0d0d0] py-5 md:pl-10">
              <label className="block text-[11px] tracking-[1.5px] text-[#383838] mb-3 uppercase font-semibold">
                Last Name
              </label>
              <input
                type="text"
                name="last_name"
                className="w-full bg-transparent text-sm text-[#383838] tracking-[0.5px] outline-none placeholder-transparent"
                style={{ fontFamily: 'var(--font-sans)' }}
              />
            </div>
          </div>

          {/* Row 2: Email + Phone */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-0 mb-0">
            <div className="border-b border-[#d0d0d0] py-5 md:pr-10">
              <label className="block text-[11px] tracking-[1.5px] text-[#383838] mb-3 uppercase font-semibold">
                Email Address <span className="text-[#999]">(required)</span>
              </label>
              <input
                type="email"
                name="email"
                required
                className="w-full bg-transparent text-sm text-[#383838] tracking-[0.5px] outline-none placeholder-transparent"
                style={{ fontFamily: 'var(--font-sans)' }}
              />
            </div>
            <div className="border-b border-[#d0d0d0] py-5 md:pl-10">
              <label className="block text-[11px] tracking-[1.5px] text-[#383838] mb-3 uppercase font-semibold">
                Phone Number
              </label>
              <input
                type="tel"
                name="phone"
                className="w-full bg-transparent text-sm text-[#383838] tracking-[0.5px] outline-none placeholder-transparent"
                style={{ fontFamily: 'var(--font-sans)' }}
              />
            </div>
          </div>

          {/* Row 3: Subject */}
          <div className="border-b border-[#d0d0d0] py-5">
            <label className="block text-[11px] tracking-[1.5px] text-[#383838] mb-3 uppercase font-semibold">
              What Can We Help You With?
            </label>
            <input
              type="text"
              name="subject"
              className="w-full bg-transparent text-sm text-[#383838] tracking-[0.5px] outline-none placeholder-transparent"
              style={{ fontFamily: 'var(--font-sans)' }}
            />
          </div>

          {/* Row 4: Message */}
          <div className="border-b border-[#d0d0d0] py-5">
            <label className="block text-[11px] tracking-[1.5px] text-[#383838] mb-3 uppercase font-semibold">
              Message <span className="text-[#999]">(required)</span>
            </label>
            <textarea
              name="message"
              required
              rows={5}
              maxLength={500}
              className="w-full bg-transparent text-sm text-[#383838] tracking-[0.5px] outline-none resize-none placeholder-transparent"
              style={{ fontFamily: 'var(--font-sans)' }}
            />
          </div>

          {/* Row 5: Attachment */}
          <div className="py-8">
            <label className="block text-[11px] tracking-[1.5px] text-[#383838] mb-4 uppercase font-semibold">
              Additional Attachment
            </label>
            <div
              className="border border-[#d0d0d0] rounded-sm h-24 flex items-center justify-center relative cursor-pointer hover:border-[#999] transition-colors duration-200"
              onDrop={handleDrop}
              onDragOver={handleDragOver}
              onClick={() => fileInputRef.current?.click()}
            >
              {fileName ? (
                <span className="text-xs tracking-[1px] text-[#383838]" style={{ fontFamily: 'var(--font-sans)' }}>
                  {fileName}
                </span>
              ) : (
                <span className="text-[10px] tracking-[2.5px] text-[#aaa] uppercase" style={{ fontFamily: 'var(--font-sans)' }}>
                  Drag &amp; Drop Files Here
                </span>
              )}
              <div className="absolute right-4 bottom-4 w-5 h-5 flex items-center justify-center text-[#aaa]">
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
          <div className="flex items-center justify-between pt-2">
            {/* Feedback */}
            <div className="text-xs tracking-[1.5px]" style={{ fontFamily: 'var(--font-sans)' }}>
              {submitState === 'success' && (
                <span className="text-[#383838]">Message sent. We&apos;ll be in touch soon.</span>
              )}
              {submitState === 'error' && (
                <span className="text-red-500">Something went wrong. Please try again.</span>
              )}
            </div>

            {/* Send button */}
            <button
              type="submit"
              disabled={submitState === 'sending'}
              className="text-sm tracking-[4px] font-semibold text-[#383838] hover:text-[#797979] transition-colors duration-200 uppercase whitespace-nowrap cursor-pointer disabled:opacity-40"
              style={{ fontFamily: 'var(--font-display)' }}
            >
              {submitState === 'sending' ? 'SENDING...' : 'SEND'}
            </button>
          </div>
        </form>
      </main>

      <Footer />
    </div>
  );
};

export default ContactPage;
