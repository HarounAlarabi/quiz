import React from "react";

import { DateCounter } from "./DateCounter";
import Header from "./components/Header";
import Main from "./components/Main";
import { QuizProvider } from "./components/contexts/QuizContexts";
function App() {
  return (
    <div className="app">
      <QuizProvider>
        <Header />
        <Main />
      </QuizProvider>
    </div>
  );
}

export default App;
