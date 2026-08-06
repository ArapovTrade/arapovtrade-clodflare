import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeEnBlogNintyComponent } from './home-en-blog-ninty.component';

describe('HomeEnBlogNintyComponent', () => {
  let component: HomeEnBlogNintyComponent;
  let fixture: ComponentFixture<HomeEnBlogNintyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HomeEnBlogNintyComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomeEnBlogNintyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
