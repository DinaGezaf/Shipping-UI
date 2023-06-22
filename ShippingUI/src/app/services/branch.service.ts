import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Branch } from '../models/Branch';

@Injectable({
  providedIn: 'root',
})
export class BranchService {
  constructor(private http: HttpClient) {}

  getAllBranches() {
    return this.http.get('http://localhost:5250/api/Branch');
  }

  getBranchById(branchid: number) {
    return this.http.get(`http://localhost:5250/api/Branch/${branchid}`);
  }

  addBranch(newBranch: any) {
    return this.http.post('http://localhost:5250/api/Branch', newBranch, {
      responseType: 'text',
    });
  }

  updateBranch(id: number, updatedBranch: any) {
    return this.http.put('http://localhost:5250/api/Branch', updatedBranch, {
      responseType: 'text',
      params: new HttpParams().set('id', id),
    });
  }

  deleteBranch(id: number) {
    return this.http.delete('http://localhost:5250/api/Branch', {
      params: new HttpParams().set('id', id),
      responseType: 'text',
    });
  }
}
