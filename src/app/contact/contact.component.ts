import { Component, OnInit } from '@angular/core';
import { MockDataService } from '../services/mock-data.service';
import { User } from '../model/user.model';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Enquiry } from '../model/enquiry.model';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.scss'
})
export class ContactComponent implements OnInit {
  constructor(private mockapi:MockDataService, private fb: FormBuilder,){}

  users: User[] = [];
  enquiryForm!: FormGroup;
  
  ngOnInit():void{
   this.users = this.mockapi.generateRandomUsers(4)
   this.createForm();
  }

  private createForm(): void {
    this.enquiryForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      mobileNumber: ['', [Validators.required, Validators.pattern(/^[0-9]{10}$/)]],
      email: ['', [Validators.required, Validators.email]],
      enquiryMessage: ['', [Validators.required, Validators.maxLength(500)]]
    });
  }

  get name() {
    return this.enquiryForm.get('name');
  }

  get mobileNumber() {
    return this.enquiryForm.get('mobileNumber');
  }

  get email() {
    return this.enquiryForm.get('email');
  }

  get enquiryMessage() {
    return this.enquiryForm.get('enquiryMessage');
  }

  submitEnquiry(): void {
    if (this.enquiryForm.valid) {
      const enquiry: Enquiry = this.enquiryForm.value;
      this.mockapi.submitFakeEnquiry(enquiry).then(response => {
        if (response.success) {
          console.log('Enquiry submitted successfully:', response.data);
          alert('Enquiry submitted successfully!');
          this.enquiryForm.reset();
        }
      });
    } else {
      console.log('Form is invalid');
      alert('Enquiry "NOT" submitted successfully!');
    }
  }
}
