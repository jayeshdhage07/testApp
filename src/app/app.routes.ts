import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { AboutComponent } from './about/about.component';
import { ProductComponent } from './product/product.component';
import { ContactComponent } from './contact/contact.component';
import { PagenotfoundComponent } from './pagenotfound/pagenotfound.component';

export const routes: Routes = [
    { path: 'home', component: HomeComponent, },
    { path: '', redirectTo:'home', pathMatch:'full'},
    { path: 'about', component: AboutComponent, },
    { path: 'product', component: ProductComponent, },
    { path: 'contact', component: ContactComponent, },
    { path: '**', component: PagenotfoundComponent, }
];
