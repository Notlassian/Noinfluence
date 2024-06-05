import { HttpStatusCodes } from '../Utils/httpStatusCodes.js';

export function retrieveToken(tokenType) {
    return async function (req, res) {
        const { code } = req.body;
        const {
            COGNITO_CLIENT_SECRET: clientSecret,
            COGNITO_CLIENT_ID: clientId,
        } = process.env;

        if (!code) {
            return res
                .status(HttpStatusCodes.BadRequest)
                .json({ error: '"code" is required in request body' });
        }

        const authHeader = Buffer.from(`${clientId}:${clientSecret}`).toString(
            'base64'
        );

        var body = {
            code,
            grant_type: tokenType,
            redirect_uri: process.env.COGNITO_REDIRECT,
        };

        if (tokenType === 'refresh_token')
            body = {
                refresh_token: code,
                grant_type: tokenType,
                redirect_uri: process.env.COGNITO_REDIRECT,
            };

        const response = await fetch(
            `${process.env.COGNITO_DOMAIN}/oauth2/token`,
            {
                method: 'post',
                headers: {
                    Authorization: `Basic ${authHeader}`,
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
                body: new URLSearchParams(body),
            }
        );

        if (response.status !== HttpStatusCodes.OK) {
            const error = await response.json();
            console.error(error);

            return res
                .status(HttpStatusCodes.BadRequest)
                .json({ error: 'Error occured while retrieving token' });
        }

        const tokens = await response.json();
        res.status(HttpStatusCodes.OK).send(tokens);
    };
}

export const checkAuthed = (req, res) => {
    res.status(HttpStatusCodes.OK);
    res.json({ message: 'You are logged in' });
};
