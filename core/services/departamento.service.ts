import { Injectable } from '@angular/core';
import { environment } from '../../env/enviroment.development';
import { HttpClient } from '@angular/common/http';
import { Observable} from 'rxjs';
import { ApiResponse } from '../../interfaces/http-response.interface';
import { Departamento } from '../../interfaces/models/departamento.models';

@Injectable({
  providedIn: 'root'
})
export class DepartamentoService {

  private readonly apiUrl = `${environment.BASE_URL_API}`; 

  constructor(private http: HttpClient) {}


  tDepartamentos(): Observable<ApiResponse<Departamento[]>> {
    return this.http.get<ApiResponse<Departamento[]>>(`${this.apiUrl}/mostrartodosdepartamentos`);
}


  crearDepartamento(departamento: Departamento): Observable<ApiResponse<Departamento>> {
    return this.http.post<ApiResponse<Departamento>>(`${this.apiUrl}/crear-departamentos`, departamento);
  }


  getDepartamento(id: number): Observable<ApiResponse<Departamento>> {
    return this.http.get<ApiResponse<Departamento>>(`${this.apiUrl}/departamentos/${id}`);
  }


  actualizarDepartamento(id: number, departamento: Departamento): Observable<ApiResponse<Departamento>> {
    return this.http.put<ApiResponse<Departamento>>(`${this.apiUrl}/actualizar-departamentos/${id}`, departamento);
  }


  eliminarDepartamento(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/eliminar-departamentos/${id}`);
  }
  
}
