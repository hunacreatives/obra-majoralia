import { useState, useRef } from 'react';
import Navbar from '@/components/feature/Navbar';
import Footer from '@/components/feature/Footer';

type SubmitState = 'idle' | 'sending' | 'success' | 'error';

const WHY_ITEMS = [
  {
    title: 'Design Excellence',
    description: 'Work alongside award-winning architects on projects that push the boundaries of form and function.',
  },
  {
    title: 'Collaborative Culture',
    description: 'A studio built on open dialogue, shared ideas, and a deep respect for every voice in the room.',
  },
  {
    title: 'Meaningful Projects',
    description: 'From private residences to monumental civic works — every project carries purpose and lasting impact.',
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
            className="font-bold text-title text-[#383838]"
          >
            Careers
          </h1>
        </div>

        {/* ── Hero Image ── */}
        <div className="w-full aspect-[4/3] max-h-[52svh] md:aspect-auto md:max-h-none md:h-[42vh] overflow-hidden">
          {/* the studio's own work, not a stock office */}
          <img
            src="/images/thumbs-1600/bakley-rotonda/perspective-15.webp"
            alt="Bakley Rotonda by Obra Majoralia"
            className="w-full h-full object-cover object-center"
          />
        </div>

        {/* ── Why Work With Us ── */}
        <section className="px-6 md:px-16 lg:px-20 py-16 md:py-28 border-b border-[#e4e3e2]">
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_2fr] gap-10 lg:gap-20">
            <h2 className="font-bold text-heading text-[#383838]">
              Why work <span className="text-[#797979] whitespace-nowrap">with us</span>
            </h2>
            <ol className="border-t border-[#e4e3e2]">
              {WHY_ITEMS.map((item, i) => (
                <li key={item.title} className="grid grid-cols-[2rem_1fr] md:grid-cols-[4rem_1fr] xl:grid-cols-[4rem_1fr_1.2fr] gap-x-3 md:gap-x-8 gap-y-2 py-6 md:py-9 border-b border-[#e4e3e2]">
                  <span className="text-[11px] tracking-[2px] text-[#797979] pt-1.5 md:pt-2">{i + 1}</span>
                  <h3 className="font-bold text-[21px] md:text-[30px] leading-tight tracking-[-0.02em] text-[#383838]">
                    {item.title}
                  </h3>
                  <p className="col-start-2 xl:col-start-3 text-[14px] md:text-[15px] leading-[1.6] text-[#797979] xl:pt-1">
                    {item.description}
                  </p>
                </li>
              ))}
            </ol>
          </div>
        </section>

        {/* ── Open Positions ── */}
        <section className="px-6 md:px-16 lg:px-20 py-16 md:py-20 border-b border-[#e4e3e2]">
          <h2
            className="font-bold text-heading text-[#383838] mb-8 md:mb-14"
          >
            Open Positions
          </h2>

          <div className="flex flex-col">
            {POSITIONS.map((pos) => (
              <div key={pos.id} className="border-t border-[#e4e3e2] last:border-b">
                {/* Row header */}
                <button
                  type="button"
                  className="w-full flex items-center justify-between py-5 md:py-6 cursor-pointer group"
                  onClick={() => togglePosition(pos.id)}
                >
                  <div className="flex flex-col sm:flex-row sm:items-center gap-1.5 sm:gap-10 text-left">
                    <span
                      className="text-[17px] md:text-[18px] font-bold tracking-[-0.01em] text-[#383838] group-hover:text-[#797979] transition-colors duration-200"
                    >
                      {pos.title}
                    </span>
                    <div className="flex items-center gap-4 md:gap-6">
                      <span
                        className="text-[11px] md:text-[12px] tracking-[2px] text-[#797979] uppercase"
                      >
                        {pos.type}
                      </span>
                      <span
                        className="text-[11px] md:text-[12px] tracking-[2px] text-[#797979] uppercase"
                      >
                        {pos.location}
                      </span>
                    </div>
                  </div>
                  <div className="w-11 h-11 -mr-3 flex items-center justify-center text-[#383838] flex-shrink-0 ml-2">
                    <i className={`ri-${openPosition === pos.id ? 'subtract' : 'add'}-line text-base transition-transform duration-200`} />
                  </div>
                </button>

                {/* Expanded content */}
                <div
                  className={`overflow-hidden transition-all duration-300 ${openPosition === pos.id ? 'max-h-[32rem] pb-6 md:pb-8' : 'max-h-0'}`}
                >
                  <p
                    className="text-sm md:text-base tracking-normal text-[#797979] leading-[1.6] max-w-2xl mb-2"
                  >
                    {pos.description}
                  </p>
                  <button
                    type="button"
                    onClick={() => handleApply(pos.title)}
                    className="group/apply inline-flex items-center min-h-[44px] text-[12px] tracking-[2px] font-semibold text-[#383838] hover:text-[#797979] transition-colors duration-200 uppercase whitespace-nowrap cursor-pointer"
                  >
                    <span className="border-b border-[#383838] group-hover/apply:border-[#797979] pb-[2px] transition-colors duration-200">APPLY FOR THIS ROLE</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ── Application Form ── */}
        <section id="application-form" className="px-6 md:px-16 lg:px-20 pt-16 pb-16 md:py-20 scroll-mt-20">
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-3 mb-8 md:mb-14 border-b border-[#e4e3e2] pb-6 md:pb-10">
            <h2
              className="font-bold text-title text-[#383838]"
            >
              Apply Now
            </h2>
            <p
              className="text-[14px] md:text-base leading-[1.6] tracking-normal text-[#797979]"
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
              <div className="border-b border-[#e4e3e2] pt-5 pb-2 md:pr-10">
                <label htmlFor="careers-first_name" className="block text-[13px] tracking-[1.5px] text-[#383838] mb-1 uppercase font-semibold cursor-pointer">
                  First Name <span className="text-[#797979]">(required)</span>
                </label>
                <input
                  type="text"
                  id="careers-first_name"
                  name="first_name"
                  required
                  className="w-full h-11 bg-transparent text-base text-[#383838] tracking-normal outline-none"
                />
              </div>
              <div className="border-b border-[#e4e3e2] pt-5 pb-2 md:pl-10">
                <label htmlFor="careers-last_name" className="block text-[13px] tracking-[1.5px] text-[#383838] mb-1 uppercase font-semibold cursor-pointer">
                  Last Name
                </label>
                <input
                  type="text"
                  id="careers-last_name"
                  name="last_name"
                  className="w-full h-11 bg-transparent text-base text-[#383838] tracking-normal outline-none"
                />
              </div>
            </div>

            {/* Row 2: Email + Phone */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-0">
              <div className="border-b border-[#e4e3e2] pt-5 pb-2 md:pr-10">
                <label htmlFor="careers-email" className="block text-[13px] tracking-[1.5px] text-[#383838] mb-1 uppercase font-semibold cursor-pointer">
                  Email Address <span className="text-[#797979]">(required)</span>
                </label>
                <input
                  type="email"
                  id="careers-email"
                  name="email"
                  required
                  className="w-full h-11 bg-transparent text-base text-[#383838] tracking-normal outline-none"
                />
              </div>
              <div className="border-b border-[#e4e3e2] pt-5 pb-2 md:pl-10">
                <label htmlFor="careers-phone" className="block text-[13px] tracking-[1.5px] text-[#383838] mb-1 uppercase font-semibold cursor-pointer">
                  Phone Number
                </label>
                <input
                  type="tel"
                  id="careers-phone"
                  name="phone"
                  className="w-full h-11 bg-transparent text-base text-[#383838] tracking-normal outline-none"
                />
              </div>
            </div>

            {/* Row 3: Position */}
            <div className="border-b border-[#e4e3e2] pt-5 pb-2">
              <label htmlFor="careers-position" className="block text-[13px] tracking-[1.5px] text-[#383838] mb-1 uppercase font-semibold cursor-pointer">
                Position Applying For <span className="text-[#797979]">(required)</span>
              </label>
              <input
                type="text"
                id="careers-position"
                name="position"
                required
                value={selectedPosition}
                onChange={(e) => setSelectedPosition(e.target.value)}
                className="w-full h-11 bg-transparent text-base text-[#383838] tracking-normal outline-none"
              />
            </div>

            {/* Row 4: Message */}
            <div className="border-b border-[#e4e3e2] pt-5 pb-2">
              <label htmlFor="careers-message" className="block text-[13px] tracking-[1.5px] text-[#383838] mb-1 uppercase font-semibold cursor-pointer">
                Cover Letter / Message <span className="text-[#797979]">(required)</span>
              </label>
              <textarea
                id="careers-message"
                name="message"
                required
                rows={5}
                maxLength={500}
                className="w-full py-2 bg-transparent text-base text-[#383838] tracking-normal outline-none resize-none"
              />
            </div>

            {/* Row 5: Resume Upload */}
            <div className="py-8">
              <label className="block text-[13px] tracking-[1.5px] text-[#383838] mb-4 uppercase font-semibold">
                Resume / Portfolio
              </label>
              <div
                className="border border-[#e4e3e2] rounded-sm h-24 flex items-center justify-center relative cursor-pointer hover:border-[#797979] transition-colors duration-200"
                onDrop={handleDrop}
                onDragOver={(e) => e.preventDefault()}
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
                  accept=".pdf,.doc,.docx,.zip"
                  onChange={handleFileChange}
                />
              </div>
            </div>

            {/* Submit */}
            <div className="flex flex-col-reverse md:flex-row md:items-center justify-between gap-4 pt-2">
              <div className="text-base tracking-[1.5px]">
                {submitState === 'success' && (
                  <span className="text-[#383838]">Application sent. We&apos;ll be in touch.</span>
                )}
                {submitState === 'error' && (
                  <span className="font-bold text-[#383838]">Something went wrong. Please try again.</span>
                )}
              </div>
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

export default CareersPage;
