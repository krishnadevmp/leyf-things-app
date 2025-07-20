import { ThemeProvider, createTheme, CssBaseline } from "@mui/material";
import "./App.css";
import GlobalLoader from "./components/GlobalLoader";
import router from "./routes";
import { RouterProvider } from "react-router-dom";

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
        <main>
          <RouterProvider router={router} />
          <GlobalLoader />
        </main>
      </div>
    </ThemeProvider>
  );
}

export default App;
