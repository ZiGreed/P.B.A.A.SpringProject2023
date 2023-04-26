const jwt = require("jsonwebtoken");

const auth = (req, res, next) => {
    try {
        const token = req.cookies.token;

        if (!token) return res.status(401).json({ error: "Unauthorized" });

        const verified = jwt.verify(token, "TokenPassword");
        req.user= verified.user;
        req.email = verified.email;
        req.role = verified.role;

        next()

    } catch (err){
        console.error(err)
        res.status(401).json({ error: "Unauthorized" });
    }
}

module.exports = auth;