import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeEnBlogNintyTwoComponent } from './home-en-blog-ninty-two.component';

describe('HomeEnBlogNintyTwoComponent', () => {
  let component: HomeEnBlogNintyTwoComponent;
  let fixture: ComponentFixture<HomeEnBlogNintyTwoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HomeEnBlogNintyTwoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomeEnBlogNintyTwoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
