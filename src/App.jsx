// App.tsx
import SidebarContainer from "./components/Layout/Sidebar";
import Menu from "./page/Menu/Menu";
import MasterCategory from "./page/Configuration/MasterCategory";
import MasterProduct from "./page/Configuration/MasterProduct";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
// import Navbar from "./components/Layout/Navbar";

function App() {
  return (
    <div className="min-h-screen flex bg-neutral-100">
      <Router>
        <SidebarContainer className="w-64 bg-gray-800 text-white flex-shrink-0 z-50" />
        <main className="flex-grow bg-neutral-100 h-screen overflow-hidden p-4">
          {/* <Navbar /> */}
          <Routes>
            <Route path="/menu" element={<Menu />} />
            <Route path="/configuration/category" element={<MasterCategory />} />
            <Route path="/configuration/product" element={<MasterProduct />} />
          </Routes>
        </main>
      </Router>
    </div>
  );
}

export default App;
