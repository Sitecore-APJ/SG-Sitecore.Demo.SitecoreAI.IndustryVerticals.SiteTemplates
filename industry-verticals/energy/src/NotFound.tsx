import Head from 'next/head';
import Link from 'next/link';
import { JSX } from 'react';

/**
 * Rendered in case if we have 404 error
 */
const NotFound = (): JSX.Element => (
  <>
    <Head>
      <title>404: Not found</title>
    </Head>
    <div className="bg-background-accent min-h-[60vh] px-4 py-16 md:py-24">
      <div className="container mx-auto max-w-lg text-center md:text-left">
        <h1 className="text-foreground mb-4 text-3xl font-bold md:text-4xl">Page not found</h1>
        <p className="text-foreground-light mb-10 text-base leading-relaxed">
          The page you are looking for does not exist or may have been moved.
        </p>
        <Link href="/" className="main-btn inline-flex">
          Go to the home page
        </Link>
      </div>
    </div>
  </>
);

export default NotFound;
