import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeUkBlogFiveteenComponent } from './home-uk-blog-fiveteen.component';

describe('HomeUkBlogFiveteenComponent', () => {
  let component: HomeUkBlogFiveteenComponent;
  let fixture: ComponentFixture<HomeUkBlogFiveteenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HomeUkBlogFiveteenComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomeUkBlogFiveteenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
