import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeUkBlogOnehundredNinetytwoComponent } from './home-uk-blog-onehundred-ninetytwo.component';

describe('HomeUkBlogOnehundredNinetytwoComponent', () => {
  let component: HomeUkBlogOnehundredNinetytwoComponent;
  let fixture: ComponentFixture<HomeUkBlogOnehundredNinetytwoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HomeUkBlogOnehundredNinetytwoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomeUkBlogOnehundredNinetytwoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
