import type { NextConfig } from "next";
import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin('./src/i18n/request.ts');

const nextConfig: NextConfig = {
  transpilePackages: ["@darcysm/bastet-ui", "antd", "@ant-design"],
};

export default withNextIntl(nextConfig);
