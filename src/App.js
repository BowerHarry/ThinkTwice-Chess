import { useEffect, useState, useCallback } from "react";
import Container from "@mui/material/Container";
import Game from "./Game";
import InitGame from "./InitGame";
import "./App.css";
import PlayerAvatar from './components/PlayerAvatar'; // Adjust the import path as necessary

export default function App() {

  const [instance, setInstance] = useState("");
  const [orientation, setOrientation] = useState("");

  // resets the states responsible for initializing a game
  const cleanup = useCallback(() => {
    setInstance("123");
    setOrientation("white");
  }, []);

  return (
    <Container disableGutters maxWidth={false} className="app">
      {instance ? (
        <div className="app-container">
          <div className="col left">
            <div>Left</div>
          </div>
          <div className="col game-container">
            <div className="top">
              <PlayerAvatar type="bot" />
            </div>
            <Game className="board"
              orientation={orientation}
              // the cleanup function will be used by Game to reset the state when a game is over
              cleanup={cleanup}
            />
            <div className="bottom">
              <PlayerAvatar type="human" />
            </div>
          </div>
          <div className="col right">
            <div>Right</div>
          </div>
        </div>
      ) : (
        <InitGame
          setOrientation={setOrientation}
          setInstance ={setInstance}
        />
      )}
    </Container>
  );
}