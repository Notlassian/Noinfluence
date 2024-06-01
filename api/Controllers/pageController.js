import { retrievePage } from "../Utils/fileUtils";
import { HttpStatusCodes } from "../Utils/httpStatusCodes";

export const getPage = async (req, res) => {
    var query = 'SELECT * from space_pages_view WHERE organization_name = $1 AND space_name = $2 AND folder_name = $3 AND page_name = $4';
    var params = [req.params.orgName, req.params.spaceName, req.params.folder, req.params.page];
    if (!params[0] || !params[1] || !params[2] || !params[3])
        res.status(HttpStatusCodes.InternalServerError).json({ error: 'Internal Server Error' });
    else {
        sqlPool
            .query(query, params)
            .then((sqlRes) => {
                if (sqlRes.rowCount > 0) {
                    res.status(HttpStatusCodes.OK).json({
                        pageContent: retrievePage()
                    });
                } else {
                    res.status(HttpStatusCodes.BadRequest).json({
                        error: `Page ${params[2]}/${params[3]} not found in ${params[1]}`,
                    });
                }
            })
            .catch((error) => {
                console.log(error);
                res.status(HttpStatusCodes.InternalServerError).json({
                    error: 'Internal Server Error',
                });
            });
    }
}