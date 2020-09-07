import { Injectable } from '@angular/core';
import { Http, Headers, Response, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { User }  from '../_models/user';
import 'rxjs/add/operator/map'
import { HttpClient, HttpParams } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';

@Injectable()
export class VotingService {
    constructor(private http: Http) { 
        this.user = null;
    }

    user : User =  null;



       login2(email: string, password: string) {
        var url = 'https://pow.unil.ch/peerGrading/db/authenticateUser.php';
        
        var body = 'email='+""+email+""+ '&password='+ ""+password+"";
        
        let headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded' });
        headers.append("Accept", "application/x-www-form-urlencode");
        let options = new RequestOptions({ headers: headers});
        
        return this.http.post(url, body, options)
            .map(Response => {
                    this.user = Response.json()[0];
                    return this.user;
            });
            
            //.catch((error:any) => Observable.throw(error.json().error || 'Server error'));
    }

    getUser(): User {
        return this.user;
    }

    onSubmit(userId : string, teamMembers: User[]) {
      //this.stopVote = false;

      //console.log("Team Members: ", teamMembers);
      //var sender = user.id;
      
      // teamMembers.forEach((member) => {
      //       if(member.commitmentGrade == undefined || member.impactGrade == undefined || member.citizenshipGrade == undefined){
      //       console.log('Grading Incomplete!!');
      //       this.message = "Oops it seems grading is incomplete, please check if you graded everyone!"
      //       this.stopVote = true;
      //     }
      // });

      
        teamMembers.forEach((member) => {
            
            let httpParams = new HttpParams().
            set('sender', userId).
            set('receiver', member.id).
            set('commitmentGrade', member.commitmentGrade).
            set('commitmentReason', member.commitmentReason).
            set('impactGrade', member.impactGrade).
            set('impactReason', member.impactReason).
            set('citizenshipGrade', member.citizenshipGrade).
            set('citizenshipReason', member.citizenshipReason).
            set('session','1');
            
            var url = 'https://pow.unil.ch/peerGrading/db/insertVote.php';

            var body = 'sender='+ "'"+userId+"'"+ '&receiver=' + "'"+member.id+"'" + '&commitmentGrade='+"'"+member.commitmentGrade+"'"+
             '&commitmentReason='+member.commitmentReason+ '&impactGrade='+ "'"+ member.impactGrade+"'"+ '&impactReason='+
             member.impactReason+ '&citizenshipGrade=' + "'"+member.citizenshipGrade+"'"+ '&citizenshipReason='+member.citizenshipReason+'&session='+"3";

            let body2 = new URLSearchParams();
            // body2.set('sender', "'"+userId+"'");
            // body2.set('receiver', "'"+member.id+"'"); 
            // body2.set('commitmentGrade', "'"+member.commitmentGrade+"'");
            // body2.set('commitmentReason', "'"+member.commitmentReason+"'"); 
            // body2.set('impactGrade', "'"+member.impactGrade+"'");
            // body2.set('impactReason', "'"+member.impactReason+"'"); 
            // body2.set('citizenshipGrade', "'"+member.citizenshipGrade+"'");
            // body2.set('citizenshipReason', "'"+member.citizenshipReason+"'"); 
            // body2.set('session', "1"); 

            body2.set('sender', userId);
            body2.set('receiver', member.id); 
            body2.set('commitmentGrade', member.commitmentGrade);
            body2.set('commitmentReason', member.commitmentReason); 
            body2.set('impactGrade', member.impactGrade);
            body2.set('impactReason', member.impactReason); 
            body2.set('citizenshipGrade', member.citizenshipGrade);
            body2.set('citizenshipReason', member.citizenshipReason); 
            body2.set('session', "1");

            let options2 = {
                headers: new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded')
            };



            let body3 = `sender=${userId}&receiver=${member.id}&commitmentGrade=${member.commitmentGrade}
            &commitmentReason=${member.commitmentReason}&impactGrade=${member.impactGrade}
            &impactReason=${member.impactReason}&citizenshipGrade=${member.citizenshipGrade}
            &citizenshipReason=${member.citizenshipReason}&session=${"1"}`;

            let headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded' });
            headers.append("Accept", "application/json");
            let options = new RequestOptions({ headers: headers});

            console.log("Body: ",body);
            //console.log(body2);
            //console.log(body3);


            var fd = new FormData();
            fd.append('sender', userId);
            fd.append('receiver', member.id); 
            fd.append('commitmentGrade', member.commitmentGrade);
            fd.append('commitmentReason', member.commitmentReason); 
            fd.append('impactGrade', member.impactGrade);
            fd.append('impactReason', member.impactReason); 
            fd.append('citizenshipGrade', member.citizenshipGrade);
            fd.append('citizenshipReason', member.citizenshipReason); 
            fd.append('session', "1");

            //console.log("FD: ", fd);

            return this.http.post(url,body, options).subscribe(
                (data) =>{ 
                
                console.log(data ,"request done with success")
                console.log("Data Status: ", data.status);
                return data.status;
                });
                // console.log("Response: ",response);
                // console.log("Response json: ", response.json());
                // return response;
               
            //});

        // return this.http.post(url, body, options)
        //     .map(Response => {
        //           console.log("Response: ",Response);
        //           console.log("Response json: ", Response.json());
        //           return Response;
        //     });





            
            //this.canVote = false;  
            //this.message = 'Thanks for your vote!';

            //this.http.get('https://pow.unil.ch/peerGrading/db/insertVote.php', {params: httpParams, responseType: 'text'}).subscribe(data=>{
              //console.log(data);
            //}); 
        });
     
  }// onSubmit



}