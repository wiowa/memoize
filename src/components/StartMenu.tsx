import { Button } from "./ui/button";

export const StartMenu = ({ onClickStart }: { onClickStart: () => void }) => {
  return (
    <div>
      <h1>Memory Game</h1>
      <p>
        Click on a tile to reveal the image. Match two identical images to win!
      </p>
      <Button onClick={onClickStart}>Start</Button>
    </div>
  );
};
