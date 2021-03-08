import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ChatBotComponent } from './ChatBot/ChatBot.component';
import { HomePageComponent } from './HomePage/HomePage.component';
import { LoginComponent } from './login/login.component';
import { RegistrationComponent } from './registration/registration.component';
import { TherapyPageComponent } from './TherapyPage/TherapyPage.component';

const routes: Routes = [
  {path: '', component: HomePageComponent},
  {path: 'registration', component: RegistrationComponent},
  {path: 'login', component: LoginComponent},
  {path: 'chat', component: ChatBotComponent},
  {path: 'therapy', component: TherapyPageComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
