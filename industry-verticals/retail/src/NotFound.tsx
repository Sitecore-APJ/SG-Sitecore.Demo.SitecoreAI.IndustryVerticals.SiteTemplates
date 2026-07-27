import Head from 'next/head';
import Link from 'next/link';
import { JSX } from 'react';

/**
 * Rendered in case if we have 404 error
 */
const NotFound = (): JSX.Element => (
  <>
    <Head>
      <title>404: Page Not Found | SP Group</title>
    </Head>
    <div className="bg-background flex min-h-[60vh] flex-col items-center justify-center px-4 py-20 text-center">
      <p className="text-accent text-sm font-bold tracking-wide uppercase">Error 404</p>
      <h1 className="text-foreground mt-4 text-3xl font-bold md:text-4xl">Page not found</h1>
      <p className="text-foreground-light mt-4 max-w-md text-base">
        The page you are looking for may have been moved or no longer exists.
      </p>
      <Link href="/" className="cta-btn mt-8">
        Return to Home
      </Link>
    </div>
  </>
);

export default NotFound;
