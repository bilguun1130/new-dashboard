import { useState } from "react";
import { Routes, Route, HashRouter } from "react-router-dom";
import Topbar from "./scenes/global/Topbar";
import Sidebar from "./scenes/global/Sidebar";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { ColorModeContext, useMode } from "./theme";
import Pie from "./scenes/pie";
import Bayankhongor from "./scenes/bayankhongor";
import Dashboard from "./scenes/dashboard";
function App() {
  const [theme, colorMode] = useMode();
  const [isSidebar, setIsSidebar] = useState(true);

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <div className="app">
          <Sidebar isSidebar={isSidebar} />
          <main className="content">
            <Topbar setIsSidebar={setIsSidebar} />
  
            <Routes>
              <Route path="/" element={<Dashboard />} />

              <Route path="/pie" element={<Pie />} />
              <Route path="/bayankhongor" element={<Bayankhongor />} />
              <Route path="/ovorkhangai" element={<Bayankhongor />} />
              <Route path="/arkhangai" element={<Bayankhongor />} />
              {/* <Route path="/bar" element={<Bar />} />
              <Route path="/line" element={<Line />} /> */}
            </Routes>

            
          </main>
        </div>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

export default App;
