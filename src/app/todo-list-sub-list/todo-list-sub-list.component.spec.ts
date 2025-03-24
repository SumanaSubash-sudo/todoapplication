import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TodoListSubListComponent } from './todo-list-sub-list.component';

describe('TodoListSubListComponent', () => {
  let component: TodoListSubListComponent;
  let fixture: ComponentFixture<TodoListSubListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TodoListSubListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TodoListSubListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
