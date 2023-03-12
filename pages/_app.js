// pages/_app.js

import '../styles/globals.css'
import Navigation from '../components/Navigation'

function MyApp({ Component, pageProps }) {
    return (
        <div>
            <header>
                <Navigation />
            </header>
            <Component {...pageProps} />
        </div>
    )
}

export default MyApp
