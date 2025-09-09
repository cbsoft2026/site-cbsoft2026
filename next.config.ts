import createNextIntlPlugin from 'next-intl/plugin';
import path from 'path';

const withNextIntl = createNextIntlPlugin();

/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    PUBLIC_URL: '/',
  },
  reactStrictMode: true,
  sassOptions: {
    quietDeps: true,
    includePaths: [path.join(__dirname, 'src/app/styles')],
  },
};

export default withNextIntl(nextConfig);
