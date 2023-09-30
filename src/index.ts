const H_V = Infinity;

function msleep(n: number) {
  Atomics.wait(new Int32Array(new SharedArrayBuffer(4)), 0, 0, n);
}
function sleep(n: number) {
  msleep(n * 1000);
}

const Simulacion = (NA: number, NB: number, NC: number, TF: number) => {
  let T = 0;

  let TPLL = 0;

  let TPSA: number[] = new Array(NA).fill(H_V);
  let TPSB: number[] = new Array(NB).fill(H_V);
  let TPSC: number[] = new Array(NC).fill(H_V);
  let NSA = 0;
  let NSB = 0;
  let NSC = 0;
  let NTA = 0;
  let NTB = 0;
  let NTC = 0;
  let STOA: number[] = new Array(NA).fill(-1);
  let ITOA: number[] = new Array(NA).fill(0);
  let STOB: number[] = new Array(NB).fill(-1);
  let ITOB: number[] = new Array(NB).fill(0);
  let STOC: number[] = new Array(NC).fill(-1);
  let ITOC: number[] = new Array(NC).fill(0);
  let STAA = 0;
  let STAB = 0;
  let STAC = 0;
  let STSA = 0;
  let STSB = 0;
  let STSC = 0;
  let STLLA = 0;
  let STLLB = 0;
  let STLLC = 0;
  let NTCB = 0;
  let NTESP = 0;
  let NumAtencionesA = new Array(NA).fill(0);
  let NumAtencionesB = new Array(NB).fill(0);
  let NumAtencionesC = new Array(NC).fill(0);

  const CalcularYMostrarResultados = (): void => {
    const PTOA = STOA.map((v) => (v * 100) / T);
    const PTOB = STOB.map((v) => (v * 100) / T);
    const PTOC = STOC.map((v) => (v * 100) / T);

    console.log("PTOA: ", PTOA);
    console.log("PTOB: ", PTOB);
    console.log("PTOC: ", PTOC);

    const PESA = (STSA - STLLA - STAA) / NTA;
    const PEEV = (STSB - STLLB - STAB) / NTB;
    const PEPR = (STSC - STLLC - STAC) / NTC;
    console.log(`(${STSC} - ${STLLC} - ${STAC}) / ${NTC}`);

    console.log("PESA: ", PESA);
    console.log("PEEV: ", PEEV);
    console.log("PEPR: ", PEPR);

    const PPSA = (STSA - STLLA) / NTA;
    const PPSB = (STSB - STLLB) / NTB;
    const PPSC = (STSC - STLLC) / NTC;

    console.log("PPSA: ", PPSA);
    console.log("PPSB: ", PPSB);
    console.log("PPSC: ", PPSC);

    const PCD = (NTCB * 100) / (NTC + NTCB);
    console.log("PCD: ", PCD);

    const PEO = (NTESP * 100) / (NTA + NTB + NTC);

    console.log("PEO: ", PEO);
  };

  const IntervaloOperaciones = (): number => {
    let R = Math.random();

    let result = Math.log(-R + 1) / -0.0005;

    while (result < 0 || result > 2200) {
      result = IntervaloOperaciones();
    }

    return result;
  };

  const TiempoSubidaArchivos = (): number => {
    const R = Math.random();

    const mu = 920.19;

    const sigma = 519.15;

    const integral = 0.7978845608;

    let result = (sigma * R) / integral + mu;

    while (result < 5 || result > 2000) {
      result = TiempoSubidaArchivos();
    }

    return result;
  };

  const TiempoExportarVideos = (): number => {
    const R = Math.random();

    const integral = 0.7978845608;

    const sigma = 1.264;

    const mu = 7.1104;

    const gamma = 0;

    let result = Math.exp((sigma * R) / integral + mu) + gamma;

    while (result < 42 || result > 15000) {
      result = TiempoExportarVideos();
    }

    return result;
  };

  const TiempoPublicarRedes = (): number => {
    const R = Math.random();

    const PI = Math.PI;

    const sigma = 403.93;

    const mu = 730.71;

    const tg = Math.tan(PI * (R - 0.5));

    let result = tg * sigma + mu;

    while (result < 5 || result > 1000) {
      result = TiempoPublicarRedes();
    }

    return result;
  };

  const BuscarLibre = (cola: number[]): number => {
    // Podriamos por ejemplo elegir el que tenga mas tiempo ocioso

    return cola.indexOf(H_V);
  };

  const DistribuirProceso = (): string => {
    const R = Math.random();

    console.log("R: ", R);

    if (R <= 0.1449) {
      return "C";
    } else if (R <= 0.2096) {
      return "B";
    } else {
      return "A";
    }
  };

  const EncolarA = (): void => {
    NSA++;
    STLLA += T;

    if (NSA <= NA) {
      let i = BuscarLibre(TPSA);

      STOA[i] += T - ITOA[i];

      const TSA = TiempoSubidaArchivos();

      TPSA[i] = T + TSA;

      STAA += TSA;
    } else {
      NTESP++;
    }

    NTA++;
  };

  const EncolarB = (): void => {
    NSB++;
    STLLB += T;

    if (NSB <= NB) {
      let i = BuscarLibre(TPSB);

      STOB[i] += T - ITOB[i];

      const TEV = TiempoExportarVideos();

      TPSB[i] = T + TEV;

      STAB += TEV;
    } else {
      NTESP++;
    }

    NTB++;
  };

  const EncolarC = (): void => {
    NSC++;

    if (NSC <= NC) {
      let i = BuscarLibre(TPSC);

      STOC[i] += T - ITOC[i];

      const TPR = TiempoPublicarRedes();

      TPSC[i] = T + TPR;

      STAC += TPR;

      NTC++;

      STLLC += T;
    } else if (NSB < NB) {
      console.log("Espera - Llegada");
      // sleep(2);
      NSC--;
      NTCB++;
      EncolarB();
    } else {
      NTC++;

      STLLC += T;

      NTESP++;
    }
  };

  const Llegada = (): void => {
    console.log("Llegada");
    T = TPLL;
    const IO = IntervaloOperaciones();

    TPLL = T + IO;

    console.log("TPLL: ", TPLL);

    const cola = DistribuirProceso();

    console.log("Cola: ", cola);

    if (cola === "A") {
      EncolarA();
    }

    if (cola === "B") {
      EncolarB();
    }

    if (cola === "C") {
      EncolarC();
    }
  };

  const SalidaA = (i: number): void => {
    NumAtencionesA[i]++;

    console.log("Salida A");

    T = TPSA[i];

    NSA--;

    if (NSA >= NA) {
      const TSA = TiempoSubidaArchivos();

      TPSA[i] = T + TSA;

      STAA += TSA;
    } else {
      ITOA[i] = T;
      TPSA[i] = H_V;
    }

    STSA += T;
  };

  const SalidaB = (j: number): void => {
    console.log("Salida B");

    NumAtencionesB[j]++;

    T = TPSB[j];

    NSB--;

    if (NSB >= NB) {
      const TEV = TiempoExportarVideos();

      TPSB[j] = T + TEV;

      STAB += TEV;
    } else if (NSC > NC) {
      console.log("Espera - Salida");
      // sleep(2);

      NSC--;

      NSB++;

      const TEV = TiempoExportarVideos();

      STAB += TEV;

      TPSB[j] = T + TEV;

      NTCB++;
    } else {
      ITOB[j] = T;
      TPSB[j] = H_V;
    }

    STSB += T;
  };

  const SalidaC = (k: number): void => {
    console.log("Salida C");

    NumAtencionesC[k]++;

    T = TPSC[k];

    NSC--;

    if (NSC >= NC) {
      const TPR = TiempoPublicarRedes();

      TPSC[k] = T + TPR;

      STAC += TPR;
    } else {
      ITOC[k] = T;
      TPSC[k] = H_V;
    }

    STSC += T;
  };

  const MenorTPS = (): { cola: string; TPS: number; puesto: number } => {
    let values = [];

    values.push({
      cola: "A",
      TPS: Math.min(...TPSA),
      puesto: TPSA.indexOf(Math.min(...TPSA)),
    });

    values.push({
      cola: "B",
      TPS: Math.min(...TPSB),
      puesto: TPSB.indexOf(Math.min(...TPSB)),
    });

    values.push({
      cola: "C",
      TPS: Math.min(...TPSC),
      puesto: TPSC.indexOf(Math.min(...TPSC)),
    });

    const min = Math.min(...values.map((v) => v.TPS));

    return values.find((v) => v.TPS === min)!;
  };

  const Empezar = (): void => {
    let iteraciones = 0;

    do {
      console.log("T: ", T);

      const { cola, TPS, puesto } = MenorTPS();
      console.log("TPLL: ", TPLL);
      console.log("TPS: ", TPS);

      if (TPLL <= TPS) {
        Llegada();
      } else {
        cola === "A"
          ? SalidaA(puesto)
          : cola === "B"
          ? SalidaB(puesto)
          : SalidaC(puesto);
      }

      iteraciones++;

      if (T >= TF) {
        TPLL = H_V;
      }
    } while (T < TF || NSA > 0 || NSB > 0 || NSC > 0);

    // console.log("Iteraciones: ", iteraciones);
    // console.log("STLLA: ", STLLA);
    // console.log("STLLB: ", STLLB);
    // console.log("STLLC: ", STLLC);
    // console.log("STAA: ", STAA);
    // console.log("STAB: ", STAB);
    // console.log("STAC: ", STAC);
    // console.log("STSA: ", STSA);
    // console.log("STSB: ", STSB);
    // console.log("STSC: ", STSC);
    // console.log("NTA: ", NTA);
    // console.log("NTB: ", NTB);
    // console.log("NTC: ", NTC);
    // console.log("NTCB: ", NTCB);
    // console.log(STOA);
    // console.log(STOB);
    // console.log(STOC);
    // console.log("Atenciones A: ", NumAtencionesA);
    // console.log("Atenciones B: ", NumAtencionesB);
    // console.log("Atenciones C: ", NumAtencionesC);

    CalcularYMostrarResultados();
  };

  return Empezar;
};

Simulacion(1, 1, 1, 31536000)();
