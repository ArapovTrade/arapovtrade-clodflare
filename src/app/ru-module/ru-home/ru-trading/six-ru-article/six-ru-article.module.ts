import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeRuSixComponent } from './home-ru-six/home-ru-six.component';
import { Routes } from '@angular/router';
import { RouterModule } from '@angular/router';
import { MatExpansionModule } from '@angular/material/expansion';
const routes: Routes = [{ path: '', component: HomeRuSixComponent }];

@NgModule({
  declarations: [HomeRuSixComponent],
  imports: [CommonModule,MatExpansionModule, RouterModule.forChild(routes)],
})
export class SixRuArticleModule {}
