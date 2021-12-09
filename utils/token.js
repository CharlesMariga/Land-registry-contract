import jwt from "jsonwebtoken";
import { promisify } from "util";

const secret = "this-is-a-very-big-secret-to-keep";

export const signToken = async (address) => {
  return await jwt.sign({ address }, secret, { expiresIn: "90d" });
};

export const verifyToken = async (token) => {
  return await promisify(jwt.verify)(token, secret);
};
