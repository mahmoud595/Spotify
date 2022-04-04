import "../styles/globals.css";
import { SessionProvider } from "next-auth/react";
import { QueryClient, QueryClientProvider } from "react-query";
import { PlayButtonContextProvider } from "../store/PlayButtonContext";
const queryClient = new QueryClient();

function MyApp({ Component, pageProps: { session, ...pageProps } }) {
  return (
    <QueryClientProvider client={queryClient}>
      <SessionProvider session={session}>
        <PlayButtonContextProvider>
          <Component {...pageProps} />
        </PlayButtonContextProvider>
      </SessionProvider>
    </QueryClientProvider>
  );
}

export default MyApp;
