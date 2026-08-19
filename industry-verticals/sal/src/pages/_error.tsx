import { NextPage } from 'next';
import Head from 'next/head';

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
      <title>Error | Singapore Academy of Law</title>
    </Head>
    <div className="bg-background text-foreground flex min-h-screen flex-col items-center justify-center px-6 py-20 text-center">
      <p className="eyebrow mb-4">Error {statusCode || ''}</p>
      <h1 className="max-w-xl">An error occurred</h1>
      <span className="bg-accent mx-auto mt-4 block h-2 w-24" aria-hidden="true" />
      <p className="mt-6 max-w-md">
        {statusCode
          ? `A server-side ${statusCode} error occurred.`
          : 'A client-side error occurred.'}
      </p>
      <a href="/" className="main-btn mt-8 w-auto px-8">
        Go to the Home page
      </a>
    </div>
  </>
);

ErrorPage.getInitialProps = ({ res, err }) => {
  const statusCode = res ? res.statusCode : err ? err.statusCode : 404;

  return { statusCode };
};

export default ErrorPage;
