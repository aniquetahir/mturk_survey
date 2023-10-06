/**
 * @type {import('next').NextConfig}
 */
const nextConfig = {
    output: 'export',
    // Optional: Add a trailing slash to all paths `/about` -> `/about/`
    // trailingSlash: true,
    // Optional: Change the output directory `out` -> `dist`
    // distDir: 'dist',

    assetPrefix: 'https://anique.ml/mturksurveycompiled',
    basePath: '/mturksurveycompiled'

    //basePath: '/home/anique/projects/instagram_mturk/out'
};

module.exports = nextConfig;