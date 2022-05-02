import sendAlert from '../utils/sendAlert';
import api from './api';

export async function editUser(user = {}) {
  try {
    const {
      data: { mensagem },
    } = await api.post(`/usuario/id.php/${user.id}`, {
      ...user,
    });
    sendAlert(1, mensagem);
  } catch (error) {
    sendAlert(0, error.response.data.mensagem);
  }
}
export async function newUser(user = {}) {
  // console.log(user);
  // return;
  try {
    const {
      data: { mensagem },
    } = await api.post('/usuario/', {
      ...user,
      empresas: [4],
    });
    sendAlert(1, mensagem);
  } catch (error) {
    sendAlert(0, error.response.data.mensagem);
  }
}
