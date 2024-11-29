import { Slider } from "@/components/ui/slider";
import React, { useContext, useEffect, useState } from 'react';
import ColorPickerController from "./ColorPickerController";
import { UpdateStorageContext } from '@/context/UpdateStorageContext';

function BackgroundController() {
  const [color, setColor] = useState('');
  const [rounded, setRounded] = useState(0);
  const [padding, setpadding] = useState(0);
  const { updateStorage, setUpdateStorage } = useContext(UpdateStorageContext);
  const StorageValue = JSON.parse(localStorage.getItem('value'));

  useEffect(() => {
    const updatedValues = {
      ...StorageValue,
      bgPadding: padding,
      bgRounded: rounded,
      bgColor: color,
    };
    setUpdateStorage(updatedValues);
    localStorage.setItem("value", JSON.stringify(updatedValues));
  }, [color, rounded, padding]);

  return (
    <div className="p-4 space-y-4">
      {/* Rounded Slider */}
      <div className="space-y-2">
        <label className="p-2 flex justify-between items-center text-sm">
          Round <span>{rounded}</span>
        </label>
        <Slider
          onValueChange={(e) => { setRounded(e[0]); }}
          defaultValue={[0]}
          min={0}
          max={512}
          step={1}
        />
      </div>

      {/* Padding Slider */}
      <div className="space-y-2">
        <label className="p-2 flex justify-between items-center text-sm">
          Padding <span>{padding}</span>
        </label>
        <Slider
          onValueChange={(e) => { setpadding(e[0]); }}
          defaultValue={[0]}
          min={0}
          max={100}
          step={1}
        />
      </div>

      {/* Color Picker */}
      <div className="space-y-2">
        <label className="p-2 flex justify-between items-center text-sm">
          Color <span>{color}</span>
        </label>
        <ColorPickerController hideController={true} selectedColor={(value) => setColor(value)} />
      </div>
    </div>
  );
}

export default BackgroundController;
