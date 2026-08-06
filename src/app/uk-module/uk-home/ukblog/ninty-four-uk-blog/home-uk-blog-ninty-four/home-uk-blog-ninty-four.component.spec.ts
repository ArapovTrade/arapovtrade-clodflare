import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeUkBlogNintyFourComponent } from './home-uk-blog-ninty-four.component';

describe('HomeUkBlogNintyFourComponent', () => {
  let component: HomeUkBlogNintyFourComponent;
  let fixture: ComponentFixture<HomeUkBlogNintyFourComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HomeUkBlogNintyFourComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomeUkBlogNintyFourComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
