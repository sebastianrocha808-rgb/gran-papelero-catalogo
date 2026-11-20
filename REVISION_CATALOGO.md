# Catálogo en revisión — noviembre de 2026

**RAMA DE PRUEBA: NO FUSIONAR CON `main` TODAVÍA.**

## Corregido y verificado
- `productos.json` y `index.html`: **672 productos** (629 existentes + 43 nuevos).
- Se eliminaron **172 productos identificados con seguridad**, interpretando las cifras manuscritas como **referencias visibles** (`ref`), NO como `sort_index`. Se quitó toda la página 30.
- **Ref. 488 = RESMA CARTA** (posición interna `sort_index = 487`). Ambas imágenes de `0487` ahora usan la foto azul Report tamaño carta.
- **Ref. 489 = RESMA OFICIO** (posición interna `sort_index = 488`). Ambas imágenes de `0488` restauradas al Reprograf original.
- **Ref. 411, índice 410** (archivador): sin cambios, como pidió el usuario.
- 43 productos nuevos, imágenes `producto_0802.jpg` a `producto_0844.jpg` (y equivalentes `foto_`), con nombres provisionales.
- Los archivos de `imagenes/` subidos por el usuario existen en esta rama.

## ¡ATENCIÓN! Referencias duplicadas por corregir

En el JSON original hay referencias visibles duplicadas **1, 3, 6, 36**. Se quitó el registro cuya posición interna coincide con la referencia (1, 3, 6 y 36), y se **conservaron provisionalmente estos nueve registros ambiguos** para no eliminar artículos erróneos:

| Ref. visible duplicada | `sort_index` | Nombre en el JSON |
|---|---:|---|
| 3 | 139 | 148.CARTUCHERA CIERRES PRIMAVERA |
| 1 | 234 | SACAPUNTA KLIPP 243 SERVICIO HEXAGONAL *12 UNDS |
| 3 | 319 | Nombre por confirmar |
| 6 | 320 | Nombre por confirmar |
| 36 | 334 | COLORES ARTESCO UND 335 |
| 3 | 395 | FOLDER AROS MOTIVOS 396 VARIADOS |
| 1 | 429 | AGENDA MATERIA 430 ARGOLLADA PASTA DURA PEQUEÑA |
| 1 | 584 | PINTO x 1.000 |
| 3 | 703 | LEGO EN 1 DINOSAURIO 707 |

## Pendientes antes de publicar
1. Decidir si los nueve registros con referencias duplicadas deben mantenerse o eliminarse.
2. Revisar los nombres y categorías provisionales de los 43 productos agregados.
3. Revisar visualmente fotos y comportamiento del buscador, carrito y enlaces WhatsApp.

**`main` está sin modificar.**
