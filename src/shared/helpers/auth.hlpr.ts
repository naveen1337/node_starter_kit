import { sign } from "jsonwebtoken";
// import { JWTPayloadType } from "../types/app";

export function issueJWTToken(payload: any) {
  const token = sign(payload, process.env.JWT_SECRET, {
    expiresIn: 10,
  });
  return token; 
}
