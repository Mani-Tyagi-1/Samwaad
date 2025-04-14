import "./App.css";

import { ThemeProvider } from "./components/ThemeComponents/ThemeProvider";
import LandingPage from "./pages/LandingPage";

function App() {
  return (
    <>
      <ThemeProvider>
        <LandingPage />
      </ThemeProvider>
    </>
  );
}

export default App;
