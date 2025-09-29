import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-notify',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './notify.component.html',
  styleUrls: ['./notify.component.scss']
})
export class NotifyComponent {
  @Input() type: 'success' | 'error' | 'warning' = 'success';
  @Input() message: string = '';
  @Input() title: string = '';
  @Input() isOpen: boolean = false;
  @Output() isOpenChange = new EventEmitter<boolean>()

  closeModal() {
    this.isOpen = false;
    this.isOpenChange.emit(this.isOpen);
  }

  get modalClass(): string {
    switch (this.type) {
      case 'success': return 'bg-success text-white';
      case 'error': return 'bg-danger text-white';
      case 'warning': return 'bg-warning text-dark';
      default: return '';
    }
  }
}
