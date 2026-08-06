import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeEuBlogFiftySevenComponent } from './home-eu-blog-fifty-seven.component';

describe('HomeEuBlogFiftySevenComponent', () => {
  let component: HomeEuBlogFiftySevenComponent;
  let fixture: ComponentFixture<HomeEuBlogFiftySevenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HomeEuBlogFiftySevenComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomeEuBlogFiftySevenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
