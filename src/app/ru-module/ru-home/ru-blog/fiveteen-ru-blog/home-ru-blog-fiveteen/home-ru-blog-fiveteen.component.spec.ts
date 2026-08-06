import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeRuBlogFiveteenComponent } from './home-ru-blog-fiveteen.component';

describe('HomeRuBlogFiveteenComponent', () => {
  let component: HomeRuBlogFiveteenComponent;
  let fixture: ComponentFixture<HomeRuBlogFiveteenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HomeRuBlogFiveteenComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomeRuBlogFiveteenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
