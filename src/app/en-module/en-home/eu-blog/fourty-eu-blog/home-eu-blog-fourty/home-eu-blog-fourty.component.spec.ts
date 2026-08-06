import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeEuBlogFourtyComponent } from './home-eu-blog-fourty.component';

describe('HomeEuBlogFourtyComponent', () => {
  let component: HomeEuBlogFourtyComponent;
  let fixture: ComponentFixture<HomeEuBlogFourtyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HomeEuBlogFourtyComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomeEuBlogFourtyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
