interface ICoordinates {
  x: number,
  y: number
}

interface ISnake extends ICoordinates {
  dx: number,
  dy: number,
  cells: ICoordinates[],
  maxCells: number,
}

interface IApple extends ICoordinates {}

export { ICoordinates, IApple, ISnake }
