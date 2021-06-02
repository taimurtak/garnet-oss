import ApiResponseHandler from '../apiResponseHandler';
import ProjectsService from '../../services/projectsService';

export default async (req, res, next) => {
  try {

    const payload = await new ProjectsService(req).findById(
      req.params.id,
    );

    await ApiResponseHandler.success(req, res, payload);
  } catch (error) {
    await ApiResponseHandler.error(req, res, error);
  }
};
