import { CommonModule } from '@angular/common';
import { Component, Injector, OnInit, computed, effect, inject, signal } from '@angular/core';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { Task } from '../../models/task.model';

export type Filter = 'all' | 'pending' | 'completed';
@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent implements OnInit {
  tasks = signal<Task[]>([]);

  filter = signal<Filter>('all');

  // Retorna un nuevo valor cada vez que cambia el valor de tasks o filter (reactividad)
  taskByFilter = computed(() => {
    const filter = this.filter();
    const tasks = this.tasks();
    if (filter === 'completed') return tasks.filter((task) => task.completed);
    if (filter === 'pending') return tasks.filter((task) => !task.completed);
    return tasks;

  });

  newTaskCtrl = new FormControl('', {
    validators: [Validators.required, Validators.minLength(4)],
    nonNullable: true,
  });
  injector = inject(Injector);

  constructor() {
    // El effect de signals no retorna
    // El effect de signals se ejecuta cada vez que cambia el valor de la señal
    // effect(() => {
    //   const tasks = this.tasks();
    //   localStorage.setItem('tasks', JSON.stringify(tasks));
    // });
  }

  ngOnInit() {
      const tasks = localStorage.getItem('tasks');
    if (tasks) this.tasks.set(JSON.parse(tasks));
    this.trackTask();
  }

  trackTask() {
    effect(() => {
      const tasks = this.tasks();
      localStorage.setItem('tasks', JSON.stringify(tasks));
    }, {injector: this.injector});
  }

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

  updateTaskEditingMode(index: number) {
    this.tasks.update((tasks) =>
      tasks.map((task, i) =>
        i === index ? { ...task, editing: true } : { ...task, editing: false }
      )
    );
  }

  updateTaskText(index: number, event: Event) {
    const input = event.target as HTMLInputElement;
    const newValue = input.value;
    this.tasks.update((tasks) =>
      tasks.map((task, i) =>
        i === index ? { ...task, title: newValue, editing: false } : task
      )
    );
  }

  changeFilter(filter: Filter) {
    this.filter.set(filter);
  }
}
