import { Component, OnInit } from '@angular/core';
import { MockDataService } from '../services/mock-data.service';
import { User } from '../model/user.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.scss'
})
export class ContactComponent implements OnInit {
  constructor(private mockapi:MockDataService){}
  users: User[] = [];
  ngOnInit():void{
   this.users = this.mockapi.generateRandomUsers(4)
  }
}
