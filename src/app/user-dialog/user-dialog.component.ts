import { Component,OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, FormGroup,ReactiveFormsModule } from '@angular/forms';
import { User } from '../../../interfaces/models/user.models';
import { CommonModule } from '@angular/common';
import { DepartamentoService } from '../../../core/services/departamento.service';
import { CargoServiceService } from '../../../core/services/cargo.service';
import { Departamento } from '../../../interfaces/models/departamento.models';
import { Cargo } from '../../../interfaces/models/cargo.models';
import { ApiResponse } from '../../../interfaces/http-response.interface';


@Component({
  selector: 'app-user-dialog',
  standalone: true,
  imports: [CommonModule,ReactiveFormsModule],
  templateUrl: './user-dialog.component.html',
  styleUrl: './user-dialog.component.scss'
})
export class UserDialogComponent implements OnInit {

  userForm!: FormGroup;
  static userData: User | null = null;
  departamentos: Departamento[] = [];
  cargos: Cargo[] = [];

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<UserDialogComponent>,
    private departamentoService: DepartamentoService,  
    private cargoService: CargoServiceService    
  ) {
    const user = UserDialogComponent.userData;
    this.userForm = this.fb.group({
      usuario: [user?.usuario || ''],
      primerNombre: [user?.primerNombre || ''],
      segundoNombre: [user?.segundoNombre || ''],
      primerApellido: [user?.primerApellido || ''],
      segundoApellido: [user?.segundoApellido || ''],
      departamento: [user?.idDepartamento || ''],
      cargo: [user?.idCargo || '']
    });
  }

  ngOnInit(): void {
    // Cargar departamentos
    this.departamentoService.tDepartamentos().subscribe(
      (response: ApiResponse<Departamento[]>) => { 
        if (response && Array.isArray(response.data)) { // Verifica que 'response.data' es un array
          this.departamentos = response.data; // Asigna `response.data` a `departamentos`
          console.log('Departamentos:', this.departamentos); 
        } else {
          console.error('Error: La respuesta de departamentos no es un array.', response);
        }
      },
      (error) => {
        console.error('Error al cargar los departamentos:', error);
      }
    );

    // Cargar cargos
    this.cargoService.tCargos().subscribe(
      (response: ApiResponse<Cargo[]>) => {
        if (response && Array.isArray(response.data)) { // Verifica que 'response.data' es un array
          this.cargos = response.data; // Asigna `response.data` a `cargos`
          console.log('Cargos:', this.cargos); 
        } else {
          console.error('Error: La respuesta de cargos no es un array.', response);
        }
      },
      (error) => {
        console.error('Error al cargar los cargos:', error);
      }
    );
  }

  closeModal() {
    this.dialogRef.close();
  }

  onSave() {
   
    this.dialogRef.close(this.userForm.value); 
  }

}
