import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeUkBlogEightyFourComponent } from './home-uk-blog-eighty-four.component';

describe('HomeUkBlogEightyFourComponent', () => {
  let component: HomeUkBlogEightyFourComponent;
  let fixture: ComponentFixture<HomeUkBlogEightyFourComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HomeUkBlogEightyFourComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomeUkBlogEightyFourComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
