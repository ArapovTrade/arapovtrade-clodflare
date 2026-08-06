import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OsnovyTreydingaTomTwoComponent } from './osnovy-treydinga-tom-two/osnovy-treydinga-tom-two.component';


import { RouterModule } from '@angular/router';
import { Routes } from '@angular/router';


const routes: Routes = [{ path: '', component:  OsnovyTreydingaTomTwoComponent }];

@NgModule({
  declarations: [OsnovyTreydingaTomTwoComponent],
  imports: [CommonModule, RouterModule.forChild(routes)],
})
export class ThirdBookModule { }
