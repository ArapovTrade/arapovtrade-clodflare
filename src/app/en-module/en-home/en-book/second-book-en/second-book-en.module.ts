import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PsychologiyaTreydingaEnComponent } from './psychologiya-treydinga-en/psychologiya-treydinga-en.component';



import { RouterModule } from '@angular/router';
import { Routes } from '@angular/router';


const routes: Routes = [{ path: '', component:  PsychologiyaTreydingaEnComponent }];

@NgModule({
  declarations: [PsychologiyaTreydingaEnComponent],
  imports: [CommonModule, RouterModule.forChild(routes)],
})
export class SecondBookEnModule { }
