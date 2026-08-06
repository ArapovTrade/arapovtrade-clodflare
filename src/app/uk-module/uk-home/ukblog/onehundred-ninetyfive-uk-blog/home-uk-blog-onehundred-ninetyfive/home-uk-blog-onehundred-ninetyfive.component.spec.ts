import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeUkBlogOnehundredNinetyfiveComponent } from './home-uk-blog-onehundred-ninetyfive.component';

describe('HomeUkBlogOnehundredNinetyfiveComponent', () => {
  let component: HomeUkBlogOnehundredNinetyfiveComponent;
  let fixture: ComponentFixture<HomeUkBlogOnehundredNinetyfiveComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HomeUkBlogOnehundredNinetyfiveComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomeUkBlogOnehundredNinetyfiveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
