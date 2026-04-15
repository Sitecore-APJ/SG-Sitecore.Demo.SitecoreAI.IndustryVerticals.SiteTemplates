import Head from 'next/head';
import Link from 'next/link';
import { SitecoreProvider, SitecorePageProps, Page, ErrorPage } from '@sitecore-content-sdk/nextjs';
import Layout from 'src/Layout';
import { GetStaticProps } from 'next';
import scConfig from 'sitecore.config';
import client from 'lib/sitecore-client';
import components from '.sitecore/component-map';
import { JSX } from 'react';

/**
 * Rendered in case if we have 500 error (fallback when no Sitecore error page)
 */
const ServerError = (): JSX.Element => (
  <>
    <Head>
      <title>500: Server error</title>
    </Head>
    <div className="bg-background-accent min-h-[50vh] px-4 py-16 md:py-24">
      <div className="container mx-auto max-w-lg">
        <h1 className="text-foreground mb-4 text-3xl font-bold">Internal server error</h1>
        <p className="text-foreground-light mb-10 text-base leading-relaxed">
          There is a problem with the resource you are looking for, and it cannot be displayed.
        </p>
        <Link href="/" className="main-btn inline-flex">
          Go to the home page
        </Link>
      </div>
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
