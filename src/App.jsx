import React from "react";
import { Routes, Route } from "react-router-dom";
import GuidePage from "@/components/pages/GuidePage";

function App() {
  return (
    <div className="min-h-screen bg-background">
      <Routes>
        <Route path="/" element={<GuidePage />} />
      </Routes>
    </div>
  );
}

export default App;