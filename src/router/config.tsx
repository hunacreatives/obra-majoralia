import { RouteObject } from 'react-router-dom';
import IntroPage from '@/pages/intro/page';
import HomePage from '@/pages/home/page';
import ProjectsPage from '@/pages/projects/page';
import ProjectDetailPage from '@/pages/projects/detail/page';
import AboutPage from '@/pages/about/page';
import ObraversePage from '@/pages/obraverse/page';
import NewsPage from '@/pages/news/page';
import ContactPage from '@/pages/contact/page';
import CareersPage from '@/pages/careers/page';
import NotFound from '@/pages/NotFound';

const routes: RouteObject[] = [
  { path: '/', element: <IntroPage /> },
  { path: '/home', element: <HomePage /> },
  { path: '/projects', element: <ProjectsPage /> },
  { path: '/projects/:id', element: <ProjectDetailPage /> },
  { path: '/about', element: <AboutPage /> },
  { path: '/obraverse', element: <ObraversePage /> },
  { path: '/news', element: <NewsPage /> },
  { path: '/contact', element: <ContactPage /> },
  { path: '/careers', element: <CareersPage /> },
  { path: '*', element: <NotFound /> },
];

export default routes;
