

export enum ValidViewNames  {
  noneSelected = 'none',
  VideoForm = 'VideoForm',
  TextForm = 'TextForm',
  AccountData = 'AccountData',
  ChangePassword = 'ChangePassword',
  FAQ = 'FAQ',
  Help = 'Help',
  LogOut= 'LogOut',
}

function ImTheActiveView(nameToCompare: ValidViewNames, thisComponentsName: ValidViewNames) {
  return nameToCompare === thisComponentsName;
}

export default ImTheActiveView