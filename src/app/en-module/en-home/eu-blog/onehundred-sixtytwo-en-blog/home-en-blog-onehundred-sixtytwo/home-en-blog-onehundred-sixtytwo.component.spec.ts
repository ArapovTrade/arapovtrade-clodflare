import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeEnBlogOnehundredSixtytwoComponent } from './home-en-blog-onehundred-sixtytwo.component';

describe('HomeEnBlogOnehundredSixtytwoComponent', () => {
  let component: HomeEnBlogOnehundredSixtytwoComponent;
  let fixture: ComponentFixture<HomeEnBlogOnehundredSixtytwoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HomeEnBlogOnehundredSixtytwoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomeEnBlogOnehundredSixtytwoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
