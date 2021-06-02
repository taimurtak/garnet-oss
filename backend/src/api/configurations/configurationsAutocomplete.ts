import ApiResponseHandler from '../apiResponseHandler';
import ConfigurationsService from '../../services/configurationsService';

export default async (req, res, next) => {
  try {
    
    const payload = await new ConfigurationsService(
      req,
    ).findAllAutocomplete(req.query.query, req.query.limit);

    await ApiResponseHandler.success(req, res, payload);
  } catch (error) {
    await ApiResponseHandler.error(req, res, error);
  }
};
