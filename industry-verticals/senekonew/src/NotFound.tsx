import Head from 'next/head';
import { JSX } from 'react';
import Link from 'next/link';

/**
 * Rendered in case if we have 404 error
 */
const NotFound = (): JSX.Element => (
  <>
    <Head>
      <title>404: Page not found | Seneko</title>
    </Head>
    <div className="flex min-h-[60vh] flex-col items-center justify-center px-6 py-16 text-center">
      <p className="eyebrow">Error 404</p>
      <h1 className="mt-3">Page not found</h1>
      <p className="mt-4 max-w-md">This page does not exist or may have been moved.</p>
      <Link href="/" className="main-btn mt-8 max-w-xs">
        Go to the Home page
      </Link>
    </div>
  </>
);

export default NotFound;
