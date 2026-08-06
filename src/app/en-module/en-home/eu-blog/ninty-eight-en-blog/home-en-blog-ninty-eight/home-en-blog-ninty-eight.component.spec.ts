import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeEnBlogNintyEightComponent } from './home-en-blog-ninty-eight.component';

describe('HomeEnBlogNintyEightComponent', () => {
  let component: HomeEnBlogNintyEightComponent;
  let fixture: ComponentFixture<HomeEnBlogNintyEightComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HomeEnBlogNintyEightComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomeEnBlogNintyEightComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
