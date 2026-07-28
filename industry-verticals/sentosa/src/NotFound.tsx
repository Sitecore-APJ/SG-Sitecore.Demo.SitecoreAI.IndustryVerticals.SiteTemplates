import Head from 'next/head';
import Link from 'next/link';
import { JSX } from 'react';

/**
 * Rendered in case if we have 404 error
 */
const NotFound = (): JSX.Element => (
  <>
    <Head>
      <title>404: Page Not Found</title>
    </Head>
    <div className="bg-background flex min-h-[60vh] flex-col items-center justify-center px-6 py-20 text-center">
      <p className="text-secondary text-sm font-semibold tracking-widest uppercase">404</p>
      <h1 className="mt-4 text-4xl font-bold lg:text-5xl">Page not found</h1>
      <p className="text-foreground-light mt-4 max-w-md text-lg">
        The page you are looking for may have been moved or no longer exists.
      </p>
      <Link href="/" className="main-btn mt-8 !w-auto !px-10">
        Back to home
      </Link>
    </div>
  </>
);

export default NotFound;
