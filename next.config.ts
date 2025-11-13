import createNextIntlPlugin from 'next-intl/plugin';
import path from 'path';
import type { NextConfig } from 'next';

const withNextIntl = createNextIntlPlugin();

const nextConfig: NextConfig = {
  basePath: process.env.NEXT_PUBLIC_BASE_PATH || '/.',
  assetPrefix: process.env.NEXT_PUBLIC_ASSET_PREFIX || '/.',
  env: {
    PUBLIC_URL: process.env.NEXT_PUBLIC_URL || '/',
    NEXT_PUBLIC_ASSET_PREFIX: process.env.NEXT_PUBLIC_ASSET_PREFIX || '/.',
  },
  reactStrictMode: true,
  sassOptions: {
    quietDeps: true,
    includePaths: [path.join(__dirname, 'src/app/styles')],
  },
  output: "export",
  images: { unoptimized: true },
  trailingSlash: true,
  skipTrailingSlashRedirect: true,
};

export default withNextIntl(nextConfig) as NextConfig;
