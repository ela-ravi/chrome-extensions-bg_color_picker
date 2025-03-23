import "./App.css";
import { useState } from "react";

function App() {
  const [color, setColor] = useState({ color: "#000000" });
  const handleChange = async (e) => {
    try {
      const newColor = { color: e.target.value };
      setColor(newColor);
      let [tab] = await window.chrome.tabs.query({ active: true });
      window.chrome.scripting.executeScript({
        target: { tabId: tab.id },
        args: [newColor],
        function: (color) => {
          document.body.style.backgroundColor = color.color;
        },
      });
    } catch (e) {
      console.error("Error:", e);
    }
  };
  return (
    <div className="app">
      <header className="App-header">
        <h1>Change Background Color</h1>
      </header>
      <section>
        <input
          type="color"
          id="color-picker-id"
          value={color.color}
          onChange={(e) => handleChange(e)}
        />
      </section>
    </div>
  );
}

export default App;
