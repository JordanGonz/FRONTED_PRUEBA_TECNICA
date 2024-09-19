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
import { UserService } from '../../../core/services/user.service';


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
  isEditMode: boolean = false; 

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<UserDialogComponent>,
    private departamentoService: DepartamentoService,  
    private cargoService: CargoServiceService,
    private userService: UserService 
  ) {
    const user = UserDialogComponent.userData;
    this.isEditMode = !!user; 
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
        if (response && Array.isArray(response.data)) { 
          this.departamentos = response.data; 
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
        if (response && Array.isArray(response.data)) { 
          this.cargos = response.data; 
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

    onSave(): void {
      if (this.userForm.invalid) {
          console.error('Formulario inválido');
          return;
      }

      // Crear un nuevo usuario con los nombres de campos que la API espera
      const user: User = {
        usuario: this.userForm.value.usuario,
        primerNombre: this.userForm.value.primerNombre,
        segundoNombre: this.userForm.value.segundoNombre,
        primerApellido: this.userForm.value.primerApellido,
        segundoApellido: this.userForm.value.segundoApellido,
        idDepartamento: this.userForm.value.departamento,
        idCargo: this.userForm.value.cargo 
      };

      console.log('Datos a enviar:', user); 


      if (this.isEditMode) {
        // Actualizar usuario
        this.userService.actualizarUser(UserDialogComponent.userData!.id!, user).subscribe(
          (response: any) => {
            console.log('Usuario actualizado exitosamente:', response);
            this.dialogRef.close(true);
          },
          (error: any) => {
            console.error('Error al actualizar usuario:', error);
          }
        );
      } else {
        // Crear usuario
        this.userService.crearUser(user).subscribe(
          (response: any) => {
            console.log('Usuario creado exitosamente:', response);
            this.dialogRef.close(true); 
          },
          (error: any) => {
            console.error('Error al crear usuario:', error);
          }
        );
      }

    }
      
}
