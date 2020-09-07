import { Component, OnInit} from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpClient, HttpParams } from '@angular/common/http';
import {Http, Headers, RequestOptions} from '@angular/http';
import {FormControl, Validators} from '@angular/forms';
import { URLSearchParams } from '@angular/http';
import { Student }	from '../_models/student';
import { User }  from '../_models/user';

import { AuthenticationService } from '../_services/index';

@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['../voting/voting.component.css'],
  providers: []
})


export class LoginComponent implements OnInit {
	emailFormControl = new FormControl('', [Validators.required, Validators.email]);
	model : any = {};
  loading = false;
	returnUrl : string = 'voting';
	user: User;
	message = '';
  httpUserParams = new HttpParams().set('email', this.model.email).set('password', this.model.password);

	constructor(
        private route: ActivatedRoute,
        private router: Router,
        private authenticationService: AuthenticationService,
        private http: HttpClient){ }


   ngOnInit() {
        // reset login status
        this.authenticationService.logout();
    }

    login(){
        this.loading = true;
        this.authenticationService.login("'"+this.model.email+"'", "'"+this.model.password+"'")
            .subscribe(
                data => {
                    if(data.id != undefined){
                      //console.log("Data id from login: " , data);
                      this.router.navigate([this.returnUrl]); 
                    }
                    else{
                      //console.log("Data from login: " , data);
                      this.message = "Invalid Email or Password"
                    }
                });
    }

    onLogin() : void {  	
    	var body = 'username=myusername&password=mypassword';
    	var headers = new Headers();
      	headers.append('Content-Type', 'application/x-www-form-urlencoded');
		this.httpUserParams = new HttpParams().set('email', "'"+this.model.email+"'").set('password', "'"+this.model.password+"'");
   		this.http.get<User>('https://pow.unil.ch/peerGrading/db/authenticateUser.php', {params: this.httpUserParams}).subscribe(data=>{
        	console.log(data);
          if(data[0] == undefined){
        		this.message = "Invalid Email or Password"
        	}
        	else{
        		this.user = data[0];	
        		this.router.navigate([this.returnUrl]);
        	}
        }); 
    }




}//class