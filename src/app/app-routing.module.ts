import { ListingsComponent } from './components/listings/listings.component';
import { SignUpComponent } from './components/sign-up/sign-up.component';
import { LoginComponent } from './components/login/login.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';


const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: ListingsComponent,
   
  },
  {
    path: 'login',
    component: LoginComponent,
    
  },
  {
    path: 'signup',
    component: SignUpComponent,
    
  },


  {
    path: '**',
    redirectTo: '',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
