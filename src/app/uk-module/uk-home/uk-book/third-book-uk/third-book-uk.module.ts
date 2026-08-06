import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OsnovyTreydingaTomTwoUkComponent } from './osnovy-treydinga-tom-two-uk/osnovy-treydinga-tom-two-uk.component';



import { RouterModule } from '@angular/router';
import { Routes } from '@angular/router';


const routes: Routes = [{ path: '', component:   OsnovyTreydingaTomTwoUkComponent }];

@NgModule({
  declarations: [OsnovyTreydingaTomTwoUkComponent],
  imports: [CommonModule, RouterModule.forChild(routes)],
})
export class ThirdBookUkModule { }
