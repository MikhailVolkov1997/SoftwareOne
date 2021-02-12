import './App.css'
import { createMuiTheme, CssBaseline, ThemeProvider } from '@material-ui/core'
import EntityList from './components/EntityList/EntityList'

const theme = createMuiTheme({
  overrides: {
    // MuiCssBaseline: {
    //   '@global': {
    //     html: {
    //       background:
    //         'linear-gradient(90deg, #ece6f9 21px, transparent 1%) center, linear-gradient(#ece6f9 21px, transparent 1%) center, #1e1c24',
    //       backgroundSize: 22
    //     }
    //   }
    // }
    background:
      'linear-gradient(90deg, #ece6f9 21px, transparent 1%) center, linear-gradient(#ece6f9 21px, transparent 1%) center, #1e1c24',
    backgroundSize: 22
  }
})

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <div className="App">
        <EntityList />
      </div>
    </ThemeProvider>
  )
}

export default App
