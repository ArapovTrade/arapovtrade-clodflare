import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UkStudyingHomeComponent } from './uk-studying-home/uk-studying-home.component';
import { RouterModule } from '@angular/router';
import { Routes } from '@angular/router';
import { MatTabsModule } from '@angular/material/tabs';

const routes: Routes = [{ path: '', component: UkStudyingHomeComponent }];

@NgModule({
  declarations: [UkStudyingHomeComponent],
  imports: [MatTabsModule, CommonModule, RouterModule.forChild(routes)],
})
export class UkStudyingModule {}
