import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  transpilePackages: ["@darcysm/bastet-ui", "antd", "@ant-design"],
};

export default nextConfig;
