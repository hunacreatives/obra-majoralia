import { BrowserRouter, useLocation } from "react-router-dom";
import { AppRoutes } from "./router";
import { I18nextProvider } from "react-i18next";
import i18n from "./i18n";
import PasswordGate from "./components/feature/PasswordGate";
import PageTransition from "./components/feature/PageTransition";
import { useEffect } from "react";

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

function App() {
  return (
    <I18nextProvider i18n={i18n}>
      <PasswordGate>
        <BrowserRouter basename={__BASE_PATH__}>
          <ScrollToTop />
          <PageTransition>
            <AppRoutes />
          </PageTransition>
        </BrowserRouter>
      </PasswordGate>
    </I18nextProvider>
  );
}

export default App;
