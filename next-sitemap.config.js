/** @type {import('next-sitemap').IConfig} */
module.exports = {
    siteUrl: process.env.SITE_URL || 'https://cbsoft2023.ufms.br',
    generateRobotsTxt: true,
    generateIndexSitemap: false,
    changefreq: 'weekly'
};
