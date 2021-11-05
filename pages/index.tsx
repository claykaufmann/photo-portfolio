import type { NextPage } from 'next'
import Head from 'next/head'
import styles from '../styles/Home.module.css'

const Home: NextPage = () => {
  return (
    <div className={styles.container}>
      <Head>
        <title>Create Next App</title>
        <meta
          name="description"
          content="Photography portfolio of Clay Kaufmann"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>Site under construction...</h1>
        <p>Soon to be my photography portfolio...</p>
        <p>
          In the meantime, check me out on{' '}
          <a
            className={styles.link}
            href="https://www.instagram.com/byclaykay/"
          >
            instagram!
          </a>
        </p>
        <p>
          Or visit{' '}
          <a className={styles.link} href="https://claykaufmann.com">
            my main site!
          </a>
        </p>
      </main>

      <footer className={styles.footer}>
        <p>Site built by Clay Kaufmann</p>
      </footer>
    </div>
  )
}

export default Home
