import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeEnBlogNintySevenComponent } from './home-en-blog-ninty-seven.component';

describe('HomeEnBlogNintySevenComponent', () => {
  let component: HomeEnBlogNintySevenComponent;
  let fixture: ComponentFixture<HomeEnBlogNintySevenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HomeEnBlogNintySevenComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomeEnBlogNintySevenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
