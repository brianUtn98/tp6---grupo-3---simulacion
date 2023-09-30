import Simulacion from "./Simulacion";

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
