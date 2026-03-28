# Explorador de Países

Aplicación web desarrollada con **Next.js** y **TypeScript** que consume la API pública [REST Countries](https://restcountries.com/) para mostrar información detallada de los países del mundo.

---

## 🚀 Instalación y arranque

### 1. Clona el repositorio
```bash
git clone https://github.com/javimoreno19/Practica-2-paises
cd tu-repositorio
```

### 2. Instala las dependencias
```bash
npm install
```

### 3. Arranca el servidor de desarrollo
```bash
npm run dev
```

### 4. Abre en el navegador
```
http://localhost:3000
```

---

##  Navegación

La navegación se ha implementado usando el **App Router de Next.js 13+**, aprovechando las rutas dinámicas y los hooks de navegación del cliente.

### Página principal `/`

- Renderiza el componente `Home` (`app/page.tsx`).
- Carga todos los países al montar el componente mediante `useEffect` + `getAllCountries()`.
- Incluye un buscador en tiempo real que filtra los países por nombre sin necesidad de recargar la página.
- Cada país se muestra como una tarjeta (`CountryCard`) que al pulsar el botón **"Ver país"** navega a su página de detalle.

### Página de detalle `/country/[name]`

- La ruta es dinámica: el segmento `[name]` corresponde al nombre del país en formato slug (minúsculas, espacios reemplazados por guiones). Por ejemplo: `/country/united-states`.
- Se obtiene el parámetro con `useParams()` y se reconstruye el nombre original reemplazando los guiones por espacios antes de llamar a la API.
- Muestra bandera, nombre oficial, capital, región, subregión, población, superficie, moneda e idiomas.
- Un botón **"Volver"** usa `useRouter().push("/")` para regresar a la página principal.

---

##  Generación y resolución del slug

Para navegar al detalle de un país se genera un slug a partir de su nombre:
```ts
const slug = pais.name.common.toLowerCase().replace(/\s+/g, "-");
router.push(`/country/${encodeURIComponent(slug)}`);
```

Al llegar a la página de detalle, se invierte el proceso:
```ts
const nombreBuscado = String(name).replace(/-/g, " ");
```

Dado que la API puede devolver varios países con nombres similares, se aplica un `.find()` para localizar el que coincide exactamente con el slug original:
```ts
const encontrado =
  data.find(
    (c) => c.name.common.toLowerCase().replace(/\s+/g, "-") === String(name)
  ) ?? data[0];
```

---

##  Datos anidados de la API

La API de REST Countries devuelve objetos con propiedades anidadas que requieren un tratamiento especial:

### Nombre (`name`)
```ts
pais.name.common   // nombre común → "Spain"
pais.name.official // nombre oficial → "Kingdom of Spain"
```

### Banderas (`flags`)
```ts
pais.flags?.svg || pais.flags?.png
```
Se usa el SVG como primera opción y el PNG como fallback.

### Capital (`capital`)
La capital es un array, ya que algunos países tienen varias:
```ts
pais.capital?.join(", ") ?? "-"
```

### Monedas (`currencies`)
Es un objeto cuyas claves son códigos de moneda (ej. `EUR`). Se extraen los valores con `Object.values()`:
```ts
const monedas = pais?.currencies
  ? Object.values(pais.currencies).map((c) => c.name)
  : [];
```

### Idiomas (`languages`)
También es un objeto con códigos como claves (ej. `spa`). Se extraen igual:
```ts
const idiomas = pais?.languages ? Object.values(pais.languages) : [];
```

---
