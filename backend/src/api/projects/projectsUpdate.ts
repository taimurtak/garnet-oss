import ApiResponseHandler from '../apiResponseHandler';
import ProjectsService from '../../services/projectsService';

export default async (req, res, next) => {
  try {
    
    const payload = await new ProjectsService(req).update(
      req.params.id,
      req.body.data,
    );

    await ApiResponseHandler.success(req, res, payload);
  } catch (error) {
    await ApiResponseHandler.error(req, res, error);
  }
};
