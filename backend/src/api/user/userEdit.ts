import UserEditor from '../../services/user/userEditor';
import ApiResponseHandler from '../apiResponseHandler';

export default async (req, res) => {
  try {
    let editor = new UserEditor(req);

    await editor.update(req.body.data);

    const payload = true;

    await ApiResponseHandler.success(req, res, payload);
    
  } catch (error) {
    await ApiResponseHandler.error(req, res, error);
  }
};
