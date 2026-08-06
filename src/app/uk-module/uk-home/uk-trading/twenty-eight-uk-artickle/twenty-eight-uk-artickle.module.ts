import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeUkTwentyEightComponent } from './home-uk-twenty-eight/home-uk-twenty-eight.component';
import { MatExpansionModule } from '@angular/material/expansion';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [{ path: '', component: HomeUkTwentyEightComponent }];
@NgModule({
  declarations: [HomeUkTwentyEightComponent],
   imports: [CommonModule,MatExpansionModule, RouterModule.forChild(routes)],
})
export class TwentyEightUkArtickleModule {}
