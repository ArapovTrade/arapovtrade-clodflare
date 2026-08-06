import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeRuBlogOnehundredFortyfiveComponent } from './home-ru-blog-onehundred-fortyfive.component';

describe('HomeRuBlogOnehundredFortyfiveComponent', () => {
  let component: HomeRuBlogOnehundredFortyfiveComponent;
  let fixture: ComponentFixture<HomeRuBlogOnehundredFortyfiveComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HomeRuBlogOnehundredFortyfiveComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomeRuBlogOnehundredFortyfiveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
