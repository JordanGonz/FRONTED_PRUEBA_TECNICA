import { Injectable } from '@angular/core';
import { environment } from '../../env/enviroment.development';
import { HttpClient } from '@angular/common/http';
import { Observable} from 'rxjs';
import { ApiResponse } from '../../interfaces/http-response.interface';
import { User } from '../../interfaces/models/user.models';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private readonly apiUrl = `${environment.BASE_URL_API}`; 

  constructor(private http: HttpClient) {}


  tUsers(): Observable<User[]> {
    return this.http.get<User[]>(`${this.apiUrl}/mostrartodosusers`);
  }


  crearUser(user: User): Observable<ApiResponse<User>> {
    return this.http.post<ApiResponse<User>>(`${this.apiUrl}/crear-users`, user);
  }


  getUser(id: number): Observable<ApiResponse<User>> {
    return this.http.get<ApiResponse<User>>(`${this.apiUrl}/users/${id}`);
  }


  actualizarUser(id: number, user: User): Observable<ApiResponse<User>> {
    return this.http.put<ApiResponse<User>>(`${this.apiUrl}/actualizar-users/${id}`, user);
  }

  eliminarUser(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/eliminar-users/${id}`);
  }

}
