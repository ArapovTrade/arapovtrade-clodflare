import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeRuBlogOnehundredNinetyfiveComponent } from './home-ru-blog-onehundred-ninetyfive.component';

describe('HomeRuBlogOnehundredNinetyfiveComponent', () => {
  let component: HomeRuBlogOnehundredNinetyfiveComponent;
  let fixture: ComponentFixture<HomeRuBlogOnehundredNinetyfiveComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HomeRuBlogOnehundredNinetyfiveComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomeRuBlogOnehundredNinetyfiveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
