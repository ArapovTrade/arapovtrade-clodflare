import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeUkBlogOnehundredNinetynineComponent } from './home-uk-blog-onehundred-ninetynine.component';

describe('HomeUkBlogOnehundredNinetynineComponent', () => {
  let component: HomeUkBlogOnehundredNinetynineComponent;
  let fixture: ComponentFixture<HomeUkBlogOnehundredNinetynineComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HomeUkBlogOnehundredNinetynineComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomeUkBlogOnehundredNinetynineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
