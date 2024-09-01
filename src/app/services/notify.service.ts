import { ApplicationRef, ComponentFactoryResolver, Injectable, Injector } from '@angular/core';
import { NotifyComponent } from '../shared/notify/notify.component';

@Injectable({
  providedIn: 'root'
})
export class NotifyService {

  constructor(
    private componentFactoryResolver: ComponentFactoryResolver,
    private appRef: ApplicationRef,
    private injector: Injector
  ) {}

  open(type: 'success' | 'error' | 'warning', message: string, title: string = ''): void {
    const componentFactory = this.componentFactoryResolver.resolveComponentFactory(NotifyComponent);
    const componentRef = componentFactory.create(this.injector);

    componentRef.instance.type = type;
    componentRef.instance.message = message;
    componentRef.instance.title = title;

    this.appRef.attachView(componentRef.hostView);

    const domElem = (componentRef.hostView as any).rootNodes[0] as HTMLElement;
    document.body.appendChild(domElem);

    const modalElement = document.getElementById('notificationModal');
    if (modalElement) {
      modalElement.classList.add('show');
      document.body.classList.add('modal-open');
    }
  }
}
