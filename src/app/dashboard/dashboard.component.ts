import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
  providers: [AuthService]
})

export class DashboardComponent implements OnInit {
  loggedInUser: string;

  states: any;
  isNav:boolean =  false;
  dataList: any = {
    "data": [
      {
        "candidateId": "5dc16dc5572e4e2638b9cf30", "name": "Candidate1", "domain": "Front End Engineer", "yearOfExperience": "5.06", "recruiterName": "Recruiter1", "interviewType": "technical"
      }, {
        "candidateId": "5dc4e7609caa3945be6a4a1a", "name": "Candidate2", "domain": "Front End Engineer", "yearOfExperience": "6.10", "recruiterName": "Recruiter2", "interviewType": "technical"
      }, {
        "candidateId": "5dca91a09caa3983966a4a7c", "name": "Candidate3", "domain": "Front End Engineer", "yearOfExperience": "9.06", "recruiterName": "Recruiter2", "interviewType": "technical"
      }, {
        "candidateId": "5dd22bf0666a070e690fa8cb", "name": "Candidate4", "domain": "Front End Engineer", "yearOfExperience": "17", "recruiterName": "Recruiter1", "interviewType": "technical"
      }, {
        "candidateId": "5dc16d63572e4e2638b9cf2f", "name": "Candidate5", "domain": "Front End Engineer", "yearOfExperience": "8", "recruiterName": "Recruiter3", "interviewType": "technical"
      }, {
        "candidateId": "5dc1773d572e4e2638b9cf32", "name": "Candidate6", "domain": "Cloud Engineer", "yearOfExperience": "3", "recruiterName": "Recruiter3", "interviewType": "technical"
      }, {
        "candidateId": "5dc176aa572e4e2638b9cf31", "name": "Candidate7 ", "domain": "Cloud Engineer", "yearOfExperience": "5.5", "recruiterName": "Recruiter4", "interviewType": "technical"
      }, {
        "candidateId": "5dd76991104abc46e844f72a", "name": "Candidate8", "domain": "Front End Engineer", "yearOfExperience": "6.03", "recruiterName": "Recruiter5",
        "interviewType": "technical"
      }, {
        "candidateId": "5dd7669d01aa8bf2a2b602a7", "name": "Candidate9", "domain": "Front End Engineer", "yearOfExperience": "7.03", "recruiterName": "Recruiter4", "interviewType": "technical"
      }, {
        "candidateId": "5dd7620b104abc156d44f725", "name": "Candidate10", "domain": "Front End Engineer", "yearOfExperience": "4.06", "recruiterName": "Recruiter6", "interviewType": "technical"
      }, {
        "candidateId": "5dd75f4a104abc135244f722", "name": "Candidate11", "domain": "Front End Engineer", "yearOfExperience": "4", "recruiterName": "Recruiter5", "interviewType": "technical"
      }, {
        "candidateId": "5dd7595f01aa8b41a7b602a3", "name": "Candidate12", "domain": "Front End Engineer", "yearOfExperience": "9.05", "recruiterName": "Recruiter7", "interviewType": "technical"
      }, {
        "candidateId": "5dd7595f01aa8b41a602a37b", "name": "Candidate13", "domain": "Back End Engineer", "yearOfExperience": "2.05", "recruiterName": "Recruiter4", "interviewType": "technical"
      }, {
        "candidateId": "5dd7595f01aa8b41602a3a7f", "name": "Candidate14", "domain": "Full Stack Engineer", "yearOfExperience": "5.05", "recruiterName": "Recruiter7", "interviewType": "technical"
      }]
  }
  displayedColumns: string[] = ['id', 'name', 'domain', 'yearOfExperience', 'recruiterName', 'interviewType'];
  dataSource = new MatTableDataSource<any>(this.dataList.data);
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;


  constructor(private router: Router,public authService: AuthService) { }

  ngOnInit() {
    this.loggedInUser = localStorage.getItem('token');
    if(this.loggedInUser==null){
      this.logout()
    }

    this.dataSource.paginator = this.paginator;
    this.getStateList();
  }


  getStateList = ()=>{
    this.states = this.dataList.data.reduce(function(obj, v) {
      obj[v.domain] = (obj[v.domain] || 0) + 1;
      return obj;
    }, {})

    this.states["Total Candidates"] = this.dataList.data.length;

  }

  logout = ()=>{
    this.authService.logout();
    this.router.navigate(['/login']);
  }

}

