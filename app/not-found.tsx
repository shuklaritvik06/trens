import Link from "next/link";

const NotFound = () => {
  return (
    <div className="flex h-screen items-center justify-center bg-gray-100">
      <div className="text-center">
        <h1 className="text-9xl font-bold text-blue-950">404</h1>
        <h2 className="text-4xl font-semibold text-blue-950">Not Found</h2>
        <p className="mt-4 text-blue-950">
          Sorry, the page you are looking for might be in another castle.
        </p>
        <Link href="/" className="mt-8 inline-block text-blue-950 underline">
          Go Home
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
