export interface Evento {
    id?: string;
    nombre: string;
    ubicacion: string;
    equipoLocal: string;
    equipoVisitante: string;
    fecha: string;
    hora: string;
    torneo: string;
    imagenUrl?: string;
}