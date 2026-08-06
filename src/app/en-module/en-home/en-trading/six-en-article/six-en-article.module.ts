import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeEnSixComponent } from './home-en-six/home-en-six.component';
import { RouterModule, Routes } from '@angular/router';
import { MatExpansionModule } from '@angular/material/expansion';
const routes: Routes = [{ path: '', component: HomeEnSixComponent }];

@NgModule({
  declarations: [HomeEnSixComponent],
  imports: [CommonModule,MatExpansionModule, RouterModule.forChild(routes)],
})
export class SixEnArticleModule {}
