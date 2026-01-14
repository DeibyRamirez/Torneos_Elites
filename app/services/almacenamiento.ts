import { collection, doc, serverTimestamp, setDoc } from "firebase/firestore";
import { Torneo } from "../interface/torneo";
import { db } from "@/lib/firebase";
import { Equipo } from "../interface/equipo";
import { Jugador } from "../interface/jugador";
import { Evento } from "../interface/evento";

// Funciones de almacenamiento en Firestore
export const CrearTorneo = async (datos: Torneo, userId: string) => {
    try {
        const torneoRef = doc(collection(db, "torneos"));

        await setDoc(torneoRef, {
            ...datos,
            creador: userId,
            createdAt: serverTimestamp(),
            updatedAt: serverTimestamp(),
        });

        console.log("Torneo almacenado exitosamente");
        return { success: true, id: torneoRef.id };
    } catch (error) {
        console.error("Error al guardar Torneo", error);
        throw { success: false, error: error };
    }
}

export const CrearEquipo = async (datos: Equipo, userId: string) => {
    try {
        const equipoRef = doc(collection(db, "equipos"));

        await setDoc(equipoRef, {
            ...datos,
            creador: userId,
            partidosGanados: 0,
            partidosPerdidos: 0,
            partidosEmpatados: 0,
            puntos: 0,
            createdAt: serverTimestamp(),
            updatedAt: serverTimestamp(),
        });

        console.log("Equipo almacenado exitosamente");
        return { success: true, id: equipoRef.id };
    } catch (error) {
        console.error("Error al guardar Equipo", error);
        throw { success: false, error: error };
    }
}

export const CrearJugador = async (datos: Jugador, userId: string) => {
    try {
        const jugadorRef = doc(collection(db, "jugadores"));

        await setDoc(jugadorRef, {
            ...datos,
            creador: userId,
            createdAt: serverTimestamp(),
            updatedAt: serverTimestamp(),
        });

        console.log("Jugador almacenado exitosamente");
        return { success: true, id: jugadorRef.id };
    } catch (error) {
        console.error("Error al guardar Jugador", error);
        throw { success: false, error: error };
    }
}

export const CrearEvento = async (datos: Evento, userId: string) => {
    try {
        const eventoRef = doc(collection(db, "eventos"));

        await setDoc(eventoRef, {
            ...datos,
            creador: userId,
            createdAt: serverTimestamp(),
            updatedAt: serverTimestamp(),
        });

        console.log("Evento almacenado exitosamente");
        return { success: true, id: eventoRef.id };
    } catch (error) {
        console.error("Error al guardar Evento", error);
        throw { success: false, error: error };
    }
}