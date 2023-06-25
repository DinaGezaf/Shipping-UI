import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PrivellageService {
  constructor(private http: HttpClient) {}

  getAllPrivellages() {
    return this.http.get('https://localhost:44355/api/Permissions');
  }

  getPrivilegeById(privilege_id: number) {
    return this.http.get(
      `https://localhost:44355/api/Permissions/${privilege_id}`
    );
  }

  addPrivilege(newPrivilege: any) {
    return this.http.post(
      'https://localhost:44355/api/Permissions',
      newPrivilege
    );
  }

  deletePrivilege(privilege_id: number) {
    return this.http.delete(
      `https://localhost:44355/api/Permissions/${privilege_id}`,
      {
        responseType: 'text',
      }
    );
  }

  updatePrivilege(id: number, privilege: any) {
    return this.http.put(
      `https://localhost:44355/api/Permissions/${id}`,
      privilege,
      {
        responseType: 'text',
      }
    );
  }
}
