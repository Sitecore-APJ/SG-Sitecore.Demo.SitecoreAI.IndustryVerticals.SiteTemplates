import Head from 'next/head';
import { JSX } from 'react';

/**
 * Rendered in case if we have 404 error
 */
const NotFound = (): JSX.Element => (
  <>
    <Head>
      <title>404: NotFound</title>
    </Head>
    <div className="bg-background-accent flex min-h-[60vh] flex-col items-center justify-center px-4 py-16 text-center">
      <h1 className="text-primary mb-4 text-3xl font-bold md:text-4xl">Page not found</h1>
      <p className="text-foreground-muted mb-8 max-w-md text-lg">This page does not exist.</p>
      <a
        href="/"
        className="bg-accent text-accent-foreground hover:bg-accent/90 inline-flex rounded-md px-6 py-3 text-base font-semibold transition-colors"
      >
        Go to the home page
      </a>
    </div>
  </>
);

export default NotFound;
