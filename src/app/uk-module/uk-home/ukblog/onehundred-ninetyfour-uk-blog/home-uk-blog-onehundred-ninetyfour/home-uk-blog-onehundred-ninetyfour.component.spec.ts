import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeUkBlogOnehundredNinetyfourComponent } from './home-uk-blog-onehundred-ninetyfour.component';

describe('HomeUkBlogOnehundredNinetyfourComponent', () => {
  let component: HomeUkBlogOnehundredNinetyfourComponent;
  let fixture: ComponentFixture<HomeUkBlogOnehundredNinetyfourComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HomeUkBlogOnehundredNinetyfourComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomeUkBlogOnehundredNinetyfourComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
