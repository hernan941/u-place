export interface User {
  _id: string;
  email: string;
  password: string;
}

export interface IMarker {
  _id: string;
  position: [number, number],
  desc?: string;
  author: string;
  image: Buffer;
  imageFilename: string;
  points: number;
}