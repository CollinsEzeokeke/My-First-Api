// Types for the user object
export default interface User {
  id: number;
  username: string;
  displayName: string;
}
// Types for the error object
export interface CustomError extends Error {
  status? : number;
}