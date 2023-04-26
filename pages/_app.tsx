import 'antd/dist/reset.css';
import '../public/antd.min.css';
import '../styles/globals.scss';

import ErrorBoundary from '@components/ErrorBoundary';
import AppLayout from '@layout/AppLayout';
import { memoize } from '@utils/common';
import type { NextPage } from 'next';
import type { AppProps } from 'next/app';
import Head from 'next/head';
import { appWithTranslation } from 'next-i18next';
import type { ReactElement, ReactNode } from 'react';
import { RecoilRoot } from 'recoil';

import nextI18nConfig from '../next-i18next.config';

export type NextPageWithLayout = NextPage & {
  getLayout?: (page: ReactElement) => ReactNode;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

function MyApp({ Component, pageProps }: AppPropsWithLayout) {
  const getLayout = Component.getLayout ?? ((page: any) => page);

  return (
    <>
      <Head>
        <meta name='robots' content='index, follow' />
        <meta name='googlebot' content={'index,follow'} />
        <meta charSet='utf-8' />
        <meta name='theme-color' content='#476055' />
        <meta name='title' content='Maby Client' />
        <meta name='description' content='Maby Client' />
        <link rel='shortcut icon' href='/static/favicon.ico' />
        <meta
          name='viewport'
          content='width=device-width,initial-scale=1,maximum-scale=2,shrink-to-fit=no'
        />
      </Head>

      <ErrorBoundary>
        <RecoilRoot>
          <AppLayout>{getLayout(<Component {...pageProps} />)}</AppLayout>
        </RecoilRoot>
      </ErrorBoundary>
    </>
  );
}

// ignore in-browser next/js recoil warnings until its fixed.
const mutedConsole = memoize((console: any) => ({
  ...console,
  warn: (...args: any) =>
    args[0].includes('Duplicate atom key') ? undefined : console.warn(...args),
}));
global.console = mutedConsole(global.console);

// @ts-ignore
export default appWithTranslation(MyApp, nextI18nConfig);
