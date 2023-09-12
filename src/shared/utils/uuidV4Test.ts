/* NUNCA ALTERAR ESSA REGEX. ELA ESTA SENDO UTILIZADA NA HORA DE CRIAR AS TABELAS COM ID UUID */
const regexUuidV4 = /^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-4[0-9a-fA-F]{3}-[89abAB][0-9a-fA-F]{3}-[0-9a-fA-F]{12}$/;
/* NUNCA ALTERAR ESSA REGEX. ELA ESTA SENDO UTILIZADA NA HORA DE CRIAR AS TABELAS COM ID UUID */

const uuidV4Test = (value: string | undefined) => {
  if (!value) return false;
  return regexUuidV4.test(value);
};

export default uuidV4Test;
