import sendAlert from './sendAlert';
/**
 * This function will validate company object and send a alert if something is missing.
 * @param {{
 * nome: string
 * cnpj: string
 * endereco: string
 * }} data
 * @returns {boolean} If data is valid or if isn't valid
 */
export default function validateCompanyData(data) {
  if (!data.nome || !data.cnpj || !data.endereco) {
    sendAlert(0, 'Por favor, preencha todos os campos!');
    return false;
  }
  return true;
}
