import { lazy, Suspense } from 'react';
import { RouteObject } from 'react-router-dom';

const IntroPage        = lazy(() => import('@/pages/intro/page'));
const HomePage         = lazy(() => import('@/pages/home/page'));
const ProjectsPage     = lazy(() => import('@/pages/projects/page'));
const ProjectDetailPage = lazy(() => import('@/pages/projects/detail/page'));
const AboutPage        = lazy(() => import('@/pages/about/page'));
const ObraversePage    = lazy(() => import('@/pages/obraverse/page'));
const NewsPage         = lazy(() => import('@/pages/news/page'));
const ContactPage      = lazy(() => import('@/pages/contact/page'));
const CareersPage      = lazy(() => import('@/pages/careers/page'));
const NotFound         = lazy(() => import('@/pages/NotFound'));

const Loading = () => (
  <div className="min-h-screen bg-white flex items-center justify-center">
    <div style={{ width: 32, height: 32, border: '2px solid #e4e3e2', borderTopColor: '#383838', borderRadius: '50%', animation: 'spin 0.7s linear infinite' }} />
    <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
  </div>
);

const wrap = (Page: React.ComponentType) => (
  <Suspense fallback={<Loading />}>
    <Page />
  </Suspense>
);

const routes: RouteObject[] = [
  { path: '/',             element: wrap(IntroPage) },
  { path: '/home',         element: wrap(HomePage) },
  { path: '/projects',     element: wrap(ProjectsPage) },
  { path: '/projects/:id', element: wrap(ProjectDetailPage) },
  { path: '/about',        element: wrap(AboutPage) },
  { path: '/obraverse',    element: wrap(ObraversePage) },
  { path: '/news',         element: wrap(NewsPage) },
  { path: '/contact',      element: wrap(ContactPage) },
  { path: '/careers',      element: wrap(CareersPage) },
  { path: '*',             element: wrap(NotFound) },
];

export default routes;
