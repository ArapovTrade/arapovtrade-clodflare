import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeUkBlogNintyComponent } from './home-uk-blog-ninty.component';

describe('HomeUkBlogNintyComponent', () => {
  let component: HomeUkBlogNintyComponent;
  let fixture: ComponentFixture<HomeUkBlogNintyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HomeUkBlogNintyComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomeUkBlogNintyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
