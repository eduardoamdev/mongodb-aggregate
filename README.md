# MongoDB Aggregate

## Descripción

Esta práctica tiene como objetivo mostrar la utilización del método aggregate en bases de datos MongoDB.

## ¿Qué es el método aggregate?

La agregación en MongoDB es el proceso de seleccionar datos de una colección y procesarlos para obtener resultados computados. Se usa el método aggregate () para crear una tubería de agregación, que consiste en una o más etapas que operan sobre los documentos. Cada etapa puede filtrar, agrupar, calcular o manipular los documentos de alguna manera.

## Contexto

Como contexto para esta práctica hemos creado una base de datos con dos colecciones. Una de ellas se llama customers y la otra vip-passes. La idea es que cada vip pass tiene que tener un dni de un customer asociado. Si esto no ocurre, significa que la data no está correcta.

El código que vamos a hacer consiste en una función que hará una consulta a la base de datos que nos devolverá los vip pass cuyo customerDni no corresponda con el dni de ningún customer.

## Consulta a la base de datos

La consulta que vamos a efectuar para ello es la siguiente:

```js
const notDniAssigned = await VipPass.aggregate([
  {
    $sort: { expirationDate: -1 },
  },
  {
    $lookup: {
      from: "customers",
      localField: "customerDni",
      foreignField: "dni",
      as: "matchedCustomers",
    },
  },
  {
    $match: {
      matchedCustomers: [],
    },
  },
]);
```

La consulta usa el método aggregate para aplicar una serie de operaciones sobre la colección VipPass y obtener un resultado.

La primera operación es $sort, que ordena los documentos por el campo expirationDate en orden descendente.

La segunda operación es $lookup, que hace una unión con la colección customers usando el campo customerDni como clave local y el campo dni como clave foránea. El resultado de la unión se almacena en el campo matchedCustomers.

La tercera operación es $match, que filtra los documentos que tienen el campo matchedCustomers vacío. Es decir, solo devuelve los documentos de VipPass que no tienen ningún cliente asociado.

Sobre el lookup me gustaría añadir que tiene ciertas similitudes con el join de los lenguajes SQL aunque también algunas diferencias. A continuación, vamos a hacer una breve comparativa entre ambos:

Las similitudes son:

- Ambos permiten combinar datos de dos o más colecciones o tablas usando una clave común.

- Ambos pueden especificar el tipo de unión que se quiere realizar (por ejemplo, inner join o left outer join).

- Ambos pueden aplicar filtros o condiciones sobre los datos unidos.

Las diferencias son:

- El lookup de Mongo solo se puede usar dentro de una operación aggregate, que es como una tubería que realiza consultas, filtros y agrupaciones. El resultado de una operación se usa como entrada para la siguiente.

- El join de los lenguajes SQL se puede usar en cualquier consulta que devuelva un conjunto de filas.

- El lookup de Mongo solo puede unir una colección externa por cada operación. El join de los lenguajes SQL puede unir varias tablas en una sola consulta.

- El lookup de Mongo almacena el resultado de la unión en un campo del documento original. El join de los lenguajes SQL devuelve el resultado como un conjunto de filas con todos los campos combinados.
