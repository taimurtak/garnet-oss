import ApiResponseHandler from '../apiResponseHandler';
import ProjectsService from '../../services/projectsService';

export default async (req, res, next) => {
  try {

    await new ProjectsService(req).destroyAll(
      req.query.ids,
    );

    const payload = true;

    await ApiResponseHandler.success(req, res, payload);
  } catch (error) {
    await ApiResponseHandler.error(req, res, error);
  }
};
