import { Injectable } from '@angular/core';
import { Employee } from '../models/Employee';
import { BehaviorSubject, map } from 'rxjs';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class EmployeeService {
  constructor(private http: HttpClient) {}

  GetAllEmployees() {
    return this.http.get('http://localhost:5250/api/Employees');
  }

  getEmployeeById(employeeId: number) {
    return this.http.get(
      `http://localhost:5250/api/Employee/GetById/${employeeId}`
    );
  }

  AddEmployee(employee: {}) {
    return this.http.post('http://localhost:5250/api/Employees', employee, {
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
    return this.http.delete(
      `http://localhost:5250/api/Employees/${employeeId}`,
      {
        responseType: 'text',
      }
    );
  }
}
