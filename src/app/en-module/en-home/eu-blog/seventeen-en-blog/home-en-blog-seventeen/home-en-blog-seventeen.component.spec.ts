import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeEnBlogSeventeenComponent } from './home-en-blog-seventeen.component';

describe('HomeEnBlogSeventeenComponent', () => {
  let component: HomeEnBlogSeventeenComponent;
  let fixture: ComponentFixture<HomeEnBlogSeventeenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HomeEnBlogSeventeenComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomeEnBlogSeventeenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
