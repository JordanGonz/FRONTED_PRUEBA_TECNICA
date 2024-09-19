import { Injectable } from '@angular/core';
import { environment } from '../../env/enviroment.development';
import { HttpClient } from '@angular/common/http';
import { Observable} from 'rxjs';
import { Cargo } from '../../interfaces/models/cargo.models';
import { ApiResponse } from '../../interfaces/http-response.interface';

@Injectable({
  providedIn: 'root'
})

export class CargoServiceService {
  private readonly apiUrl = `${environment.BASE_URL_API}`; 

  constructor(private http: HttpClient) {

  }


  tCargos(): Observable<ApiResponse<Cargo[]>> {
    return this.http.get<ApiResponse<Cargo[]>>(`${this.apiUrl}/mostrartodoscargos`);
}

  
  crearCargo(cargo: Cargo): Observable<ApiResponse<Cargo>> {
    return this.http.post<ApiResponse<Cargo>>(`${this.apiUrl}/crear-cargos`, cargo);
  }

  
  getCargo(id: number): Observable<ApiResponse<Cargo>>{
    return this.http.get<ApiResponse<Cargo>>(`${this.apiUrl}/cargos/${id}`);
  }

 
  actualizarCargo(id: number, cargo: Cargo): Observable<ApiResponse<Cargo>> {
    return this.http.put<ApiResponse<Cargo>>(`${this.apiUrl}/actualizar-cargos/${id}`, cargo);
  }


  eliminarCargo(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/eliminar-cargos/${id}`);
  }

}
