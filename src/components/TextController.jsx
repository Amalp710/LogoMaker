import React, { useState, useEffect, useContext } from "react";
import { Slider } from "@/components/ui/slider";
import { UpdateStorageContext } from "@/context/UpdateStorageContext";

const TextController = () => {
  const [text, setText] = useState("Your Text");
  const [rotate, setRotate] = useState(0);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const { updateStorage, setUpdateStorage } = useContext(UpdateStorageContext);

  // Update storage and localStorage whenever the text, rotation, or position changes
  useEffect(() => {
    const updatedValues = {
      ...updateStorage,
      logoText: text,
      textRotate: rotate,
      textPosition: position,
    };
    setUpdateStorage(updatedValues);
    localStorage.setItem("value", JSON.stringify(updatedValues));
  }, [text, rotate, position]);

  return (
    <div className="space-y-3">
      {/* Text input */}
      <div className="my-3">
        <label className="p-2">Text</label>
        <input
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          className="border rounded-md p-2 w-full"
        />
      </div>

      {/* Rotate slider */}
      <div className="my-3">
        <label className="p-2 flex justify-between items-center">
          Rotate <span>{rotate}°</span>
        </label>
        <Slider
          onValueChange={(e) => setRotate(e[0])} // Ensure it gets the value directly
          defaultValue={[0]}
          max={360}
          step={1}
        />
      </div>

      {/* Position X slider */}
      <div className="my-3">
        <label className="p-2 flex justify-between items-center">
          Position X <span>{position.x}px</span>
        </label>
        <Slider
          onValueChange={(e) => setPosition((prev) => ({ ...prev, x: e[0] }))}
          defaultValue={[0]}
          max={500}
          step={1}
        />
      </div>

      {/* Position Y slider */}
      <div className="my-3">
        <label className="p-2 flex justify-between items-center">
          Position Y <span>{position.y}px</span>
        </label>
        <Slider
          onValueChange={(e) => setPosition((prev) => ({ ...prev, y: e[0] }))}
          defaultValue={[0]}
          max={500}
          step={1}
        />/
      </div>
    </div>
  );
};

export default TextController;
