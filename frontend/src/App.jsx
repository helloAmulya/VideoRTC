import { useState } from "react";
import "./App.css";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import { SocketProvider } from "./providers/Socket.jsx";

function App() {
  const [count, setCount] = useState(0);

  return (
    <SocketProvider>
      <Routes>
        <Route path="/" element={<Home />} />
        {/* Add more routes here if needed */}
      </Routes>
    </SocketProvider>
  );
}

export default App;
