import express from 'express';

export const healthCheckRouter = express.Router();

healthCheckRouter.get('*', (req, res) => {
    res.send('I\'m alive');
});
 
