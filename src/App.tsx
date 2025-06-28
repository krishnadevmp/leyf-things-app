import { ThemeProvider, createTheme, CssBaseline } from "@mui/material";
import { GoalList } from "./domain/goalList/GoalList";
import "./App.css";

const theme = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: "#646cff",
    },
    secondary: {
      main: "#61dafb",
    },
    background: {
      default: "#f8f9fa",
      paper: "#ffffff",
    },
  },
  typography: {
    fontFamily: "Inter, system-ui, Avenir, Helvetica, Arial, sans-serif",
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: "none",
        },
      },
    },
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <div className="app">
        <header className="app-header">
          <h1>Goal Tracker</h1>
        </header>
        <main>
          <GoalList />
        </main>
      </div>
    </ThemeProvider>
  );
}

export default App;
