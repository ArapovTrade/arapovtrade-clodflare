import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeUkThirtyFourComponent } from './home-uk-thirty-four/home-uk-thirty-four.component';
import { MatExpansionModule } from '@angular/material/expansion';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [{ path: '', component: HomeUkThirtyFourComponent }];
@NgModule({
  declarations: [HomeUkThirtyFourComponent],
  imports: [CommonModule,MatExpansionModule, RouterModule.forChild(routes)],
})
export class ThirtyFourUkArtickleModule {}
