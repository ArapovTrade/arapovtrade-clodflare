import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OsnovyTreydingaComponent } from './osnovy-treydinga/osnovy-treydinga.component';


import { RouterModule } from '@angular/router';
import { Routes } from '@angular/router';


const routes: Routes = [{ path: '', component:  OsnovyTreydingaComponent }];

@NgModule({
  declarations: [OsnovyTreydingaComponent],
  imports: [CommonModule, RouterModule.forChild(routes)],
})
export class OneBookModule { }
