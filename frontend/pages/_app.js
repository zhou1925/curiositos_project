import '../styles/globals.css'
import Nav from "../components/Nav";
import { StateContext } from "../lib/context";


function MyApp({ Component, pageProps }) {
  return (
    <StateContext>
        <Nav />
        <Component {...pageProps} />
    </StateContext>
  );
}

export default MyApp
