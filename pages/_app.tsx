import { ChakraProvider } from '@chakra-ui/react'
import type { AppProps } from 'next/app'
import '../styles/globals.scss'
import Script from 'next/script'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider>
      <Script
        src="https://www.googletagmanager.com/gtag/js?id=G-RH4QJFQ3PT"
        strategy="afterInteractive"
      />
      <Script id="google-analytics" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){window.dataLayer.push(arguments);}
          gtag('js', new Date());

          gtag('config', 'GA_MEASUREMENT_ID');
        `}
      </Script>
      <Component {...pageProps} />
    </ChakraProvider>
  )
}

export default MyApp
