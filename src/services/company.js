import sendAlert from '../utils/sendAlert';
import api from './api';

export async function listAllCompanies({ showAlert }) {
  try {
    const {
      data: { mensagem, dados },
    } = await api.get('/empresa/');
    if (showAlert) sendAlert(1, mensagem);

    return dados;
  } catch (error) {
    if (showAlert) sendAlert(0, error.response.data.mensagem);
  }
}
