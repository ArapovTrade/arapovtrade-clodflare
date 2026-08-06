import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OsnovyTreydingaTomTwoEnComponent } from './osnovy-treydinga-tom-two-en/osnovy-treydinga-tom-two-en.component';



import { RouterModule } from '@angular/router';
import { Routes } from '@angular/router';


const routes: Routes = [{ path: '', component:   OsnovyTreydingaTomTwoEnComponent }];

@NgModule({
  declarations: [OsnovyTreydingaTomTwoEnComponent],
  imports: [CommonModule, RouterModule.forChild(routes)],
})
export class ThirdBookEnModule { }
