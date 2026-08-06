import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeEnBlogNintyNineComponent } from './home-en-blog-ninty-nine.component';

describe('HomeEnBlogNintyNineComponent', () => {
  let component: HomeEnBlogNintyNineComponent;
  let fixture: ComponentFixture<HomeEnBlogNintyNineComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HomeEnBlogNintyNineComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomeEnBlogNintyNineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
