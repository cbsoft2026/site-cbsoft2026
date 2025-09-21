/** @type {import('next-sitemap').IConfig} */
module.exports = {
    siteUrl: process.env.SITE_URL || 'https://cbsoft2026.ime.usp.br',
    generateRobotsTxt: true,
    generateIndexSitemap: false,
    changefreq: 'weekly'
};
