import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeEuBlogSixtyComponent } from './home-eu-blog-sixty.component';

describe('HomeEuBlogSixtyComponent', () => {
  let component: HomeEuBlogSixtyComponent;
  let fixture: ComponentFixture<HomeEuBlogSixtyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HomeEuBlogSixtyComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomeEuBlogSixtyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
