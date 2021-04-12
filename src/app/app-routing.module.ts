import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ChatBotComponent } from './ChatBot/ChatBot.component';
import { HomePageComponent } from './HomePage/HomePage.component';
import { LoginComponent } from './login/login.component';
import { RegistrationComponent } from './registration/registration.component';
import { TherapyPageComponent } from './TherapyPage/TherapyPage.component';
import { AuthGuard } from './auth.guard';
import { PasswordResetComponent } from './PasswordReset/PasswordReset.component';
import { EmailComponent } from './Email/email.component';

const routes: Routes = [
  {path: '', component: HomePageComponent},
  {path: 'registration', component: RegistrationComponent},
  {path: 'login', component: LoginComponent},
  {path: 'chat', component: ChatBotComponent, canActivate:[AuthGuard]},
  {path: 'therapy', component: TherapyPageComponent,canActivate:[AuthGuard]},
  {path: 'resetPassword', component: PasswordResetComponent},
  {path: 'checkEmail', component: EmailComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
