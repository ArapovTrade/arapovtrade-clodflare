import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeEuBlogFiftyNineComponent } from './home-eu-blog-fifty-nine.component';

describe('HomeEuBlogFiftyNineComponent', () => {
  let component: HomeEuBlogFiftyNineComponent;
  let fixture: ComponentFixture<HomeEuBlogFiftyNineComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HomeEuBlogFiftyNineComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomeEuBlogFiftyNineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
