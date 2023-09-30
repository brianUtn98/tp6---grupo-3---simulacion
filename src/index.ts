import fs from "fs";

const H_V = Infinity;

function msleep(n: number) {
  Atomics.wait(new Int32Array(new SharedArrayBuffer(4)), 0, 0, n);
}
function sleep(n: number) {
  msleep(n * 1000);
}

const formatNumber = (n: number) => {
  if (isNaN(n)) return 0;
  return n.toFixed(2);
};

const formatTimeWitDays = (seconds: number): string => {
  const days = Math.floor(seconds / 86400);
  const hs = Math.floor((seconds % 86400) / 3600);
  const mns = Math.floor((seconds % 3600) / 60);
  const sns = Math.floor((seconds % 3600) % 60);

  const hours = hs >= 10 ? hs : `0${hs}`;
  const minutes = mns >= 10 ? mns : `0${mns}`;
  const seconds_ = sns >= 10 ? sns : `0${sns}`;

  return `Day ${days} - ${hours}:${minutes}:${seconds_}`;
};

const formatTime = (seconds: number): string => {
  const hs = Math.floor(seconds / 3600);
  const mns = Math.floor((seconds % 3600) / 60);
  const sns = Math.floor((seconds % 3600) % 60);

  const hours = hs >= 10 ? hs : `0${hs}`;
  const minutes = mns >= 10 ? mns : `0${mns}`;
  const seconds_ = sns >= 10 ? sns : `0${sns}`;

  return `${hours}:${minutes}:${seconds_}`;
};

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
  let STA = 0;
  let STS = 0;
  let STLL = 0;
  let NTCB = 0;
  let NTESP = 0;
  let NumAtencionesA = new Array(NA).fill(0);
  let NumAtencionesB = new Array(NB).fill(0);
  let NumAtencionesC = new Array(NC).fill(0);

  const CalcularYMostrarResultados = (): void => {
    console.log("----------------------------------------");
    console.log("Resultados");

    const PTOA = STOA.map((v) => (v * 100) / T);
    const PTOB = STOB.map((v) => (v * 100) / T);
    const PTOC = STOC.map((v) => (v * 100) / T);

    console.log(
      "Porcentaje de tiempo ocioso puestos A: ",
      PTOA.map((v) => formatNumber(v) + "%")
    );
    console.log(
      "Porcentaje de tiempo ocioso puestos B: ",
      PTOB.map((v) => formatNumber(v) + "%")
    );
    console.log(
      "Porcentaje de tiempo ocioso puestos C: ",
      PTOC.map((v) => formatNumber(v) + "%")
    );

    const PES = (STS - STLL - STA) / (NTA + NTB + NTC);

    console.log("Promedio de espera en el Sistema: ", formatTime(PES));

    const PPS = (STS - STLL) / (NTA + NTB + NTC);

    console.log("Promedio de permanencia en el Sistema: ", formatTime(PPS));

    const PCB = (NTCB * 100) / (NTC + NTCB);
    console.log(
      "Porcentaje de Operaciones C derivadas a B: ",
      formatNumber(PCB) + "%"
    );

    const PEO = (NTESP * 100) / (NTA + NTB + NTC);

    console.log(
      "Porcentaje de Operaciones que devieron esperar: ",
      formatNumber(PEO) + "%"
    );

    console.log("Servidores A: ", NA);
    console.log("Servidores B: ", NB);
    console.log("Servidores C: ", NC);

    const CostoXHoraA = 0.4536;

    const CostoXHoraB = 0.752;

    const CostoXHoraC = 0.172;

    const CostoDiarioA = CostoXHoraA * 24 * NA;

    const CostoDiarioB = CostoXHoraB * 24 * NB;

    const CostoDiarioC = CostoXHoraC * 24 * NC;

    console.log("Costo Diario A: ", formatNumber(CostoDiarioA) + "USD");

    console.log("Costo Diario B: ", formatNumber(CostoDiarioB) + "USD");

    console.log("Costo Diario C: ", formatNumber(CostoDiarioC) + "USD");

    const CostoEficienteA =
      CostoDiarioA *
      (1 - PTOA.map((v) => v / 100).reduce((a, b) => a + b) / NA);

    const CostoPerdidoA = CostoDiarioA - CostoEficienteA;

    const CostoEficienteB =
      CostoDiarioB *
      (1 - PTOB.map((v) => v / 100).reduce((a, b) => a + b) / NB);

    const CostoPerdidoB = CostoDiarioB - CostoEficienteB;

    const CostoEficienteC =
      CostoDiarioC *
        (1 - PTOC?.map((v) => v / 100)?.reduce((a, b) => a + b, 0) / NC) ?? 0;

    const CostoPerdidoC = CostoDiarioC - CostoEficienteC ?? 0;

    console.log("Costo Eficiente A: ", formatNumber(CostoEficienteA) + "USD");

    console.log("Costo Perdido A: ", formatNumber(CostoPerdidoA) + "USD");

    console.log("Costo Eficiente B: ", formatNumber(CostoEficienteB) + "USD");

    console.log("Costo Perdido B: ", formatNumber(CostoPerdidoB) + "USD");

    console.log("Costo Eficiente C: ", formatNumber(CostoEficienteC) + "USD");

    console.log("Costo Perdido C: ", formatNumber(CostoPerdidoC) + "USD");

    const CostoTotalDiario = CostoDiarioA + CostoDiarioB + CostoDiarioC;

    console.log("Costo Total Diario: ", formatNumber(CostoTotalDiario) + "USD");

    console.log("Tiempo total de simulacion: ", formatTimeWitDays(T));

    console.log("----------------------------------------");
    const reportFile = `./report-NA${NA}-NB${NB}-NC${NC}-${Date.now()}.txt`;

    fs.writeFileSync(
      reportFile,
      `Reporte de simulacion ${new Date().toISOString()}\n`
    );

    fs.appendFileSync(reportFile, "Porcentaje de tiempo ocioso puestos A: \n");
    PTOA.forEach((v, i) => {
      fs.appendFileSync(reportFile, `Puesto ${i + 1}: ${v.toFixed(2)}%\n`);
    });
    fs.appendFileSync(reportFile, "----------------------------------------\n");
    fs.appendFileSync(reportFile, "Porcentaje de tiempo ocioso puestos B: \n");
    PTOB.forEach((v, i) => {
      fs.appendFileSync(reportFile, `Puesto ${i + 1}: ${v.toFixed(2)}%\n`);
    });
    fs.appendFileSync(reportFile, "----------------------------------------\n");
    fs.appendFileSync(reportFile, "Porcentaje de tiempo ocioso puestos C: \n");
    PTOC.forEach((v, i) => {
      fs.appendFileSync(reportFile, `Puesto ${i + 1}: ${v.toFixed(2)}%\n`);
    });
    fs.appendFileSync(reportFile, "----------------------------------------\n");
    fs.appendFileSync(
      reportFile,
      `Promedio de espera en el Sistema: ${formatTime(PES)}\n`
    );
    fs.appendFileSync(
      reportFile,
      `Promedio de permanencia en el Sistema: ${formatTime(PPS)}\n`
    );
    fs.appendFileSync(
      reportFile,
      `Porcentaje de Operaciones C derivadas a B: ${PCB.toFixed(2)}%\n`
    );
    fs.appendFileSync(
      reportFile,
      `Porcentaje de Operaciones que devieron esperar: ${PEO.toFixed(2)}%\n`
    );
    fs.appendFileSync(reportFile, "----------------------------------------\n");
    fs.appendFileSync(reportFile, `Servidores A: ${NA}\n`);
    fs.appendFileSync(reportFile, `Servidores B: ${NB}\n`);
    fs.appendFileSync(reportFile, `Servidores C: ${NC}\n`);
    fs.appendFileSync(reportFile, "----------------------------------------\n");
    fs.appendFileSync(reportFile, "----------Costos----------\n");
    fs.appendFileSync(
      reportFile,
      `Costo Diario A: ${CostoDiarioA.toFixed(2)}USD\n`
    );
    fs.appendFileSync(
      reportFile,
      `Costo Diario B: ${CostoDiarioB.toFixed(2)}USD\n`
    );
    fs.appendFileSync(
      reportFile,
      `Costo Diario C: ${CostoDiarioC.toFixed(2)}USD\n`
    );
    fs.appendFileSync(
      reportFile,
      `Costo Total Diario: ${CostoTotalDiario.toFixed(2)}USD\n`
    );
    fs.appendFileSync(reportFile, "----------------------------------------\n");
    fs.appendFileSync(
      reportFile,
      `Tiempo total de simulacion: ${formatTimeWitDays(T)}\n`
    );

    console.log("Guardando resultados en ", reportFile);
  };
  formatTime;

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
    STLL += T;

    if (NSA <= NA) {
      let i = BuscarLibre(TPSA);

      STOA[i] += T - ITOA[i];

      const TSA = TiempoSubidaArchivos();

      TPSA[i] = T + TSA;

      STA += TSA;
    } else {
      NTESP++;
    }

    NTA++;
  };

  const EncolarB = (): void => {
    NSB++;
    STLL += T;

    if (NSB <= NB) {
      let i = BuscarLibre(TPSB);

      STOB[i] += T - ITOB[i];

      const TEV = TiempoExportarVideos();

      TPSB[i] = T + TEV;

      STA += TEV;
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

      STA += TPR;

      NTC++;

      STLL += T;
    } else if (NSB < NB) {
      NSC--;
      NTCB++;
      EncolarB();
    } else {
      NTC++;

      STLL += T;

      NTESP++;
    }
  };

  const Llegada = (): void => {
    T = TPLL;
    const IO = IntervaloOperaciones();

    TPLL = T + IO;

    const cola = DistribuirProceso();

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

    T = TPSA[i];

    NSA--;

    if (NSA >= NA) {
      const TSA = TiempoSubidaArchivos();

      TPSA[i] = T + TSA;

      STA += TSA;
    } else {
      ITOA[i] = T;
      TPSA[i] = H_V;
    }

    STS += T;
  };

  const SalidaB = (j: number): void => {
    NumAtencionesB[j]++;

    T = TPSB[j];

    NSB--;

    if (NSB >= NB) {
      const TEV = TiempoExportarVideos();

      TPSB[j] = T + TEV;

      STA += TEV;
    } else if (NSC > NC) {
      NSC--;

      NSB++;

      const TEV = TiempoExportarVideos();

      STA += TEV;

      TPSB[j] = T + TEV;

      NTCB++;
    } else {
      ITOB[j] = T;
      TPSB[j] = H_V;
    }

    EncolarA();

    STS += T;
  };

  const SalidaC = (k: number): void => {
    NumAtencionesC[k]++;

    T = TPSC[k];

    NSC--;

    if (NSC >= NC) {
      const TPR = TiempoPublicarRedes();

      TPSC[k] = T + TPR;

      STA += TPR;
    } else {
      ITOC[k] = T;
      TPSC[k] = H_V;
    }

    STS += T;
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
    if (NA === 0 || NB === 0 || NC === 0)
      throw new Error("No puede haber servicios con 0 instancias");

    if (TF === 0) throw new Error("El tiempo de simulacion no puede ser 0");

    let iteraciones = 0;

    do {
      console.log("T: ", formatTimeWitDays(T));

      const { cola, TPS, puesto } = MenorTPS();

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

    CalcularYMostrarResultados();
  };

  return Empezar;
};

const TF = 31536000;

Simulacion(1, 1, 1, TF)();
Simulacion(1, 1, 1, TF)();
Simulacion(2, 2, 1, TF)();
Simulacion(2, 2, 1, TF)();
Simulacion(2, 3, 1, TF)();
Simulacion(2, 3, 1, TF)();
Simulacion(3, 2, 1, TF)();
Simulacion(3, 2, 1, TF)();
Simulacion(3, 3, 1, TF)();
Simulacion(3, 3, 1, TF)();
