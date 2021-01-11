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
      </Head>
      <Header siteLogo='https://via.placeholder.com/90' />
      <main className={styles.mainContent}>
        <Container fluid={true}>{children}</Container>
      </main>
      <Footer siteLogo='https://via.placeholder.com/90' />
    </>
  )
}

export default MainLayout
