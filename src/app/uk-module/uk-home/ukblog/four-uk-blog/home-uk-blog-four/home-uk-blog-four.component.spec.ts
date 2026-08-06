import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeUkBlogFourComponent } from './home-uk-blog-four.component';

describe('HomeUkBlogFourComponent', () => {
  let component: HomeUkBlogFourComponent;
  let fixture: ComponentFixture<HomeUkBlogFourComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HomeUkBlogFourComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomeUkBlogFourComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
