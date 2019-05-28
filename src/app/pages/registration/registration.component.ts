import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { FormBuilder, FormGroup, FormControl, FormArray, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';

import { EmployeeService } from '../services/employee.service';
import { Customer } from '../model/customer';
import { Country } from '../model/country';
import { State } from '../model/state';
import { District } from '../model/district';

@Component({
  selector: 'app-regitration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {
  registerForm: FormGroup;
  submitted = false;
  invalidLogin = false;
  loginId: string = null;
  regCustomer: Customer;
  countryList: Country[] = [];
  stateList: State[] = [];
  districtList: District[] = [];
  roles: string[] = [];
  
  constructor( private formBuilder: FormBuilder, private route: ActivatedRoute, private router: Router, private employeeService: EmployeeService) 
  { 
    this.countryList = [
    { "countryCode": "India", "countryName": "India" },
    { "countryCode": "China", "countryName": "China" },
    { "countryCode": "Nepal", "countryName": "Nepal" }
    ];
    
    this.roles=["Reading Books","Reading Books","Reading Books"]
  }

   ngOnInit() {
    this.registerForm = this.formBuilder.group({   
    fullName: new FormControl(null, Validators.required),
    email: new FormControl(null, [Validators.required,Validators.email]),
    mobileNo: new FormControl(null, Validators.required),
    loginId: new FormControl(null, Validators.required),
    loginPassword: new FormControl(null, Validators.required),
    village: new FormControl(null, Validators.required),
    postOffice: new FormControl(null, Validators.required),
    policeStation: new FormControl(null, Validators.required),
    countryName: new FormControl(null, Validators.required),
    stateName: new FormControl(null, Validators.required),
    districtName: new FormControl(null, Validators.required),
    dateOfBirth: new FormControl(null, Validators.required),
    gender: new FormControl(null, Validators.required),
    hobbies: new FormControl(null, Validators.required),
    education: new FormControl(null, Validators.required),
    comment: new FormControl(null, Validators.required),
    role: new FormControl(null, Validators.required),
    status: new FormControl(null, Validators.required)
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
      this.regCustomer = new Customer();
      this.regCustomer.fullName=this.registerForm.get('fullName').value;
      this.regCustomer.email=this.registerForm.get('email').value;
      this.regCustomer.mobileNo=this.registerForm.get('mobileNo').value;
      this.regCustomer.loginId=this.registerForm.get('loginId').value;
      this.regCustomer.loginPassword=this.registerForm.get('loginPassword').value;
      this.regCustomer.village=this.registerForm.get('village').value;
      this.regCustomer.postOffice=this.registerForm.get('postOffice').value;
      this.regCustomer.policeStation=this.registerForm.get('policeStation').value;
      this.regCustomer.countryName=this.registerForm.get('countryName').value;
      this.regCustomer.stateName=this.registerForm.get('stateName').value;
      this.regCustomer.districtName=this.registerForm.get('districtName').value;
      this.regCustomer.dateOfBirth=new Date(this.registerForm.get('dateOfBirth').value);
      this.regCustomer.gender=this.registerForm.get('gender').value;
      this.regCustomer.hobbies=this.registerForm.get('hobbies').value;
      this.regCustomer.education=this.registerForm.get('education').value;
      this.regCustomer.comment=this.registerForm.get('comment').value;
      this.regCustomer.role=this.registerForm.get('role').value;
      this.regCustomer.status=this.registerForm.get('status').value;
      this.regCustomer.createdOn=new Date();
      this.regCustomer.modifiedOn=new Date();
      console.log('====login id===' + JSON.stringify(this.regCustomer));
      this.employeeService.createUser(this.regCustomer).pipe(first()).subscribe(loggedCustomer => 
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
