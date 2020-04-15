const users = [
  {
    caption: 'User1',
    // You will need to prepend the image path with your baseUrl
    // if it is not '/', like: '/test-site/img/image.jpg'.
    image: '/img/undraw_open_source.svg',
    infoLink: 'https://prysmaticlabs.com',
    pinned: false,
  },
];

const siteConfig = {
  title: "Prysm 'Topaz' Testnet", // Title for your website.
  tagline: 'An Ethereum 2.0 client written entirely in Go.',
  url: '/', // Your website URL
  baseUrl: '/', // Base URL for your project */
  // For github.io type URLs, you would set the url and baseUrl like:
  //   url: 'https://facebook.github.io',
  //   baseUrl: '/test-site/',

  // Used for publishing and more
  projectName: 'prysm-docs',
  organizationName: 'Prysmatic Labs',
  // For top-level user or org sites, the organization is still the same.
  // e.g., for the https://JoelMarcey.github.io site, it would be set like...
  //   organizationName: 'JoelMarcey'

  // For no header links in the top nav bar -> headerLinks: [],
  headerLinks: [
    {doc: 'getting-started', label: 'Documentation'},
    { href: 'https://prylabs.net', label: 'Activate a Validator' },
    { href: 'https://github.com/prysmaticlabs/prysm', label: 'GitHub' },
    { href: 'https://api.prylabs.network', label: 'API' },
    { href: 'https://medium.com/prysmatic-labs', label: 'Blog' },
  ],

  // If you have users set above, you add it here:
  users,

  /* path to images for header/footer */
  headerIcon: 'img/logo2.png',
  footerIcon: 'img/Prysm.svg',
  favicon: 'img/Prysm.svg',

  /* Colors for website */
  colors: {
    primaryColor: '#22292f',
    secondaryColor: '#ff30a0',
  },

  /* Custom fonts for website */
  /*
  fonts: {
    myFont: [
      "Times New Roman",
      "Serif"
    ],
    myOtherFont: [
      "-apple-system",
      "system-ui"
    ]
  },
  */

  // This copyright info is used in /core/Footer.js and blog RSS/Atom feeds.
  copyright: `Copyright © ${new Date().getFullYear()} Prysmatic Labs, LLC.`,

  highlight: {
    // Highlight.js theme to use for syntax highlighting in code blocks.
    theme: 'dracula',
  },

  // Add custom scripts here that would be placed in <script> tags.
  scripts: ['https://buttons.github.io/buttons.js'],

  // On page navigation for the current documentation page.
  onPageNav: 'separate',
  // No .html extensions for paths.
  cleanUrl: true,

  // Open Graph and Twitter card images.
  ogImage: 'img/Prysm.svg',
  twitterImage: 'img/Prysm.svg',

  // For sites with a sizable amount of content, set collapsible to true.
  // Expand/collapse the links and subcategories under categories.
  docsSideNavCollapsible: true,

  // Show documentation's last contributor's name.
  enableUpdateBy: true,

  // Show documentation's last update time.
  enableUpdateTime: true,

  editUrl: 'https://github.com/prysmaticlabs/documentation/edit/master/docs/',

  // You may provide arbitrary config keys to be used as needed by your
  // template. For example, if you need your repo's URL...
  //   repoUrl: 'https://github.com/facebook/test-site',
  algolia: {
    apiKey: process.env.ALGOLIA_API_KEY,
    indexName: 'prysmaticlabs_prysm',
    algoliaOptions: {} // Optional, if provided by Algolia
  },
};


module.exports = siteConfig;
