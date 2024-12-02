import React,{ useState, useMemo, useCallback, useEffect } from "react";
import { Chessboard } from "react-chessboard";
import { Chess } from "chess.js";
import CustomDialog from "./components/CustomDialog";
import "./Game.css";

function Game({ orientation, cleanup }) {
  const chess = useMemo(() => new Chess(), []); // <- 1
  const [fen, setFen] = useState(chess.fen()); // <- 2
  const [over, setOver] = useState("");

  // onDrop function
  function onDrop(sourceSquare, targetSquare) {
    // orientation is either 'white' or 'black'. game.turn() returns 'w' or 'b'
    if (chess.turn() !== orientation[0]) return false; // <- 1 prohibit player from moving piece of other player

    const moveData = {
      from: sourceSquare,
      to: targetSquare,
      color: chess.turn(),
      promotion: "q", // promote to queen where possible
    };

    const move = makeAMove(moveData);

    // illegal move
    if (move === null) return false;
    return requestOpponentMove();
  }

  // requestOpponentMove function
  async function requestOpponentMove() {
    console.log("requesting opponent move: ", chess.fen());
    const data = new FormData();
    data.append('fen', chess.fen());

    const url = 'https://chess-stockfish-16-api.p.rapidapi.com/chess/api';
    const options = {
      method: 'POST',
      headers: {
        'x-rapidapi-key': 'f0c22804c3msh69332e9d6f16771p103c49jsn113dbfc4567c',
        'x-rapidapi-host': 'chess-stockfish-16-api.p.rapidapi.com'
      },
      body: data
    };

    try {
      const response = await fetch(url, options);
      const result = await response.json();
      console.log(result);
      const bestmove = result.bestmove;
      const sourceSquare = bestmove.slice(0, 2);
      const targetSquare = bestmove.slice(2, 4);
      const moveData = {
        from: sourceSquare,
        to: targetSquare,
        color: chess.turn(),
        promotion: "q", // promote to queen where possible
      };
  
      const move = makeAMove(moveData);

    } catch (error) {
      console.error(error);
    }
    return true;
  }


  const makeAMove = useCallback(
    (move) => {
      try {
        const result = chess.move(move); // update Chess instance
        setFen(chess.fen()); // update fen state to trigger a re-render
  
        // console.log("over, checkmate", chess.isGameOver(), chess.isCheckmate());
        // console.log("fen", fen);
  
        if (chess.isGameOver()) { // check if move led to "game over"
          if (chess.isCheckmate()) { // if reason for game over is a checkmate
            // Set message to checkmate. 
            setOver(
              `Checkmate! ${chess.turn() === "w" ? "black" : "white"} wins!`
            ); 
            // The winner is determined by checking which side made the last move
          } else if (chess.isDraw()) { // if it is a draw
            setOver("Draw"); // set message to "Draw"
          } else {
            setOver("Game over");
          }
        }
  
        return result;
      } catch (e) {
        return null;
      } // null if the move was illegal, the move object if the move was legal
    },
    [chess]
  );
  
  // Game component returned jsx
  return (
    <>
      <div className="game" >
        <Chessboard position={fen} onPieceDrop={onDrop} />  {/**  <- 4 */}
      </div>
      <CustomDialog // <- 5
        open={Boolean(over)}
        title={over}
        contentText={over}
        handleContinue={() => {
          setOver("");
        }}
      />
    </>
  );
}

export default Game;
