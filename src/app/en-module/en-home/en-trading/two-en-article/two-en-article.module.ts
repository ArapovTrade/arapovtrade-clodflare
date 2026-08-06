import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeTwoEnComponent } from './home-two-en/home-two-en.component';
import { RouterModule } from '@angular/router';
import { Routes } from '@angular/router';
import { MatExpansionModule } from '@angular/material/expansion';
const routes: Routes = [{ path: '', component: HomeTwoEnComponent }];

@NgModule({
  declarations: [HomeTwoEnComponent],
 imports: [CommonModule,MatExpansionModule, RouterModule.forChild(routes)],
})
export class TwoEnArticleModule {}
