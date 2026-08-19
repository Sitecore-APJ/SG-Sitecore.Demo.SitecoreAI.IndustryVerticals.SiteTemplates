import Head from 'next/head';
import { JSX } from 'react';

/**
 * Rendered in case if we have 404 error
 */
const NotFound = (): JSX.Element => (
  <>
    <Head>
      <title>Page not found | Singapore Academy of Law</title>
    </Head>
    <div className="bg-background text-foreground flex min-h-screen flex-col items-center justify-center px-6 py-20 text-center">
      <p className="eyebrow mb-4">Error 404</p>
      <h1 className="max-w-xl">Page not found</h1>
      <span className="bg-accent mx-auto mt-4 block h-2 w-24" aria-hidden="true" />
      <p className="mt-6 max-w-md">
        This page does not exist. Return to the Singapore Academy of Law homepage to continue.
      </p>
      <a href="/" className="main-btn mt-8 w-auto px-8">
        Go to the Home page
      </a>
    </div>
  </>
);

export default NotFound;
