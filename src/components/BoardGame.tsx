import React from "react";
import { Tile } from "./Tile";
import { gifs } from "../gifs";
import { Button } from "./ui/button";

function shuffleArray(array: any[]) {
  for (let i = array.length - 1; i >= 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

type TileType = {
  id: number;
  url: string;
  type: "primary" | "secondary";
};

export const BoardGame = () => {
  const [nbTurn, setNbTurn] = React.useState(1);
  const [selectedTiles, setSelectedTiles] = React.useState<TileType[]>([]);
  const [revealedTiles, setRevealedTiles] = React.useState<TileType[]>([]);
  const [isGameFrozen, setIsGameFrozen] = React.useState(false);
  const [isGameFinished, setIsGameFinished] = React.useState(false);
  const tiles: TileType[] = React.useMemo(() => {
    const tiles: TileType[] = [];
    for (let i = 0; i < gifs.length; i++) {
      tiles.push({ ...gifs[i], type: "primary" });
      tiles.push({ ...gifs[i], type: "secondary" });
    }
    shuffleArray(tiles);
    return tiles;
  }, []);

  const onClickTile = (tile: TileType) => {
    console.log("click", tile);
    if (
      selectedTiles.length === 1 &&
      selectedTiles[0].id === tile.id &&
      selectedTiles[0].type === tile.type
    ) {
      return;
    }
    const newSelectedTiles = [...selectedTiles, tile];
    if (newSelectedTiles.length === 2) {
      setSelectedTiles(newSelectedTiles);
      if (newSelectedTiles[0].id !== newSelectedTiles[1].id) {
        setTimeout(() => {
          setSelectedTiles([]);
          setIsGameFrozen(false);
          setNbTurn(nbTurn + 1);
        }, 1000);
        setIsGameFrozen(true);
      }
      if (newSelectedTiles[0].id === newSelectedTiles[1].id) {
        setRevealedTiles((prev) => [...prev, ...newSelectedTiles]);
        setSelectedTiles([]);
      }
    } else {
      setSelectedTiles(newSelectedTiles);
    }
  };

  React.useEffect(() => {
    if (revealedTiles.length === tiles.length) {
      setIsGameFrozen(true);
      setTimeout(() => {
        setIsGameFinished(true);
      }, 1000);
    }
  }, [revealedTiles, tiles]);

  return (
    <div className="App">
      <header className="App-header">{nbTurn}</header>
      <div className="flex flex-gap flex-wrap m-auto">
        {!isGameFinished ? (
          tiles.map((tile) => {
            const key = `${tile.id}-${tile.type}`;
            const isSelected = !!selectedTiles.find(
              (t) => t.id === tile.id && t.type === tile.type
            );
            const isRevealed = !!revealedTiles.find(
              (t) => t.id === tile.id && t.type === tile.type
            );
            return (
              <Tile
                key={key}
                isSelected={isSelected || isRevealed}
                className={"flex justify-center"}
                onClick={() => !isGameFrozen && onClickTile(tile)}
              >
                <img
                  src={tile.url}
                  className="fit-content h-[100px] w-[100px]"
                  alt="react logo"
                />
              </Tile>
            );
          })
        ) : (
          <>
            <div>Game finished</div>
            <Button
              onClick={() => {
                setRevealedTiles([]);
                setIsGameFinished(false);
                setIsGameFrozen(false);
                setNbTurn(1);
              }}
            >
              Restart
            </Button>
          </>
        )}
      </div>
    </div>
  );
};
