import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeEnBlogOnehundredSeventythreeComponent } from './home-en-blog-onehundred-seventythree.component';

describe('HomeEnBlogOnehundredSeventythreeComponent', () => {
  let component: HomeEnBlogOnehundredSeventythreeComponent;
  let fixture: ComponentFixture<HomeEnBlogOnehundredSeventythreeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HomeEnBlogOnehundredSeventythreeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomeEnBlogOnehundredSeventythreeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
