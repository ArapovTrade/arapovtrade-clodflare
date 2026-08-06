import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeEuBlogThirtySevenComponent } from './home-eu-blog-thirty-seven.component';

describe('HomeEuBlogThirtySevenComponent', () => {
  let component: HomeEuBlogThirtySevenComponent;
  let fixture: ComponentFixture<HomeEuBlogThirtySevenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HomeEuBlogThirtySevenComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomeEuBlogThirtySevenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
