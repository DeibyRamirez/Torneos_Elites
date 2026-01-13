"use client"

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Trophy } from "lucide-react"
import { signInWithPopup } from "firebase/auth";
import { doc, getDoc, serverTimestamp, setDoc } from "firebase/firestore";
import { useRouter } from "next/navigation";
import { Usuario } from "../interface/usuario";
import { useState } from "react";
import { auth, db, googleProvider } from "@/lib/firebase";


export default function LoginPage() {
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);
    const router = useRouter();


    const guardarUsuario = async (uid: string, datos: Usuario) => {
        try {
            const userRef = doc(db, "usuarios", uid);

            await setDoc(userRef, {
                ...datos,
                updatedAt: serverTimestamp(),
                createdAt: serverTimestamp(),
            }, { merge: true });

            console.log(" Usuario almacenado exitosamente")

            return { succes: true };
        } catch (error) {
            console.log(" Error al guardarUsuario", error)
            throw error;
        }
    };

    const handleGoogleLogin = async () => {
        setLoading(true);
        try {
            const usuarioCredencial = await signInWithPopup(auth, googleProvider);
            const user = usuarioCredencial.user;

            if (!user.uid) throw new Error("No se pudo obtener el UID");

            // 1. Verificamos si ya existe
            const docRef = doc(db, "usuarios", user.uid);
            const docSnap = await getDoc(docRef);

            // 2. Preparamos los datos básicos
            const datosAGuardar: Usuario = {
                nombre: user.displayName || "Usuario de Google",
                email: user.email || "",
                rol: "creador",
            };

            // 3. Si NO existe, lo creamos por primera vez
            if (!docSnap.exists()) {
                console.log("Creando nuevo usuario en Firestore...");
                await guardarUsuario(user.uid, datosAGuardar);
            } else {
                console.log("El usuario ya existe, omitiendo creación.");
            }

            // 4. Redirigir SIEMPRE al final del proceso exitoso
            router.push("/");

        } catch (error: any) {
            console.error("Error en Login:", error);
            setError("Error al conectar con Google");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-background px-4">
            {/* Contenedor Principal con tu diseño de borde */}
            <div className="w-full max-w-md bg-card border border-border relative overflow-hidden group">
                {/* Barra decorativa superior (Estilo Torneos Élites) */}
                <div className="absolute inset-x-0 top-0 h-1.5 bg-primary" />

                <div className="p-10 flex flex-col items-center text-center">
                    {/* Logo / Icono */}
                    <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-primary shadow-lg shadow-primary/20">
                        <Trophy className="h-8 w-8 text-white" />
                    </div>

                    <Badge variant="outline" className="mb-4 border-primary text-primary font-bold px-4 py-1">
                        ACCESO ORGANIZADORES
                    </Badge>

                    <h1 className="font-display text-4xl font-bold uppercase tracking-tight mb-2">
                        TORNEOS ÉLITES
                    </h1>
                    <p className="text-muted-foreground font-medium mb-8">
                        Ingresa para gestionar tus equipos, jugadores y resultados.
                    </p>

                    {/* Botón de Google Estilizado */}
                    <Button
                        onClick={handleGoogleLogin}
                        className="w-full h-14 bg-white text-black hover:bg-slate-50 border-2 border-slate-200 flex items-center justify-center gap-4 transition-all duration-300"
                    >
                        <svg className="h-6 w-6" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
                            <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                            <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
                            <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
                        </svg>
                        <span className="font-bold text-lg">CONTINUAR CON GOOGLE</span>
                    </Button>

                    <p className="mt-8 text-xs text-muted-foreground uppercase tracking-widest font-bold">
                        Al ingresar, se te asignará el rol de <span className="text-primary">Creador</span>
                    </p>
                </div>

                {/* Efecto de brillo inferior al hacer hover */}
                <div className="absolute inset-x-0 bottom-0 h-1 bg-primary transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500" />
            </div>

            <p className="mt-8 text-sm text-muted-foreground">
                ¿Problemas para ingresar? <span className="text-primary font-bold cursor-pointer">Soporte Técnico</span>
            </p>
        </div>
    )
}