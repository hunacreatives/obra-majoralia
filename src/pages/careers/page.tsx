import { useState, useRef } from 'react';
import Navbar from '@/components/feature/Navbar';
import Footer from '@/components/feature/Footer';

type SubmitState = 'idle' | 'sending' | 'success' | 'error';

const WHY_ITEMS = [
  {
    title: 'Design Excellence',
    description: 'Work alongside award-winning architects on projects that push the boundaries of form and function.',
    img: '/images/careers-why-1.webp',
  },
  {
    title: 'Collaborative Culture',
    description: 'A studio built on open dialogue, shared ideas, and a deep respect for every voice in the room.',
    img: '/images/careers-why-2.webp',
  },
  {
    title: 'Meaningful Projects',
    description: 'From private residences to monumental civic works — every project carries purpose and lasting impact.',
    img: '/images/careers-why-3.webp',
  },
];

const POSITIONS = [
  {
    id: 1,
    title: 'Senior Architect',
    type: 'Full-Time',
    location: 'Cebu, Philippines',
    description: 'Lead design development on residential and commercial projects from concept through construction documentation. Minimum 5 years experience in architectural practice required. Proficiency in AutoCAD, Revit, and SketchUp essential.',
  },
  {
    id: 2,
    title: 'Junior Architect',
    type: 'Full-Time',
    location: 'Cebu, Philippines',
    description: 'Support senior architects in design development, drafting, and project coordination. Fresh graduates with strong portfolio welcome to apply. Proficiency in AutoCAD and SketchUp required.',
  },
  {
    id: 3,
    title: 'Interior Designer',
    type: 'Full-Time',
    location: 'Cebu, Philippines',
    description: 'Develop interior design concepts for high-end residential and hospitality projects. Strong spatial sensibility, material knowledge, and FF&E specification experience required.',
  },
  {
    id: 4,
    title: '3D Visualizer',
    type: 'Full-Time',
    location: 'Cebu, Philippines',
    description: 'Create photorealistic architectural visualizations and animations. Proficiency in 3ds Max, V-Ray or Lumion required. Strong eye for lighting, composition, and material rendering.',
  },
  {
    id: 5,
    title: 'Project Manager',
    type: 'Full-Time',
    location: 'Cebu, Philippines',
    description: 'Oversee project timelines, budgets, and client communications across multiple active projects. Background in architecture or construction management with minimum 3 years experience.',
  },
];

const CareersPage = () => {
  const [openPosition, setOpenPosition] = useState<number | null>(null);
  const [submitState, setSubmitState] = useState<SubmitState>('idle');
  const [fileName, setFileName] = useState('');
  const [selectedPosition, setSelectedPosition] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const togglePosition = (id: number) => {
    setOpenPosition(prev => (prev === id ? null : id));
  };

  const handleApply = (title: string) => {
    setSelectedPosition(title);
    document.getElementById('application-form')?.scrollIntoView({ behavior: 'smooth' });
  };

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

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitState('sending');
    const form = e.currentTarget;
    const data = new URLSearchParams();
    data.append('first_name', (form.elements.namedItem('first_name') as HTMLInputElement)?.value || '');
    data.append('last_name', (form.elements.namedItem('last_name') as HTMLInputElement)?.value || '');
    data.append('email', (form.elements.namedItem('email') as HTMLInputElement)?.value || '');
    data.append('phone', (form.elements.namedItem('phone') as HTMLInputElement)?.value || '');
    data.append('position', (form.elements.namedItem('position') as HTMLInputElement)?.value || '');
    data.append('message', (form.elements.namedItem('message') as HTMLTextAreaElement)?.value || '');
    if (fileName) data.append('resume', `Uncollectable (${fileName})`);

    try {
      const res = await fetch('https://readdy.ai/api/form/d78i5rhrcamcd36db3c0', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: data.toString(),
      });
      if (res.ok) {
        setSubmitState('success');
        form.reset();
        setFileName('');
        setSelectedPosition('');
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

        {/* ── Page Title ── */}
        <div className="px-6 md:px-16 lg:px-20 pt-10 pb-6 border-b border-[#e4e3e2]">
          <h1
            className="text-[42px] md:text-[56px] lg:text-[68px] leading-none tracking-[-2px] text-[#383838] font-bold"
            style={{ fontFamily: 'var(--font-serif)' }}
          >
            Careers
          </h1>
        </div>

        {/* ── Hero Image ── */}
        <div className="w-full h-[40vh] md:h-[50vh] overflow-hidden">
          <img
            src="/images/careers-hero-1.webp"
            alt="Obra Majoralia Studio"
            className="w-full h-full object-cover object-center"
          />
        </div>

        {/* ── Why Work With Us ── */}
        <section className="px-6 md:px-16 lg:px-20 py-20 border-b border-[#e4e3e2]">
          <h2
            className="text-[28px] md:text-[44px] font-bold leading-none tracking-[-1.5px] text-[#383838] mb-10 md:mb-14"
            style={{ fontFamily: 'var(--font-sans)' }}
          >
            Why Work With Us?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {WHY_ITEMS.map((item) => (
              <div key={item.title} className="flex flex-col gap-5">
                <div className="w-full h-48 md:h-72 overflow-hidden">
                  <img
                    src={item.img}
                    alt={item.title}
                    className="w-full h-full object-cover object-top transition-transform duration-700 hover:scale-105"
                  />
                </div>
                <div>
                  <p
                    className="text-base font-bold tracking-[1.5px] text-[#383838] mb-2"
                    style={{ fontFamily: 'var(--font-sans)' }}
                  >
                    {item.title}
                  </p>
                  <p
                    className="text-sm md:text-base tracking-[0.5px] text-[#797979] leading-relaxed text-justify"
                    style={{ fontFamily: 'var(--font-sans)' }}
                  >
                    {item.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ── Open Positions ── */}
        <section className="px-6 md:px-16 lg:px-20 py-20 border-b border-[#e4e3e2]">
          <h2
            className="text-[28px] md:text-[44px] font-bold leading-none tracking-[-1.5px] text-[#383838] mb-10 md:mb-14"
            style={{ fontFamily: 'var(--font-sans)' }}
          >
            Open Positions
          </h2>

          <div className="flex flex-col">
            {POSITIONS.map((pos) => (
              <div key={pos.id} className="border-t border-[#e4e3e2] last:border-b">
                {/* Row header */}
                <button
                  type="button"
                  className="w-full flex items-center justify-between py-6 cursor-pointer group"
                  onClick={() => togglePosition(pos.id)}
                >
                  <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-10 text-left">
                    <span
                      className="text-base font-bold tracking-[1.5px] text-[#383838] group-hover:text-[#797979] transition-colors duration-200"
                      style={{ fontFamily: 'var(--font-sans)' }}
                    >
                      {pos.title}
                    </span>
                    <div className="flex items-center gap-6">
                      <span
                        className="text-[12px] tracking-[2px] text-[#999] uppercase"
                        style={{ fontFamily: 'var(--font-sans)' }}
                      >
                        {pos.type}
                      </span>
                      <span
                        className="text-[12px] tracking-[2px] text-[#999] uppercase"
                        style={{ fontFamily: 'var(--font-sans)' }}
                      >
                        {pos.location}
                      </span>
                    </div>
                  </div>
                  <div className="w-5 h-5 flex items-center justify-center text-[#999] flex-shrink-0 ml-4">
                    <i className={`ri-${openPosition === pos.id ? 'subtract' : 'add'}-line text-base transition-transform duration-200`} />
                  </div>
                </button>

                {/* Expanded content */}
                <div
                  className={`overflow-hidden transition-all duration-300 ${openPosition === pos.id ? 'max-h-60 pb-8' : 'max-h-0'}`}
                >
                  <p
                    className="text-sm md:text-base tracking-[0.5px] text-[#797979] leading-loose max-w-2xl mb-6 text-justify"
                    style={{ fontFamily: 'var(--font-sans)' }}
                  >
                    {pos.description}
                  </p>
                  <button
                    type="button"
                    onClick={() => handleApply(pos.title)}
                    className="text-[12px] tracking-[3px] font-semibold text-[#383838] border-b border-[#1a1a1a] pb-[2px] hover:text-[#797979] hover:border-[#797979] transition-colors duration-200 uppercase whitespace-nowrap cursor-pointer"
                    style={{ fontFamily: 'var(--font-display)' }}
                  >
                    APPLY FOR THIS ROLE
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ── Application Form ── */}
        <section id="application-form" className="px-6 md:px-16 lg:px-20 py-10 md:py-20">
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-3 mb-8 md:mb-14 border-b border-[#e4e3e2] pb-6 md:pb-10">
            <h2
              className="text-[36px] md:text-[56px] lg:text-[68px] leading-none tracking-[-2px] text-[#383838] font-bold"
              style={{ fontFamily: 'var(--font-serif)' }}
            >
              Apply Now
            </h2>
            <p
              className="text-base tracking-[0.5px] text-[#999]"
              style={{ fontFamily: 'var(--font-sans)' }}
            >
              Send us your portfolio and resume. We&apos;ll reach out if there&apos;s a fit.
            </p>
          </div>

          <form
            id="careers-form"
            data-readdy-form
            onSubmit={handleSubmit}
          >
            {/* Row 1: First + Last */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-0">
              <div className="border-b border-[#d0d0d0] py-5 md:pr-10">
                <label className="block text-[13px] tracking-[1.5px] text-[#383838] mb-3 uppercase font-semibold">
                  First Name <span className="text-[#999]">(required)</span>
                </label>
                <input
                  type="text"
                  name="first_name"
                  required
                  className="w-full bg-transparent text-base text-[#383838] tracking-[0.5px] outline-none"
                  style={{ fontFamily: 'var(--font-sans)' }}
                />
              </div>
              <div className="border-b border-[#d0d0d0] py-5 md:pl-10">
                <label className="block text-[13px] tracking-[1.5px] text-[#383838] mb-3 uppercase font-semibold">
                  Last Name
                </label>
                <input
                  type="text"
                  name="last_name"
                  className="w-full bg-transparent text-base text-[#383838] tracking-[0.5px] outline-none"
                  style={{ fontFamily: 'var(--font-sans)' }}
                />
              </div>
            </div>

            {/* Row 2: Email + Phone */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-0">
              <div className="border-b border-[#d0d0d0] py-5 md:pr-10">
                <label className="block text-[13px] tracking-[1.5px] text-[#383838] mb-3 uppercase font-semibold">
                  Email Address <span className="text-[#999]">(required)</span>
                </label>
                <input
                  type="email"
                  name="email"
                  required
                  className="w-full bg-transparent text-base text-[#383838] tracking-[0.5px] outline-none"
                  style={{ fontFamily: 'var(--font-sans)' }}
                />
              </div>
              <div className="border-b border-[#d0d0d0] py-5 md:pl-10">
                <label className="block text-[13px] tracking-[1.5px] text-[#383838] mb-3 uppercase font-semibold">
                  Phone Number
                </label>
                <input
                  type="tel"
                  name="phone"
                  className="w-full bg-transparent text-base text-[#383838] tracking-[0.5px] outline-none"
                  style={{ fontFamily: 'var(--font-sans)' }}
                />
              </div>
            </div>

            {/* Row 3: Position */}
            <div className="border-b border-[#d0d0d0] py-5">
              <label className="block text-[13px] tracking-[1.5px] text-[#383838] mb-3 uppercase font-semibold">
                Position Applying For <span className="text-[#999]">(required)</span>
              </label>
              <input
                type="text"
                name="position"
                required
                value={selectedPosition}
                onChange={(e) => setSelectedPosition(e.target.value)}
                className="w-full bg-transparent text-base text-[#383838] tracking-[0.5px] outline-none"
                style={{ fontFamily: 'var(--font-sans)' }}
              />
            </div>

            {/* Row 4: Message */}
            <div className="border-b border-[#d0d0d0] py-5">
              <label className="block text-[13px] tracking-[1.5px] text-[#383838] mb-3 uppercase font-semibold">
                Cover Letter / Message <span className="text-[#999]">(required)</span>
              </label>
              <textarea
                name="message"
                required
                rows={5}
                maxLength={500}
                className="w-full bg-transparent text-base text-[#383838] tracking-[0.5px] outline-none resize-none"
                style={{ fontFamily: 'var(--font-sans)' }}
              />
            </div>

            {/* Row 5: Resume Upload */}
            <div className="py-8">
              <label className="block text-[13px] tracking-[1.5px] text-[#383838] mb-4 uppercase font-semibold">
                Resume / Portfolio
              </label>
              <div
                className="border border-[#d0d0d0] rounded-sm h-24 flex items-center justify-center relative cursor-pointer hover:border-[#999] transition-colors duration-200"
                onDrop={handleDrop}
                onDragOver={(e) => e.preventDefault()}
                onClick={() => fileInputRef.current?.click()}
              >
                {fileName ? (
                  <span className="text-base tracking-[1px] text-[#383838] px-8 text-center truncate" style={{ fontFamily: 'var(--font-sans)' }}>
                    {fileName}
                  </span>
                ) : (
                  <>
                    <span className="hidden md:inline text-[12px] tracking-[2.5px] text-[#aaa] uppercase" style={{ fontFamily: 'var(--font-sans)' }}>
                      Drag &amp; Drop Files Here
                    </span>
                    <span className="md:hidden text-[12px] tracking-[2.5px] text-[#aaa] uppercase" style={{ fontFamily: 'var(--font-sans)' }}>
                      Tap to Upload File
                    </span>
                  </>
                )}
                <div className="absolute right-4 bottom-4 w-5 h-5 flex items-center justify-center text-[#aaa]">
                  <i className="ri-attachment-2 text-base" />
                </div>
                <input
                  ref={fileInputRef}
                  type="file"
                  className="hidden"
                  accept=".pdf,.doc,.docx,.zip"
                  onChange={handleFileChange}
                />
              </div>
            </div>

            {/* Submit */}
            <div className="flex flex-col-reverse md:flex-row md:items-center justify-between gap-4 pt-2">
              <div className="text-base tracking-[1.5px]" style={{ fontFamily: 'var(--font-sans)' }}>
                {submitState === 'success' && (
                  <span className="text-[#383838]">Application sent. We&apos;ll be in touch.</span>
                )}
                {submitState === 'error' && (
                  <span className="text-red-500">Something went wrong. Please try again.</span>
                )}
              </div>
              <button
                type="submit"
                disabled={submitState === 'sending'}
                className="w-full md:w-auto py-3 md:py-0 border border-[#383838] md:border-0 rounded-sm md:rounded-none text-base tracking-[4px] font-semibold text-[#383838] hover:text-[#797979] hover:border-[#797979] md:hover:border-0 transition-colors duration-200 uppercase whitespace-nowrap cursor-pointer disabled:opacity-40"
                style={{ fontFamily: 'var(--font-display)' }}
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

export default CareersPage;
