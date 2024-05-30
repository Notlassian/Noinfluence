import { CognitoJwtVerifier } from 'aws-jwt-verify';
import { sqlPool } from '../Utils/DbUtils.js';

export async function authenticationMiddleware(req, res, next) {
    const verifier = CognitoJwtVerifier.create({
        userPoolId: process.env.COGNITO_USERPOOL_ID,
        tokenUse: 'access',
        clientId: process.env.COGNITO_CLIENT_ID,
    });

    try {
        const bearerToken = req.get('Authorization').split(' ')[1];
        const payload = await verifier.verify(bearerToken);
        const { username } = payload;
        const userExists = await checkIfUserExists(username);

        if (!userExists) {
            const userCreated = await createUser(username);
            if (!userCreated) {
                console.error('The user was not created in the db');
                res.status(500).send('An error occurred');
            }
        }

        req.user = username;
        return next();
    } catch (error) {
        console.error(`Error validating token: ${error}`);
        return res.status(401).send('Token error');
    }
}

async function checkIfUserExists(username) {
    const query = 'SELECT * FROM public.user WHERE username=$1 LIMIT 1';
    const results = await sqlPool.query(query, [username]);
    return results.rowCount === 1;
}

async function createUser(username) {
    const query = 'INSERT INTO public.user ("username") VALUES ($1)';
    const results = await sqlPool.query(query, [username]);
    return results.rowCount === 1;
}