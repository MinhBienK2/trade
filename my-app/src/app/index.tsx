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

export function App() {
  const { i18n } = useTranslation();
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
        <Route path="/" element={<HomePage />} />
        <Route path="/trade" element={<TradePage />} />
        <Route path="/projects" element={<ProjectPage />} />
        <Route
          path="/projects/detail/:project"
          element={<ProjectDetailPage />}
        />
        <Route path="/account/login" element={<LoginPage />} />
        <Route path="/account/register" element={<RegisterPage />} />
        <Route path="/account/general" element={<General />} />
        <Route path="/account/profile" element={<Profile />} />
        <Route path="/account/assets" element={<Assets />} />
        <Route path="/account/investment" element={<Investment />} />
        <Route
          path="/account/investment/detail/:project"
          element={<InvestDetail />}
        />
        <Route path="/history" element={<HistoryTransaction />} />
        <Route path="/history/detail/:historyId" element={<HistoryDetail />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
      <GlobalStyle />
    </BrowserRouter>
  );
}
