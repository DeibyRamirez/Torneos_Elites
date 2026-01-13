"use client"

import { useState, useEffect } from "react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Users, UserPlus, Trophy, Calendar1, AlertCircle } from "lucide-react"
import { User } from "firebase/auth"
import { Input } from "./ui/input"
import { Torneo } from "@/app/interface/torneo"
import { Equipo } from "@/app/interface/equipo"
import { Jugador } from "@/app/interface/jugador"
import { Evento } from "@/app/interface/evento"
import { doc, serverTimestamp, setDoc, collection, query, where, getDocs } from "firebase/firestore"
import { db } from "@/lib/firebase"
// import { ref, uploadBytes, getDownloadURL } from "firebase/storage"
// import { storage } from "@/lib/firebase"

interface DashboardProps {
    user: User;
}

// Funciones de almacenamiento en Firestore
const CrearTorneo = async (datos: Torneo, userId: string) => {
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

const CrearEquipo = async (datos: Equipo, userId: string) => {
    try {
        const equipoRef = doc(collection(db, "equipos"));

        await setDoc(equipoRef, {
            ...datos,
            creador: userId,
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

const CrearJugador = async (datos: Jugador, userId: string) => {
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

const CrearEvento = async (datos: Evento, userId: string) => {
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

// Función para obtener torneos del usuario
const obtenerTorneosUsuario = async (userId: string) => {
    try {
        const torneosRef = collection(db, "torneos");
        const q = query(torneosRef, where("creador", "==", userId));
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

// Función para obtener equipos del usuario filtrados por torneo
const obtenerEquiposUsuario = async (userId: string, torneoId?: string) => {
    try {
        const equiposRef = collection(db, "equipos");
        let q;

        if (torneoId) {
            q = query(equiposRef,
                where("creador", "==", userId),
                where("torneo", "==", torneoId)
            );
        } else {
            q = query(equiposRef, where("creador", "==", userId));
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

// // Función auxiliar para subir imágenes (comentada por ahora)
// const subirImagen = async (file: File, carpeta: string): Promise<string> => {
//     try {
//         const timestamp = Date.now();
//         const nombreArchivo = `${carpeta}/${timestamp}_${file.name}`;
//         const storageRef = ref(storage, nombreArchivo);

//         await uploadBytes(storageRef, file);
//         const url = await getDownloadURL(storageRef);

//         return url;
//     } catch (error) {
//         console.error("Error al subir imagen:", error);
//         throw error;
//     }
// }

export function Dashboard({ user }: DashboardProps) {
    const [view, setView] = useState<"overview" | "torneo" | "equipo" | "jugador" | "evento">("overview")
    const [loading, setLoading] = useState(false);

    // Estados para datos del usuario
    const [torneos, setTorneos] = useState<any[]>([]);
    const [equipos, setEquipos] = useState<any[]>([]);
    const [tieneTorneos, setTieneTorneos] = useState(false);
    const [tieneEquipos, setTieneEquipos] = useState(false);

    // Estados de formularios
    const [formTorneoData, setFormTorneoData] = useState({
        torneoNombre: "",
        torneoRepresentante: "",
        torneoFecha: "",
        torneoUbicacion: "",
        torneoLogo: null as File | null,
    });

    const [formEquipoData, setFormEquipoData] = useState({
        equipoNombre: "",
        equipoRepresentante: "",
        equipoLogo: null as File | null,
        equipoTorneo: ""
    });

    const [formJugadorData, setFormJugadorData] = useState({
        jugadorNombre: "",
        jugadorDNI: "",
        jugadorEdad: "",
        jugadorAltura: "",
        jugadorPeso: "",
        jugadorNacionalidad: "",
        jugadorEquipo: "",
        jugadorPosicion: "",
        jugadorFoto: null as File | null
    });

    const [formEventoData, setFormEventoData] = useState({
        eventoNombre: "",
        eventoUbicacion: "",
        eventoEquipoLocal: "",
        eventoEquipoVisitante: "",
        eventoFecha: "",
        eventoHora: ""
    });

    // Cargar datos del usuario al montar el componente
    useEffect(() => {
        cargarDatosUsuario();
    }, [user.uid]);

    // Recargar equipos cuando cambia el torneo seleccionado
    useEffect(() => {
        if (formEquipoData.equipoTorneo) {
            cargarEquiposPorTorneo(formEquipoData.equipoTorneo);
        }
    }, [formEquipoData.equipoTorneo]);

    const cargarDatosUsuario = async () => {
        const torneosData = await obtenerTorneosUsuario(user.uid);
        const equiposData = await obtenerEquiposUsuario(user.uid);

        setTorneos(torneosData);
        setEquipos(equiposData);
        setTieneTorneos(torneosData.length > 0);
        setTieneEquipos(equiposData.length > 0);
    }

    const cargarEquiposPorTorneo = async (torneoId: string) => {
        const equiposData = await obtenerEquiposUsuario(user.uid, torneoId);
        setEquipos(equiposData);
    }

    // Validar si puede acceder a la vista
    const puedeAccederVista = (vista: string): { puede: boolean; mensaje: string } => {
        switch (vista) {
            case "torneo":
                return { puede: true, mensaje: "" };
            case "equipo":
                if (!tieneTorneos) {
                    return {
                        puede: false,
                        mensaje: "Debes crear al menos un torneo antes de agregar equipos."
                    };
                }
                return { puede: true, mensaje: "" };
            case "jugador":
                if (!tieneTorneos) {
                    return {
                        puede: false,
                        mensaje: "Debes crear al menos un torneo antes de inscribir jugadores."
                    };
                }
                if (!tieneEquipos) {
                    return {
                        puede: false,
                        mensaje: "Debes crear al menos un equipo antes de inscribir jugadores."
                    };
                }
                return { puede: true, mensaje: "" };
            case "evento":
                if (!tieneTorneos) {
                    return {
                        puede: false,
                        mensaje: "Debes crear al menos un torneo antes de registrar eventos."
                    };
                }
                if (!tieneEquipos) {
                    return {
                        puede: false,
                        mensaje: "Debes crear al menos un equipo antes de registrar eventos."
                    };
                }
                return { puede: true, mensaje: "" };
            default:
                return { puede: true, mensaje: "" };
        }
    }

    // Manejar cambio de vista con validación
    const handleCambiarVista = (nuevaVista: "overview" | "torneo" | "equipo" | "jugador" | "evento") => {
        const validacion = puedeAccederVista(nuevaVista);

        if (!validacion.puede) {
            alert(validacion.mensaje);
            return;
        }

        setView(nuevaVista);
    }

    // Funciones de manejo de formularios
    const handleSubmitTorneo = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        try {
            let logoUrl = "";

            // if (formTorneoData.torneoLogo) {
            //     logoUrl = await subirImagen(formTorneoData.torneoLogo, "torneos/logos");
            // }

            const datosTorneo: Torneo = {
                nombre: formTorneoData.torneoNombre,
                representante: formTorneoData.torneoRepresentante,
                fecha: formTorneoData.torneoFecha,
                ubicacion: formTorneoData.torneoUbicacion,
                logoUrl: logoUrl
            };

            const resultado = await CrearTorneo(datosTorneo, user.uid);

            if (resultado.success) {
                alert("¡Torneo creado exitosamente!");
                setFormTorneoData({
                    torneoNombre: "",
                    torneoRepresentante: "",
                    torneoFecha: "",
                    torneoUbicacion: "",
                    torneoLogo: null,
                });
                // Recargar datos
                await cargarDatosUsuario();
                setView("overview");
            }
        } catch (error) {
            console.error("Error al crear torneo:", error);
            alert("Error al crear el torneo. Por favor intenta de nuevo.");
        } finally {
            setLoading(false);
        }
    };

    const handleSubmitEquipo = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        try {
            let logoUrl = "";

            // if (formEquipoData.equipoLogo) {
            //     logoUrl = await subirImagen(formEquipoData.equipoLogo, "equipos/logos");
            // }

            const datosEquipo: Equipo = {
                nombre: formEquipoData.equipoNombre,
                representante: formEquipoData.equipoRepresentante,
                logoUrl: logoUrl,
                torneo: formEquipoData.equipoTorneo
            };

            const resultado = await CrearEquipo(datosEquipo, user.uid);

            if (resultado.success) {
                alert("¡Equipo guardado exitosamente!");
                setFormEquipoData({
                    equipoNombre: "",
                    equipoRepresentante: "",
                    equipoLogo: null,
                    equipoTorneo: ""
                });
                // Recargar datos
                await cargarDatosUsuario();
                setView("overview");
            }
        } catch (error) {
            console.error("Error al guardar equipo:", error);
            alert("Error al guardar el equipo. Por favor intenta de nuevo.");
        } finally {
            setLoading(false);
        }
    };

    const handleSubmitJugador = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        try {
            let fotoUrl = "";

            // if (formJugadorData.jugadorFoto) {
            //     fotoUrl = await subirImagen(formJugadorData.jugadorFoto, "jugadores/fotos");
            // }

            const datosJugador: Jugador = {
                nombre: formJugadorData.jugadorNombre,
                dni: formJugadorData.jugadorDNI,
                edad: parseInt(formJugadorData.jugadorEdad),
                altura: parseFloat(formJugadorData.jugadorAltura),
                peso: parseFloat(formJugadorData.jugadorPeso),
                nacionalidad: formJugadorData.jugadorNacionalidad,
                equipo: formJugadorData.jugadorEquipo,
                posicion: formJugadorData.jugadorPosicion,
                fotoUrl: fotoUrl
            };

            const resultado = await CrearJugador(datosJugador, user.uid);

            if (resultado.success) {
                alert("¡Jugador inscrito exitosamente!");
                setFormJugadorData({
                    jugadorNombre: "",
                    jugadorDNI: "",
                    jugadorEdad: "",
                    jugadorAltura: "",
                    jugadorPeso: "",
                    jugadorNacionalidad: "",
                    jugadorEquipo: "",
                    jugadorPosicion: "",
                    jugadorFoto: null
                });
                setView("overview");
            }
        } catch (error) {
            console.error("Error al inscribir jugador:", error);
            alert("Error al inscribir el jugador. Por favor intenta de nuevo.");
        } finally {
            setLoading(false);
        }
    };

    const handleSubmitEvento = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        try {
            const datosEvento: Evento = {
                nombre: formEventoData.eventoNombre,
                ubicacion: formEventoData.eventoUbicacion,
                equipoLocal: formEventoData.eventoEquipoLocal,
                equipoVisitante: formEventoData.eventoEquipoVisitante,
                fecha: formEventoData.eventoFecha,
                hora: formEventoData.eventoHora
            };

            const resultado = await CrearEvento(datosEvento, user.uid);

            if (resultado.success) {
                alert("¡Evento creado exitosamente!");
                setFormEventoData({
                    eventoNombre: "",
                    eventoUbicacion: "",
                    eventoEquipoLocal: "",
                    eventoEquipoVisitante: "",
                    eventoFecha: "",
                    eventoHora: ""
                });
                setView("overview");
            }
        } catch (error) {
            console.error("Error al crear evento:", error);
            alert("Error al crear el evento. Por favor intenta de nuevo.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-background pt-24 pb-16 px-4">
            <div className="mx-auto max-w-7xl">
                {/* Header del Dashboard */}
                <div className="flex flex-col md:flex-row md:items-center justify-between mb-10 gap-4">
                    <div>
                        <h2 className="font-display text-4xl md:text-5xl font-bold uppercase">
                            Panel de {user.displayName || "Usuario"}
                        </h2>
                        <p className="text-muted-foreground mt-2 font-medium">Gestiona tu torneo, equipos y jugadores.</p>
                    </div>
                    <div className="flex gap-2">
                        <Button
                            variant={view === "torneo" ? "default" : "outline"}
                            className="font-bold border-2"
                            onClick={() => handleCambiarVista("torneo")}
                        >
                            <Trophy className="mr-2 h-4 w-4" /> + TORNEO
                        </Button>
                        <Button
                            variant={view === "equipo" ? "default" : "outline"}
                            className="font-bold border-2"
                            onClick={() => handleCambiarVista("equipo")}
                        >
                            <Users className="mr-2 h-4 w-4" /> + EQUIPO
                        </Button>
                        <Button
                            variant={view === "jugador" ? "default" : "outline"}
                            className="font-bold border-2"
                            onClick={() => handleCambiarVista("jugador")}
                        >
                            <UserPlus className="mr-2 h-4 w-4" /> + JUGADOR
                        </Button>
                        <Button
                            variant={view === "evento" ? "default" : "outline"}
                            className="font-bold border-2"
                            onClick={() => handleCambiarVista("evento")}
                        >
                            <Calendar1 className="mr-2 h-4 w-4" /> + EVENTO
                        </Button>
                    </div>
                </div>

                {/* Contenido Principal */}
                <div className="grid gap-8">
                    {view === "overview" && (
                        <div className="grid gap-6 md:grid-cols-2">
                            {/* Mensaje de bienvenida si no tiene torneos */}
                            {!tieneTorneos && (
                                <div className="md:col-span-2 bg-blue-50 dark:bg-blue-950 border-2 border-blue-200 dark:border-blue-800 p-6 rounded-lg">
                                    <div className="flex items-start gap-3">
                                        <AlertCircle className="h-6 w-6 text-blue-600 dark:text-blue-400 mt-0.5" />
                                        <div>
                                            <h3 className="font-bold text-lg text-blue-900 dark:text-blue-100 mb-2">
                                                ¡Bienvenido a tu Panel de Gestión Deportiva!
                                            </h3>
                                            <p className="text-blue-800 dark:text-blue-200 mb-2">
                                                Para comenzar, necesitas crear tu primer torneo. Una vez creado, podrás:
                                            </p>
                                            <ul className="list-disc list-inside space-y-1 text-blue-700 dark:text-blue-300 ml-2">
                                                <li>Agregar equipos participantes</li>
                                                <li>Inscribir jugadores a los equipos</li>
                                                <li>Programar eventos y partidos</li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            )}

                            <div
                                className="group relative overflow-hidden bg-card border border-border hover:border-primary transition-all duration-300 p-8 cursor-pointer"
                                onClick={() => handleCambiarVista("torneo")}
                            >
                                <Badge className="bg-primary text-white font-bold mb-4">MÓDULO</Badge>
                                <h3 className="text-2xl font-bold mb-2 uppercase">Planilla de Torneos</h3>
                                <p className="text-muted-foreground font-medium">
                                    Crea tu torneo y disfruta del deporte.
                                </p>
                                {torneos.length > 0 && (
                                    <p className="text-sm text-primary font-bold mt-2">
                                        {torneos.length} torneo{torneos.length !== 1 ? 's' : ''} creado{torneos.length !== 1 ? 's' : ''}
                                    </p>
                                )}
                                <div className="absolute inset-x-0 bottom-0 h-1 bg-primary transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300" />
                            </div>

                            <div
                                className={`group relative overflow-hidden bg-card border border-border transition-all duration-300 p-8 ${tieneTorneos ? 'hover:border-primary cursor-pointer' : 'opacity-50 cursor-not-allowed'
                                    }`}
                                onClick={() => handleCambiarVista("equipo")}
                            >
                                <Badge className={`font-bold mb-4 ${tieneTorneos ? 'bg-muted text-muted-foreground' : 'bg-gray-300 text-gray-500'}`}>
                                    {tieneTorneos ? 'MÓDULO' : 'BLOQUEADO'}
                                </Badge>
                                <h3 className="text-2xl font-bold mb-2 uppercase">Planilla de Equipos</h3>
                                <p className="text-muted-foreground font-medium">
                                    Crea y edita los clubes que participan en el torneo.
                                </p>
                                {equipos.length > 0 && (
                                    <p className="text-sm text-primary font-bold mt-2">
                                        {equipos.length} equipo{equipos.length !== 1 ? 's' : ''} creado{equipos.length !== 1 ? 's' : ''}
                                    </p>
                                )}
                                {!tieneTorneos && (
                                    <p className="text-sm text-red-500 font-bold mt-2">
                                        ⚠️ Requiere crear un torneo primero
                                    </p>
                                )}
                                <div className="absolute inset-x-0 bottom-0 h-1 bg-primary transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300" />
                            </div>

                            <div
                                className={`group relative overflow-hidden bg-card border border-border transition-all duration-300 p-8 ${tieneTorneos && tieneEquipos ? 'hover:border-primary cursor-pointer' : 'opacity-50 cursor-not-allowed'
                                    }`}
                                onClick={() => handleCambiarVista("jugador")}
                            >
                                <Badge className={`font-bold mb-4 ${tieneTorneos && tieneEquipos ? 'bg-muted text-muted-foreground' : 'bg-gray-300 text-gray-500'}`}>
                                    {tieneTorneos && tieneEquipos ? 'MÓDULO' : 'BLOQUEADO'}
                                </Badge>
                                <h3 className="text-2xl font-bold mb-2 uppercase">Registro de Jugadores</h3>
                                <p className="text-muted-foreground font-medium">
                                    Inscribe a los deportistas reales con sus datos técnicos.
                                </p>
                                {!tieneTorneos && (
                                    <p className="text-sm text-red-500 font-bold mt-2">
                                        ⚠️ Requiere crear un torneo primero
                                    </p>
                                )}
                                {tieneTorneos && !tieneEquipos && (
                                    <p className="text-sm text-red-500 font-bold mt-2">
                                        ⚠️ Requiere crear un equipo primero
                                    </p>
                                )}
                                <div className="absolute inset-x-0 bottom-0 h-1 bg-primary transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300" />
                            </div>

                            <div
                                className={`group relative overflow-hidden bg-card border border-border transition-all duration-300 p-8 ${tieneTorneos && tieneEquipos ? 'hover:border-primary cursor-pointer' : 'opacity-50 cursor-not-allowed'
                                    }`}
                                onClick={() => handleCambiarVista("evento")}
                            >
                                <Badge className={`font-bold mb-4 ${tieneTorneos && tieneEquipos ? 'bg-muted text-muted-foreground' : 'bg-gray-300 text-gray-500'}`}>
                                    {tieneTorneos && tieneEquipos ? 'MÓDULO' : 'BLOQUEADO'}
                                </Badge>
                                <h3 className="text-2xl font-bold mb-2 uppercase">Registro de Eventos</h3>
                                <p className="text-muted-foreground font-medium">
                                    Avisa sobre los eventos deportivos a la comunidad.
                                </p>
                                {!tieneTorneos && (
                                    <p className="text-sm text-red-500 font-bold mt-2">
                                        ⚠️ Requiere crear un torneo primero
                                    </p>
                                )}
                                {tieneTorneos && !tieneEquipos && (
                                    <p className="text-sm text-red-500 font-bold mt-2">
                                        ⚠️ Requiere crear un equipo primero
                                    </p>
                                )}
                                <div className="absolute inset-x-0 bottom-0 h-1 bg-primary transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300" />
                            </div>
                        </div>
                    )}

                    {(view === "equipo" || view === "jugador" || view === "torneo" || view === "evento") && (
                        <div className="bg-card border border-border p-6 md:p-10 relative overflow-hidden">
                            <Button
                                variant="ghost"
                                className="mb-6 font-bold p-0 hover:bg-transparent hover:text-primary"
                                onClick={() => setView("overview")}
                            >
                                ← VOLVER AL RESUMEN
                            </Button>

                            {view === "torneo" && (
                                <TorneoForm
                                    formTorneoData={formTorneoData}
                                    setFormTorneoData={setFormTorneoData}
                                    onSubmit={handleSubmitTorneo}
                                    loading={loading}
                                />
                            )}
                            {view === "equipo" && (
                                <EquipoForm
                                    formEquipoData={formEquipoData}
                                    setFormEquipoData={setFormEquipoData}
                                    onSubmit={handleSubmitEquipo}
                                    loading={loading}
                                    torneos={torneos}
                                />
                            )}
                            {view === "jugador" && (
                                <JugadorForm
                                    formJugadorData={formJugadorData}
                                    setFormJugadorData={setFormJugadorData}
                                    onSubmit={handleSubmitJugador}
                                    loading={loading}
                                    equipos={equipos}
                                />
                            )}
                            {view === "evento" && (
                                <EventoForm
                                    formEventoData={formEventoData}
                                    setFormEventoData={setFormEventoData}
                                    onSubmit={handleSubmitEvento}
                                    loading={loading}
                                    equipos={equipos}
                                />
                            )}
                            <div className="absolute inset-x-0 top-0 h-1 bg-primary" />
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}

function TorneoForm({
    formTorneoData,
    setFormTorneoData,
    onSubmit,
    loading
}: {
    formTorneoData: {
        torneoNombre: string;
        torneoRepresentante: string;
        torneoFecha: string;
        torneoUbicacion: string;
        torneoLogo: File | null;
    };
    setFormTorneoData: React.Dispatch<React.SetStateAction<{
        torneoNombre: string;
        torneoRepresentante: string;
        torneoFecha: string;
        torneoUbicacion: string;
        torneoLogo: File | null;
    }>>;
    onSubmit: (e: React.FormEvent) => void;
    loading: boolean;
}) {
    return (
        <form onSubmit={onSubmit} className="space-y-6">
            <h3 className="text-3xl font-bold uppercase">Nueva Planilla de Torneo</h3>
            <div className="grid gap-6 md:grid-cols-2">
                <div className="space-y-2">
                    <label className="text-sm font-bold uppercase tracking-wider">Nombre del Torneo</label>
                    <Input
                        value={formTorneoData.torneoNombre}
                        onChange={(e) => setFormTorneoData({ ...formTorneoData, torneoNombre: e.target.value })}
                        className="flex h-12 w-full border-2 border-border bg-background px-3 py-2 text-sm font-bold focus:border-primary outline-none transition-colors"
                        placeholder="EJ: COPA ÉLITE 2024"
                        required
                        disabled={loading}
                    />
                </div>
                <div className="space-y-2">
                    <label className="text-sm font-bold uppercase tracking-wider">Representante</label>
                    <Input
                        value={formTorneoData.torneoRepresentante}
                        onChange={(e) => setFormTorneoData({ ...formTorneoData, torneoRepresentante: e.target.value })}
                        className="flex h-12 w-full border-2 border-border bg-background px-3 py-2 text-sm font-bold focus:border-primary outline-none transition-colors"
                        placeholder="NOMBRE COMPLETO"
                        required
                        disabled={loading}
                    />
                </div>
                <div className="space-y-2">
                    <label className="text-sm font-bold uppercase tracking-wider">Fecha</label>
                    <Input
                        value={formTorneoData.torneoFecha}
                        onChange={(e) => setFormTorneoData({ ...formTorneoData, torneoFecha: e.target.value })}
                        type="date"
                        className="flex h-12 w-full border-2 border-border bg-background px-3 py-2 text-sm font-bold focus:border-primary outline-none transition-colors"
                        required
                        disabled={loading}
                    />
                </div>
                <div className="space-y-2">
                    <label className="text-sm font-bold uppercase tracking-wider">Ubicación</label>
                    <Input
                        value={formTorneoData.torneoUbicacion}
                        onChange={(e) => setFormTorneoData({ ...formTorneoData, torneoUbicacion: e.target.value })}
                        type="text"
                        placeholder="Ciudad Deportiva..."
                        className="flex h-12 w-full border-2 border-border bg-background px-3 py-2 text-sm font-bold focus:border-primary outline-none transition-colors"
                        required
                        disabled={loading}
                    />
                </div>
                <div className="space-y-2">
                    <label className="text-sm font-bold uppercase tracking-wider">Logo (Opcional)</label>
                    <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => setFormTorneoData({
                            ...formTorneoData,
                            torneoLogo: e.target.files ? e.target.files[0] : null
                        })}
                        className="flex h-12 w-full border-2 border-border bg-background px-3 py-2 text-sm font-bold focus:border-primary outline-none transition-colors"
                        disabled={loading}
                    />
                    <p className="text-xs text-muted-foreground">* La subida de imágenes estará disponible próximamente</p>
                </div>
            </div>
            <Button
                type="submit"
                className="w-full md:w-auto px-10 h-12 font-bold text-lg bg-primary hover:bg-primary/90"
                disabled={loading}
            >
                {loading ? "CREANDO..." : "CREAR TORNEO"}
            </Button>
        </form>
    )
}

function EquipoForm({
    formEquipoData,
    setFormEquipoData,
    onSubmit,
    loading,
    torneos
}: {
    formEquipoData: {
        equipoNombre: string;
        equipoRepresentante: string;
        equipoLogo: File | null;
        equipoTorneo: string;
    };
    setFormEquipoData: React.Dispatch<React.SetStateAction<{
        equipoNombre: string;
        equipoRepresentante: string;
        equipoLogo: File | null;
        equipoTorneo: string;
    }>>;
    onSubmit: (e: React.FormEvent) => void;
    loading: boolean;
    torneos: any[];
}) {
    return (
        <form onSubmit={onSubmit} className="space-y-6">
            <h3 className="text-3xl font-bold uppercase">Nueva Planilla de Equipo</h3>
            <div className="grid gap-6 md:grid-cols-2">
                <div className="space-y-2">
                    <label className="text-sm font-bold uppercase tracking-wider">Nombre del Equipo</label>
                    <Input
                        value={formEquipoData.equipoNombre}
                        onChange={(e) => setFormEquipoData({ ...formEquipoData, equipoNombre: e.target.value })}
                        className="flex h-12 w-full border-2 border-border bg-background px-3 py-2 text-sm font-bold focus:border-primary outline-none transition-colors"
                        placeholder="EJ: TIGRES FC"
                        required
                        disabled={loading}
                    />
                </div>
                <div className="space-y-2">
                    <label className="text-sm font-bold uppercase tracking-wider">Representante</label>
                    <Input
                        value={formEquipoData.equipoRepresentante}
                        onChange={(e) => setFormEquipoData({ ...formEquipoData, equipoRepresentante: e.target.value })}
                        className="flex h-12 w-full border-2 border-border bg-background px-3 py-2 text-sm font-bold focus:border-primary outline-none transition-colors"
                        placeholder="NOMBRE COMPLETO"
                        required
                        disabled={loading}
                    />
                </div>
                <div className="space-y-2">
                    <label className="text-sm font-bold uppercase tracking-wider">Logo (Opcional)</label>
                    <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => setFormEquipoData({
                            ...formEquipoData,
                            equipoLogo: e.target.files ? e.target.files[0] : null
                        })}
                        className="flex h-12 w-full border-2 border-border bg-background px-3 py-2 text-sm font-bold focus:border-primary outline-none transition-colors"
                        disabled={loading}
                    />
                    <p className="text-xs text-muted-foreground">* La subida de imágenes estará disponible próximamente</p>
                </div>
                <div className="space-y-2">
                    <label className="text-sm font-bold uppercase tracking-wider">Seleccionar Torneo</label>
                    <select
                        value={formEquipoData.equipoTorneo}
                        onChange={(e) => setFormEquipoData({ ...formEquipoData, equipoTorneo: e.target.value })}
                        className="flex h-12 w-full border-2 border-border bg-background px-3 py-2 text-sm font-bold focus:border-primary outline-none transition-colors"
                        required
                        disabled={loading}
                    >
                        <option value="">SELECCIONAR TORNEO</option>
                        {torneos.map((torneo) => (
                            <option key={torneo.id} value={torneo.id}>
                                {torneo.nombre}
                            </option>
                        ))}
                    </select>
                    {torneos.length === 0 && (
                        <p className="text-xs text-red-500 font-bold">No tienes torneos creados</p>
                    )}
                </div>
            </div>
            <Button
                type="submit"
                className="w-full md:w-auto px-10 h-12 font-bold text-lg bg-primary hover:bg-primary/90"
                disabled={loading}
            >
                {loading ? "GUARDANDO..." : "GUARDAR EQUIPO"}
            </Button>
        </form>
    )
}

function JugadorForm({
    formJugadorData,
    setFormJugadorData,
    onSubmit,
    loading,
    equipos
}: {
    formJugadorData: {
        jugadorNombre: string;
        jugadorDNI: string;
        jugadorEdad: string;
        jugadorAltura: string;
        jugadorPeso: string;
        jugadorNacionalidad: string;
        jugadorEquipo: string;
        jugadorPosicion: string;
        jugadorFoto: File | null;
    };
    setFormJugadorData: React.Dispatch<React.SetStateAction<{
        jugadorNombre: string;
        jugadorDNI: string;
        jugadorEdad: string;
        jugadorAltura: string;
        jugadorPeso: string;
        jugadorNacionalidad: string;
        jugadorEquipo: string;
        jugadorPosicion: string;
        jugadorFoto: File | null;
    }>>;
    onSubmit: (e: React.FormEvent) => void;
    loading: boolean;
    equipos: any[];
}) {
    return (
        <form onSubmit={onSubmit} className="space-y-6">
            <h3 className="text-3xl font-bold uppercase">Registro de Jugador</h3>
            <div className="grid gap-6 md:grid-cols-3">
                <div className="space-y-2">
                    <label className="text-sm font-bold uppercase tracking-wider">Nombre Completo</label>
                    <Input
                        value={formJugadorData.jugadorNombre}
                        onChange={(e) => setFormJugadorData({ ...formJugadorData, jugadorNombre: e.target.value })}
                        className="flex h-12 w-full border-2 border-border bg-background px-3 py-2 text-sm font-bold focus:border-primary outline-none transition-colors"
                        placeholder="JUAN PÉREZ"
                        required
                        disabled={loading}
                    />
                </div>
                <div className="space-y-2">
                    <label className="text-sm font-bold uppercase tracking-wider">DNI / ID</label>
                    <Input
                        value={formJugadorData.jugadorDNI}
                        onChange={(e) => setFormJugadorData({ ...formJugadorData, jugadorDNI: e.target.value })}
                        className="flex h-12 w-full border-2 border-border bg-background px-3 py-2 text-sm font-bold focus:border-primary outline-none transition-colors"
                        placeholder="00000000"
                        required
                        disabled={loading}
                    />
                </div>
                <div className="space-y-2">
                    <label className="text-sm font-bold uppercase tracking-wider">EDAD</label>
                    <Input
                        value={formJugadorData.jugadorEdad}
                        onChange={(e) => setFormJugadorData({ ...formJugadorData, jugadorEdad: e.target.value })}
                        className="flex h-12 w-full border-2 border-border bg-background px-3 py-2 text-sm font-bold focus:border-primary outline-none transition-colors"
                        placeholder="20"
                        type="number"
                        required
                        disabled={loading}
                    />
                </div>
                <div className="space-y-2">
                    <label className="text-sm font-bold uppercase tracking-wider">ALTURA (m)</label>
                    <Input
                        className="flex h-12 w-full border-2 border-border bg-background px-3 py-2 text-sm font-bold focus:border-primary outline-none transition-colors"
                        placeholder="1.80"
                        value={formJugadorData.jugadorAltura}
                        onChange={(e) => setFormJugadorData({ ...formJugadorData, jugadorAltura: e.target.value })}
                        type="number"
                        step="0.01"
                        required
                        disabled={loading}
                    />
                </div>
                <div className="space-y-2">
                    <label className="text-sm font-bold uppercase tracking-wider">PESO (kg)</label>
                    <Input
                        className="flex h-12 w-full border-2 border-border bg-background px-3 py-2 text-sm font-bold focus:border-primary outline-none transition-colors"
                        placeholder="75"
                        value={formJugadorData.jugadorPeso}
                        onChange={(e) => setFormJugadorData({ ...formJugadorData, jugadorPeso: e.target.value })}
                        type="number"
                        step="0.1"
                        required
                        disabled={loading}
                    />
                </div>
                <div className="space-y-2">
                    <label className="text-sm font-bold uppercase tracking-wider">NACIONALIDAD</label>
                    <Input
                        className="flex h-12 w-full border-2 border-border bg-background px-3 py-2 text-sm font-bold focus:border-primary outline-none transition-colors"
                        placeholder="Colombia"
                        value={formJugadorData.jugadorNacionalidad}
                        onChange={(e) => setFormJugadorData({ ...formJugadorData, jugadorNacionalidad: e.target.value })}
                        required
                        disabled={loading}
                    />
                </div>
                <div className="space-y-2">
                    <label className="text-sm font-bold uppercase tracking-wider">Equipo Asignado</label>
                    <select
                        className="flex h-12 w-full border-2 border-border bg-background px-3 py-2 text-sm font-bold focus:border-primary outline-none transition-colors"
                        value={formJugadorData.jugadorEquipo}
                        onChange={(e) => setFormJugadorData({ ...formJugadorData, jugadorEquipo: e.target.value })}
                        required
                        disabled={loading}
                    >
                        <option value="">SELECCIONAR EQUIPO</option>
                        {equipos.map((equipo) => (
                            <option key={equipo.id} value={equipo.id}>
                                {equipo.nombre}
                            </option>
                        ))}
                    </select>
                    {equipos.length === 0 && (
                        <p className="text-xs text-red-500 font-bold">No tienes equipos creados</p>
                    )}
                </div>
                <div className="space-y-2">
                    <label className="text-sm font-bold uppercase tracking-wider">POSICIÓN</label>
                    <select
                        className="flex h-12 w-full border-2 border-border bg-background px-3 py-2 text-sm font-bold focus:border-primary outline-none transition-colors"
                        value={formJugadorData.jugadorPosicion}
                        onChange={(e) => setFormJugadorData({ ...formJugadorData, jugadorPosicion: e.target.value })}
                        required
                        disabled={loading}
                    >
                        <option value="">SELECCIONAR POSICIÓN</option>
                        <option value="portero">PORTERO</option>
                        <option value="defensa_central">DEFENSA CENTRAL</option>
                        <option value="lateral_derecho">LATERAL DERECHO</option>
                        <option value="lateral_izquierdo">LATERAL IZQUIERDO</option>
                        <option value="carrilero">CARRILERO</option>
                        <option value="pivote">PIVOTE (MCD)</option>
                        <option value="mediocentro">MEDIOCENTRO (MC)</option>
                        <option value="mediapunta">MEDIAPUNTA (CAM)</option>
                        <option value="interior">INTERIOR</option>
                        <option value="extremo_derecho">EXTREMO DERECHO</option>
                        <option value="extremo_izquierdo">EXTREMO IZQUIERDO</option>
                        <option value="delantero_centro">DELANTERO CENTRO</option>
                        <option value="segundo_delantero">SEGUNDO DELANTERO</option>
                    </select>
                </div>
                <div className="space-y-2">
                    <label className="text-sm font-bold uppercase tracking-wider">Foto (Opcional)</label>
                    <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => setFormJugadorData({
                            ...formJugadorData,
                            jugadorFoto: e.target.files ? e.target.files[0] : null
                        })}
                        className="flex h-12 w-full border-2 border-border bg-background px-3 py-2 text-sm font-bold focus:border-primary outline-none transition-colors"
                        disabled={loading}
                    />
                    <p className="text-xs text-muted-foreground">* La subida de imágenes estará disponible próximamente</p>
                </div>
            </div>
            <Button
                type="submit"
                className="w-full md:w-auto px-10 h-12 font-bold text-lg bg-primary hover:bg-primary/90"
                disabled={loading}
            >
                {loading ? "INSCRIBIENDO..." : "INSCRIBIR JUGADOR"}
            </Button>
        </form>
    )
}

function EventoForm({
    formEventoData,
    setFormEventoData,
    onSubmit,
    loading,
    equipos
}: {
    formEventoData: {
        eventoNombre: string;
        eventoUbicacion: string;
        eventoEquipoLocal: string;
        eventoEquipoVisitante: string;
        eventoFecha: string;
        eventoHora: string;
    };
    setFormEventoData: React.Dispatch<React.SetStateAction<{
        eventoNombre: string;
        eventoUbicacion: string;
        eventoEquipoLocal: string;
        eventoEquipoVisitante: string;
        eventoFecha: string;
        eventoHora: string;
    }>>;
    onSubmit: (e: React.FormEvent) => void;
    loading: boolean;
    equipos: any[];
}) {
    return (
        <form onSubmit={onSubmit} className="space-y-6">
            <h3 className="text-3xl font-bold uppercase">Registra el Evento</h3>
            <div className="grid gap-6 md:grid-cols-2">
                <div className="space-y-2">
                    <label className="text-sm font-bold uppercase tracking-wider">Nombre del Evento</label>
                    <Input
                        className="flex h-12 w-full border-2 border-border bg-background px-3 py-2 text-sm font-bold focus:border-primary outline-none transition-colors"
                        placeholder="EJ: FINAL COPA ÉLITE 2024"
                        value={formEventoData.eventoNombre}
                        onChange={(e) => setFormEventoData({ ...formEventoData, eventoNombre: e.target.value })}
                        required
                        disabled={loading}
                    />
                </div>
                <div className="space-y-2">
                    <label className="text-sm font-bold uppercase tracking-wider">Ubicación</label>
                    <Input
                        type="text"
                        placeholder="Estadio Nacional..."
                        value={formEventoData.eventoUbicacion}
                        onChange={(e) => setFormEventoData({ ...formEventoData, eventoUbicacion: e.target.value })}
                        className="flex h-12 w-full border-2 border-border bg-background px-3 py-2 text-sm font-bold focus:border-primary outline-none transition-colors"
                        required
                        disabled={loading}
                    />
                </div>
                <div className="space-y-2">
                    <label className="text-sm font-bold uppercase tracking-wider">Equipo Local</label>
                    <select
                        className="flex h-12 w-full border-2 border-border bg-background px-3 py-2 text-sm font-bold focus:border-primary outline-none transition-colors"
                        value={formEventoData.eventoEquipoLocal}
                        onChange={(e) => setFormEventoData({ ...formEventoData, eventoEquipoLocal: e.target.value })}
                        required
                        disabled={loading}
                    >
                        <option value="">SELECCIONAR EQUIPO</option>
                        {equipos.map((equipo) => (
                            <option key={equipo.id} value={equipo.id}>
                                {equipo.nombre}
                            </option>
                        ))}
                    </select>
                    {equipos.length === 0 && (
                        <p className="text-xs text-red-500 font-bold">No tienes equipos creados</p>
                    )}
                </div>
                <div className="space-y-2">
                    <label className="text-sm font-bold uppercase tracking-wider">Equipo Visitante</label>
                    <select
                        className="flex h-12 w-full border-2 border-border bg-background px-3 py-2 text-sm font-bold focus:border-primary outline-none transition-colors"
                        value={formEventoData.eventoEquipoVisitante}
                        onChange={(e) => setFormEventoData({ ...formEventoData, eventoEquipoVisitante: e.target.value })}
                        required
                        disabled={loading}
                    >
                        <option value="">SELECCIONAR EQUIPO</option>
                        {equipos
                            .filter(equipo => equipo.id !== formEventoData.eventoEquipoLocal)
                            .map((equipo) => (
                                <option key={equipo.id} value={equipo.id}>
                                    {equipo.nombre}
                                </option>
                            ))}
                    </select>
                    {equipos.length === 0 && (
                        <p className="text-xs text-red-500 font-bold">No tienes equipos creados</p>
                    )}
                    {equipos.length === 1 && (
                        <p className="text-xs text-amber-500 font-bold">Necesitas al menos 2 equipos para crear un evento</p>
                    )}
                </div>
                <div className="space-y-2">
                    <label className="text-sm font-bold uppercase tracking-wider">Fecha</label>
                    <Input
                        type="date"
                        className="flex h-12 w-full border-2 border-border bg-background px-3 py-2 text-sm font-bold focus:border-primary outline-none transition-colors"
                        value={formEventoData.eventoFecha}
                        onChange={(e) => setFormEventoData({ ...formEventoData, eventoFecha: e.target.value })}
                        required
                        disabled={loading}
                    />
                </div>
                <div className="space-y-2">
                    <label className="text-sm font-bold uppercase tracking-wider">Hora</label>
                    <Input
                        type="time"
                        className="flex h-12 w-full border-2 border-border bg-background px-3 py-2 text-sm font-bold focus:border-primary outline-none transition-colors"
                        value={formEventoData.eventoHora}
                        onChange={(e) => setFormEventoData({ ...formEventoData, eventoHora: e.target.value })}
                        required
                        disabled={loading}
                    />
                </div>
            </div>
            <Button
                type="submit"
                className="w-full md:w-auto px-10 h-12 font-bold text-lg bg-primary hover:bg-primary/90"
                disabled={loading || equipos.length < 2}
            >
                {loading ? "CREANDO..." : "CREAR EVENTO"}
            </Button>
            {equipos.length < 2 && (
                <p className="text-sm text-red-500 font-bold">
                    ⚠️ Necesitas al menos 2 equipos para crear un evento
                </p>
            )}
        </form>
    )
}