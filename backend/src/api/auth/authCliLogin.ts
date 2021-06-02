import ApiResponseHandler from '../apiResponseHandler';
import AuthService from '../../services/auth/authService';

export default async (req, res, next) => {
    let idToken;
    if (
        req.headers.authorization &&
        req.headers.authorization.startsWith('Bearer ')
    ) {
        // Reads the access Token from the Authorization header.
        idToken = req.headers.authorization.split('Bearer ')[1];
    } else {
        return next();
    }


    try {
        const currentUser: any = await AuthService.findByToken(
            idToken,
            req,
        );

        const payload = currentUser.tenants[0].tenant.id;
        await ApiResponseHandler.success(req, res, payload);
        
    } catch (error) {
        await ApiResponseHandler.error(req, res, error);
    }
};