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
    componentRef.instance.isOpen = true;
    componentRef.changeDetectorRef.detectChanges();

    this.appRef.attachView(componentRef.hostView);
    const domElem = (componentRef.hostView as any).rootNodes[0] as HTMLElement;
    document.body.appendChild(domElem);

    document.body.classList.add('modal-open');

    // Add method to remove modal on closeModal call inside modal component:
    componentRef.instance.isOpenChange.subscribe((open) => {
      if (!open) {
        this.appRef.detachView(componentRef.hostView);
        componentRef.destroy();
        document.body.classList.remove('modal-open');
      }
    });
  }
}
