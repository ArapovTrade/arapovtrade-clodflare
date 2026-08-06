import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeEnBlogOnehundredNinetyComponent } from './home-en-blog-onehundred-ninety.component';

describe('HomeEnBlogOnehundredNinetyComponent', () => {
  let component: HomeEnBlogOnehundredNinetyComponent;
  let fixture: ComponentFixture<HomeEnBlogOnehundredNinetyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HomeEnBlogOnehundredNinetyComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomeEnBlogOnehundredNinetyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
