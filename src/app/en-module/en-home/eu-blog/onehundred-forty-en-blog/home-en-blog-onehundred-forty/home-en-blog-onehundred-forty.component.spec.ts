import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeEnBlogOnehundredFortyComponent } from './home-en-blog-onehundred-forty.component';

describe('HomeEnBlogOnehundredFortyComponent', () => {
  let component: HomeEnBlogOnehundredFortyComponent;
  let fixture: ComponentFixture<HomeEnBlogOnehundredFortyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HomeEnBlogOnehundredFortyComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomeEnBlogOnehundredFortyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
