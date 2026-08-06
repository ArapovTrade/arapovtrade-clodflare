import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeEnBlogNintyOneComponent } from './home-en-blog-ninty-one.component';

describe('HomeEnBlogNintyOneComponent', () => {
  let component: HomeEnBlogNintyOneComponent;
  let fixture: ComponentFixture<HomeEnBlogNintyOneComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HomeEnBlogNintyOneComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomeEnBlogNintyOneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
