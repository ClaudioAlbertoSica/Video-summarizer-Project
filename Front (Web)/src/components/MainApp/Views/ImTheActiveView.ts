

export enum ValidViewNames  {
  noneSelected = '',
  VideoForm = 'Formulario de Video',
  TextForm = 'Formulario de Texto',
  AccountData = 'Datos de tu cuenta',
  ChangePassword = 'Cambiar contraseña',
  ChangePasswordMandatory = 'Cambio de contraseña obligatorio',
  FAQ = 'Preguntas Frecuentes',
  Help = 'Ayuda',
  LogOut= 'LogOut',
  Loading = 'Cargando...',
  Summary = 'Resumen',
  Comments = "Comentarios y Sugerencias"
}

const ImTheActiveView = (nameToCompare: ValidViewNames, thisComponentsName: ValidViewNames) => {
  return nameToCompare === thisComponentsName;
}

export default ImTheActiveView