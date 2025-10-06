# proyecto2025
Estructura de Proyecto Taller de Desarrollo Web - 2025

# 🚗 **THERA: La Plataforma de Carsharing en Argentina**

> *El proyecto de Taller de Desarrollo Web 2025: Conectando usuarios y vehículos.*

---

## Índice del Proyecto

1. [Descripción General](#1-descripción-general)
2. [Autores](#2-autores)
3. [Acceso al Proyecto](#3-acceso-al-proyecto)
4. [Tecnologías Utilizadas](#4-tecnologías-utilizadas)
5. [Estructura y Contenido de la Página](#5-estructura-y-contenido-de-la-página)

---

## 1. Descripción General

**THERA** es una plataforma de **carsharing** (alquiler de vehículos entre particulares) diseñada para el mercado
argentino. El objetivo principal es ofrecer una solución de **movilidad flexible** para quienes necesitan alquilar un
auto por días, a la vez que permite a los propietarios obtener ingresos de su vehículo cuando no lo están utilizando.

### 1.1. Características Clave

* **Búsqueda Avanzada:** Permite filtrar vehículos por ubicación, tipo, precio máximo y características (automático,
  A/C).
* **Gestión de Cuentas:** Funcionalidad de **Registro** e **Inicio de Sesión** con persistencia básica de datos de
  usuario a través de `localStorage`.
* **Código Limpio:** Todas las funciones de JavaScript han sido convertidas a **Funciones Flecha** y documentadas con el
  formato **JsDoc**.

---

## 2. Autores

| Rol                     | Nombre y Apellido            |
|:------------------------|:-----------------------------|
| Desarrollador Principal | **[Tu Nombre y Apellido]**   |
| Colaborador             | **[Nombre del Colaborador]** |

---

## 3. Acceso al Proyecto

Puedes acceder a la versión desplegada del proyecto a través de GitHub Pages en el siguiente enlace:

* **Link de GitHub Pages:** [Proyecto THERA](https://[usuario-github].github.io/Proyecto2025-Nombre-Apellido/)
  *(Recuerda reemplazar el placeholder con la URL de tu proyecto desplegado)*

---

## 4. Tecnologías Utilizadas

Este proyecto fue construido utilizando tecnologías fundamentales del desarrollo web:

* **HTML5:** Estructura semántica de todas las páginas.
* **CSS3:** Estilos completos, uso intensivo de **Flexbox** y **Grid** para el diseño responsivo.
* **JavaScript (ES6):** Manejo de eventos, validación de formularios, lógica de filtros y ordenamiento, y persistencia
  en `localStorage`.

---

## 5. Estructura y Contenido de la Página

El sitio web se compone de **5 vistas principales**:

### 5.1. Vista Principal (`index.html`)

Contiene una **Hero Section** con video de fondo, un formulario de búsqueda compacta y secciones que detallan los
beneficios del servicio.

### 5.2. Vista de Búsqueda (`car-search.html`)

Muestra la lista de vehículos disponibles con sus filtros y opciones de ordenamiento. Incluye un **cálculo en JavaScript
** para la muestra dinámica del rango de precio seleccionado.

### 5.3. Vista de Cuenta (`account.html`)

Implementa el sistema de autenticación de **Login** y **Registro** con almacenamiento de usuarios en el navegador.

### 5.4. Vistas de Soporte

* `about-us.html`: Detalla la **misión y visión** de la empresa.
* `faq.html`: Incluye un listado de **Preguntas Frecuentes** simulando un componente de acordeón interactivo.

## Requisitos del Primer Parcial

### Sobre el Sketch
- [ ] Versión Desktop y Mobile
- [ ] Guardado en formato PNG, JPG ó PDF
- [ ] Dentro de una carpeta llamada "Sketch"
- [ ] En el diseño tener en cuenta los mensajes de error para el usuario

Tener en cuenta:
* ¿Qué opciones debe ofrecer al usuario?
* ¿Qué campos hay para ingresar datos?
* Benchmarking: Investigar sistemas similares
* ¿Qué acciones le permiten al usuario realizar?
* Mensajes de Error

### Sobre el Wireframe/Mockup
- [x] Dibujado con algún programa como: Figma, AdobeXD, Canvas, Draw.io en Drive, Pencil Project, Mockups, NinjaMock, o similares.
- [ ] Diseño de Mensajes de error para el usuario
- [ ] Versión Desktop y Mobile
- [ ] Guardado en formato PNG, JPG ó PDF
- [x] Dentro de una carpeta llamada "Wireframe" ó "Mockup"

### Sobre el Repositorio
- [x] El proyecto debe estar subido al repositorio adecuado "Proyecto2025-ApellidoAlumno1-ApellidoAlumno2"
- [ ] Modificar el Readme.MD y colocar información del proyecto/página (mínimamente: título del proyecto, autores con nombre y apellido, link de gh-pages, contenido de la página,  listado de tecnologías usadas, etc)
- [ ] En el **readme.md** se debe emplear Markdown y aplicar negrita, titulo de orden 1, 2 y 3, link, items, tabla, index a cada sección
- [x] El código debe estar pusheado en el repositorio (emplear gh-pages ó publicar la página desde el main), y no debe haber diferencias entre **main** y **gh-pages** (verificar de realizar el Merge).
- [x] Publicar la Web empleando GitHubPages
- [x] El repositorio no debe contener archivos innecesarios (no debe contener .idea o .vsc ni .DS_Store, en todo caso emplear **.gitignore**)

### Sobre el Proyecto General
- [x] La página principal debe llamarse index
- [x] NO está permitido descargar un TEMPLATE (diseño 100% desde cero)
- [X] La estructura del proyecto debe ser adecuada
      - Crear una carpeta para las imágenes
      - Carpeta para los sketch
      - Carpeta para los mockups/Wireframes
      En una segunda etapa, al emplear **React**:
      - Carpeta de Componentes
      - Carpeta de Pages
      - Carpeta de Styles
- [x] Identar correctamente el código (en Webstorm Ctrl+Alt+L)
- [ ] No debe haber errores presentes (realizar *Code* > *Inspect Code* para verificar que no haya errores)
- [ ] Se debe emplear algún favicon
- [ ] Emplear alguna fuente de google fonts o subir al proyecto alguna fuente externa
- [ ] Debe haber navegación entre todas las páginas
- [ ] No debe haber errores de ortografía en el contenido visual
- [x] "Lorem ipsum" es sólo válido para los prototipos, NO para la página

### Sobre el HTML
- [ ] Todas las etiquetas deben estar en minúscula
- [ ] Poner comillas a todos los atributos
- [x] Title debe contener el título de la página
- [x] En el ```<head></head>``` incluir las etiquetas ```<meta>``` detallando: autor, descripcion y palabras clave
- [x] Emplear al menos 3 etiquetas semánticas diferentes (header, nav, aside, main, section, article, footer)
- [ ] Emplear ```<header></header>```. En el contenido de la cabecera debe haber un título ```<h1></h1>```, puede tener color de fondo, algún logotipo, etc.
- [x] Debe haber por lo menos una etiqueta ```<img>``` en la página.
- [ ] La estructura de la página debe estar definida con ```<div></div>```
- [x] Debe contener al menos 3 elementos de tipo ```<input>``` o ```<select>``` ó ```<button>``` que le permitan al usuario ingresar valores para poder realizar un cálculo de un ejercicio.
- [x] Emplear el atributo [**placeholder**](U2_HTML_avanzado.html#/19) (mínimamente en 1 input)
- [ ] Emplear el atributo **size** para que el tamaño de los inputs sea prolijo
- [ ] Emplear el atributo **maxlength** para que el usurario no pueda ingresar valores "muy grandes"
- [x] No espaciar con excesivos ```<br>```. Utilizar márgenes, paddings, etc.
- [ ] La anidación de etiquetas HTML debe ser correcta.
- [ ] No utilizar etiquetas deprecadas.
- [ ] Todas las etiquetas deben estar correctamente cerradas
- [ ] Los ids de los elementos deben ser unívocos

### Sobre las imágenes
- [x] Debe contener por lo menos una etiqueta ```<img>``` en la página.
- [x] Todas las imágenes deben ser incluidas en el repositorio dentro de una carpeta llamada **imagenes** (salvo que sean demasiado pesadas. En ese caso, se puede emplear un servidor externo).
- [x] No se deben subir videos en el repositorio (excepto que sean MUY livianos).
- [ ] Toda imagen debe tener su atributo alt
- [ ] Las imágenes deben poseer un nombre representativo 

### Sobre el CSS
- [ ] El estilo de los elementos debe establecerse en un archivo CSS (prohibido poner el atributo style a los elementos o emplear estilos incrustados).
- [ ] El CSS debe contar mínimo con un tipo de cada forma (por Tag, por ID y por clase).
- [ ] Se debe emplear pseudoclase
- [ ] No emplear !important
- [ ] El diseño de la página debe ser consistente
- [ ] En la primera etapa debe existir un único archivo CSS (se debe evitar código duplicado. Se debe aplicar re-utilización de código/estilos)

### Sobre Accesibilidad:
- [ ] Toda imagen debe tener su etiqueta alt
- [ ] Todo ```<input>``` o ```<select>``` debe tener su ```<label>```
- [ ] Los labels deben contener el atributo **for** (el for debe contener el id del input al cual se referencia) 
- [ ] Si hay una tabla en la página, debe contener ```<caption></caption>```

### Sobre la funcionalidad JavaScript
Se debe agregar funcionalidad Js a la página HTML+CSS desarrollada
- [ ] Una función que compruebe si los valores ingresados son correctos, y si no lo son, que le indique al usuario por un alert o dialog, y que blanquee el contenido del campo.
- [ ] Una función que calcule/muestre algo en base a los valores ingresados por el usuario en los inputs.
- [ ] El código Js debe estar en un archivo externo
- [ ] Se debe emplear var, let o const según corresponda para mayor eficiencia
- [ ] No deben existir funciones innecesarias que no se llamen en ninguna sección del código
- [ ] Las funciones deben estar escritas cómo **función flecha**
- [ ] No debe haber errores JavaScript presentes (F12 > Consola)
- [ ] El funcionamiento de la página debe ser consistente.

### Sobre la documentación
- [ ] TODAS las funciones javaScript deben estar comentadas adecuadamente. [JsDoc](https://jsdoc.app/about-getting-started.html)
   ```/**
     * Descripción de que hace la función
     * @method Nombre de la función
     * @param {string} ParámetroA - Explicación de que valor almacena ParámetroA
     * @param {number} ParámetroB - Explicación de que valor almacena ParámetroB
     * @return Valor que retorna
     */
   ```

### Testing 

- Es sumamente IMPORTANTE probar el funcionamiento de la página con diferentes valores.
- ¿Qué pasa si presiono calcular sin ingresar nada?
- ¿Y si ingreso solo algunos campos? ¿Y si ingreso todo cero? ¿Y si ingreso letras? ¿Y si ingreso números negativos?
- ¿Si vacío el carrito de compras?¿Si recargo la página?
- Prueba todas las situaciones posibles, no te quedes solo con el **happy path**.

### Sobre las correcciones
* Se corregirá el proyecto con el último commit realizado en Github hasta las 23:59 del día anterior a la fecha de entrega
* Las notas serán de la siguiente manera: (Por ejemplo 55% 4; 59% 5; 67% 6; 75% 7; 82% 8; 89% 9; 97% 10)
* Todas los errores o la falta de cumplimiento de los requisitos serán reportados a través de la plataforma de GitHub, en la pestaña de ISSUES

| Items a Evaluar    | %   |
|--------------------|-----|
| Prototipo en papel | 7%  |
| Prototipo Mockup   | 8%  |
| HTML+CSS+Js        | 85% |

Por cada corrección o defecto en el HTML+CSS+Js se descontará un 5% del 85%.

## Requisitos del Segundo Parcial

### Sobre React
- [ ] Se debe emplear **Vite** para instalar **React**
- [ ] Se debe emplear **Hooks**, useState, useEffect, useContext, useNavigate
- [ ] Se debe emplear **react-router-dom** para el enrutamiento a otras páginas
- [ ] Se debe emplear **outlet** para que un componente principal renderice componentes de rutas hijas.
- [ ] La estructura del proyecto (carpetas) debe ser el correcto: components, pages, styles
- [ ] Los **imports** deben ser usando con **alias**
- [ ] Validaciones en tiempo real con onChange + mensajes de error accesibles.
- [ ] Crear al menos un componente genérico (ej: Button, Card, Input) y reutilizarlo en varias páginas.
- [ ] Guardar algún dato en localStorage (ej: preferencias de tema o un carrito de compras).
- [ ] En caso de tener backend, emplear **fetch**
- [ ] En caso de no contar con un servicio que nos provea la información necesaria, la misma debe ser leída en formato tipo Json local y renderizar listas dinámicas. Ejemplo:
````javascript
const activities = [
  {
    nombre: "taekwondo",
    descripcion: "Arte marcial coreana",
    horarios: [
      { dia: 2, "hora-inicio": "18:30", "hora-fin": "20:00" },
      { dia: 4, "hora-inicio": "18:30", "hora-fin": "20:00" }
    ]
  },
  {
    nombre: "zumba",
    descripcion: "ritmos latinos",
    horarios: [
      { dia: 1, "hora-inicio": "19:30", "hora-fin": "20:30" },
      { dia: 3, "hora-inicio": "19:30", "hora-fin": "20:30" }
    ]
  }
];
````

### Sobre las Correcciones
- [ ] Todas las correcciones y mejoras (sugerencias) solicitadas durante el primer parcial deben estar corregidas.
- [ ] No debe haber errores presentes en el código (realizar *Code* > *Inspect Code* para verificar que no haya errores)
- [ ] Se corregirá el proyecto con el último commit realizado en Github hasta las 23:59 del día anterior a la fecha de entrega
- [ ] Las notas serán de la siguiente manera: (Por ejemplo 55% 4; 59% 5; 67% 6; 75% 7; 82% 8; 89% 9; 97% 10)
- Las sugerencias sobre el HTML, CSS y Js realizadas en el anterior parcial dejen ser corregidas.

| Items a Evaluar                          | %   |
|------------------------------------------|-----|
| Estructura del Proyecto                  | 10% |
| Navegación con react-router-dom          | 15% |
| Uso correcto de Hooks                    | 20% |
| Renderizado dinámico de datos            | 25% |
| Validaciones y mensajes de error         | 10% |
| Consistencia del diseño y uso de estilos | 10% |
| Código limpio y sin errores en consola   | 10% |

## Requisitos del FINAL
- [ ] Todas las correcciones y mejoras solicitadas durante el primer y segundo parcial deben estar corregidas.
- [ ] No debe haber errores presentes en el código (realizar Code > Inspect Code para verificar que no haya errores)
- [ ] No debe haber errores JavaScript presentes (F12 > Consola)
- [ ] Debe cumplir con TODOS los requisitos del 1er y 2do Parcial (si se agrego código nuevo en Js, se debe documentar, si hay nuevos inputs de html deben contener su label, etc)
- [ ] Incluir al menos 5 tests con Jest + React Testing Library (ejemplo: que un botón renderice un texto esperado).
