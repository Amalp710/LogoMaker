import React, { useContext, useEffect, useState } from "react";
import * as Icons from "react-icons/cg"; // Import all icons from the set
import { Slider } from "@/components/ui/slider";
import ColorPickerController from "./ColorPickerController";
import { UpdateStorageContext } from "@/context/UpdateStorageContext";

const IconController = () => {
  const [size, setSize] = useState(280);
  const [rotate, setRotate] = useState(0);
  const [color, setColor] = useState("");
  const [icon, setIcon] = useState("CgController"); // Default icon
  const [showIconPicker, setShowIconPicker] = useState(false);

  const StorageValue = JSON.parse(localStorage.getItem("value"));
  const { updateStorage, setUpdateStorage } = useContext(UpdateStorageContext);

  useEffect(() => {
    const updatedValues = {
      ...StorageValue,
      iconSize: size,
      iconRotate: rotate,
      iconColor: color,
      icon,
    };
    setUpdateStorage(updatedValues);
    localStorage.setItem("value", JSON.stringify(updatedValues));
  }, [size, rotate, color, icon]);

  const handleIconSelect = (iconName) => {
    setIcon(iconName); // Set the selected icon
    setShowIconPicker(false); // Close the picker
  };

  return (
    <div className="p-4 space-y-4">
      {/* Icon Selector */}
      <div>
        <label className="block mb-2 text-sm font-medium">Icon</label>
        <div
          className="p-3 cursor-pointer bg-slate-300 my-2 rounded-md w-[50px] h-[50px] flex items-center justify-center"
          onClick={() => setShowIconPicker(true)} // Open the picker
        >
          {React.createElement(Icons[icon], { size: 24 })}
        </div>

        {showIconPicker && (
          <div
            className="absolute bg-white p-4 border rounded-md shadow-lg grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-3 overflow-y-auto"
            style={{
              top: "60px",
              left: "50%",
              transform: "translateX(-50%)",
              zIndex: 100,
              width: "90%", // Responsive width
              maxHeight: "70vh", // Responsive height
            }}
          >
            {Object.keys(Icons).map((iconName) => (
              <div
                key={iconName}
                className="p-2 border rounded-md flex items-center justify-center hover:bg-gray-200 cursor-pointer"
                onClick={() => handleIconSelect(iconName)}
              >
                {React.createElement(Icons[iconName], { size: 24 })}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Size Slider */}
      <div className="space-y-1">
        <label className="p-2 flex justify-between items-center text-sm">
          Size <span>{size}px</span>
        </label>
        <Slider
          onValueChange={(e) => setSize(e)}
          defaultValue={[280]}
          max={512}
          step={1}
        />
      </div>

      {/* Rotation Slider */}
      <div className="space-y-1">
        <label className="p-2 flex justify-between items-center text-sm">
          Degree <span>{rotate}°</span>
        </label>
        <Slider
          onValueChange={(e) => setRotate(e)}
          defaultValue={[0]}
          max={360}
          step={1}
        />
      </div>

      {/* Color Picker */}
      <div className="space-y-1">
        <label className="p-2 flex justify-between items-center text-sm">
          Color <span>{color}</span>
        </label>
        <ColorPickerController
          hideController={true}
          selectedColor={(value) => setColor(value)}
        />
      </div>
    </div>
  );
};

export default IconController;
