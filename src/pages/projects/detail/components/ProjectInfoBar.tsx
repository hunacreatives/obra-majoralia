import FadeIn from '@/components/base/FadeIn';
import { Project } from '@/mocks/projects';

interface ProjectInfoBarProps {
  project: Project;
}

const InfoCell = ({ label, value, delay }: { label: string; value: string; delay?: number }) => (
  <FadeIn delay={delay}>
    <div className="flex flex-col items-center text-center">
      <p
        className="text-[9px] tracking-[2.2px] text-[#aaa] mb-2"
        style={{ fontFamily: 'var(--font-sans)' }}
      >
        {label}
      </p>
      <p
        className="text-[12px] md:text-[13px] text-[#383838] font-semibold uppercase tracking-[0.5px]"
        style={{ fontFamily: 'var(--font-sans)' }}
      >
        {value}
      </p>
    </div>
  </FadeIn>
);

const ProjectInfoBar = ({ project }: ProjectInfoBarProps) => (
  <section className="border-b border-[#e4e3e2]">
    <div className="grid grid-cols-2 md:grid-cols-5 gap-6 md:gap-0 px-6 md:px-10 py-8 md:py-10">
      <InfoCell label="LOCATION" value={project.location} delay={0} />
      <InfoCell label="AREA" value={project.area ?? '—'} delay={50} />
      <InfoCell label="TYPE" value={project.typology} delay={100} />
      <InfoCell label="STATUS" value={project.status ?? '—'} delay={150} />
      <InfoCell label="YEAR COMPLETED" value={project.status === 'Completed' ? String(project.year) : '—'} delay={200} />
    </div>
  </section>
);

export default ProjectInfoBar;
