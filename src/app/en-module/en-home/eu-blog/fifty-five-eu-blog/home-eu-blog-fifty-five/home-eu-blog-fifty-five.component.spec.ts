import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeEuBlogFiftyFiveComponent } from './home-eu-blog-fifty-five.component';

describe('HomeEuBlogFiftyFiveComponent', () => {
  let component: HomeEuBlogFiftyFiveComponent;
  let fixture: ComponentFixture<HomeEuBlogFiftyFiveComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HomeEuBlogFiftyFiveComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomeEuBlogFiftyFiveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
