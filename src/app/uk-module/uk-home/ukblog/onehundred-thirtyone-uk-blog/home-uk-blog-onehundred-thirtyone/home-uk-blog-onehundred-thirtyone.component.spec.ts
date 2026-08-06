import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeUkBlogOnehundredThirtyoneComponent } from './home-uk-blog-onehundred-thirtyone.component';

describe('HomeUkBlogOnehundredThirtyoneComponent', () => {
  let component: HomeUkBlogOnehundredThirtyoneComponent;
  let fixture: ComponentFixture<HomeUkBlogOnehundredThirtyoneComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HomeUkBlogOnehundredThirtyoneComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomeUkBlogOnehundredThirtyoneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
