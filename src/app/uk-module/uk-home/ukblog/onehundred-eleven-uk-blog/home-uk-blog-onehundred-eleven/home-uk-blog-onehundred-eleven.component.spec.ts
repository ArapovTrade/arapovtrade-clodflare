import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeUkBlogOnehundredElevenComponent } from './home-uk-blog-onehundred-eleven.component';

describe('HomeUkBlogOnehundredElevenComponent', () => {
  let component: HomeUkBlogOnehundredElevenComponent;
  let fixture: ComponentFixture<HomeUkBlogOnehundredElevenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HomeUkBlogOnehundredElevenComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomeUkBlogOnehundredElevenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
