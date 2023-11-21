import { CommonModule } from '@angular/common';
import { Component, signal } from '@angular/core';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { Task } from '../../models/task.model';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent {
  tasks = signal<Task[]>([
    {
      id: Date.now(),
      title: 'Task 1',
      completed: false,
    },
    {
      id: Date.now(),
      title: 'Task 2',
      completed: false,
    },
    {
      id: Date.now(),
      title: 'Task 3',
      completed: false,
    },
  ]);

  newTaskCtrl = new FormControl('', {
    validators: [
      Validators.required,
      Validators.minLength(4),
    ],
    nonNullable: true,
  });

  constructor() {}

  // changeHandler(event: Event) {
  //   const input = event.target as HTMLInputElement;
  //   const newValue = input.value;
  // this.tasks.update((tasks) => [...tasks, newValue]);
  //   this.addTask(newValue);
  // }

  changeHandler() {
    if (this.newTaskCtrl.invalid) return;
    const newValue = this.newTaskCtrl.value.trim();
    if (!newValue) return;
    this.addTask(newValue);
    this.newTaskCtrl.setValue('');
  }

  addTask(title: string) {
    const newTask: Task = {
      id: Date.now(),
      title,
      completed: false,
    };
    this.tasks.update((tasks) => [...tasks, newTask]);
  }

  deleteTask(index: number) {
    this.tasks.update((tasks) => tasks.filter((_, i) => i !== index));
  }

  toggleTask(index: number) {
    this.tasks.update((tasks) =>
      tasks.map((task, i) =>
        i === index ? { ...task, completed: !task.completed } : task
      )
    );
  }
}
