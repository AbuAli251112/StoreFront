import { userReturnType } from "../interfaces/users";
import jwt, {Secret} from "jsonwebtoken";

const SECRET = process.env.TOKEN_SECRET as Secret;

export function getTokenByUser(user: userReturnType) {

    return jwt.sign({user}, SECRET);

}