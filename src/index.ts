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

    const PTOA = STOA.map((v) => (v * 100) / T).map((v) => (v < 0 ? 100 : v));
    const PTOB = STOB.map((v) => (v * 100) / T).map((v) => (v < 0 ? 100 : v));
    const PTOC = STOC.map((v) => (v * 100) / T).map((v) => (v < 0 ? 100 : v));

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

    console.log("STS - STLL - STA ", STS, STLL, STA);

    console.log("NTA + NTB + NTC ", NTA, NTB, NTC);

    const PES = (STS - STLL - STA) / (NTA + NTB + NTC);

    console.log("Promedio de espera en el Sistema: ", formatTime(PES));

    const PPS = (STS - STLL) / (NTA + NTB + NTC);

    console.log("Promedio de permanencia en el Sistema: ", formatTime(PPS));

    const PCB = (NTCB * 100) / (NTC + NTCB);
    console.log(
      "Porcentaje de Operaciones C derivadas a B: ",
      formatNumber(PCB) + "%"
    );

    console.log("NTC & NTCB ", NTC, NTCB);

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

    let result = Math.log(-R + 1) / -0.0039;

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
    } else if (NSB < NB) {
      NSC--;
      NTCB++;
      EncolarB();
    } else if (NC > 0) {
      NTC++;

      NTESP++;
    } else {
      NSC--;
      NTCB++;
      EncolarB();
    }
  };

  const Llegada = (): void => {
    T = TPLL;

    STLL += T;

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

    // EncolarA();

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
    if (NA === 0 || NB === 0)
      throw new Error("No puede haber servicios con 0 instancias");

    if (TF === 0) throw new Error("El tiempo de simulacion no puede ser 0");

    let iteraciones = 0;

    do {
      // console.log("T: ", formatTimeWitDays(T));

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

// Escenario Actual
Simulacion(4, 3, 5, TF)(); // Muchos tiempos de espera
// Porcentaje de tiempo ocioso puestos A:
// Puesto 1: 2.16%
// Puesto 2: 2.91%
// Puesto 3: 3.70%
// Puesto 4: 4.94%
// ----------------------------------------
// Porcentaje de tiempo ocioso puestos B:
// Puesto 1: 56.29%
// Puesto 2: 76.99%
// Puesto 3: 90.91%
// ----------------------------------------
// Porcentaje de tiempo ocioso puestos C:
// Puesto 1: 74.68%
// Puesto 2: 92.75%
// Puesto 3: 98.70%
// Puesto 4: 99.13%
// Puesto 5: 91.35%
// ----------------------------------------
// 118.33USD
// Promedio de espera en el Sistema: 00:57:16
// Promedio de permanencia en el Sistema: 01:18:21
// Porcentaje de Operaciones C derivadas a B: 0.01%
// Porcentaje de Operaciones que devieron esperar: 72.85%

Simulacion(5, 4, 5, TF)();
// Porcentaje de tiempo ocioso puestos A:
// Puesto 1: 12.59%
// Puesto 2: 16.19%
// Puesto 3: 21.20%
// Puesto 4: 27.95%
// Puesto 5: 36.47%
// ----------------------------------------
// Porcentaje de tiempo ocioso puestos B:
// Puesto 1: 56.40%
// Puesto 2: 77.47%
// Puesto 3: 91.79%
// Puesto 4: 97.65%
// ----------------------------------------
// Porcentaje de tiempo ocioso puestos C:
// Puesto 1: 74.46%
// Puesto 2: 92.80%
// Puesto 3: 98.41%
// Puesto 4: 99.21%
// Puesto 5: 95.69%
// ----------------------------------------
// 147.26USD
// Promedio de espera en el Sistema: 00:03:53
// Promedio de permanencia en el Sistema: 00:24:59
// Porcentaje de Operaciones C derivadas a B: 0.00%
// Porcentaje de Operaciones que devieron esperar: 37.90%

Simulacion(7, 3, 5, TF)();
// Porcentaje de tiempo ocioso puestos A:
// Puesto 1: 19.20%
// Puesto 2: 24.87%
// Puesto 3: 32.81%
// Puesto 4: 42.36%
// Puesto 5: 53.77%
// Puesto 6: 65.49%
// Puesto 7: 76.93%
// ----------------------------------------
// Porcentaje de tiempo ocioso puestos B:
// Puesto 1: 56.25%
// Puesto 2: 77.02%
// Puesto 3: 91.10%
// ----------------------------------------
// Porcentaje de tiempo ocioso puestos C:
// Puesto 1: 74.42%
// Puesto 2: 92.71%
// Puesto 3: 98.78%
// Puesto 4: 98.99%
// Puesto 5: 97.86%
// ----------------------------------------
// 150.99USD
// Promedio de espera en el Sistema: 00:00:23
// Promedio de permanencia en el Sistema: 00:21:27
// Porcentaje de Operaciones C derivadas a B: 0.01%
// Porcentaje de Operaciones que devieron esperar: 8.57%

Simulacion(7, 3, 1, TF)();
// Porcentaje de tiempo ocioso puestos A:
// Puesto 1: 19.07%
// Puesto 2: 24.84%
// Puesto 3: 32.77%
// Puesto 4: 42.30%
// Puesto 5: 53.67%
// Puesto 6: 65.55%
// Puesto 7: 77.18%
// ----------------------------------------
// Porcentaje de tiempo ocioso puestos B:
// Puesto 1: 44.64%
// Puesto 2: 62.44%
// Puesto 3: 78.79%
// ----------------------------------------
// Porcentaje de tiempo ocioso puestos C:
// Puesto 1: 73.96%
// ----------------------------------------
// 134.48USD
// Promedio de espera en el Sistema: 00:00:29
// Promedio de permanencia en el Sistema: 00:22:55
// Porcentaje de Operaciones C derivadas a B: 22.50%
// Porcentaje de Operaciones que devieron esperar: 9.50%

Simulacion(7, 3, 0, TF)();
// Porcentaje de tiempo ocioso puestos A:
// Puesto 1: 19.06%
// Puesto 2: 25.01%
// Puesto 3: 32.82%
// Puesto 4: 42.47%
// Puesto 5: 53.87%
// Puesto 6: 65.83%
// Puesto 7: 76.94%
// ----------------------------------------
// Porcentaje de tiempo ocioso puestos B:
// Puesto 1: 13.41%
// Puesto 2: 18.22%
// Puesto 3: 24.93%
// ----------------------------------------
// Porcentaje de tiempo ocioso puestos C:
// ----------------------------------------
// 130.35USD
// Promedio de espera en el Sistema: 00:07:59
// Promedio de permanencia en el Sistema: 00:34:49
// Porcentaje de Operaciones C derivadas a B: 100.00%
// Porcentaje de Operaciones que devieron esperar: 22.16%

Simulacion(8, 3, 1, TF)();
// Porcentaje de tiempo ocioso puestos A:
// Puesto 1: 20.28%
// Puesto 2: 26.23%
// Puesto 3: 34.56%
// Puesto 4: 45.04%
// Puesto 5: 56.42%
// Puesto 6: 68.22%
// Puesto 7: 79.34%
// Puesto 8: 87.99%
// ----------------------------------------
// Porcentaje de tiempo ocioso puestos B:
// Puesto 1: 44.27%
// Puesto 2: 62.12%
// Puesto 3: 78.38%
// ----------------------------------------
// Porcentaje de tiempo ocioso puestos C:
// Puesto 1: 73.72%
// ----------------------------------------
// 145.36USD
// Promedio de espera en el Sistema: 00:00:18
// Promedio de permanencia en el Sistema: 00:22:44
// Porcentaje de Operaciones C derivadas a B: 22.45%
// Porcentaje de Operaciones que devieron esperar: 5.06%

Simulacion(9, 3, 1, TF)();
// Porcentaje de tiempo ocioso puestos A:
// Puesto 1: 20.34%
// Puesto 2: 26.85%
// Puesto 3: 35.12%
// Puesto 4: 45.27%
// Puesto 5: 57.10%
// Puesto 6: 68.99%
// Puesto 7: 80.08%
// Puesto 8: 88.29%
// Puesto 9: 93.90%
// ----------------------------------------
// Porcentaje de tiempo ocioso puestos B:
// Puesto 1: 45.14%
// Puesto 2: 62.10%
// Puesto 3: 78.75%
// ----------------------------------------
// Porcentaje de tiempo ocioso puestos C:
// Puesto 1: 73.65%
// ----------------------------------------
// 156.25USD
// Promedio de espera en el Sistema: 00:00:12
// Promedio de permanencia en el Sistema: 00:22:35
// Porcentaje de Operaciones C derivadas a B: 22.84%
// Porcentaje de Operaciones que devieron esperar: 2.74%
