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
import {
  Assets,
  General,
  InvestDetail,
  Investment,
  Profile,
} from './pages/Account/Information/Loadable';
import { ProjectPage, ProjectDetailPage } from './pages/Project/Loadable';
import {
  TradePage,
  HistoryTransaction,
  HistoryDetail,
} from './pages/Trade/Loadable';
import {
  PreventRouter,
  PreventRouterLogin,
} from 'app/components/auth/PreventRouter';
import { useSelector } from 'react-redux';
import { selectLanguage } from 'store/app/user/selector';
import { useUserSlice } from 'store/app/user';

export function App() {
  useUserSlice();
  const language = useSelector(selectLanguage);
  const { i18n } = useTranslation();

  React.useEffect(() => {
    i18n.changeLanguage(language);
  }, [language]);

  return (
    <BrowserRouter>
      <Helmet
        titleTemplate="%s - React Boilerplate"
        defaultTitle="React Boilerplate"
        htmlAttributes={{ lang: i18n.language }}
      >
        <meta name="description" content="A React Boilerplate application" />
      </Helmet>

      <Routes>
        <Route
          path="/"
          element={
            <PreventRouter>
              <HomePage />
            </PreventRouter>
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
        <Route
          path="/account/general"
          element={
            <PreventRouter>
              <General />
            </PreventRouter>
          }
        />

        {/* account */}
        <Route
          path="/account/profile"
          element={
            <PreventRouter>
              <Profile />
            </PreventRouter>
          }
        />
        <Route
          path="/account/assets"
          element={
            <PreventRouter>
              <Assets />
            </PreventRouter>
          }
        />
        <Route
          path="/account/investment"
          element={
            <PreventRouter>
              <Investment />
            </PreventRouter>
          }
        />
        <Route
          path="/account/investment/detail/:project"
          element={
            <PreventRouter>
              <InvestDetail />
            </PreventRouter>
          }
        />
        {/* project */}
        <Route
          path="/projects"
          element={
            <PreventRouter>
              <ProjectPage />
            </PreventRouter>
          }
        />
        <Route
          path="/projects/detail/:project"
          element={
            <PreventRouter>
              <ProjectDetailPage />
            </PreventRouter>
          }
        />

        {/* trade */}
        <Route
          path="/trade"
          element={
            <PreventRouter>
              <TradePage />
            </PreventRouter>
          }
        />
        <Route
          path="/trade/buy/:project"
          element={
            <PreventRouter>
              <TradePage />
            </PreventRouter>
          }
        />
        <Route
          path="/history"
          element={
            <PreventRouter>
              <HistoryTransaction />
            </PreventRouter>
          }
        />
        <Route
          path="/history/detail/:historyId"
          element={
            <PreventRouter>
              <HistoryDetail />
            </PreventRouter>
          }
        />
        <Route
          path="/history-esop/detail/:historyId"
          element={
            <PreventRouter>
              <HistoryDetail />
            </PreventRouter>
          }
        />

        <Route path="*" element={<NotFoundPage />} />
      </Routes>
      <GlobalStyle />
    </BrowserRouter>
  );
}
