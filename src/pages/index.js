import React from 'react';
import clsx from 'clsx';
import Layout from '@theme/Layout';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import useBaseUrl from '@docusaurus/useBaseUrl';
import styles from './styles.module.css';

const features = [
  {
    title: '快速开始',
    imageUrl: 'img/undraw_docusaurus_mountain.svg',
    description: (
      <>
        聆思智能推出 AI 芯片 CSK系列，通过完善的开发生态体系让端侧 AI 能力变得触手可及。聆思文档中心通过文档和简单的示例，让开发者快速学会CSK芯片的开发。【<a href="/guides_index">点击前往</a>】
      </>
    ),
  },
  {
    title: '丰富 API',
    imageUrl: 'img/undraw_docusaurus_tree.svg',
    description: (
      <>
        CSK芯片拥有拓展性强的 SDK，开发者可以方便地查看 API 文档，来使用CSK SDK。【<a href="/csksdk_api">点击前往</a>】
      </>
    ),
  },
  {
    title: '代码开源',
    imageUrl: 'img/undraw_docusaurus_react.svg',
    description: (
      <>
        聆思智能通过 LSCloud 开源所有 CSK 芯片的开源代码，开发者可以在开源代码基础上进行二次开发，实现自己的业务逻辑。【<a href="https://cloud.listenai.com/">点击前往</a>】
      </>
    ),
  },
];

function Feature({ imageUrl, title, description }) {
  const imgUrl = useBaseUrl(imageUrl);
  return (
    <div className={clsx('col col--4', styles.feature)}>
      {imgUrl && (
        <div className="text--center">
          <img className={styles.featureImage} src={imgUrl} alt={title} />
        </div>
      )}
      <h3>{title}</h3>
      <p>{description}</p>
    </div>
  );
}

function Home() {
  const context = useDocusaurusContext();
  console.log(context)
  const { siteConfig = {} } = context;
  return (
    <Layout
      title={`Hello from ${siteConfig.title}`}
      description="Description will go into a meta tag in <head />">
      <header className={clsx('hero hero--primary', styles.heroBanner)}>
        <div className="container">
          <h1 className="hero__title">{siteConfig.title}</h1>
          <p className="hero__subtitle">{siteConfig.tagline}</p>
          <div className={styles.buttons}>
            <Link
              className={clsx(
                'button button--outline button--secondary button--lg white',
                styles.getStarted,
              )}
              to={useBaseUrl('/guides_index')}>
              Get Started
            </Link>
          </div>
        </div>
      </header>
      <main>
        {features && features.length > 0 && (
          <section className={styles.features}>
            <div className="container">
              <div className="row">
                {features.map((props, idx) => (
                  <Feature key={idx} {...props} />
                ))}
              </div>
            </div>
          </section>
        )}
      </main>
    </Layout>
  );
}

export default Home;
