import { NextResponse } from "next/server";
import { conecctions } from "../../../../utils/Conexions";
// import { conecctions } from "../../../../utils/Conexions";

export async function GET(req: any) {
  const { searchParams } = req.nextUrl;
  const GrupoId = searchParams.get("GrupoId");
  const Cga = searchParams.get("Cga");
  const ColegioId = searchParams.get("ColegioId");

  try {
    const conexion = conecctions[ColegioId];

    const [InfoDb]: any = await conexion.query(
      `SELECT cga.i AS id, aintrs.b AS asignatura, aes.b AS Area, cga.u AS Horas,v_grupos.grupo_id,v_grupos.grupo_nombre,v_grupos.per_con_id,aintrs.i as AsignaturaId FROM cga INNER JOIN aintrs ON aintrs.i = cga.a INNER JOIN efr ON aintrs.g = efr.i INNER JOIN aes ON efr.a = aes.i INNER JOIN v_grupos ON cga.b = v_grupos.grupo_id WHERE cga.i='${Cga}' and v_grupos.grupo_id='${GrupoId}'`
    );

    return NextResponse.json({ InfoDb }, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { body: "Error al enviar la información" },
      { status: 400 }
    );
  }
}
