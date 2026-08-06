import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeEnBlogOnehundredFortysevenComponent } from './home-en-blog-onehundred-fortyseven.component';

describe('HomeEnBlogOnehundredFortysevenComponent', () => {
  let component: HomeEnBlogOnehundredFortysevenComponent;
  let fixture: ComponentFixture<HomeEnBlogOnehundredFortysevenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HomeEnBlogOnehundredFortysevenComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomeEnBlogOnehundredFortysevenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
