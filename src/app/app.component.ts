import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { RegistroCargosComponent } from "./registro-cargos/registro-cargos.component";


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RegistroCargosComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'], 
})
export class AppComponent {
  title = 'Frontend-Prueba';

  constructor(){}

}
