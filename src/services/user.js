import sendAlert from '../utils/sendAlert';
import api from './api';

export async function editUser({ user, showAlert }) {
  try {
    const {
      data: { mensagem },
    } = await api.put(`/usuario/id.php/${user.id}`, {
      ...user,
    });
    if (showAlert) sendAlert(1, mensagem);
    return true;
  } catch (error) {
    if (showAlert) sendAlert(0, error.response.data.mensagem);
    return false;
  }
}
export async function newUser({ user, showAlert }) {
  try {
    const {
      data: { mensagem },
    } = await api.post('/usuario/', {
      ...user,
    });
    if (showAlert) sendAlert(1, mensagem);
    return true;
  } catch (error) {
    if (showAlert) sendAlert(0, error.response.data.mensagem);
    return false;
  }
}
