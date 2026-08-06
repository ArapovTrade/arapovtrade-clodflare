import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeUkBlogNintyTwoComponent } from './home-uk-blog-ninty-two.component';

describe('HomeUkBlogNintyTwoComponent', () => {
  let component: HomeUkBlogNintyTwoComponent;
  let fixture: ComponentFixture<HomeUkBlogNintyTwoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HomeUkBlogNintyTwoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomeUkBlogNintyTwoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
