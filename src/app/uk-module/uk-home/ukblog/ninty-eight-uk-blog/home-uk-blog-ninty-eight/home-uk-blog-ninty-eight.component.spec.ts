import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeUkBlogNintyEightComponent } from './home-uk-blog-ninty-eight.component';

describe('HomeUkBlogNintyEightComponent', () => {
  let component: HomeUkBlogNintyEightComponent;
  let fixture: ComponentFixture<HomeUkBlogNintyEightComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HomeUkBlogNintyEightComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomeUkBlogNintyEightComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
