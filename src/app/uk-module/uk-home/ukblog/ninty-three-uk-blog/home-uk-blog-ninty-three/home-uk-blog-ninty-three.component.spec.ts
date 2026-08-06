import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeUkBlogNintyThreeComponent } from './home-uk-blog-ninty-three.component';

describe('HomeUkBlogNintyThreeComponent', () => {
  let component: HomeUkBlogNintyThreeComponent;
  let fixture: ComponentFixture<HomeUkBlogNintyThreeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HomeUkBlogNintyThreeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomeUkBlogNintyThreeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
