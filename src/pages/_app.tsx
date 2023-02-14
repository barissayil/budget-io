import "../styles/globals.css";
import type { AppProps } from "next/app";
import { MantineProvider } from "@mantine/core";
import { NotificationsProvider } from "@mantine/notifications";
import { SessionProvider } from "next-auth/react";
import { SWRConfig } from "swr/_internal";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <MantineProvider
      withGlobalStyles
      withNormalizeCSS
      theme={{
        fontFamily: "ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace",
        headings: {
          fontFamily: "ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace",
        },
      }}
    >
      <NotificationsProvider>
        <SessionProvider session={pageProps.session}>
          <SWRConfig
            value={{
              refreshInterval: 1000,
              fetcher: (url: URL, init?: RequestInit) => fetch(url, init).then((res) => res.json()),
            }}
          >
            <Component {...pageProps} />
          </SWRConfig>
        </SessionProvider>
      </NotificationsProvider>
    </MantineProvider>
  );
}

export default MyApp;
