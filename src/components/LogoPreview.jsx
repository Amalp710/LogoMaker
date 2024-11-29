import React, { useContext, useEffect, useState } from "react";
import { UpdateStorageContext } from "@/context/UpdateStorageContext";
import * as Icons from "react-icons/cg";
import html2canvas from "html2canvas";

function LogoPreview({ downloadIcon }) {
  const [storageValue, setStorageValue] = useState();
  const { updateStorage } = useContext(UpdateStorageContext);

  useEffect(() => {
    const storageData = JSON.parse(localStorage.getItem("value"));
    setStorageValue(storageData);
  }, [updateStorage]);

  useEffect(() => {
    if (downloadIcon) {
      console.log("Download button clicked");
      downloadPngLogo();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [downloadIcon]); // Trigger only when downloadIcon changes

  const downloadPngLogo = () => {
    const downloadLogoDiv = document.getElementById("dowloadLogoDiv");
    html2canvas(downloadLogoDiv, {
      backgroundColor: null,
    }).then((canvas) => {
      const pngImg = canvas.toDataURL("image/png");
      const downloadLink = document.createElement("a");
      downloadLink.href = pngImg;
      downloadLink.download = "Logo.png";
      downloadLink.click();
    });
  };

  const SelectedIcon = storageValue?.icon ? Icons[storageValue.icon] : null;

  return (
    <div className="flex items-center justify-center h-screen w-full p-4">
      <div className="flex justify-center items-center w-full max-w-[500px] bg-gray-300 outline-dotted outline-gray-400">
        <div
          id="dowloadLogoDiv"
          className="h-full w-full flex items-center justify-center relative"
          style={{
            borderRadius: storageValue?.bgRounded,
            background: storageValue?.bgColor,
          }}
        >
          {/* Render Selected Icon */}
          {SelectedIcon && (
            <SelectedIcon
              style={{
                fontSize: `${storageValue?.iconSize || 280}px`,
                transform: `rotate(${storageValue?.iconRotate || 0}deg)`,
                color: storageValue?.iconColor || "black",
              }}
            />
          )}

          {/* Render Text */}
          {storageValue?.logoText && (
            <div
              style={{
                position: "absolute",
                top: `calc(50% + ${storageValue?.textPosition?.y || 0}px)`,
                left: `calc(50% + ${storageValue?.textPosition?.x || 0}px)`,
                transform: `translate(-50%, -50%) rotate(${storageValue?.textRotate || 0}deg)`,
                fontSize: "24px",
                fontWeight: "bold",
                color: storageValue?.textColor || "black",
              }}
              className="text-center"
            >
              {storageValue.logoText}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default LogoPreview;
