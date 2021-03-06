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
import { BootstraphomepageComponent } from './bootstraphomepage/bootstraphomepage.component';
import { AccountActivatedComponent } from './AccountActivated/AccountActivated.component';

const routes: Routes = [
  {path: '', component: HomePageComponent},
  {path: 'bootstrap', component: BootstraphomepageComponent},
  {path: 'registration', component: RegistrationComponent},
  {path: 'login', component: LoginComponent},
  {path: 'chat', component: ChatBotComponent, canActivate:[AuthGuard]},
  {path: 'therapy', component: TherapyPageComponent,canActivate:[AuthGuard]},
  {path: 'resetPassword/:token', component: PasswordResetComponent},
  {path: 'checkEmail', component: EmailComponent},
  {path: 'accountActivated/:token', component: AccountActivatedComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
