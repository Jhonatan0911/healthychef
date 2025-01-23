import { environment } from 'src/environments/environment';

export class APIs {
  static auth = {
    login: `${environment.apiUrl}/login`,
    register: `${environment.apiUrl}/signup`,
  }
};
