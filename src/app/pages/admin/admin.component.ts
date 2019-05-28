import { Component, OnInit, ViewChild } from '@angular/core';
import { Inject } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { NgForm } from '@angular/forms';
import {LOCAL_STORAGE, WebStorageService} from 'angular-webstorage-service';
import { first } from 'rxjs/operators';

import { EmployeeService } from '../services/employee.service';
import { Customer } from '../model/customer';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html'
})
export class AdminComponent implements OnInit {
customers: Customer[]; 
loggedCustomer:string;
  
  constructor(private route: ActivatedRoute, private router: Router, private employeeService: EmployeeService,@Inject (LOCAL_STORAGE) private storage: WebStorageService) { }  
  
  ngOnInit() {  
      this.loggedCustomer=this.storage.get("LOGGED_USER");
      console.log("loggeg user=="+this.loggedCustomer);
    this.employeeService.getAllCutomer()  
      .subscribe((data: Customer[]) => {  
        this.customers = data;  
      });  
  } 
  
  
  
  onUpdate(selectedCustomer:Customer){
      console.log("selectedCustomer user=="+selectedCustomer.customerId); 
      this.storage.set("SELECTED_USER", selectedCustomer);
      this.router.navigate(['/update']);
  }
  
  onDelete(deletedCustomer:Customer){
      console.log("selectedCustomer user=="+deletedCustomer.customerId); 
  }

}
