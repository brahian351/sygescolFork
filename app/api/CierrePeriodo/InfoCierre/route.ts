import { NextResponse } from "next/server";
import { conecctions } from "../../../../utils/Conexions";

export async function GET(req: any) {
  const { searchParams } = new URL(req.url);
  const IdDocente: any = searchParams.get("IdDocente");
  const colegio: any = searchParams.get("colegio");
  const IdRol: any = searchParams.get("IdRol");

  try {
    if (!IdDocente || !colegio || !IdRol) {
      return NextResponse.json(
        { body: "Parametros incorrectos" },
        {
          status: 200,
        }
      );
    }
    if (IdRol != "3") {
      return NextResponse.json(
        { body: "El usuario no es un docente" },
        {
          status: 200,
        }
      );
    }
    const conexion = conecctions[colegio];

    const [AuditoriaDocente]: any = await conexion.query(
      `SELECT auditoriaPeriodos.id as IdAuditoria,auditoriaPeriodos.tipo_pendiente,auditoriaPeriodos.matri_id,v_grupos.grupo_nombre,v_grupos.jornada_nombre,concat(dcne.dcne_ape1," ",dcne.dcne_ape2) as Apellidos, concat(dcne.dcne_nom1," ",dcne.dcne_nom2) as Nombre,aintrs.b AS asignatura, cga.i AS cga,v_grupos.grupo_id as GrupoId FROM auditoriaPeriodos INNER JOIN v_grupos ON auditoriaPeriodos.grupo_id=v_grupos.grupo_id INNER JOIN dcne ON dcne.i=auditoriaPeriodos.dcne_id inner join cga on cga.i=auditoriaPeriodos.cga_id INNER JOIN aintrs ON aintrs.i = cga.a  WHERE auditoriaPeriodos.dcne_id = ${IdDocente} and auditoriaPeriodos.estado='1' ORDER BY auditoriaPeriodos.tipo_pendiente ASC`
    );

    if (AuditoriaDocente?.length == 0) {
      return NextResponse.json(
        { body: "El docente no tiene pendientes" },
        {
          status: 200,
        }
      );
    }

    let AllData: any = [];
    for (const item of AuditoriaDocente) {
      if (
        (item.tipo_pendiente == "calificaciones" ||
          item.tipo_pendiente == "comportamiento") &&
        item?.matri_id?.length > 0
      ) {
        const IdsMatricula = item.matri_id.substring(
          0,
          item.matri_id.length - 1
        );

        const [AllEstudiantes]: any = await conexion.query(
          `SELECT matricula.matri_id as IdMatricula,alumno.alumno_id as AlumnoId,matricula.matri_codigo as CodigoMatricula, concat(alumno.alumno_nom1," ",alumno.alumno_nom2) as Nombre, concat(alumno.alumno_ape1," ",alumno.alumno_ape2) as Apellido FROM matricula INNER JOIN alumno ON alumno.alumno_id=matricula.alumno_id WHERE matricula.matri_id in (${IdsMatricula})`
        );
        AllData.push({ ...item, estudiantes: AllEstudiantes });
      } else {
        AllData.push({
          ...item,
        });
      }
    }

    // console.log("AllData", AllData);

    const DataNormalizada: any = AllData?.reduce((acc: any, el: any) => {
      const key = `${el.grupo_nombre}`;

      if (!acc[key]) {
        acc[key] = {
          GrupoId: el.GrupoId,
          GrupoNombre: el.grupo_nombre,
          IdAuditoria: el.IdAuditoria,
          pendientes: [],
        };
      }

      acc[key].pendientes.push({ ...el });

      return acc;
    }, {});

    return NextResponse.json(
      { Pendientes: Object.values(DataNormalizada) || [] },
      {
        status: 200,
      }
    );
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { body: "Internal Server Error" },
      {
        status: 500,
      }
    );
  }
}
