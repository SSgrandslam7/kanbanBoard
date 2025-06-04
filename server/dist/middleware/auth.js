import jwt from 'jsonwebtoken';
export const authenticateToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    if (!token)
        return res.status(401).json({ message: 'Access token missing' });
    try {
        const secret = process.env.JWT_SECRET_KEY;
        if (!secret)
            throw new Error('Missing JWT secret key in env');
        const decoded = jwt.verify(token, secret);
        req.user = decoded;
        return next();
    }
    catch (err) {
        return res.status(403).json({ message: 'Invalid or expired token' });
    }
};
