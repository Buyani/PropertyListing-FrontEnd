import { Component, OnInit } from '@angular/core';
import { LogIn } from 'src/app/models/login.model';
import { User } from 'src/app/models/user.model';

@Component({
  selector: 'app-homeslistpage',
  templateUrl: './homeslistpage.component.html',
  styleUrls: ['./homeslistpage.component.css']
})
export class HomesListPageComponent implements OnInit {

  currentUser:User;

  constructor() { }

  ngOnInit(): void {
    let user=""+localStorage.getItem('currentUser');
    if(user)
    {
      this.currentUser=JSON.parse(user);
    }

    
  }

}
