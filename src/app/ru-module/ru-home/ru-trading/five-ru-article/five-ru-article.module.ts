import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeRuOneComponent } from './home-ru-one/home-ru-one.component';
import { MatExpansionModule } from '@angular/material/expansion';
import { RouterModule } from '@angular/router';
import { Routes } from '@angular/router';

const routes: Routes = [{ path: '', component: HomeRuOneComponent }];

@NgModule({
  declarations: [HomeRuOneComponent],
   imports: [CommonModule,MatExpansionModule, RouterModule.forChild(routes)],
})
export class FiveRuArticleModule {}
