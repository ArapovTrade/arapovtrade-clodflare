import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeUkBlogNintyNineComponent } from './home-uk-blog-ninty-nine.component';

describe('HomeUkBlogNintyNineComponent', () => {
  let component: HomeUkBlogNintyNineComponent;
  let fixture: ComponentFixture<HomeUkBlogNintyNineComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HomeUkBlogNintyNineComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomeUkBlogNintyNineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
