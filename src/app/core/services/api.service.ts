import { HttpClient, HttpErrorResponse, HttpParams, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, map, tap, throwError } from 'rxjs';
import { AlertService } from './alert.service';

@Injectable({
  providedIn: 'root',
})
export class ApiService {

  constructor(
    private _httpClient: HttpClient,
    private _alertService: AlertService
  ) {}

  public request<T>(
    method: 'GET' | 'POST' | 'PUT' | 'DELETE',
    url: string,
    options: {
      body?: any;
      params?: HttpParams;
      headers?: HttpHeaders;
    } = {}
  ): Observable<T> {
    return this._httpClient
      .request<T>(method, url, {
        body: options.body,
        params: options.params,
        headers: options.headers,
      })
      .pipe(catchError(this.handleError.bind(this)));
  }


  public get<T>(url: string, params?: HttpParams): Observable<T> {
    return this.request<T>('GET', url, { params });
  }

  public post<TRequest, TResponse>(
    url: string,
    body: TRequest
  ): Observable<TResponse> {
    return this.request<TResponse>('POST', url, { body });
  }

  public put<TRequest, TResponse>(
    url: string,
    body: TRequest
  ): Observable<TResponse> {
    return this.request<TResponse>('PUT', url, { body });
  }

  public delete<TResponse>(url: string): Observable<TResponse> {
    return this.request<TResponse>('DELETE', url);
  }

  private handleError(error: any): Observable<never> {
    const messageError = this.errorMgmt(error);
    this._alertService.showAlert(messageError,'','',['OK']);
    return throwError(() => error);
  }

  private errorMgmt(error: HttpErrorResponse): string {
    if (error.error instanceof ErrorEvent) {
      return error.error.message;
    }

    switch (error.status) {
      case 400:
        return 'Ha ocurrido un error al realizar esta petición';
      case 401:
        return 'No autorizado para esta función';
      case 403:
        return 'Su sesión ha finalizado, ingrese nuevamente';
      case 404:
        return 'No se ha encontrado';
      // 422 Error de validación
      case 422:
        return 'Credenciales invalidas';
      case 500:
        return 'Ha ocurrido un error. Verifique e intente de nuevo.';
      case 0:
        return 'No se puede conectar al servicio';
      default:
        if (typeof error.error === 'string') {
          return error.error;
        }
        return 'Error inesperado: ' + JSON.stringify(error.error || error);
    }
  }
}
