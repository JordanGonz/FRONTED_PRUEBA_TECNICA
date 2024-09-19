// src/environments/environment.ts

export const environment = {
    production: false,
    BASE_URL_API: 'http://localhost/Prueba_Tecnica/Api_prueba/public/api', 
    BASE_URL_API_NO_API: 'http://localhost/Prueba_Tecnica/Api_prueba/public', 
  };
  
  export const API_ENV = {
    production: false,
    protocol: 'http',
    subDomain: "",
    domain: 'localhost',
    port: '', 
    gateway: '',
    apiVersion: 'v1',
    prefix: 'api',
  } as const;
  
  export const API_URL: string = `${API_ENV['protocol']}://${API_ENV['subDomain'] ? `${API_ENV['subDomain']}.` : ''}${API_ENV['domain']}${API_ENV['port'] ? ':' + API_ENV['port'] : ''}/${API_ENV['gateway'] ? API_ENV['gateway'] + '/' : ''}`;
  