import { ThemeProvider } from "styled-components";
import { theme } from "./components/styles/Theme";
import GlobalStyles from "./components/styles/Global";
import Navbar from "./components/Navbar";
import FlightInfo from "./components/FlightInfo";

function App() {
  return (
    <ThemeProvider theme={theme}>
      <>
        <GlobalStyles />
        <Navbar></Navbar>
        <FlightInfo></FlightInfo>
      </>
    </ThemeProvider>
  );
}

export default App;
