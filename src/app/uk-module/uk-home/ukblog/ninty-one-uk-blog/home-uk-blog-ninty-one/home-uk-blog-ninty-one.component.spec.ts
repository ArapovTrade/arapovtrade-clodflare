import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeUkBlogNintyOneComponent } from './home-uk-blog-ninty-one.component';

describe('HomeUkBlogNintyOneComponent', () => {
  let component: HomeUkBlogNintyOneComponent;
  let fixture: ComponentFixture<HomeUkBlogNintyOneComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HomeUkBlogNintyOneComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomeUkBlogNintyOneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
