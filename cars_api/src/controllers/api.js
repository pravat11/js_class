import * as apiService from '../services/api.js';

export function getAPIDetails(req, res, next) {
  try {
    const data = apiService.getAPIDetails();

    res.json(data);
  } catch (err) {
    res.status(400).json({
      message: err.message,
    });
  }
}
