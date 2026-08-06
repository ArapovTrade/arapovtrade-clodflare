import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeEnBlogOnehundredSeventeenComponent } from './home-en-blog-onehundred-seventeen.component';

describe('HomeEnBlogOnehundredSeventeenComponent', () => {
  let component: HomeEnBlogOnehundredSeventeenComponent;
  let fixture: ComponentFixture<HomeEnBlogOnehundredSeventeenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HomeEnBlogOnehundredSeventeenComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomeEnBlogOnehundredSeventeenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
