import React from "react";
import { Button } from "./ui/button";
import { IoIosCloudDownload } from "react-icons/io";

function Header({ DownloadIcon }) {
  return (
    <div className="p-4 shadow-sm border flex flex-col md:flex-row justify-between items-center">
      {/* Logo */}
      <img
        src="/logo.png"
        alt="Logo"
        className="w-[100px] h-[65px] object-contain mb-2 md:mb-0"
      />

      {/* App Name and Subtitle */}
      <div className="text-center md:text-left">
        <h1 className="text-xl font-semibold">Logiepert</h1>
        <p className="text-sm text-gray-500">Make your perfect logo</p>
      </div>

      {/* Download Button */}
      <Button
        className="flex gap-2 items-center bg-[#8fb0a1] hover:bg-[#80d1ad] hover:text-white mt-2 md:mt-0"
        onClick={() => {
          console.log("Button clicked");
          DownloadIcon(Date.now());
        }}
      >
        <IoIosCloudDownload className="h-4 w-4" aria-label="Download Icon" />
        Download
      </Button>
    </div>
  );
}

export default Header;
