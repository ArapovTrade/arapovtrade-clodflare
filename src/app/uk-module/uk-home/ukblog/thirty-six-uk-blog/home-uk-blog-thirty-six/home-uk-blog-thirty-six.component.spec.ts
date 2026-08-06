import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeUkBlogThirtySixComponent } from './home-uk-blog-thirty-six.component';

describe('HomeUkBlogThirtySixComponent', () => {
  let component: HomeUkBlogThirtySixComponent;
  let fixture: ComponentFixture<HomeUkBlogThirtySixComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HomeUkBlogThirtySixComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomeUkBlogThirtySixComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
