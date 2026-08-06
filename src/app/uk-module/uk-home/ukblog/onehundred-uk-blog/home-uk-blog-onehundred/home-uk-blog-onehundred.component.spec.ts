import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeUkBlogOnehundredComponent } from './home-uk-blog-onehundred.component';

describe('HomeUkBlogOnehundredComponent', () => {
  let component: HomeUkBlogOnehundredComponent;
  let fixture: ComponentFixture<HomeUkBlogOnehundredComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HomeUkBlogOnehundredComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomeUkBlogOnehundredComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
