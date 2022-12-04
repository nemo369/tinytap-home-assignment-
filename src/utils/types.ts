export interface Path {
    x: number;
    y: number;
}
  export interface Puzzle{
    id: string;
    paths: Path[];
}


export interface PuzzlePiece{
  imgSrc: string,
  width: number,
  height: number,
  pathId: string,
  initialLocation:{
    left: number;
    right: number;
    top: number;
    bottom: number;
  }
}