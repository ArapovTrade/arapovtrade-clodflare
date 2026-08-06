import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeUkBlogOnehundredSeventythreeComponent } from './home-uk-blog-onehundred-seventythree.component';

describe('HomeUkBlogOnehundredSeventythreeComponent', () => {
  let component: HomeUkBlogOnehundredSeventythreeComponent;
  let fixture: ComponentFixture<HomeUkBlogOnehundredSeventythreeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HomeUkBlogOnehundredSeventythreeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomeUkBlogOnehundredSeventythreeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
