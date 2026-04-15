import { NextPage } from 'next';
import Head from 'next/head';
import Link from 'next/link';

interface ErrorPageProps {
  statusCode?: number | null | undefined;
}

/**
 * Rendered for 500 errors on both server and client. Used only in Production mode.
 * @link https://nextjs.org/docs/advanced-features/custom-error-page#more-advanced-error-page-customizing
 */
const ErrorPage: NextPage<ErrorPageProps> = ({ statusCode }) => (
  <>
    <Head>
      <title>Error</title>
    </Head>
    <div className="bg-background-accent min-h-[50vh] px-4 py-16">
      <div className="container mx-auto max-w-lg">
        <h1 className="text-foreground mb-4 text-3xl font-bold">Something went wrong</h1>
        <p className="text-foreground-light mb-10 text-base leading-relaxed">
          {statusCode
            ? `A server-side error occurred (${statusCode}). Please try again later.`
            : 'A client-side error occurred. Please refresh the page or return home.'}
        </p>
        <Link href="/" className="main-btn inline-flex">
          Go to the home page
        </Link>
      </div>
    </div>
  </>
);

ErrorPage.getInitialProps = ({ res, err }) => {
  const statusCode = res ? res.statusCode : err ? err.statusCode : 404;

  return { statusCode };
};

export default ErrorPage;
