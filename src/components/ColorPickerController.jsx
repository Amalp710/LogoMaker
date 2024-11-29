import React, { useState, useEffect } from 'react';
import ColorPicker from 'react-best-gradient-color-picker';

function ColorPickerController({ hideController = false, selectedColor }) {
  // Initialize local state for color (can be synced with parent if needed)
  const [color, setColor] = useState('rgba(255,255,255,1)');

  // Sync the local color state with the selectedColor from parent
  useEffect(() => {
    if (selectedColor) {
      setColor(selectedColor); // Sync color if parent passes new color
    }
  }, [selectedColor]);

  return (
    <div>
      <ColorPicker
        value={color}
        onChange={(e) => {
          setColor(e);
          selectedColor(e); // Update parent with new color
        }}
        hideControls={hideController}
        hideEyeDrops
        hideAdvancedSliders
        hideColorGuide
        hideInputTypes
      />
    </div>
  );
}

export default ColorPickerController;
