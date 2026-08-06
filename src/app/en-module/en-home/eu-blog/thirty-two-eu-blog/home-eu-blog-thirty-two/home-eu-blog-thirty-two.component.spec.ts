import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeEuBlogThirtyTwoComponent } from './home-eu-blog-thirty-two.component';

describe('HomeEuBlogThirtyTwoComponent', () => {
  let component: HomeEuBlogThirtyTwoComponent;
  let fixture: ComponentFixture<HomeEuBlogThirtyTwoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HomeEuBlogThirtyTwoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomeEuBlogThirtyTwoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
