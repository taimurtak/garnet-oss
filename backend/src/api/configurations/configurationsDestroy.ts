import ApiResponseHandler from '../apiResponseHandler';
import ConfigurationsService from '../../services/configurationsService';

export default async (req, res, next) => {
  try {
    
    await new ConfigurationsService(req).destroyAll(
      req.query.ids,
    );

    const payload = true;

    await ApiResponseHandler.success(req, res, payload);
  } catch (error) {
    await ApiResponseHandler.error(req, res, error);
  }
};
