import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { NotifyService } from '../../services/notify.service';

@Component({
  selector: 'app-notify',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './notify.component.html',
  styleUrl: './notify.component.scss'
})
export class NotifyComponent {
  @Input() type: 'success' | 'error' | 'warning' = 'success';
  @Input() message: string = '';
  @Input() title: string = '';

  constructor(private notifyService: NotifyService) {}

  closeModal() {
    const modalElement = document.getElementById('notificationModal');
    if (modalElement) {
      modalElement.classList.remove('show');
      document.body.classList.remove('modal-open');
      setTimeout(() => modalElement?.remove(), 200); // Delay to allow animation to complete
    }
  }

  get modalClass(): string {
    switch (this.type) {
      case 'success':
        return 'bg-success text-white';
      case 'error':
        return 'bg-danger text-white';
      case 'warning':
        return 'bg-warning text-dark';
      default:
        return '';
    }
  }

  

  showSuccess() {
    this.notifyService.open('success', 'Operation completed successfully!', 'Success');
  }

  showError() {
    this.notifyService.open('error', 'An error occurred.', 'Error');
  }

  showWarning() {
    this.notifyService.open('warning', 'Please check your input.', 'Warning');
  }
}
