import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeEnBlogEightySixComponent } from './home-en-blog-eighty-six.component';

describe('HomeEnBlogEightySixComponent', () => {
  let component: HomeEnBlogEightySixComponent;
  let fixture: ComponentFixture<HomeEnBlogEightySixComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HomeEnBlogEightySixComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomeEnBlogEightySixComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
