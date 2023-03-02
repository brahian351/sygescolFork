import { NextResponse } from "next/server";
import { conecctions } from "../../../utils/Conexions";

export async function GET(req: any) {
    // console.log(req)
    const { searchParams } = req?.nextUrl;
    let colegio = searchParams.get("colegio")
    let docente = searchParams.get("docente")
    try {
        const conexion = conecctions[colegio]
        const [loginDcne]: any = await conexion.query(`SELECT CONCAT(dcne_ape1,' ',dcne_ape2,' ',dcne_nom1,' ',dcne_nom2) AS nombre, dcne.i AS Id FROM usuario INNER JOIN dcne ON usu_fk = dcne.i WHERE usu_fk = ${docente}`);
        const [datosGrupo]: any = await conexion.query(`SELECT DISTINCT grupo_nombre FROM cga INNER JOIN v_grupos ON grupo_id = cga.b WHERE cga.g = ${docente}`);
        const [dimensiones]: any = await conexion.query(`SELECT aintrs.i AS idAsig, aintrs.b AS nombreAsigna FROM cga INNER JOIN aintrs ON cga.a = aintrs.i WHERE cga.g = ${docente}`)
        const [datosColegio]: any = await conexion.query(`SELECT b AS nombreInst, a AS urlEscudo, uu AS urlColegio FROM clrp`);
        return NextResponse.json({
            datosUsu: loginDcne,
            Grupo: datosGrupo,
            dimesion: dimensiones,
            colegio: datosColegio[0],
        }, { status: 200 })
    } catch (error) {
        console.log("Este es el error", error)
        return NextResponse.json({ body: "Error al consultar la información" }, { status: 400 })
    }

}