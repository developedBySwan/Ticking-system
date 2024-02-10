
export default function authorize(permission) {
    return (req, res, next) => {
        // Check if user has the required permission
        if (req.user?.role?.permissions?.includes(permission)) {
            return next(); // User has permission, proceed to the next middleware
        } else {
            return res.status(403).json({ message: 'Unauthorized' }); // User doesn't have permission
        }
    };
}