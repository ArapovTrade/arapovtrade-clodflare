import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeEnTwentySevenComponent } from './home-en-twenty-seven/home-en-twenty-seven.component';
import { MatExpansionModule } from '@angular/material/expansion';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [{ path: '', component: HomeEnTwentySevenComponent }];
@NgModule({
  declarations: [HomeEnTwentySevenComponent],
   imports: [CommonModule,MatExpansionModule, RouterModule.forChild(routes)],
})
export class TwentySevenEnArtickleModule {}
