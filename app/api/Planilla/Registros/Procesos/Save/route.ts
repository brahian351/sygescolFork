import { NextResponse } from "next/server";
import { conecctions } from "../../../../../../utils/Conexions";

export async function GET(req:any){
    const {searchParams} = req.nextUrl;
    let colegio = searchParams.get("c")
    let proceso = searchParams.get("p")
    let estudiante = searchParams.get("e")
    try {
        const conexion = conecctions[colegio]
        const [procesoFind]:any =  await conexion.query(`SELECT * FROM newProcesosEvaluacion WHERE id = ${proceso}`)
        const [save]:any = await  conexion.query(`INSERT INTO newProcesoEstudiante(estudiante,proceso,periodo,cga) VALUES('${estudiante}','${proceso}','${procesoFind[0]?.periodo}','${procesoFind[0]?.cga}')`)
        return NextResponse.json({body: "Información Guardada con Exito"},{status:200})
    } catch (error) {
        console.log(error)
        return NextResponse.json({body: "Error al guardar la información"},{status:400})
    }
}