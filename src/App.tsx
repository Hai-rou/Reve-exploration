import { BrowserRouter } from "react-router-dom";
import { useState } from "react";
import AppRoutes from "./routes/AppRoutes";
import Header from "./components/layouts/Header.tsx";
import Footer from "./components/layouts/Footer.tsx";
import Banner from "./components/Items/Banner.tsx";
import Homeintro from "./pages/Homeintro.tsx";


function App() {
  const [showIntro, setShowIntro] = useState(true);

  return (
    <>
      {showIntro ? (
        <Homeintro onEnter={() => setShowIntro(false)} />
      ) : (
        <BrowserRouter>
          <Banner />
          <Header />
          <AppRoutes />
          <Footer />
        </BrowserRouter>
      )}
    </>
  );
}

export default App;
