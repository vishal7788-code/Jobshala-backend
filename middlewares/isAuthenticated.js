import jwt from "jsonwebtoken";

const isAuthenticated =  (req, res, next) => {
    try {
        const token = req.cookies.token;
        if (!token) {
            return res.status(401).json({
                message: "Unauthorized no token provided.",
            });
        };
        const decoded =  jwt.verify(token, process.env.SECRET_KEY);
        if (!decoded) {
            return res.status(401).json({
                message: "Token invalid"
            })
        };
        req.id = decoded.userId;
        next();
    } catch (error) {
        console.error("error occured in isAuthenticated middleware");
    }
}
export default isAuthenticated;