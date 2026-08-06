import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeUkBlogOnehundredOneComponent } from './home-uk-blog-onehundred-one.component';

describe('HomeUkBlogOnehundredOneComponent', () => {
  let component: HomeUkBlogOnehundredOneComponent;
  let fixture: ComponentFixture<HomeUkBlogOnehundredOneComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HomeUkBlogOnehundredOneComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomeUkBlogOnehundredOneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
