import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeRuBlogOnehundredNinetynineComponent } from './home-ru-blog-onehundred-ninetynine.component';

describe('HomeRuBlogOnehundredNinetynineComponent', () => {
  let component: HomeRuBlogOnehundredNinetynineComponent;
  let fixture: ComponentFixture<HomeRuBlogOnehundredNinetynineComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HomeRuBlogOnehundredNinetynineComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomeRuBlogOnehundredNinetynineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
