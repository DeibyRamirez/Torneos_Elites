import { db } from "@/lib/firebase";
import { collection, getDocs, query, where } from "firebase/firestore";

// Función para obtener torneos
// Si userId es null, obtiene todos los torneos (global)
// Si userId tiene valor, obtiene solo los del usuario
export const obtenerTorneosUsuario = async (userId: string | null = null) => {
    try {
        const torneosRef = collection(db, "torneos");
        let q;

        if (userId) {
            // Usuario logueado: filtra por creador
            q = query(torneosRef, where("creador", "==", userId));
        } else {
            // Usuario no logueado: obtiene todos
            q = query(torneosRef);
        }

        const querySnapshot = await getDocs(q);

        const torneos: any[] = [];
        querySnapshot.forEach((doc) => {
            torneos.push({ id: doc.id, ...doc.data() });
        });

        return torneos;
    } catch (error) {
        console.error("Error al obtener torneos:", error);
        return [];
    }
}

// Función para obtener equipos
// Si userId es null, obtiene todos los equipos (global)
// Si userId tiene valor, obtiene solo los del usuario (opcionalmente filtrados por torneo)
export const obtenerEquiposUsuario = async (userId: string | null = null, torneoId?: string) => {
    try {
        const equiposRef = collection(db, "equipos");
        let q;

        if (userId) {
            // Usuario logueado
            if (torneoId) {
                // Filtrar por usuario y torneo específico
                q = query(equiposRef,
                    where("creador", "==", userId),
                    where("torneo", "==", torneoId)
                );
            } else {
                // Filtrar solo por usuario
                q = query(equiposRef, where("creador", "==", userId));
            }
        } else {
            // Usuario no logueado
            if (torneoId) {
                // Filtrar solo por torneo
                q = query(equiposRef, where("torneo", "==", torneoId));
            } else {
                // Obtener todos los equipos
                q = query(equiposRef);
            }
        }

        const querySnapshot = await getDocs(q);

        const equipos: any[] = [];
        querySnapshot.forEach((doc) => {
            equipos.push({ id: doc.id, ...doc.data() });
        });

        return equipos;
    } catch (error) {
        console.error("Error al obtener equipos:", error);
        return [];
    }
}

// Función para obtener jugadores
// Si userId es null, obtiene todos los jugadores (global)
// Si userId tiene valor, obtiene solo los del usuario (filtrados por torneo si se especifica)
export const obtenerJugadoresUsuario = async (userId: string | null = null, torneoId?: string) => {
    try {
        // Primero obtenemos los equipos (con o sin filtro de usuario)
        const equiposDelTorneo = await obtenerEquiposUsuario(userId, torneoId);
        const idsEquipos = equiposDelTorneo.map(equipo => equipo.id);

        if (idsEquipos.length === 0) {
            return [];
        }

        // Luego obtenemos los jugadores de esos equipos
        const jugadoresRef = collection(db, "jugadores");
        let q;

        if (userId) {
            // Usuario logueado: filtrar por creador y equipos
            q = query(jugadoresRef,
                where("creador", "==", userId),
                where("equipo", "in", idsEquipos)
            );
        } else {
            // Usuario no logueado: filtrar solo por equipos
            q = query(jugadoresRef,
                where("equipo", "in", idsEquipos)
            );
        }

        const querySnapshot = await getDocs(q);

        const jugadores: any[] = [];
        querySnapshot.forEach((doc) => {
            jugadores.push({ id: doc.id, ...doc.data() });
        });

        return jugadores;
    } catch (error) {
        console.error("Error al obtener jugadores:", error);
        return [];
    }
}

// Función para obtener eventos
// Si userId es null, obtiene todos los eventos (global)
// Si userId tiene valor, obtiene solo los del usuario (opcionalmente filtrados por torneo)
export const obtenerEventosUsuario = async (userId: string | null = null, torneoId?: string) => {
    try {
        const eventosRef = collection(db, "eventos");
        let q;

        if (userId) {
            // Usuario logueado
            if (torneoId) {
                // Filtrar por usuario y torneo específico
                q = query(eventosRef,
                    where("creador", "==", userId),
                    where("torneo", "==", torneoId)
                );
            } else {
                // Filtrar solo por usuario
                q = query(eventosRef, where("creador", "==", userId));
            }
        } else {
            // Usuario no logueado
            if (torneoId) {
                // Filtrar solo por torneo
                q = query(eventosRef, where("torneo", "==", torneoId));
            } else {
                // Obtener todos los eventos
                q = query(eventosRef);
            }
        }

        const querySnapshot = await getDocs(q);

        const eventos: any[] = [];
        querySnapshot.forEach((doc) => {
            eventos.push({ id: doc.id, ...doc.data() });
        });

        return eventos;
    } catch (error) {
        console.error("Error al obtener eventos:", error);
        return [];
    }
}