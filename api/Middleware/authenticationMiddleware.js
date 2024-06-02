import { CognitoJwtVerifier } from 'aws-jwt-verify';
import { sqlPool } from '../Utils/dbUtils.js';
import { HttpStatusCodes } from '../Utils/httpStatusCodes.js';

export async function authenticationMiddleware(req, res, next) {
    // const verifier = CognitoJwtVerifier.create({
    //     userPoolId: process.env.COGNITO_USERPOOL_ID,
    //     tokenUse: 'access',
    //     clientId: process.env.COGNITO_CLIENT_ID,
    // });

    // try {
    //     const bearerToken = req.get('Authorization').split(' ')[1];
    //     if (!bearerToken)
    //         return res.status(HttpStatusCodes.Unauthorized).json({ message: 'Unauthorized, Please login again.' });
    //     const payload = await verifier.verify(bearerToken);
    //     const { username } = payload;
    //     const userExists = await checkIfUserExists(username);

    //     if (!userExists) {
    //         const userCreated = await createUser(username);
    //         if (!userCreated) {
    //             console.error('The user was not created in the db');
    //             return res.status(HttpStatusCodes.InternalServerError).json({ error: 'Internal Server Error' });
    //         }
    //     }

    //     req.user = username;
    //     return next();
    // } catch (error) {
    //     console.error(`Error validating token: ${error}`);
    //     return res.status(HttpStatusCodes.Unauthorized).json({ message: 'Unauthorized, Please login again.' });
    // }

    return next();
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
