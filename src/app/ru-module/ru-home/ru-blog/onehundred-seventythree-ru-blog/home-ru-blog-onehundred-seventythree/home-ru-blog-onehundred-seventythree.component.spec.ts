import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeRuBlogOnehundredSeventythreeComponent } from './home-ru-blog-onehundred-seventythree.component';

describe('HomeRuBlogOnehundredSeventythreeComponent', () => {
  let component: HomeRuBlogOnehundredSeventythreeComponent;
  let fixture: ComponentFixture<HomeRuBlogOnehundredSeventythreeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HomeRuBlogOnehundredSeventythreeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomeRuBlogOnehundredSeventythreeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
