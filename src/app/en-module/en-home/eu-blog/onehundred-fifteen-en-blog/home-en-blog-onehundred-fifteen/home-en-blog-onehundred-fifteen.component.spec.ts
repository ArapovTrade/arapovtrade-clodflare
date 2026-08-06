import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeEnBlogOnehundredFifteenComponent } from './home-en-blog-onehundred-fifteen.component';

describe('HomeEnBlogOnehundredFifteenComponent', () => {
  let component: HomeEnBlogOnehundredFifteenComponent;
  let fixture: ComponentFixture<HomeEnBlogOnehundredFifteenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HomeEnBlogOnehundredFifteenComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomeEnBlogOnehundredFifteenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
