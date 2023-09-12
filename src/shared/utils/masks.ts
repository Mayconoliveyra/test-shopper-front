const moneyMask = (vlr: number | string | undefined, showRS = true): number | string | undefined => {
  if (typeof vlr === 'string' || vlr === undefined) return vlr;
  const valor = vlr
    .toFixed(2)
    .replace('.', ',')
    .replace(/(\d)(?=(\d{3})+\,)/g, '$1.');
  if (showRS) return `R$ ${valor}`;
  return `${valor}`;
};

const maskPhone = '(00) 0000-0000';
const maskPhone9 = '(00) {9}0000-0000';

const maskCPF = '000.000.000-00';
const maskCNPJ = '00.000.000/0000-00';

const maskRG = [/\d/, /\d/, '.', /\d/, /\d/, /\d/, '.', /\d/, /\d/, /\d/, '-', /\d/];

const maskCEP = '00000-000';

const maskData = [/\d/, /\d/, '/', /\d/, /\d/, '/', /\d/, /\d/, /\d/, /\d/];

export { moneyMask, maskPhone, maskPhone9, maskCPF, maskCNPJ, maskRG, maskCEP, maskData };
