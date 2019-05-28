import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Customer } from '../model/customer';

@Injectable({
  providedIn: 'root',
})
export class EmployeeService {
    hostURL = 'http://localhost:8080';
    contextURL = '/customerController';
    customerLoginAPI = '/loginCustomer';
    getAllCustomerAPI = '/getAllCustomer';
    customerRegistration = '/registerCustomer';
    getSingleCustomerAPI = '/getSingleCustomer/{customerId}';
    updatedCustomerAPI = '/updateCustomer';
    deleteCustomerAPI = '/deleteCustomer/{customerId}';
    constructor(private httpClient: HttpClient) {
            }


   login( customer:Customer) {
   return this.httpClient.post(`http://localhost:8080/customerController/loginCustomer/`, customer);
   }
    
   getAllCutomer() {
   return this.httpClient.get<Customer[]>(`http://localhost:8080/customerController/getAllCustomer/`);
   }
    
   deleteEmployees(id: number) {
   return this.httpClient.delete<Customer>(`http://localhost:8080/customerController/deleteCustomer/` + id);  
   }  
  
   createUser(customer: Customer) {
   return this.httpClient.post(`http://localhost:8080/customerController/registerCustomer/`, customer);  
  	} 
  	 
  	getEmployeeById(id: number) {
  	return this.httpClient.get<Customer>(`http://localhost:8080/customerController/getSingleCustomer/` + '/' + id);  
  	}  
  	
  	updateEmployee(customer: Customer) {
  	return this.httpClient.put(`http://localhost:8080/customerController/updateCustomer/`,customer);  
    }  

  }
