import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class BranchService {
  constructor(private http: HttpClient) {}

  getAllBranches() {
    return this.http.get('http://localhost:5250/api/Branches');
  }

  getBranchById(branchid: number) {
    return this.http.get(`http://localhost:5250/api/Branches/${branchid}`);
  }

  addBranch(newBranch: any) {
    return this.http.post('http://localhost:5250/api/Branches', newBranch, {
      responseType: 'text',
    });
  }

  updateBranch(id: number, updatedBranch: any) {
    return this.http.put(
      `http://localhost:5250/api/Branches/${id}`,
      updatedBranch,
      {
        responseType: 'text',
      }
    );
  }

  deleteBranch(id: number) {
    return this.http.delete(`http://localhost:5250/api/Branches/${id}`, {
      responseType: 'text',
    });
  }
}
