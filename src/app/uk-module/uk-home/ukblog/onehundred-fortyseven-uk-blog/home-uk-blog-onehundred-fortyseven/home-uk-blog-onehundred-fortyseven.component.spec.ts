import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeUkBlogOnehundredFortysevenComponent } from './home-uk-blog-onehundred-fortyseven.component';

describe('HomeUkBlogOnehundredFortysevenComponent', () => {
  let component: HomeUkBlogOnehundredFortysevenComponent;
  let fixture: ComponentFixture<HomeUkBlogOnehundredFortysevenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HomeUkBlogOnehundredFortysevenComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomeUkBlogOnehundredFortysevenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
