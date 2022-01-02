import CustomThemeProvider from "./components/CustomThemeProvider"
import Navbar from "./components/Navbar"
import Web3ModalProvider from "./components/Web3ModalProvider"
import MintPage from "./pages/Mint"

const App = () => {

  return (
    <CustomThemeProvider>
      <Web3ModalProvider>
        <Navbar />
        <MintPage />
      </Web3ModalProvider>
    </CustomThemeProvider>
  )
}

export default App

