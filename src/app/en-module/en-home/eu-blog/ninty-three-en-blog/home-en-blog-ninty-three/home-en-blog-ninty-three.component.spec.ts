import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeEnBlogNintyThreeComponent } from './home-en-blog-ninty-three.component';

describe('HomeEnBlogNintyThreeComponent', () => {
  let component: HomeEnBlogNintyThreeComponent;
  let fixture: ComponentFixture<HomeEnBlogNintyThreeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HomeEnBlogNintyThreeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomeEnBlogNintyThreeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
