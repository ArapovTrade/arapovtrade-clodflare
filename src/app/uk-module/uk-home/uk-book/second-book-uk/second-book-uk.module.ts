import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PsychologiyaTreydingaUkComponent } from './psychologiya-treydinga-uk/psychologiya-treydinga-uk.component';


import { RouterModule } from '@angular/router';
import { Routes } from '@angular/router';


const routes: Routes = [{ path: '', component:   PsychologiyaTreydingaUkComponent }];

@NgModule({
  declarations: [PsychologiyaTreydingaUkComponent],
  imports: [CommonModule, RouterModule.forChild(routes)],
})
export class SecondBookUkModule { }
