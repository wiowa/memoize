import { useState } from "react";
import { Button } from "./components/ui/button";
import "./App.css";
import { StartMenu } from "./components/StartMenu";
import { BoardGame } from "./components/BoardGame";

function App() {
  const [isGameStarted, setIsGameStarted] = useState(false);
  return (
    <div className="App">
      {isGameStarted && (
        <div>
          <Button onClick={() => setIsGameStarted(false)}>
            Go back to menu
          </Button>
        </div>
      )}
      {!isGameStarted ? (
        <StartMenu onClickStart={() => setIsGameStarted(true)} />
      ) : (
        <BoardGame />
      )}
    </div>
  );
}

export default App;
