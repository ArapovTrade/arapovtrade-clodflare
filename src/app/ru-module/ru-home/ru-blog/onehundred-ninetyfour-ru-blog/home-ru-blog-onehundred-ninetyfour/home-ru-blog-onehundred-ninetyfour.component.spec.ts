import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeRuBlogOnehundredNinetyfourComponent } from './home-ru-blog-onehundred-ninetyfour.component';

describe('HomeRuBlogOnehundredNinetyfourComponent', () => {
  let component: HomeRuBlogOnehundredNinetyfourComponent;
  let fixture: ComponentFixture<HomeRuBlogOnehundredNinetyfourComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HomeRuBlogOnehundredNinetyfourComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomeRuBlogOnehundredNinetyfourComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
