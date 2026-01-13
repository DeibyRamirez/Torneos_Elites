export interface Usuario {
    nombre: string;
    email: string;
    rol: 'creador' | 'admin' | 'usuario';
}