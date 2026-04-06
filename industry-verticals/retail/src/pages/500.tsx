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
      <title>500: Server Error</title>
    </Head>
    <div className="bg-background-accent flex min-h-[60vh] flex-col items-center justify-center px-4 py-16 text-center">
      <h1 className="text-primary mb-4 text-3xl font-bold md:text-4xl">
        500 Internal Server Error
      </h1>
      <p className="text-foreground-muted mb-8 max-w-md text-lg">
        There is a problem with the resource you are looking for, and it cannot be displayed.
      </p>
      <a
        href="/"
        className="bg-accent text-accent-foreground hover:bg-accent/90 inline-flex rounded-md px-6 py-3 text-base font-semibold transition-colors"
      >
        Go to the home page
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
