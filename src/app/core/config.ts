export const baseUrl: string = location.origin;


export const basePath = {
  loginPath: 'https://gmc-login.mobilelive.ca',
  dashboardPath: 'https://gmc-api.mobileliveprojects.net/v1',
  appPath: baseUrl + '/login'
};
export const endPoints = {
  accessToken: basePath.loginPath + '/access-token',
  login: basePath.loginPath + '/login',
  token: basePath.loginPath + '/token',
  logout: basePath.loginPath + '/logout',
  dashboard: basePath.dashboardPath + '/dashboard',
  sms: basePath.dashboardPath + '/sms',
  search: basePath.dashboardPath + '/search',
  tProfile: basePath.dashboardPath + '/tariff-profile',
  simStatus: basePath.dashboardPath + '/change-status',
  events: basePath.dashboardPath + '/events',
  users: basePath.loginPath + '/user',
  userList: basePath.loginPath + '/user/list',
};

export const systemConfig = {
  clientId: () => location.origin === 'https://gmc.mobileliveprojects.net'
    ? 'e3a92856d0b4fee31b96e8783ab52007'
    : (
      location.origin === 'https://nova.mobileliveprojects.net'
        ? 'tGo3HarCE9074BqpGO9otoURcgTu5jxwBqHfrgUSAra7BQwLfx'
        : 'e9z8789h9d2xn45b43h3423xf78478'
    )
};
