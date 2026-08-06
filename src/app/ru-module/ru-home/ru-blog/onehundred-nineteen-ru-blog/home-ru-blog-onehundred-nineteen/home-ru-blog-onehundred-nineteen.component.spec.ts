import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeRuBlogOnehundredNineteenComponent } from './home-ru-blog-onehundred-nineteen.component';

describe('HomeRuBlogOnehundredNineteenComponent', () => {
  let component: HomeRuBlogOnehundredNineteenComponent;
  let fixture: ComponentFixture<HomeRuBlogOnehundredNineteenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HomeRuBlogOnehundredNineteenComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomeRuBlogOnehundredNineteenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
