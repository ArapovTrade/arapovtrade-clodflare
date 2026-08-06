import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeRuTwentyTwoComponent } from './home-ru-twenty-two/home-ru-twenty-two.component';
import { MatExpansionModule } from '@angular/material/expansion';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [{ path: '', component: HomeRuTwentyTwoComponent }];
@NgModule({
  declarations: [HomeRuTwentyTwoComponent],
   imports: [CommonModule,MatExpansionModule, RouterModule.forChild(routes)],
})
export class TwentyTwoRuArtickleModule {}
