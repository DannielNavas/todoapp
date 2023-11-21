import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-labs',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './labs.component.html',
  styleUrl: './labs.component.css',
})
export class LabsComponent {
  title = 'Labs';
  name = 'Danniel Navas';
  age = 33;
  urlImage = 'https://picsum.photos/200/300';
  disabled = true;
  persona = {
    name: 'Danniel',
    age: 33,
    country: 'Colombia',
    avatar: 'https://picsum.photos/200/300',
  };
}
