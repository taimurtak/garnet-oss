import UserDestroyer from '../../services/user/userDestroyer';
import ApiResponseHandler from '../apiResponseHandler';

export default async (req, res) => {
  try {
    let remover = new UserDestroyer(req);

    await remover.destroyAll(req.query);

    const payload = true;

    await ApiResponseHandler.success(req, res, payload);

  } catch (error) {
    await ApiResponseHandler.error(req, res, error);
  }
};
