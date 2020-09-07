import { Injectable } from '@angular/core';
import { Http, Headers, Response, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { User }  from '../_models/user';
import 'rxjs/add/operator/map'

@Injectable()
export class AuthenticationService {
        constructor(private http: Http) { 
        this.user = null;
    }

    user : User =  null;
    email : string = "";
    password : string = "";


    logout() {
        // remove user from local storage to log user out
        localStorage.removeItem('currentUser');
    }


       login(email: string, password: string) {

        var url = 'https://pow.unil.ch/peerGrading/db/authenticateUser.php';
        
        var body = 'email='+""+email+""+ '&password='+ ""+password+"";
        
        let headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded' });
            headers.append("Accept", "application/x-www-form-urlencode");
        let options = new RequestOptions({ headers: headers});
        
        return this.http.post(url, body, options)
            .map(Response => {
                    if(Response.json().length == 0){
                        console.log("EMPTY USER:" ,  Response.json());
                        this.user = new User();
                    }
                    else{
                        console.log("USER:" ,  Response.json()[0]);
                        this.user = Response.json()[0];
                    }
                    return this.user;
            });
    }

    getUser(): User {
        // if(this.user == null){
        //     console.log("USER WAS NULL");

        //     this.login(localStorage.getItem("email"), localStorage.getItem("password"));    
        // }
        
        

        return this.user;
    }

    // login2(email: string, password: string){

    //     var body = 'email='+"'"+email+"'"+ '&password='+ "'"+password+"'";
    //     var headers = new Headers();
    //       headers.append('Content-Type', 'application/x-www-form-urlencoded');
    //       this.http
    //     .post('https://pow.unil.ch/peerGrading/db/authenticateUser.php',
    //       body, {
    //         headers: headers
    //       })
    //       .subscribe(data => {
    //             alert('ok');
    //       }, error => {
    //           console.log(JSON.stringify(error.json()));
    //       });

    //       return JSON.stringify(1); 

    // }
}