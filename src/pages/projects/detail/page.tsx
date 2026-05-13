import { useParams, Link } from 'react-router-dom';
import Navbar from '@/components/feature/Navbar';
import Footer from '@/components/feature/Footer';
import { projects } from '@/mocks/projects';
import SResidenceLayout from './components/SResidenceLayout';
import StandardProjectLayout from './components/StandardProjectLayout';
import { NightModeProvider } from '@/contexts/NightModeContext';
import { useNightMode } from '@/contexts/useNightMode';

const ProjectDetailInner = () => {
  const { id } = useParams<{ id: string }>();
  const project = projects.find(p => p.id === id);
  const { isNight } = useNightMode();

  if (!project) {
    return (
      <main className="min-h-screen bg-white flex items-center justify-center">
        <Navbar />
        <div className="text-center">
          <p className="text-[#797979] text-base tracking-[2px] mb-6">PROJECT NOT FOUND</p>
          <Link to="/projects" className="text-[#383838] text-base underline">
            Back to Projects
          </Link>
        </div>
      </main>
    );
  }

  const renderLayout = () => {
    if (project.id === 's-residence') return <SResidenceLayout project={project} />;
    return <StandardProjectLayout project={project} />;
  };

  return (
    <main
      className="min-h-screen transition-colors duration-700"
      style={{ backgroundColor: isNight ? '#0d0d0d' : '#ffffff' }}
    >
      <Navbar nightMode={isNight} />
      <div style={{ height: '0px' }} />
      {renderLayout()}
      <Footer nightMode={isNight} />
    </main>
  );
};

const ProjectDetailPage = () => (
  <NightModeProvider>
    <ProjectDetailInner />
  </NightModeProvider>
);

export default ProjectDetailPage;
