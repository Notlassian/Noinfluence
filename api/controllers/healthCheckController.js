import express from 'express';

export const healthCheckRouter = express.Router();

healthCheckRouter.get('', (req, res) => {
    res.status(200);
    res.send('I\'m alive');
});
 
