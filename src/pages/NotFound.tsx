import { Link } from "react-router-dom";

export const NotFound = () => {
  return (
    <section className="py-20 px-4 text-center">
      <div className="max-w-3xl mx-auto rounded-3xl bg-base-200 p-10 shadow-lg border border-primary/10">
        <p className="text-sm uppercase tracking-[0.3em] text-pink-500/80">
          404
        </p>
        <h1 className="mt-4 text-4xl font-bold text-primary">Page not found</h1>
        <p className="mt-4 text-base-content/75 leading-7">
          The card may have sent you to a dream page that does not exist yet.
          Let&apos;s go back home.
        </p>
        <Link
          to="/"
          className="inline-flex mt-8 rounded-full bg-primary text-white px-6 py-3 shadow-lg hover:bg-primary-focus transition"
        >
          Go Home
        </Link>
      </div>
    </section>
  );
};
