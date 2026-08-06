import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OsnovyTreydingaUkComponent } from './osnovy-treydinga-uk/osnovy-treydinga-uk.component';


import { RouterModule } from '@angular/router';
import { Routes } from '@angular/router';


const routes: Routes = [{ path: '', component:   OsnovyTreydingaUkComponent }];

@NgModule({
  declarations: [ OsnovyTreydingaUkComponent],
  imports: [CommonModule, RouterModule.forChild(routes)],
})
export class OneBookUkModule { }
