import type { ReactNode } from "react";
import clsx from "clsx";
import Link from "@docusaurus/Link";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import Layout from "@theme/Layout";
import HomepageFeatures from "@site/src/components/HomepageFeatures";
import Heading from "@theme/Heading";
import { ChildPreview } from "@locospec/responsive-preview-react";
import ContainerQueryCardModern from "@site/src/components/ContainerQueryCardModern";

import styles from "./index.module.css";

function HomepageHeader() {
  const { siteConfig } = useDocusaurusContext();
  return (
    <header className={clsx("hero hero--primary", styles.heroBanner)}>
      <div className="container py-8 lg:py-16">
        <Heading
          as="h1"
          className="hero__title mx-auto max-w-4xl font-display text-5xl font-medium tracking-tight sm:text-7xl"
        >
          Perfect Your Responsive Components
        </Heading>
        <p className="hero__subtitle mx-auto mt-6 max-w-2xl text-xl tracking-tight">
          Build and test your responsive designs effortlessly. Interactive
          preview environment for React developers.
        </p>
        <div className={styles.buttons}>
          <Link
            className="button button--secondary button--lg"
            to="/docs/intro"
          >
            Setup - 5min ⏱️
          </Link>
        </div>
      </div>
    </header>
  );
}

export default function Home(): ReactNode {
  const { siteConfig } = useDocusaurusContext();
  return (
    <Layout
      title={`${siteConfig.title}`}
      description="Description will go into a meta tag in <head />"
    >
      <HomepageHeader />
      <div className="bg-gradient-to-r from-gray-200 to-slate-200">
        <div className="container py-8 lg:py-16 mx-auto drop-shadow-md">
          <ChildPreview>
            <ContainerQueryCardModern />
          </ChildPreview>
        </div>
      </div>
      <main>
        <HomepageFeatures />
      </main>
    </Layout>
  );
}
