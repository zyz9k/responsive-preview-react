import { themes as prismThemes } from "prism-react-renderer";
import type { Config } from "@docusaurus/types";
import type * as Preset from "@docusaurus/preset-classic";
import "dotenv/config";

// This runs in Node.js - Don't use client-side code here (browser APIs, JSX...)

const BASE_URL =
  process.env.PR_NUMBER !== undefined
    ? `/pr-preview/pr-${process.env.PR_NUMBER}/`
    : "/";

const config: Config = {
  tagline: "Test your responsive designs with ease and power",
  title: "Responsive Preview Component for React",
  favicon: "img/favicon.ico",

  // Set the production url of your site here

  url: "https://responsive-preview-react.locospec.com",
  // Set the /<baseUrl>/ pathname under which your site is served
  // For GitHub pages deployment, it is often '/<projectName>/'
  baseUrl: BASE_URL,

  // GitHub pages deployment config.
  // If you aren't using GitHub pages, you don't need these.
  organizationName: "locospec", // Usually your GitHub org/user name.
  projectName: "responsive-preview-react", // Usually your repo name.

  onBrokenLinks: "throw",
  onBrokenMarkdownLinks: "warn",

  // Even if you don't use internationalization, you can use this field to set
  // useful metadata like html lang. For example, if your site is Chinese, you
  // may want to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: "en",
    locales: ["en"],
  },

  stylesheets: [
    "https://fonts.googleapis.com/css2?family=Geist:wght@100..900&family=Inter:wght@300;400;500;600;700;800;900&family=Lexend:wght@100..900&display=swap",
  ],

  plugins: [
    "docusaurus-tailwindcss-loader",
    [
      "@ohimg/ohimg-docusaurus-plugin",
      {
        enabledPlugins: [
          "docusaurus-plugin-content-docs",
          "docusaurus-plugin-content-pages",
          "docusaurus-plugin-content-blog",
        ],
        debug: false,
        publishableKey: process.env.OMG_PUBLISHABLE_KEY,
        signatureSecret: process.env.OMG_SIGNATURE_SECRET,
        imageOptions: {
          logoSrc:
            "https://responsive-preview-react.locospec.com/img/rpr-dark-logo.svg",
        },
      },
    ],
    function () {
      return {
        name: "custom-watch-plugin",
        getPathsToWatch() {
          return ["../../packages/responsive-preview-react/dist/**/*.{js,css}"];
        },
      };
    },
  ],

  presets: [
    [
      "classic",
      {
        docs: {
          sidebarPath: "./sidebars.ts",
          // Please change this to your repo.
          // Remove this to remove the "edit this page" links.
          editUrl:
            "https://github.com/facebook/docusaurus/tree/main/packages/create-docusaurus/templates/shared/",
        },
        blog: {
          showReadingTime: true,
          feedOptions: {
            type: ["rss", "atom"],
            xslt: true,
          },
          // Please change this to your repo.
          // Remove this to remove the "edit this page" links.
          editUrl:
            "https://github.com/facebook/docusaurus/tree/main/packages/create-docusaurus/templates/shared/",
          // Useful options to enforce blogging best practices
          onInlineTags: "warn",
          onInlineAuthors: "warn",
          onUntruncatedBlogPosts: "warn",
        },
        theme: {
          customCss: "./src/css/custom.css",
        },
      } satisfies Preset.Options,
    ],
  ],

  themeConfig: {
    // Replace with your project's social card
    image: "img/social-card.png",
    navbar: {
      title: "Responsive Preview for React",
      logo: {
        alt: "Responsive Preview",
        srcDark: "img/rpr-dark-logo.svg",
        src: "img/rpr-light-logo.svg",
      },
      items: [
        {
          type: "docSidebar",
          sidebarId: "tutorialSidebar",
          position: "left",
          label: "Docs",
        },
        { to: "/blog", label: "Blog", position: "left" },
        {
          href: "https://github.com/locospec/responsive-preview-react",
          label: "GitHub",
          position: "right",
        },
      ],
    },
    footer: {
      style: "dark",
      links: [
        {
          title: "Docs",
          items: [
            {
              label: "Docs",
              to: "/docs/install",
            },
          ],
        },
        {
          title: "Community",
          items: [
            {
              label: "X",
              href: "https://x.com/rjv_im",
            },
          ],
        },
        {
          title: "More",
          items: [
            {
              label: "Blog",
              to: "/blog",
            },
            {
              label: "GitHub",
              href: "https://github.com/locospec/responsive-preview-react",
            },
          ],
        },
      ],
      copyright: `Copyright © ${new Date().getFullYear()} Locospec.com. Built with Docusaurus.`,
    },
    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula,
    },
  } satisfies Preset.ThemeConfig,
};

export default config;
