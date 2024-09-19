import { Component,OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { User } from '../../../interfaces/models/user.models';
import { Departamento } from '../../../interfaces/models/departamento.models';
import { Cargo } from '../../../interfaces/models/cargo.models';
import { UserService } from '../../../core/services/user.service';
import { CargoServiceService } from '../../../core/services/cargo.service';
import { DepartamentoService } from '../../../core/services/departamento.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { ApiResponse } from '../../../interfaces/http-response.interface';
import { MatDialog } from '@angular/material/dialog';
import { UserDialogComponent } from '../user-dialog/user-dialog.component';
import { MatDialogModule } from '@angular/material/dialog'; 
import { ConfirmDialogComponent } from '../../app/confirm-dialog/confirm-dialog.component';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    MatIconModule,CommonModule, MatDialogModule
  ],
  templateUrl: './registro-cargos.component.html',
  styleUrl: './registro-cargos.component.scss'
})
export class RegistroCargosComponent implements OnInit {

  users: User[] = [];
  departamentos: Departamento[] = []; 
  cargos: Cargo[] = []; 
  filteredUsers: User[] = [];
  isEditing: boolean = false;
  selectedUser: User | null = null;
  userForm!:FormGroup;

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private departamentoService: DepartamentoService,
    private cargoService: CargoServiceService,
    private dialog: MatDialog
  ) {
  
  }
  ngOnInit(): void {

    this.userForm = this.fb.group({
      id: '',
      username: '',
      nombre: '',
      apellido: '' ,
      departamento: '',
      cargo: '',
      email: '',
    });

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


    this.loadUsers();
  }

  

  loadUsers() {
    this.userService.tUsers().subscribe(
      (response: any) => { 
        console.log('Respuesta de la API:', response);
        this.users = response.data; 
      },
      (error) => {
        console.error('Error al cargar los usuarios:', error);
      }
    );
  }


  onSubmit() {
    if (this.isEditing) {
      this.updateUser();
    } else {
      this.createUser();
    }
  }

  createUser() {
    const newUser: User = this.userForm.value;
    this.userService.crearUser(newUser).subscribe(
      (response) => {
        this.users.push(response.data);
        this.userForm.reset();
        Swal.fire('Usuario creado', 'El usuario ha sido registrado con éxito', 'success');
      },
      (error) => {
        console.error('Error al crear usuario:', error);
      }
    );
  }

  updateUser() {
    if (this.selectedUser) {
      const updatedUser: User = this.userForm.value;
      this.userService.actualizarUser(this.selectedUser.id!, updatedUser).subscribe(
        (response) => {
          const index = this.users.findIndex(u => u.id === this.selectedUser!.id);
          this.users[index] = response.data;
          this.userForm.reset();
          this.isEditing = false;
          this.selectedUser = null;
          Swal.fire('Usuario actualizado', 'El usuario ha sido actualizado con éxito', 'success');
        },
        (error) => {
          console.error('Error al actualizar usuario:', error);
        }
      );
    }
  }

  editUser(user: User) {
    this.userForm.patchValue(user);
    this.isEditing = true;
    this.selectedUser = user;
  }

  deleteUser(user: User): void {
    const dialogRef = this.dialog.open(ConfirmDialogComponent);
  
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.userService.eliminarUser(user.id!).subscribe(
          () => {
            this.users = this.users.filter(u => u.id !== user.id);
            console.log('Usuario eliminado con éxito');
          },
          (error) => {
            console.error('Error al eliminar usuario:', error);
          }
        );
      }
    });
  }

  cancelEdit() {
    this.userForm.reset();
    this.isEditing = false;
    this.selectedUser = null;
  }



  onDepartamentoChange(event: Event) {
    const selectedDepartamentoId = +(event.target as HTMLSelectElement).value;
    if (selectedDepartamentoId) {
      this.filteredUsers = this.users.filter(user => user.idDepartamento === selectedDepartamentoId);
    } else {
      this.filteredUsers = [...this.users]; 
    }
  }


  onCargoChange(event: Event) {
    const selectedCargoId = +(event.target as HTMLSelectElement).value;
    if (selectedCargoId) {
      this.filteredUsers = this.users.filter(user => user.idCargo === selectedCargoId);
    } else {
      this.filteredUsers = [...this.users]; 
    }
  }


  /* openModal(): void {
    const dialogRef = this.dialog.open(UserDialogComponent, {
      width: '600px', // Ancho del modal
    });

    // Suscríbete al cierre del modal si necesitas manejar la respuesta
    dialogRef.afterClosed().subscribe(result => {
      console.log('El modal se cerró');
    });

  } */

    openModal(user?: User): void {
      // Log para verificar el valor del usuario y su id
      console.log('Usuario a editar:', user); // Muestra el objeto completo
      console.log('ID del usuario:', user?.id); // Muestra el id del usuario
    
      UserDialogComponent.userData = user || null; 
      const dialogRef = this.dialog.open(UserDialogComponent, {
        width: '600px',
      });
    
      dialogRef.afterClosed().subscribe(result => {
        console.log('El modal se cerró');
      });
    }

    
    

}
