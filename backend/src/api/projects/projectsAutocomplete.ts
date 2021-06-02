import ApiResponseHandler from '../apiResponseHandler';
import ProjectsService from '../../services/projectsService';

export default async (req, res, next) => {
  try {
    
    const payload = await new ProjectsService(
      req,
    ).findAllAutocomplete(req.query.query, req.query.limit);

    await ApiResponseHandler.success(req, res, payload);
  } catch (error) {
    await ApiResponseHandler.error(req, res, error);
  }
};
