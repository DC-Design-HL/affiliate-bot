/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: 'https://meshtalem.design-dc.com',
  generateRobotsTxt: true,
  changefreq: 'weekly',
  priority: 0.7,
  sitemapSize: 5000,
  robotsTxtOptions: {
    policies: [
      {
        userAgent: '*',
        allow: '/',
      },
    ],
  },
};
