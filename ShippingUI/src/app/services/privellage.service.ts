import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';
import { privilege } from '../models/Privellage';

@Injectable({
  providedIn: 'root',
})
export class PrivellageService {
  constructor(private http: HttpClient) {}

  getAllPrivellages() {
    return this.http.get('http://localhost:5250/api/Privellge/Getall');
  }

  getPrivilegeById(privilege_id: number) {
    return this.http.get(
      `http://localhost:5250/api/Privellge/GetById/${privilege_id}`
    );
  }

  addPrivilege(newPrivilege: any) {
    return this.http.post(
      'http://localhost:5250/api/Privellge/Add',
      newPrivilege
    );
  }

  deletePrivilege(privilege_id: number) {
    return this.http.delete('http://localhost:5250/api/Privellge/Delete', {
      params: new HttpParams().set('id', privilege_id),
      responseType: 'text',
    });
  }

  updatePrivilege(id: number, privilege: any) {
    return this.http.put(
      `http://localhost:5250/api/Privellge/update/${id}`,
      privilege,
      {
        responseType: 'text',
      }
    );
  }
}
