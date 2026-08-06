import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeEuBlogThirtyFiveComponent } from './home-eu-blog-thirty-five.component';

describe('HomeEuBlogThirtyFiveComponent', () => {
  let component: HomeEuBlogThirtyFiveComponent;
  let fixture: ComponentFixture<HomeEuBlogThirtyFiveComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HomeEuBlogThirtyFiveComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomeEuBlogThirtyFiveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
