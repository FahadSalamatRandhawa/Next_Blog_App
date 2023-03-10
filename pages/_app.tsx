import '../styles/globals.css'
//import 'tailwindcss'
import type { AppProps } from 'next/app'
import MainLayout from '../src/components/Main-Layout'

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <MainLayout>
        <Component {...pageProps} />
      </MainLayout>       
    </>
  )
}
