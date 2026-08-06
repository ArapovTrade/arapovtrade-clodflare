import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeEnBlogFiveteenComponent } from './home-en-blog-fiveteen.component';

describe('HomeEnBlogFiveteenComponent', () => {
  let component: HomeEnBlogFiveteenComponent;
  let fixture: ComponentFixture<HomeEnBlogFiveteenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HomeEnBlogFiveteenComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomeEnBlogFiveteenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
