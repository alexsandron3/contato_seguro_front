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
export async function editCompany({ company, showAlert }) {
  try {
    const {
      data: { mensagem, dados },
    } = await api.put(`/empresa/id.php/${company.id}`, {
      ...company,
    });
    if (showAlert) sendAlert(1, mensagem);
    return { userEditedWithSuccess: true, dados };
  } catch (error) {
    if (showAlert) sendAlert(0, error.response.data.mensagem);
    return false;
  }
}
export async function newCompany({ company, showAlert }) {
  try {
    const {
      data: { mensagem },
    } = await api.post('/empresa/', {
      ...company,
    });
    if (showAlert) sendAlert(1, mensagem);
    return true;
  } catch (error) {
    if (showAlert) sendAlert(0, error.response.data.mensagem);
    return false;
  }
}

export async function deleteCompany({ showAlert, id }) {
  try {
    const {
      data: { mensagem },
    } = await api.delete(`/empresa/id.php/${id}`);
    if (showAlert) sendAlert(1, mensagem);
    return true;
  } catch (error) {
    if (showAlert) sendAlert(0, error.response.data.mensagem);
    return false;
  }
}
