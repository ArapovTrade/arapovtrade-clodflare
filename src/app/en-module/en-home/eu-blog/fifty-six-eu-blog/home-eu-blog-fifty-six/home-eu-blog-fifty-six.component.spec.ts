import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeEuBlogFiftySixComponent } from './home-eu-blog-fifty-six.component';

describe('HomeEuBlogFiftySixComponent', () => {
  let component: HomeEuBlogFiftySixComponent;
  let fixture: ComponentFixture<HomeEuBlogFiftySixComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HomeEuBlogFiftySixComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomeEuBlogFiftySixComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
