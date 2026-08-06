import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeUkBlogOnehundredTenComponent } from './home-uk-blog-onehundred-ten.component';

describe('HomeUkBlogOnehundredTenComponent', () => {
  let component: HomeUkBlogOnehundredTenComponent;
  let fixture: ComponentFixture<HomeUkBlogOnehundredTenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HomeUkBlogOnehundredTenComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomeUkBlogOnehundredTenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
