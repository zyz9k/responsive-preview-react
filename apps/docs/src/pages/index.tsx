import type { ReactNode } from "react";
import clsx from "clsx";
import Link from "@docusaurus/Link";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import Layout from "@theme/Layout";
import HomepageFeatures from "@site/src/components/HomepageFeatures";
import Heading from "@theme/Heading";
import { ChildPreview } from "@locospec/responsive-preview-react";
import ContainerQueryCardModern from "@site/src/components/ContainerQueryCardModern";
import StackCard from "@site/src/components/StackCard";
import { useColorMode } from "@docusaurus/theme-common";

import styles from "./index.module.css";
import YouTubeVideoLoop from "../components/YoutubeVideoLoop";

function HomepageHeader() {
  const { siteConfig } = useDocusaurusContext();
  return (
    <header className={clsx("hero hero--primary", styles.heroBanner)}>
      <div className="container">
        <Heading
          as="h1"
          className="hero__title mx-auto max-w-4xl font-display text-5xl font-medium tracking-tight sm:text-7xl"
        >
          Test Your Responsive Components
        </Heading>
        <p className="hero__subtitle mx-auto mt-6 max-w-2xl text-xl tracking-tight">
          Build and test your responsive designs efficiently. Interactive
          preview environment for React developers.
        </p>
        <div className={styles.buttons}>
          <Link
            className="button button--secondary button--lg"
            to="/docs/install"
          >
            Get Started
          </Link>
        </div>
      </div>
    </header>
  );
}

function PreviewDemo() {
  const { colorMode, setColorMode } = useColorMode();
  return (
    <div className="bg-gradient-to-r from-gray-200 to-slate-200 dark:from-gray-800 dark:to-slate-800">
      <div className="container py-8 lg:py-16 mx-auto drop-shadow-md">
        <div className="bg-white dark:bg-gray-900 rounded-lg p-4 lg:p-8">
          <ChildPreview
            config={{
              darkMode: colorMode === "dark" ? true : false,
            }}
          >
            <StackCard />
          </ChildPreview>
        </div>
      </div>
    </div>
  );
}

export default function Home(): ReactNode {
  const { siteConfig } = useDocusaurusContext();

  return (
    <Layout
      title="Home"
      description="Build and test your responsive designs efficiently. Interactive
          preview environment for React developers."
    >
      <HomepageHeader />
      <PreviewDemo />
      <main>{/* <HomepageFeatures /> */}</main>
    </Layout>
  );
}
