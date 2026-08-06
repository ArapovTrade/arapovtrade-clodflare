import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeRuTwoComponent } from './home-ru-two/home-ru-two.component';
import { RouterModule } from '@angular/router';
import { Routes } from '@angular/router';
import { MatExpansionModule } from '@angular/material/expansion';
const routes: Routes = [{ path: '', component: HomeRuTwoComponent }];

@NgModule({
  declarations: [HomeRuTwoComponent],
   imports: [CommonModule,MatExpansionModule, RouterModule.forChild(routes)],
})
export class TwoRuArticleModule {}
