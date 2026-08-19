import Head from 'next/head';
import { SitecoreProvider, SitecorePageProps, Page, ErrorPage } from '@sitecore-content-sdk/nextjs';
import Layout from 'src/Layout';
import { GetStaticProps } from 'next';
import scConfig from 'sitecore.config';
import client from 'lib/sitecore-client';
import components from '.sitecore/component-map';
import { JSX } from 'react';

/**
 * Rendered in case if we have 500 error
 */
const ServerError = (): JSX.Element => (
  <>
    <Head>
      <title>Server Error | Singapore Academy of Law</title>
    </Head>
    <div className="bg-background text-foreground flex min-h-screen flex-col items-center justify-center px-6 py-20 text-center">
      <p className="eyebrow mb-4">Error 500</p>
      <h1 className="max-w-xl">Something went wrong</h1>
      <span className="bg-accent mx-auto mt-4 block h-2 w-24" aria-hidden="true" />
      <p className="mt-6 max-w-md">
        There is a problem with the resource you are looking for, and it cannot be displayed.
      </p>
      <a href="/" className="main-btn mt-8 w-auto px-8">
        Go to the Home page
      </a>
    </div>
  </>
);

const Custom500 = (props: SitecorePageProps): JSX.Element => {
  if (!(props && props.page)) {
    return <ServerError />;
  }

  return (
    <SitecoreProvider api={scConfig.api} componentMap={components} page={props.page}>
      <Layout page={props.page} />
    </SitecoreProvider>
  );
};

export const getStaticProps: GetStaticProps = async (context) => {
  let page: Page | null = null;

  if (scConfig.generateStaticPaths) {
    try {
      page = await client.getErrorPage(ErrorPage.InternalServerError, {
        site: scConfig.defaultSite,
        locale: context.locale || context.defaultLocale || scConfig.defaultLanguage,
      });
    } catch (error) {
      console.log('Error occurred while fetching error pages');
      console.log(error);
    }
  }

  return {
    props: {
      page,
    },
  };
};

export default Custom500;
