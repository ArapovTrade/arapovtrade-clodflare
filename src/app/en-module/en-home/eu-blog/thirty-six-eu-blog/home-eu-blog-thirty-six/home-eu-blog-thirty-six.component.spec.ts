import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeEuBlogThirtySixComponent } from './home-eu-blog-thirty-six.component';

describe('HomeEuBlogThirtySixComponent', () => {
  let component: HomeEuBlogThirtySixComponent;
  let fixture: ComponentFixture<HomeEuBlogThirtySixComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HomeEuBlogThirtySixComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomeEuBlogThirtySixComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
