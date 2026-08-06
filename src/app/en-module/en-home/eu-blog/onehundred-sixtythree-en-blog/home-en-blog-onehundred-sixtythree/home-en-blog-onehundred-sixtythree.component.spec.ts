import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeEnBlogOnehundredSixtythreeComponent } from './home-en-blog-onehundred-sixtythree.component';

describe('HomeEnBlogOnehundredSixtythreeComponent', () => {
  let component: HomeEnBlogOnehundredSixtythreeComponent;
  let fixture: ComponentFixture<HomeEnBlogOnehundredSixtythreeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HomeEnBlogOnehundredSixtythreeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomeEnBlogOnehundredSixtythreeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
