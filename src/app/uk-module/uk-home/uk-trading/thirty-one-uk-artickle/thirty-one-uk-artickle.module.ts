import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeUkThirtyOneComponent } from './home-uk-thirty-one/home-uk-thirty-one.component';
import { MatExpansionModule } from '@angular/material/expansion';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [{ path: '', component: HomeUkThirtyOneComponent }];
@NgModule({
  declarations: [HomeUkThirtyOneComponent],
  imports: [CommonModule,MatExpansionModule, RouterModule.forChild(routes)],
})
export class ThirtyOneUkArtickleModule {}
