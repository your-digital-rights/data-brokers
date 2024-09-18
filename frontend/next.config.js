module.exports = {
	async rewrites() {
			return [
				{ 
          source: "/sitemap.xml", 
          destination: "/api/sitemap", 
        }
			];
	},
  i18n: {
    // These are all the locales you want to support in
    // your application
    locales: ["en"],
    defaultLocale: "en",   
  },
  images: {
    domains: ['logo.uplead.com', 'logo.clearbit.com'],
  },  
};