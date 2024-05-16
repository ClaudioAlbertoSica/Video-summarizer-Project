

export enum ValidViewNames  {
  noneSelected = '',
  VideoForm = 'Formulairo de Video',
  TextForm = 'Formulairo de Texto',
  AccountData = 'Datos de tu cuenta',
  ChangePassword = 'Cambiar contraseña',
  FAQ = 'Preguntas Frecuentes',
  Help = 'Ayuda',
  LogOut= 'LogOut',
  Loading = 'Cargando...',
  Summary = 'Resumen'
}

const ImTheActiveView = (nameToCompare: ValidViewNames, thisComponentsName: ValidViewNames) => {
  return nameToCompare === thisComponentsName;
}

export default ImTheActiveView