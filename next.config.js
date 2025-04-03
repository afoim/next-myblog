module.exports = {
    typescript: {
      ignoreBuildErrors: true, // 允许 TypeScript 错误继续构建
    },
    eslint: {
      ignoreDuringBuilds: true, // 允许 ESLint 错误继续构建
    },
    experimental: {
      optimizeCss: false, // 关闭 CSS 优化
      optimizeFonts: false, // 关闭字体优化
    },
  };
  