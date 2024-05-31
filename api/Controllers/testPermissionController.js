//import { sqlPool } from '../Utils/DbUtils.js';
export const writePermissionTest = (req, res) => {
    res.status(200);
    res.send('Yeah you can indeed write');
};

export const readPermissionTest = (req, res) => {
    res.status(200);
    res.send('Yeah you can indeed Read');
};
export const adminPermissionTest = (req, res) => {
    res.status(200);
    res.send('Yeah you are indeed Admin');
};
