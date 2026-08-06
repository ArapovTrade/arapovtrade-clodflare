import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RuStudyingHomeComponent } from './ru-studying-home/ru-studying-home.component';
import { RouterModule } from '@angular/router';
import { Routes } from '@angular/router';
import { MatTabsModule } from '@angular/material/tabs';

const routes: Routes = [{ path: '', component: RuStudyingHomeComponent }];

@NgModule({
  declarations: [RuStudyingHomeComponent],
  imports: [MatTabsModule, CommonModule, RouterModule.forChild(routes)],
})
export class RuStudyingModule {}
