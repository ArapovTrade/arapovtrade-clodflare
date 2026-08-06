import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeUkTwentySevenComponent } from './home-uk-twenty-seven/home-uk-twenty-seven.component';
import { MatExpansionModule } from '@angular/material/expansion';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [{ path: '', component: HomeUkTwentySevenComponent }];
@NgModule({
  declarations: [HomeUkTwentySevenComponent],
   imports: [CommonModule,MatExpansionModule, RouterModule.forChild(routes)],
})
export class TwentySevenUkArtickleModule {}
