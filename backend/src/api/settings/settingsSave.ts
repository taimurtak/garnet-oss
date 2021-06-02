import SettingsService from '../../services/settingsService';
import ApiResponseHandler from '../apiResponseHandler';


export default async (req, res, next) => {
  try {
    const payload = await SettingsService.save(
      req.body.settings,
      req,
    );

    await ApiResponseHandler.success(req, res, payload);
  } catch (error) {
    await ApiResponseHandler.error(req, res, error);
  }
};
