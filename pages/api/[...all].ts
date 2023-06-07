import {NextApiRequest, NextApiResponse} from "next";
import httpProxyMiddleware from "next-http-proxy-middleware";

export const config = {
    api: {
        // Enable `externalResolver` option in Next.js
        externalResolver: true,
    },
}
const proxy = (req: NextApiRequest, res: NextApiResponse) => {
    httpProxyMiddleware(req, res, {
        // You can use the `http-proxy` option

        target: 'http://localhost:5008',
        // In addition, you can use the `pathRewrite` option provided by `next-http-proxy`
    });
}
export default proxy;
