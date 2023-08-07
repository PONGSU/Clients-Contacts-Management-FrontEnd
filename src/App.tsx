
// import './App.css'
import { ThemeProvider } from 'styled-components'
import { mainTheme } from './styles/theme'
import { GlobalStyle } from './styles/global'
import Router from './routes/routes'
import { ToastContainer } from 'react-toastify'

function App() {

  return (
    <>
      <ThemeProvider theme={mainTheme}>
        <GlobalStyle />
        <Router />
        <ToastContainer
          position='top-right'
          autoClose={2000}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme='light'
        />
      </ThemeProvider>
    </>
  )
}

export default App
