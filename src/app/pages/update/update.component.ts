import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { FormBuilder, FormGroup, FormControl, FormArray, Validators } from '@angular/forms';
import { Inject } from '@angular/core';
import { first } from 'rxjs/operators';

import { EmployeeService } from '../services/employee.service';
import { Customer } from '../model/customer';
import { Country } from '../model/country';
import { State } from '../model/state';
import { District } from '../model/district';
import {LOCAL_STORAGE, WebStorageService} from 'angular-webstorage-service';

@Component({
  selector: 'app-regitration',
  templateUrl: './update.component.html',
  styleUrls: ['./update.component.css']
})
export class UpdateComponent implements OnInit {
  registerForm: FormGroup;
  submitted = false;
  invalidLogin = false;
  loginId: string = null;
  updateCustomer: Customer;
  countryList: Country[] = [];
  stateList: State[] = [];
  districtList: District[] = [];
  roles: string[] = [];
  
  constructor( private formBuilder: FormBuilder, private route: ActivatedRoute, private router: Router, private employeeService: EmployeeService, @Inject (LOCAL_STORAGE) private storage: WebStorageService) 
  { 
    this.updateCustomer=this.storage.get("SELECTED_USER");
    this.countryList = [
    { "countryCode": "India", "countryName": "India" },
    { "countryCode": "China", "countryName": "China" },
    { "countryCode": "Nepal", "countryName": "Nepal" }
    ];
    this.roles=["Reading Books","Reading Books","Reading Books"];
    
  }

   ngOnInit() {
    this.registerForm = this.formBuilder.group({   
    fullName: new FormControl(this.updateCustomer.fullName, Validators.required),
    email: new FormControl(this.updateCustomer.email, [Validators.required,Validators.email]),
    mobileNo: new FormControl(this.updateCustomer.mobileNo, Validators.required),
    loginId: new FormControl(this.updateCustomer.loginId, Validators.required),
    loginPassword: new FormControl(this.updateCustomer.loginPassword, Validators.required),
    village: new FormControl(this.updateCustomer.village, Validators.required),
    postOffice: new FormControl(this.updateCustomer.postOffice, Validators.required),
    policeStation: new FormControl(this.updateCustomer.policeStation, Validators.required),
    countryName: new FormControl(this.updateCustomer.countryName, Validators.required),
    stateName: new FormControl(this.updateCustomer.stateName, Validators.required),
    districtName: new FormControl(this.updateCustomer.districtName, Validators.required),
    dateOfBirth: new FormControl(this.updateCustomer.dateOfBirth, Validators.required),
    gender: new FormControl(this.updateCustomer.gender, Validators.required),
    hobbies: new FormControl(this.updateCustomer.hobbies, Validators.required),
    education: new FormControl(this.updateCustomer.education, Validators.required),
    comment: new FormControl(this.updateCustomer.comment, Validators.required),
    role: new FormControl(this.updateCustomer.role, Validators.required),
    status: new FormControl(this.updateCustomer.status, Validators.required)
    });
    
    
   }

    onChangeCountry(countryCode){
        console.log("==countryCode=="+countryCode);
        if(countryCode == 'India')
        {
    this.stateList = [
    { "stateCode": "Andhra Pradesh", "stateName": "Andhra Pradesh" },
    { "stateCode": "Bihar", "stateName": "Bihar" },
    { "stateCode": "Uttar Pradesh", "stateName": "Uttar Pradesh" },
    ];
     }
        else
            {
             this.stateList =[];
        }
    }

    onChangeState(stateCode){
        console.log("==countryCode=="+stateCode);
        if(stateCode == 'Bihar')
        {
    this.districtList = [
    { "districtCode": "Bhojpur", "districtName": "Bhojpur" },
    { "districtCode": "Patna", "districtName": "Patna" },
    { "districtCode": "Uttar Pradesh", "districtName": "Uttar Pradeshh" }
    ];
     }
        else
            {
             this.districtList =[];
        }
    }
 
   onRegister() {
    console.log(this.registerForm);
      this.updateCustomer = new Customer();
      this.updateCustomer.fullName=this.registerForm.get('fullName').value;
      this.updateCustomer.email=this.registerForm.get('email').value;
      this.updateCustomer.mobileNo=this.registerForm.get('mobileNo').value;
      this.updateCustomer.loginId=this.registerForm.get('loginId').value;
      this.updateCustomer.loginPassword=this.registerForm.get('loginPassword').value;
      this.updateCustomer.village=this.registerForm.get('village').value;
      this.updateCustomer.postOffice=this.registerForm.get('postOffice').value;
      this.updateCustomer.policeStation=this.registerForm.get('policeStation').value;
      this.updateCustomer.countryName=this.registerForm.get('countryName').value;
      this.updateCustomer.stateName=this.registerForm.get('stateName').value;
      this.updateCustomer.districtName=this.registerForm.get('districtName').value;
      this.updateCustomer.dateOfBirth=new Date(this.registerForm.get('dateOfBirth').value);
      this.updateCustomer.gender=this.registerForm.get('gender').value;
      this.updateCustomer.hobbies=this.registerForm.get('hobbies').value;
      this.updateCustomer.education=this.registerForm.get('education').value;
      this.updateCustomer.comment=this.registerForm.get('comment').value;
      this.updateCustomer.role=this.registerForm.get('role').value;
      this.updateCustomer.status=this.registerForm.get('status').value;
      this.updateCustomer.createdOn=new Date();
      this.updateCustomer.modifiedOn=new Date();
      console.log('====login id===' + JSON.stringify(this.updateCustomer));
      this.employeeService.createUser(this.updateCustomer).pipe(first()).subscribe(loggedCustomer => 
                {
                console.log('====logged user detail===' + JSON.stringify(loggedCustomer));
                 this.router.navigate(['/admin']);
                },
                error => 
                {
                 this.invalidLogin = true;
                 this.router.navigate(['/login']);
                }
                );
    
  }

}
