import sendAlert from './sendAlert';
/**
 * This function will validate user object and send a alert if something is invalid.
 * @param {{
 * nome: string
 * dataNascimento: string
 * cidadeNascimento: string
 * email: string
 * telefone: string
 * empresas: Array
 * }} data nome, email and empresas are required field
 * @returns {{dataIsValid: boolean, validatedUserData: object}} If data is valid or if isn't valid
 */
export default function validateUserData({
  nome = '',
  dataNascimento = '',
  cidadeNascimento = '',
  email = '',
  telefone = '',
  empresas = [],
  id,
}) {
  if (!nome || !email || !empresas.length) {
    sendAlert(0, 'Por favor, preencha todos os campos!');
    return false;
  }
  const arrayOfCompanies = empresas.map(
    (empresa) => empresa.idEmpresa || empresa.id,
  );
  empresas = arrayOfCompanies;
  return {
    dataIsValid: true,
    validatedUserData: {
      id,
      nome,
      dataNascimento,
      cidadeNascimento,
      email,
      telefone,
      empresas,
    },
  };
}
