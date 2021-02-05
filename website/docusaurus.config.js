module.exports = {
    title: 'Prysm',
    tagline: 'Ethereum 2.0 implementation written entirely in Go.',
    url: 'https://docs.prylabs.network',
    baseUrl: '/',
    onBrokenLinks: 'throw',
    favicon: 'img/Prysm.svg',
    organizationName: 'Prysmatic Labs',
    projectName: 'prysm-docs',
    customFields: {
        image: 'img/Prysm.svg',
    },
    scripts: ['https://buttons.github.io/buttons.js'],
    themeConfig: {
        navbar: {
            title: "Prysm Eth2 Docs",
            logo: {
                alt: "Prysm logo",
                src: 'img/logo2.png',
            },
            items: [
                {
                    href: 'https://launchpad.ethereum.org',
                    label: 'Join Eth2',
                    position: 'right',
                },
                {
                    label: 'Updating/Downgrading Versions',
                    to: 'docs/prysm-usage/staying-up-to-date',
                    position: 'right',
                },
                {
                    href: 'https://github.com/prysmaticlabs/prysm',
                    label: 'GitHub',
                    position: 'right',
                },
                {
                    href: 'https://api.prylabs.network',
                    label: 'API',
                    position: 'right',
                },
                {
                    to: 'docs/faq',
                    label: 'FAQ',
                    position: 'right',
                },
            ],
        },
        footer: {
            logo: {
                alt: "Prysm Eth2 Docs",
                href: '/',
                src: 'img/Prysm.svg',
            },
            copyright: `Copyright © ${new Date().getFullYear()} Prysmatic Labs, LLC., Validator Deposit Contract 0x00000000219ab540356cbb839cbe05303d7705fa`,
            links: [],
        },
        algolia: {
            apiKey: 'd56b00e670b1ea4c44047c2d34807f6d',
            indexName: 'prysmaticlabs_prysm',
            algoliaOptions: {}
        },
        googleAnalytics: {
            trackingID: 'UA-139640266-2',
        },
        prism: {
            theme: require('prism-react-renderer/themes/dracula'),
        },
        ogImage: 'img/Prysm.svg',
        twitterImage: 'img/Prysm.svg',
    },
    presets: [
        [
            '@docusaurus/preset-classic',
            {
                docs: {
                    path: './docs',
                    routeBasePath: 'docs',
                    sidebarPath: require.resolve('./sidebars.json'),
                    editUrl: 'https://github.com/prysmaticlabs/documentation/edit/master/website/',
                },
                theme: {
                    customCss: require.resolve('./src/css/custom.css'),
                },
                sitemap: {
                    cacheTime: 600 * 1000,
                    changefreq: 'weekly',
                    priority: 0.5,
                },
            },
        ],
    ],
};
