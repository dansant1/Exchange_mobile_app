Slides = new Mongo.Collection('slides'); // titulo, contenido
Cambios = new Mongo.Collection('cambios'); // Pais, banco
Promociones = new Mongo.Collection('promociones'); // Titulo, descripcion, createdAt
Tarifas = new Mongo.Collection('tarifas'); // PaisId, BancoId, cargo(%)
Paises = new Mongo.Collection('paises'); // Nombre
Bancos = new Mongo.Collection('bancos'); // Nombre

Ordenes = new Mongo.Collection('ordenes'); // remitente => nombre, telefono, direccion && beneficiario => nombre, monto, paisId, bancoId, numerodeorden, problema (opcional)
Tokens = new Mongo.Collection('tokens');

if ( Meteor.isServer ) {
  Ordenes._ensureIndex( { codigo: 1, c1: 1, c2: 1, estatus: 1 } );
}

Rangos = new Mongo.Collection('rangos');
Correcciones = new Mongo.Collection('correciones');
Locales = new Mongo.Collection('locales');
Companias = new Mongo.Collection('companias');
Colores = new Mongo.Collection('colores');
Ultimo = new Mongo.Collection('ultimo');
Asuntos = new Mongo.Collection('asuntos');
Mensajes = new Mongo.Collection('mensajes');
Telefono = new Mongo.Collection('telefono');

// Definimos el storage adapter GridFS
let docStore2 = new FS.Store.GridFS("fotos2", {
  maxTries: 3
});


// Creamos la DB para Documentos
FotosMensajes = new FS.Collection("fotos2", {
  stores: [docStore2]
});

// agregamos los permisos allow/deny
FotosMensajes.allow({
  insert: function () {
    return true;
  },
  update: function () {
    return true;
  },
  remove: function () {
    return true;
  },
  download: function () {
    return true;
  }
});

// Definimos el storage adapter GridFS
let docStore = new FS.Store.GridFS("fotos", {
  maxTries: 3
});


// Creamos la DB para Documentos
Fotos = new FS.Collection("fotos", {
  stores: [docStore]
});

// agregamos los permisos allow/deny
Fotos.allow({
  insert: function () {
    return true;
  },
  update: function () {
    return true;
  },
  remove: function () {
    return true;
  },
  download: function () {
    return true;
  }
});


// Definimos el storage adapter GridFS
let docStore11 = new FS.Store.GridFS("fotosvendedor", {
  maxTries: 3
});


// Creamos la DB para Documentos
FotosVendedor = new FS.Collection("fotosvendedor", {
  stores: [docStore11]
});

// agregamos los permisos allow/deny
FotosVendedor.allow({
  insert: function () {
    return true;
  },
  update: function () {
    return true;
  },
  remove: function () {
    return true;
  },
  download: function () {
    return true;
  }
});


Push.allow({
    send: function(userId, notification) {
      // Allow all users to send to everybody - For test only!
      return true;
    }
});

let docStore12 = new FS.Store.GridFS("landing", {
  maxTries: 3
});


// Creamos la DB para Documentos
Landing = new FS.Collection("landing", {
  stores: [docStore12]
});

// agregamos los permisos allow/deny
Landing.allow({
  insert: function () {
    return true;
  },
  update: function () {
    return true;
  },
  remove: function () {
    return true;
  },
  download: function () {
    return true;
  }
});

let docStore13 = new FS.Store.GridFS("banderas", {
  maxTries: 3
});


// Creamos la DB para Documentos
Banderas = new FS.Collection("banderas", {
  stores: [docStore13]
});

// agregamos los permisos allow/deny
Banderas.allow({
  insert: function () {
    return true;
  },
  update: function () {
    return true;
  },
  remove: function () {
    return true;
  },
  download: function () {
    return true;
  }
});
