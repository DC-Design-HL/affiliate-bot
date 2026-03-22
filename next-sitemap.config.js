/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: 'https://meshtalem.design-dc.com',
  generateRobotsTxt: true,
  changefreq: 'weekly',
  priority: 0.7,
  sitemapSize: 5000,
  exclude: ['/promo/*'],
  robotsTxtOptions: {
    policies: [
      {
        userAgent: '*',
        allow: '/',
        disallow: '/promo/',
      },
    ],
  },
  transform: async (config, path) => {
    let priority = 0.7;
    let changefreq = 'weekly';
    if (path === '/') { priority = 1.0; changefreq = 'daily'; }
    else if (path.startsWith('/reviews/')) { priority = 0.8; }
    else if (path.startsWith('/category/')) { priority = 0.6; }
    else if (['/privacy', '/terms', '/methodology'].includes(path)) { priority = 0.3; changefreq = 'monthly'; }
    return { loc: path, changefreq, priority, lastmod: new Date().toISOString() };
  },
};
