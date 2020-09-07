import {	Component, Input, OnInit, HostListener	} from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Headers, Http } from '@angular/http';
import { Router, ActivatedRoute } from '@angular/router';
import 'rxjs/add/operator/toPromise';
//import {	StudentService	} from './student.service';
//import {  UserService  } from './student.service';
import {	Student	}	from '../_models/student';
import {  User }  from '../_models/user';
import {  Response  }  from '../_models/response';

import { AuthenticationService, VotingService } from '../_services/index';

interface teamMembersResponse {
  id : string;
  name : string;
  lastName : string;
}

interface gradeResponse {
    grade: string;
}

@Component({
  selector: 'voting-table',
  templateUrl: './voting.component.html',
  styleUrls: ['./voting.component.css'],
  providers: []
})



export class VotingTableComponent implements OnInit {
  // @HostListener('window:beforeunload', ['$event'])
  // beforeunloadHandler(event: Event){
  //   console.log("beforeunloadHandler");
  //   this.getUserLocally();
  // }
  private clickMessage = '';
  private message = "";
  private students: Student[];
  private user: User;
  private teamMembers: User[];
  private commitmentGrade = '0';
  private impactGrade = '0';
  private citizenshipGrade = '0';
  private canVote: boolean;
  private stopVote: boolean = false;
  private missingVoters = '0';
  private totalVoters = '0';

  //Add on Course Grades
  private activeParticipation = '0';
  private peerEvaluation = '0';
  private peerGrading = '0';
  private instructor = '0';

  private teamMembersUrl = 'https://pow.unil.ch/peerGrading/db/getTeamMembers.php';
  private getUserUrl = 'https://pow.unil.ch/peerGrading/db/getUser.php';
  private getGradesUrl = 'https://pow.unil.ch/peerGrading/db/getGrade.php';
  private getMissingVotesUrl = 'https://pow.unil.ch/peerGrading/db/getMissingVotes.php';
  private getTotalVotersUrl = 'https://pow.unil.ch/peerGrading/db/getTotalVoters.php';
  private getCourseGradesUrl = 'https://pow.unil.ch/peerGrading/db/getCourseGrade.php';

  
  constructor(
    private http: HttpClient,
    private authenticationService: AuthenticationService,
    private votingService: VotingService,
    private router: Router

    ) {
    // window.onbeforeunload = function(e) {
    //   console.log("UNLOAD");

    //   return 'Dialog text here.';
    // };
  }
 


refreshPage() {
  console.log("App refresh");
}



 

  getUser():void{
    //console.log(this.authenticationService.getUser());
    this.user = this.authenticationService.getUser();
    localStorage.setItem("userId", this.user.id);

        if(this.user.canVote == "0"){
          this.canVote = false
        }
        else{
          this.canVote = true;
        }
  }

  getUserLocally():void{

    console.log("locally", localStorage.getItem("userId"));

    let httpUserParams = new HttpParams().set('id', localStorage.getItem("userId"));

    this.http.get<User>(this.getUserUrl,{params: httpUserParams}).subscribe(data=>{        
         // if(data[0] == {}){
         //   console.log("User not found or incorrect password");
         // }
         //console.log(data);
         this.user = data[0]; //TODO: Check when user is not found
         console.log("User Asked Locally: " , this.user);
         //console.log("CanVote: " , this.user.canVote);

         if(this.user.canVote == "0"){
           this.canVote = false
         }
         else{
           this.canVote = true;
         }
       })
  }

  getTeamMembers():void{
      var httpTeamMembersParams = new HttpParams().set('email', "'"+this.user.email+"'");
      this.http.get<User[]>(this.teamMembersUrl, {params: httpTeamMembersParams}).subscribe(data=>{
        this.teamMembers = data;
        //console.log(this.teamMembers);
        for (var key in this.teamMembers) {  
           //console.log('Type: ' + typeof key);
           //console.log(key + ' => ' + this.teamMembers[key].id);
           if(this.teamMembers[key].id == this.user.id){          
             this.teamMembers.splice(Number(key),1);
           }
        }
      })
   }

   getGrades():void{
     var httpCommitmentGradesParameters = new HttpParams().set('id', this.user.id).set('category', '1').set('session','3');
     //console.log("Parameters: ",httpCommitmentGradesParameters);
     this.http.get(this.getGradesUrl, {params: httpCommitmentGradesParameters}).subscribe(data =>{
       //console.log("data: ", data[0].grade);
       if(data[0].grade == null){
         this.commitmentGrade = '0';  
       }
       else{
         this.commitmentGrade = data[0].grade;  
       }
       
     })

     var httpImpactGradesParameters = new HttpParams().set('id', this.user.id).set('category', '2').set('session','3');
     this.http.get(this.getGradesUrl, {params: httpImpactGradesParameters}).subscribe(data =>{
       if(data[0].grade == null){
         this.impactGrade = '0';  
       }
       else{
         this.impactGrade = data[0].grade;  
       }
     
     })

     var httpCitizenshipGradesParameters = new HttpParams().set('id', this.user.id).set('category', '3').set('session','3');
     this.http.get(this.getGradesUrl, {params: httpCitizenshipGradesParameters}).subscribe(data =>{
       if(data[0].grade == null){
         this.citizenshipGrade = '0';  
       }
       else{
         this.citizenshipGrade = data[0].grade;  
       }
     })

   }  


   getCourseGrades():void{
     var httpGradeAParameters = new HttpParams().set('id', this.user.id);
     //console.log("Parameters: ",httpCommitmentGradesParameters);
     this.http.get(this.getCourseGradesUrl, {params: httpGradeAParameters}).subscribe(data =>{
       //console.log("data: ", data[0].gradeA);
       if(data[0].activeParticipation == null){
         this.activeParticipation = '0';  
       }
       else{
         this.activeParticipation = data[0].activeParticipation;  
       }
       
     })

     var httpGradeBParameters = new HttpParams().set('id', this.user.id);
     this.http.get(this.getCourseGradesUrl, {params: httpGradeBParameters}).subscribe(data =>{
       if(data[0].peerEvaluation == null){
         this.peerEvaluation = '0';  
       }
       else{
         this.peerEvaluation = data[0].peerEvaluation;  
       }
     
     })

     var httpGradeCParameters = new HttpParams().set('id', this.user.id);
     this.http.get(this.getCourseGradesUrl, {params: httpGradeCParameters}).subscribe(data =>{
       if(data[0].peerGrading == null){
         this.peerGrading = '0';  
       }
       else{
         this.peerGrading = data[0].peerGrading;  
       }
     })

     var httpGradeCParameters = new HttpParams().set('id', this.user.id);
     this.http.get(this.getCourseGradesUrl, {params: httpGradeCParameters}).subscribe(data =>{
       if(data[0].instructor == null){
         this.instructor = '0';  
       }
       else{
         this.instructor = data[0].instructor;  
       }
     })

   }  


   getVotesStats():void{
     var httpMissingVotesParameters = new HttpParams().set('id', this.user.id).set('session', '3');
     this.http.get(this.getMissingVotesUrl, {params: httpMissingVotesParameters}).subscribe(data =>{
       this.missingVoters = data[0].missingVoters;
     })

     var httpTotalVotersParameters = new HttpParams().set('id', this.user.id);
     this.http.get(this.getTotalVotersUrl, {params: httpTotalVotersParameters}).subscribe(data =>{
       this.totalVoters = data[0].totalVoters;
     })

   }                                              


  ngOnInit(): void {
    //this.getUserLocally();
    this.getUser();
    this.getTeamMembers();
    this.getGrades();
    this.getCourseGrades();
    this.getVotesStats();
    //this.getUserLocally();
  }

  onSubmit() {
      this.stopVote = false;
      //console.log("Team Members: ",this.teamMembers);
      var sender = this.user.id;
      
      this.teamMembers.forEach((member) => {
            if(member.commitmentGrade == undefined || member.impactGrade == undefined || member.citizenshipGrade == undefined){
            //console.log('Grading Incomplete!!');
            this.message = "Oops it seems grading is incomplete, please check if you graded everyone!"
            this.stopVote = true;
          }
      });

      if(!this.stopVote){
        
        console.log("POST REPLY: ",this.votingService.onSubmit(this.user.id, this.teamMembers));

        // this.teamMembers.forEach((member) => {
        //     //const body = {};
        //     let httpParams = new HttpParams().
        //     set('sender', sender).
        //     set('receiver', member.id).
        //     set('commitmentGrade', member.commitmentGrade).
        //     set('commitmentReason', member.commitmentReason).
        //     set('impactGrade', member.impactGrade).
        //     set('impactReason', member.impactReason).
        //     set('citizenshipGrade', member.citizenshipGrade).
        //     set('citizenshipReason', member.citizenshipReason).
        //     set('session','1');
            
            this.canVote = false;  
            this.message = 'Thanks for your vote!';

            // this.http.get('https://pow.unil.ch/peerGrading/db/insertVote.php', {params: httpParams, responseType: 'text'}).subscribe(data=>{
            //   console.log(data);
            //}); 
        //});
     }
  }// onSubmit
}