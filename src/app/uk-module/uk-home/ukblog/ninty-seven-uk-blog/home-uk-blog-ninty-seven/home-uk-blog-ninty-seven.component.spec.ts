import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeUkBlogNintySevenComponent } from './home-uk-blog-ninty-seven.component';

describe('HomeUkBlogNintySevenComponent', () => {
  let component: HomeUkBlogNintySevenComponent;
  let fixture: ComponentFixture<HomeUkBlogNintySevenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HomeUkBlogNintySevenComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomeUkBlogNintySevenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
