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
    <div className="text-foreground mx-auto max-w-lg px-6 py-20 text-center">
      <h1>500 Internal Server Error</h1>
      <p className="mt-3">
        There is a problem with the resource you are looking for, and it cannot be displayed.
      </p>
      <a href="/" className="cta-link mt-6 inline-flex justify-center">
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
