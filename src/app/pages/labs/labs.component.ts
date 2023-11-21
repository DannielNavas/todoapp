import { CommonModule } from '@angular/common';
import { Component, signal } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-labs',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './labs.component.html',
  styleUrl: './labs.component.css',
})
export class LabsComponent {
  title = 'Labs';
  name = signal('Danniel Navas');
  age = 33;
  urlImage = 'https://picsum.photos/200/300';
  disabled = true;
  persona = {
    name: 'Danniel',
    age: 33,
    country: 'Colombia',
    avatar: 'https://picsum.photos/200/300',
  };

  task = signal([
    { name: 'task 1', done: false },
    { name: 'task 2', done: false },
    { name: 'task 3', done: false },
  ]);

  colorControl = new FormControl();
  widthCntrl = new FormControl(50, {
    nonNullable: true,
  });

  constructor() {
    this.colorControl.valueChanges.subscribe((value) => {
      console.log(value);
    });
  }

  clickHandler() {
    alert(`Angular ${this.persona.name}`);
  }

  changeHandler(event: Event) {
    const input = event.target as HTMLInputElement;
    const newValue = input.value;
    this.name.set(newValue);
  }

  keyDownHandler(event: KeyboardEvent) {
    const input = event.target as HTMLInputElement;
    console.log(input.value);
  }
}
