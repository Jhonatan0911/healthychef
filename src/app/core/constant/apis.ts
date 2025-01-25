import { environment } from 'src/environments/environment';

export class APIs {
  static auth = {
    login: `${environment.apiUrl}/login`,
    register: `${environment.apiUrl}/signup`,
  }

  static posts = {
    getAll: `${environment.apiUrl}/posts`,
    create: `${environment.apiUrl}/posts`,
  }

  static user = {
    getById: `${environment.apiUrl}/current_user/`,
    updateById: `${environment.apiUrl}/update/`,
  }
};
