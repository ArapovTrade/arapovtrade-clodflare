import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeEnBlogOnehundredFortyeightComponent } from './home-en-blog-onehundred-fortyeight.component';

describe('HomeEnBlogOnehundredFortyeightComponent', () => {
  let component: HomeEnBlogOnehundredFortyeightComponent;
  let fixture: ComponentFixture<HomeEnBlogOnehundredFortyeightComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HomeEnBlogOnehundredFortyeightComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomeEnBlogOnehundredFortyeightComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
