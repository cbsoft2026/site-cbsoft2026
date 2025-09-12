import createNextIntlPlugin from 'next-intl/plugin';
import path from 'path';
import type { NextConfig } from 'next';

const withNextIntl = createNextIntlPlugin();

const nextConfig: NextConfig = {
  env: {
    PUBLIC_URL: '/',
  },
  reactStrictMode: true,
  sassOptions: {
    quietDeps: true,
    includePaths: [path.join(__dirname, 'src/app/styles')],
  },
  output: "export",
  images: { unoptimized: true },
  trailingSlash: true,
  skipTrailingSlashRedirect: true
};

export default withNextIntl(nextConfig) as NextConfig;
