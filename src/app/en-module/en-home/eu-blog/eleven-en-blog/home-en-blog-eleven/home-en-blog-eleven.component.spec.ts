import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeEnBlogElevenComponent } from './home-en-blog-eleven.component';

describe('HomeEnBlogElevenComponent', () => {
  let component: HomeEnBlogElevenComponent;
  let fixture: ComponentFixture<HomeEnBlogElevenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HomeEnBlogElevenComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomeEnBlogElevenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
