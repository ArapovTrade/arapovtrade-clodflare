import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeEnBlogFiftyComponent } from './home-en-blog-fifty.component';

describe('HomeEnBlogFiftyComponent', () => {
  let component: HomeEnBlogFiftyComponent;
  let fixture: ComponentFixture<HomeEnBlogFiftyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HomeEnBlogFiftyComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomeEnBlogFiftyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
