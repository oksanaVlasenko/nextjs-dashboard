import Link from 'next/link';
import Image from 'next/image';
import imageSrc from "@/public/404-cat.jpeg";
 
export default async function NotFound() {
  return (
    <section className="relative overflow-hidden flex items-center justify-center min-h-screen">
      <Image
        src={imageSrc}
        alt="Description"
        priority={true}
        style={{ width: '50%', height: '100%', objectFit: 'cover' }}
        className="hidden lg:block absolute top-0 right-0 h-full"
      />

      <div className="relative container px-4 mx-auto flex justify-center lg:justify-start items-center">
        <div className="py-16 md:py-20 lg:py-40 max-w-sm text-center lg:text-left">
          <h3 className="text-7xl font-semibold text-neutral-900 mb-4">404</h3>
          <h4 className="font-heading text-4xl font-bold text-neutral-900 mb-6">
            Oops! Can't Find That Page
          </h4>
          <p className="text-xl font-semibold text-neutral-500 mb-14">
            Sorry, the page you are looking for doesn't exist or has been moved. Try searching our site:
          </p>

          <Link
            href="/dashboard"
            className="flex justify-center items-center h-full w-full px-4 py-3 font-semibold tracking-tight text-white bg-neutral-900 hover:bg-neutral-800 focus:bg-neutral-800 rounded-lg focus:ring-4 focus:ring-neutral-400 transition duration-200"
          >
            Go Back
          </Link>
        </div>
      </div>
    </section>
  );
}