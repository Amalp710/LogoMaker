import Header from "./components/Header";
import SideNav from "./components/SideNav";
import IconController from "./components/IconController";
import BackgroundController from "./components/BackgroundController";
import { useState } from "react";
import LogoPreview from "./components/LogoPreview";
import { UpdateStorageContext } from "./context/UpdateStorageContext";
import TextController from "./components/TextController";

function App() {
  const [selected, setSelected] = useState(0);
  const [downloadIcon, setDownloadIcon] = useState();
  const [updateStorage, setUpdateStorage] = useState({});
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <UpdateStorageContext.Provider value={{ updateStorage, setUpdateStorage }}>
      <div className="flex flex-col">
        {/* Header */}
        <Header DownloadIcon={setDownloadIcon} />

        {/* Responsive layout for main content */}
        <div className="flex flex-col lg:flex-row">
          {/* Sidebar */}
          <div
            className={`${
              isSidebarOpen ? "translate-x-0" : "-translate-x-full"
            } lg:translate-x-0 transition-transform fixed top-0 left-0 z-50 w-64 bg-white shadow-md lg:static lg:w-64 h-full`}
          >
            <SideNav selectedId={(value) => setSelected(value)} />
          </div>

          {/* Main content */}
          <div
            className="flex-grow lg:ml-64 grid grid-cols-1 lg:grid-cols-6 h-screen"
            onClick={() => isSidebarOpen && setIsSidebarOpen(false)} // Close sidebar on main content click
          >
            {/* Controllers */}
            <div className="lg:col-span-2 shadow-sm p-2 bg-white">
              {selected === 1 && <IconController />}
              {selected === 2 && <BackgroundController />}
              {selected === 3 && <TextController />}
            </div>

            {/* Logo Preview */}
            <div className="lg:col-span-3 p-4 bg-gray-50">
              <LogoPreview downloadIcon={downloadIcon} />
            </div>

            {/* Ads Section */}
            <div className="lg:col-span-1 bg-cyan-950 p-4 flex justify-center items-center text-white">
              Ads
            </div>
          </div>
        </div>

        {/* Sidebar toggle button for smaller screens */}
        <button
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          className="lg:hidden fixed top-4 left-4 z-50 p-2 bg-cyan-700 text-white rounded-full shadow-md"
        >
          {isSidebarOpen ? "Close Menu" : "Open Menu"}
        </button>
      </div>
    </UpdateStorageContext.Provider>
  );
}

export default App;
