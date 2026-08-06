import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeUkBlogSevenComponent } from './home-uk-blog-seven.component';

describe('HomeUkBlogSevenComponent', () => {
  let component: HomeUkBlogSevenComponent;
  let fixture: ComponentFixture<HomeUkBlogSevenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HomeUkBlogSevenComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomeUkBlogSevenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
