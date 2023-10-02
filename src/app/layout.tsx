import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Alpaca Form',
  description: 'Generated by forms next app',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="w-full overflow-x-clip">
          <div className="relative mx-auto max-w-md px-6 sm:max-w-lg sm:px-0 md:max-w-2xl lg:max-w-4xl xl:max-w-5xl">
            <div className="absolute left-[-350px] top-[-250px] -z-10 transform">
              <svg
                width="300"
                height="300"
                className="text-amber-200 blur-[200px] filter"
                viewBox="0 0 300 300"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden="true"
              >
                <circle cx="150" cy="150" r="150" fill="currentColor" />
              </svg>
            </div>
          </div>
          <div className="relative mx-auto max-w-md px-6 sm:max-w-lg sm:px-0 md:max-w-2xl lg:max-w-4xl xl:max-w-5xl">
            <div className="absolute left-[-100px] top-[600px] -z-10 transform">
              <svg
                width="300"
                height="300"
                className="text-amber-200 blur-[200px] filter"
                viewBox="0 0 300 300"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden="true"
              >
                <circle cx="150" cy="150" r="150" fill="currentColor" />
              </svg>
            </div>
          </div>
          <div className="relative mx-auto max-w-md px-6 sm:max-w-lg sm:px-0 md:max-w-2xl lg:max-w-4xl xl:max-w-5xl">
            <div className="absolute right-[-200px] top-[400px] -z-10 transform">
              <svg
                width="300"
                height="300"
                className="text-amber-200 blur-[200px] filter"
                viewBox="0 0 300 300"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden="true"
              >
                <circle cx="150" cy="150" r="150" fill="currentColor" />
              </svg>
            </div>
          </div>
        </div>
        {children}
      </body>
    </html>
  );
}