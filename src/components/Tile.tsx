import { Card } from "./ui/card";
import React from "react";

export const Tile = ({
  children,
  className,
  onClick,
  isSelected,
}: {
  children: React.ReactNode;
  className: string;
  onClick: () => void;
  isSelected: boolean;
}) => {
  return (
    <Card className={`min-w-[10vw] h-[20vh] ${className}`} onClick={onClick}>
      {isSelected && children}
    </Card>
  );
};
