import { Component } from '@angular/core';
import { Inject } from '@angular/core';
import {LOCAL_STORAGE, WebStorageService} from 'angular-webstorage-service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title :string;
  loggedCustomer:string;
  
constructor(@Inject (LOCAL_STORAGE) private storage: WebStorageService) { }  
  
  ngOnInit() {  
    this.title= 'My Angular Application';
    if( this.storage.get("LOGGED_USER") !=null){
    this.loggedCustomer ='Hi, '+ this.storage.get("LOGGED_USER");
    }
    else  {
        this.loggedCustomer ='';
        }
}
}