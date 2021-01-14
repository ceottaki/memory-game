import Head from 'next/head'
import React from 'react'
import Container from 'react-bootstrap/Container'

import Footer from './Footer'
import Header from './Header'
import styles from './MainLayout.module.scss'

interface IMainLayoutProps {
  children?: JSX.Element[] | JSX.Element | null
  metaTitle?: string | null
  pageTitle?: string | null
  siteTitle?: string | null
}

export const MainLayout: React.FC<IMainLayoutProps> = ({
  children,
  metaTitle,
  pageTitle,
  siteTitle
}) => {
  return (
    <>
      <Head>
        <title>{metaTitle || `${pageTitle || ''} | ${siteTitle || ''}`}</title>
        <link rel='apple-touch-icon' sizes='57x57' href='/images/icons/apple-icon-57x57.png' />
        <link rel='apple-touch-icon' sizes='60x60' href='/images/icons/apple-icon-60x60.png' />
        <link rel='apple-touch-icon' sizes='72x72' href='/images/icons/apple-icon-72x72.png' />
        <link rel='apple-touch-icon' sizes='76x76' href='/images/icons/apple-icon-76x76.png' />
        <link rel='apple-touch-icon' sizes='114x114' href='/images/icons/apple-icon-114x114.png' />
        <link rel='apple-touch-icon' sizes='120x120' href='/images/icons/apple-icon-120x120.png' />
        <link rel='apple-touch-icon' sizes='144x144' href='/images/icons/apple-icon-144x144.png' />
        <link rel='apple-touch-icon' sizes='152x152' href='/images/icons/apple-icon-152x152.png' />
        <link rel='apple-touch-icon' sizes='180x180' href='/images/icons/apple-icon-180x180.png' />
        <link
          rel='icon'
          type='image/png'
          sizes='192x192'
          href='/images/icons/android-icon-192x192.png'
        />
        <link rel='icon' type='image/png' sizes='32x32' href='/images/icons/favicon-32x32.png' />
        <link rel='icon' type='image/png' sizes='96x96' href='/images/icons/favicon-96x96.png' />
        <link rel='icon' type='image/png' sizes='16x16' href='/images/icons/favicon-16x16.png' />
        <link rel='shortcut icon' href='/images/icons/favicon.ico' type='image/x-icon' />
        <link rel='icon' href='/images/icons/favicon.ico' type='image/x-icon' />
        <link rel='manifest' href='/manifest.json' />
        <meta name='msapplication-TileColor' content='#ffffff' />
        <meta name='msapplication-TileImage' content='/images/icons/ms-icon-144x144.png' />
        <meta name='theme-color' content='#ffffff' />
      </Head>
      <Header />
      <main className={styles.mainContent}>
        <Container fluid={true}>{children}</Container>
      </main>
      <Footer />
    </>
  )
}

export default MainLayout
