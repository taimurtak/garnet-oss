import ApiResponseHandler from '../apiResponseHandler';
import UserRepository from '../../database/repositories/userRepository';

export default async (req, res) => {
  try {
    const payload = await UserRepository.findAllAutocomplete(
      req.query.query,
      req.query.limit,
      req,
    );

    await ApiResponseHandler.success(req, res, payload);
    
  } catch (error) {
    await ApiResponseHandler.error(req, res, error);
  }
};
