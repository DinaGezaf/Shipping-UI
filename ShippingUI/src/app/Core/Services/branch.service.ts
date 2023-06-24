import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class BranchService {
  constructor(private http: HttpClient) {}

  getAllBranches() {
    return this.http.get('https://localhost:44355/api/Branches');
  }

  getBranchById(branchid: number) {
    return this.http.get(`https://localhost:44355/api/Branches/${branchid}`);
  }

  addBranch(newBranch: any) {
    return this.http.post('https://localhost:44355/api/Branches', newBranch, {
      responseType: 'text',
    });
  }

  updateBranch(id: number, updatedBranch: any) {
    return this.http.put(
      `https://localhost:44355/api/Branches/${id}`,
      updatedBranch,
      {
        responseType: 'text',
      }
    );
  }

  deleteBranch(id: number) {
    return this.http.delete('https://localhost:44355/api/Branches', {
      params: new HttpParams().set('id', id),
      responseType: 'text',
    });
  }
}
