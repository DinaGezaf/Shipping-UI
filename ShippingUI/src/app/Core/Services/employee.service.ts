import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class EmployeeService {
  constructor(private http: HttpClient) {}

  GetAllEmployees() {
    return this.http.get('https://localhost:5250/api/Employees');
  }

  getEmployeeById(employeeId: number) {
    return this.http.get(`https://localhost:5250/api/Employees/${employeeId}`);
  }

  AddEmployee(employee: {}) {
    return this.http.post('https://localhost:5250/api/Employees', employee, {
      responseType: 'text',
    });
  }

  updateEmployee(employeeid: number, employee: any) {
    return this.http.put(
      `https://localhost:5250/api/Employees/${employeeid}`,
      employee,
      {
        responseType: 'text',
      }
    );
  }

  changeIsActive(employeeId: number) {
    alert(employeeId);
    return this.http.delete('https://localhost:5250/api/Employees', {
      params: new HttpParams().set('id', employeeId),
      responseType: 'text',
    });
  }
}
