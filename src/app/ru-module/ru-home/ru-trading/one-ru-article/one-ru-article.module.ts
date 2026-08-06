import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeRuComponent } from './home-ru/home-ru.component';
import { MatExpansionModule } from '@angular/material/expansion';
import { RouterModule } from '@angular/router';
import { Routes } from '@angular/router';

const routes: Routes = [{ path: '', component: HomeRuComponent }];

@NgModule({
  declarations: [HomeRuComponent],
  imports: [CommonModule,MatExpansionModule, RouterModule.forChild(routes)],
})
export class OneRUArticleModule {}
