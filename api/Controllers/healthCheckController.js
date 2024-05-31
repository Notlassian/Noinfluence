export const getHealth = (_, res) => {
    res.status(200);
    res.send("I'm alive");
};
