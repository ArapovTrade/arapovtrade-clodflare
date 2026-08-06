import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeRuBlogOnehundredThirtythreeComponent } from './home-ru-blog-onehundred-thirtythree.component';

describe('HomeRuBlogOnehundredThirtythreeComponent', () => {
  let component: HomeRuBlogOnehundredThirtythreeComponent;
  let fixture: ComponentFixture<HomeRuBlogOnehundredThirtythreeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HomeRuBlogOnehundredThirtythreeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomeRuBlogOnehundredThirtythreeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
