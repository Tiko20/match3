import { useEffect, useState, useMemo } from "react";
import Column from "../Columns/Column";
import Cubic from "../Cubic/Cubic";
import "./Board.css";

const GameBoard = () => {
  const [flag, setFlag] = useState(true);
  const gameBallArray = [
    "cont-ball-one",
    "cont-ball-two",
    "cont-ball-three",
    "cont-ball-four",
    "cont-ball-five",
  ];
  const randomNumbers = useMemo(() => {
    const numbers = [];
    for (let i = 0; i < 64; i++) {
      numbers.push(Math.floor(Math.random() * 5));
    }
    return numbers;
  }, []); // Memoize the random numbers array

  const boardGameCombination = useMemo(() => {
    const board = [];
    for (let x = 0; x < 8; x++) {
      board.push([]);
      for (let y = 0; y < 8; y++) {
        board[x].push({
          row: x,
          col: y,
          classic: gameBallArray[randomNumbers[x * 8 + y]],
        });
      }
    }
    return board;
  }, [randomNumbers]); // Memoize the board game combination array

  const columns = [];
  boardGameCombination.map((parent, indexParent) => {
    const cubics = [];
    parent.map((element, indexCont) => {
      cubics.push(
        <Cubic
          row={element.row}
          col={element.col}
          class={element.classic}
          key={`cubic${indexParent * 8 + indexCont}`}
        />
      );
    });
    columns.push(<Column key={`col${indexParent}`}>{cubics}</Column>);
  });
  console.log(flag)
  for (let i = 0; i < 8; i++) {
    for (let j = 0; j < 8; j++) {
      if (
        i < 5 &&
        columns[i].props.children[j].props.class ===
          columns[i + 1].props.children[j].props.class &&
        columns[i].props.children[j].props.class ===
          columns[i + 2].props.children[j].props.class
      ) {
        columns[i].props.children.splice(i, 3);
      }
      if (
        j < 5 &&
        columns[i].props.children[j].props.class ===
          columns[i].props.children[j + 1].props.class &&
        columns[i].props.children[j].props.class ===
          columns[i].props.children[j + 2].props.class
      ) {
        columns[i].props.children.splice(j, 3);
      }
    }
  }
  return (
    <div
      className="game-board"
      onClick={(element) => {
        if (flag) {
          setFlag(false);
        } else {
          setFlag(true);
        }
      }}
    >
      {columns}
    </div>
  );
};

export default GameBoard;
