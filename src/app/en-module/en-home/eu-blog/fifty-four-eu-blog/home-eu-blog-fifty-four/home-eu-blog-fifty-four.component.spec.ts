import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeEuBlogFiftyFourComponent } from './home-eu-blog-fifty-four.component';

describe('HomeEuBlogFiftyFourComponent', () => {
  let component: HomeEuBlogFiftyFourComponent;
  let fixture: ComponentFixture<HomeEuBlogFiftyFourComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HomeEuBlogFiftyFourComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomeEuBlogFiftyFourComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
