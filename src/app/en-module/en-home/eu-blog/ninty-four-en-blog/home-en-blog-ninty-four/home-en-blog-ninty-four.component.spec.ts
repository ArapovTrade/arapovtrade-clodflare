import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeEnBlogNintyFourComponent } from './home-en-blog-ninty-four.component';

describe('HomeEnBlogNintyFourComponent', () => {
  let component: HomeEnBlogNintyFourComponent;
  let fixture: ComponentFixture<HomeEnBlogNintyFourComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HomeEnBlogNintyFourComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomeEnBlogNintyFourComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
