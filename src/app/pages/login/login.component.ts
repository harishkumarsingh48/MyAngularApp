import { Component, OnInit, ViewChild,Inject } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { NgForm } from '@angular/forms';
import {LOCAL_STORAGE, WebStorageService} from 'angular-webstorage-service';
import { first } from 'rxjs/operators';

import { EmployeeService } from '../services/employee.service';
import { Customer } from '../model/customer';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {
  @ViewChild('loginForm') loginForm: NgForm;
  loginId: string;
  loginPassword: string;
  loggedCustomer: Customer;
  errorFlag: boolean;
  errorMsg: string;
  loggedInFlag: boolean;
  constructor(private route: ActivatedRoute, private router: Router, private employeeService: EmployeeService, @Inject (LOCAL_STORAGE) private storage: WebStorageService) { }

  ngOnInit() {  
     
  }
  onLogin(loginForm: NgForm) {
      this.loggedInFlag=true;
     console.log('====login Form===' + loginForm);
     const customer = new Customer();
     customer.loginId = this.loginForm.value.loginId;
     customer.loginPassword = this.loginForm.value.loginPassword;
     console.log('====login id===' + customer.loginId);
     console.log('====login password===' + customer.loginPassword);
     this.employeeService.login(customer).pipe(first()).subscribe((myLoggedCustomer:Customer) => {
            console.log('====logged user detail===' + myLoggedCustomer != null && myLoggedCustomer.errorMsg == null);
            if (myLoggedCustomer.errorMsg == null) {
                    this.storage.set("LOGGED_USER", myLoggedCustomer.fullName);
                    console.log('====logged user detail===' + myLoggedCustomer);
                    this.router.navigate(['/admin']);
                }
            if (myLoggedCustomer.errorMsg != null) {
                    this.errorFlag = true;
                    this.errorMsg = myLoggedCustomer.errorMsg;
                    console.log('==== this.errorMsg ===' +  this.errorMsg);
                    this.router.navigate(['/login']);
                }
                },
                error => {
                    this.errorFlag = true;
                    this.errorMsg ="Please contact administrator Application is down.";
                    this.router.navigate(['/login']);
                }
                );
}
  register() {
      this.router.navigate(['/register']);
}

}
