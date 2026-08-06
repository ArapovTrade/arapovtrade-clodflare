import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OsnovyTreydingaEnComponent } from './osnovy-treydinga-en/osnovy-treydinga-en.component';


import { RouterModule } from '@angular/router';
import { Routes } from '@angular/router';


const routes: Routes = [{ path: '', component:   OsnovyTreydingaEnComponent }];

@NgModule({
  declarations: [   OsnovyTreydingaEnComponent],
  imports: [CommonModule, RouterModule.forChild(routes)],
})
export class OneBookEnModule { }
