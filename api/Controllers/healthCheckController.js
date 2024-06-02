import { HttpStatusCodes } from '../Utils/httpStatusCodes.js';

export const getHealth = (_, res) => {
    res.status(HttpStatusCodes.OK);
    res.json({ message: "I'm alive" });
};
