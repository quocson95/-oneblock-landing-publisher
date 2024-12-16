import "@/styles/globals.css";
import type { AppProps } from "next/app";
import NextNProgress from 'nextjs-progressbar';

export default function App({ Component, pageProps }: AppProps) {
  <NextNProgress color="#29D" startPosition={0.3} stopDelayMs={500} height={6} showOnShallow={false}/>
  return <Component {...pageProps} />;
}
