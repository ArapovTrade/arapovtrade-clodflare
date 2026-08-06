import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeRuBlogOnehundredNinetythreeComponent } from './home-ru-blog-onehundred-ninetythree.component';

describe('HomeRuBlogOnehundredNinetythreeComponent', () => {
  let component: HomeRuBlogOnehundredNinetythreeComponent;
  let fixture: ComponentFixture<HomeRuBlogOnehundredNinetythreeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HomeRuBlogOnehundredNinetythreeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomeRuBlogOnehundredNinetythreeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
