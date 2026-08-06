import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeUkBlogEightyEightComponent } from './home-uk-blog-eighty-eight.component';

describe('HomeUkBlogEightyEightComponent', () => {
  let component: HomeUkBlogEightyEightComponent;
  let fixture: ComponentFixture<HomeUkBlogEightyEightComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HomeUkBlogEightyEightComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomeUkBlogEightyEightComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
