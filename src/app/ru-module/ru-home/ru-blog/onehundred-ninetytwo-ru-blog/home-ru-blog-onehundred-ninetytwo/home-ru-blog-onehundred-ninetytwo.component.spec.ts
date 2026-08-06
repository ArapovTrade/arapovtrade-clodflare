import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeRuBlogOnehundredNinetytwoComponent } from './home-ru-blog-onehundred-ninetytwo.component';

describe('HomeRuBlogOnehundredNinetytwoComponent', () => {
  let component: HomeRuBlogOnehundredNinetytwoComponent;
  let fixture: ComponentFixture<HomeRuBlogOnehundredNinetytwoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HomeRuBlogOnehundredNinetytwoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomeRuBlogOnehundredNinetytwoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
