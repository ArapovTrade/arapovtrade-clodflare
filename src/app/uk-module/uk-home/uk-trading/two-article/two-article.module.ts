import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatExpansionModule } from '@angular/material/expansion';
import { RouterModule } from '@angular/router';
import { Routes } from '@angular/router';
import { HomeUkTwoComponent } from './home-uk-two/home-uk-two.component';

const routes: Routes = [{ path: '', component: HomeUkTwoComponent }];

@NgModule({
  declarations: [HomeUkTwoComponent],
   imports: [CommonModule,MatExpansionModule, RouterModule.forChild(routes)],
})
export class TwoArticleModule {}
