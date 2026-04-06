import { useParams, Link } from 'react-router-dom';
import Navbar from '@/components/feature/Navbar';
import Footer from '@/components/feature/Footer';
import { projects } from '@/mocks/projects';
import ResidentialLayout from './components/ResidentialLayout';
import InteriorLayout from './components/InteriorLayout';
import HospitalityLayout from './components/HospitalityLayout';
import MonumentalLayout from './components/MonumentalLayout';
import SResidenceLayout from './components/SResidenceLayout';
import { NightModeProvider, useNightMode } from '@/contexts/NightModeContext';

const ProjectDetailInner = () => {
  const { id } = useParams<{ id: string }>();
  const project = projects.find(p => p.id === id);
  const { isNight } = useNightMode();

  if (!project) {
    return (
      <main className="min-h-screen bg-white flex items-center justify-center">
        <Navbar />
        <div className="text-center">
          <p className="text-[#797979] text-sm tracking-[2px] mb-6">PROJECT NOT FOUND</p>
          <Link to="/projects" className="text-[#383838] text-sm underline">
            Back to Projects
          </Link>
        </div>
      </main>
    );
  }

  const renderLayout = () => {
    if (project.id === 's-residence') return <SResidenceLayout project={project} />;
    switch (project.typology) {
      case 'Interior':
        return <InteriorLayout project={project} />;
      case 'Hospitality':
        return <HospitalityLayout project={project} />;
      case 'Monumental':
        return <MonumentalLayout project={project} />;
      case 'Residential':
      default:
        return <ResidentialLayout project={project} />;
    }
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