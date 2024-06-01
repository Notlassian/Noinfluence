import { HttpStatusCodes } from "../Utils/httpStatusCodes.js";

export const getHealth = (_, res) => {
    res.status(HttpStatusCodes.OK);
    res.send("I'm alive");
};
