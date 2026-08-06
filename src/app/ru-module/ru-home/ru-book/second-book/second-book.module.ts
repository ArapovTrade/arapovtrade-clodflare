import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PsychologiyaTreydingaComponent } from './psychologiya-treydinga/psychologiya-treydinga.component';



import { RouterModule } from '@angular/router';
import { Routes } from '@angular/router';


const routes: Routes = [{ path: '', component:  PsychologiyaTreydingaComponent }];

@NgModule({
  declarations: [ PsychologiyaTreydingaComponent],
  imports: [CommonModule, RouterModule.forChild(routes)],
})
export class SecondBookModule { }
