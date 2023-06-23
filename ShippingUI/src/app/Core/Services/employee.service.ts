import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class EmployeeService {
  constructor(private http: HttpClient) {}

  GetAllEmployees() {
    return this.http.get('http://localhost:5250/api/Employee/Getall');
  }

  getEmployeeById(employeeId: number) {
    return this.http.get(
      `http://localhost:5250/api/Employee/GetById/${employeeId}`
    );
  }

  AddEmployee(employee: {}) {
    return this.http.post('http://localhost:5250/api/Employee/Add', employee, {
      responseType: 'text',
    });
  }

  updateEmployee(employeeid: number, employee: any) {
    return this.http.put(
      `http://localhost:5250/api/Employee/update/${employeeid}`,
      employee,
      {
        responseType: 'text',
      }
    );
  }

  changeIsActive(employeeId: number) {
    return this.http.delete('http://localhost:5250/api/Employee/Delete', {
      params: new HttpParams().set('id', employeeId),
      responseType: 'text',
    });
  }
}