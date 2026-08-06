import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeEnBlogSeventySixComponent } from './home-en-blog-seventy-six.component';

describe('HomeEnBlogSeventySixComponent', () => {
  let component: HomeEnBlogSeventySixComponent;
  let fixture: ComponentFixture<HomeEnBlogSeventySixComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HomeEnBlogSeventySixComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomeEnBlogSeventySixComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
