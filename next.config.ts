import createNextIntlPlugin from 'next-intl/plugin';
import path from 'path';
import type { NextConfig } from 'next';

import { execSync } from 'child_process';
import packageJson from './package.json';

const gitCommit = execSync('git rev-parse HEAD').toString().trim();

const scheduleLastUpdate = execSync('git log -1 --format=%cI -- ":(glob)public/data/events/**/*.json"')
  .toString()
  .trim();

const withNextIntl = createNextIntlPlugin();

const nextConfig: NextConfig = {
  basePath: process.env.NEXT_PUBLIC_BASE_PATH || '/.',
  assetPrefix: process.env.NEXT_PUBLIC_ASSET_PREFIX || '/.',
  env: {
    PUBLIC_URL: process.env.NEXT_PUBLIC_URL || '/',
    NEXT_PUBLIC_ASSET_PREFIX: process.env.NEXT_PUBLIC_ASSET_PREFIX || '/.',
    NEXT_PUBLIC_GIT_COMMIT: gitCommit,
    NEXT_PUBLIC_BUILD_TIME: new Date().toISOString(),
    NEXT_PUBLIC_APP_VERSION: packageJson.version,
    NEXT_PUBLIC_GIT_COMMIT_DATE_SCHEDULE: scheduleLastUpdate,
  },
  reactStrictMode: true,
  sassOptions: {
    quietDeps: true,
    includePaths: [path.join(__dirname, 'src/app/styles')],
  },
  output: 'export',
  images: { unoptimized: true },
  trailingSlash: true,
  skipTrailingSlashRedirect: true,
};

export default withNextIntl(nextConfig) as NextConfig;
