import Head from 'next/head';
import Link from 'next/link';
import { JSX } from 'react';

/**
 * Rendered in case if we have 404 error
 */
const NotFound = (): JSX.Element => (
  <>
    <Head>
      <title>404: Page Not Found | Moxa</title>
    </Head>
    <div className="container flex min-h-[50vh] flex-col items-center justify-center py-20 text-center">
      <h1 className="mb-4">Page not found</h1>
      <p className="text-foreground-light mb-8 max-w-md">
        The page you are looking for does not exist or may have been moved.
      </p>
      <Link href="/" className="main-btn">
        Return to Home
      </Link>
    </div>
  </>
);

export default NotFound;
