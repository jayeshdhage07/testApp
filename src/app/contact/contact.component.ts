import { Component, OnInit } from '@angular/core';
import { MockDataService } from '../services/mock-data.service';
import { User } from '../model/user.model';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Enquiry } from '../model/enquiry.model';
import { NotifyService } from '../services/notify.service';
import { NotifyComponent } from "../shared/notify/notify.component";

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, NotifyComponent],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.scss'
})
export class ContactComponent implements OnInit {
  constructor(private mockapi:MockDataService, private fb: FormBuilder, private notifyService: NotifyService){}

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
          this.showSuccess();
          this.enquiryForm.reset();
        }
      });
    } else {
      this.showError();
    }
  }

  showSuccess() {
    this.notifyService.open('success', 'Enquiry submitted successfully!', 'Success');
  }

  showError() {
    this.notifyService.open('error', 'Enquiry "NOT" submitted successfully', 'Error');
  }
}
