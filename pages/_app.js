import { TestVisibleProvider } from '../context/testContext'
import { UserProvider } from '../context/userContext'
import '../styles/globals.css'

function MyApp({ Component, pageProps }) {
  return (
    <TestVisibleProvider>
      <UserProvider>
        <Component {...pageProps} />
      </UserProvider>
    </TestVisibleProvider>
  ) 
}

export default MyApp
