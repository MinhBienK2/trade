/**
 *
 * App
 *
 * This component is the skeleton around the actual pages, and should only
 * contain code that should be seen on all pages. (e.g. navigation bar)
 */

import * as React from 'react';
import { Helmet } from 'react-helmet-async';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import { GlobalStyle } from 'styles/global-styles';

import { HomePage } from './pages/HomePage/Loadable';
import { NotFoundPage } from './components/NotFoundPage/Loadable';
import { useTranslation } from 'react-i18next';
import { LoginPage } from './pages/Account/Login/Loadable';
import { RegisterPage } from './pages/Account/Register/Loadable';
import { Assets, General, InvestDetail, Investment, Profile } from './pages/Account/Information/Loadable';
import { ProjectPage, ProjectDetailPage } from './pages/Project/Loadable';
import { TradePage, HistoryTransaction, HistoryDetail } from './pages/Trade/Loadable';
import { PublicRouter, PreventRouterLogin } from 'app/components/auth/PublicRouter';
import { useSelector } from 'react-redux';
import { selectLanguage } from 'store/app/user/selector';
import { useUserSlice } from 'store/app/user';
import { useProfileSlice } from 'store/app/profile';
import { Test } from './test';
import { ConfirmationPage } from './pages/Account/Confirmation/Loadable';

export function App() {
  useUserSlice();
  const language = useSelector(selectLanguage);
  const { i18n } = useTranslation();

  React.useEffect(() => {
    i18n.changeLanguage(language);
  }, [language]);

  return (
    <BrowserRouter>
      <Helmet titleTemplate="%s - React Boilerplate" defaultTitle="React Boilerplate" htmlAttributes={{ lang: i18n.language }}>
        <meta name="description" content="A React Boilerplate application" />
      </Helmet>

      <Routes>
        <Route
          path="/"
          element={
            <PublicRouter>
              <HomePage />
            </PublicRouter>
          }
        />
        <Route
          path="/login"
          element={
            <PreventRouterLogin>
              <LoginPage />
            </PreventRouterLogin>
          }
        />
        <Route
          path="/register"
          element={
            <PreventRouterLogin>
              <RegisterPage />
            </PreventRouterLogin>
          }
        />
        <Route path="/confirmation" element={<ConfirmationPage />} />
        <Route
          path="/account/general"
          element={
            <PublicRouter>
              <General />
            </PublicRouter>
          }
        />

        {/* account */}
        <Route
          path="/account/profile"
          element={
            <PublicRouter>
              <Profile />
            </PublicRouter>
          }
        />
        <Route
          path="/account/assets"
          element={
            <PublicRouter>
              <Assets />
            </PublicRouter>
          }
        />
        <Route
          path="/account/investment"
          element={
            <PublicRouter>
              <Investment />
            </PublicRouter>
          }
        />
        <Route
          path="/account/investment/detail/:projectId"
          element={
            <PublicRouter>
              <InvestDetail />
            </PublicRouter>
          }
        />
        {/* project */}
        <Route
          path="/projects"
          element={
            <PublicRouter>
              <ProjectPage />
            </PublicRouter>
          }
        />
        <Route
          path="/projects/detail/:project"
          element={
            <PublicRouter>
              <ProjectDetailPage />
            </PublicRouter>
          }
        />

        {/* trade */}
        <Route
          path="/trade"
          element={
            <PublicRouter>
              <TradePage />
            </PublicRouter>
          }
        />
        <Route
          path="/trade/buy/:project"
          element={
            <PublicRouter>
              <TradePage />
            </PublicRouter>
          }
        />
        <Route
          path="/history"
          element={
            <PublicRouter>
              <HistoryTransaction />
            </PublicRouter>
          }
        />
        <Route
          path="/history/detail/:historyId"
          element={
            <PublicRouter>
              <HistoryDetail />
            </PublicRouter>
          }
        />
        <Route
          path="/history-esop/detail/:historyId"
          element={
            <PublicRouter>
              <HistoryDetail />
            </PublicRouter>
          }
        />
        <Route path="/test" element={<Test />} />

        <Route path="*" element={<NotFoundPage />} />
      </Routes>
      <GlobalStyle />
    </BrowserRouter>
  );
}
