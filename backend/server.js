const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();

app.use(cors());
app.use(bodyParser.json());

mongoose.connect('mongodb://localhost/productos', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log('MongoDB Connected...'))
  .catch(err => console.log(err));

const componenteSchema = new mongoose.Schema({
  nombre: String,
  cantidad: Number,
  tamanoLote: String,
  tiempoSuministro: Number,
  inventarioDisponible: Number,
  inventarioSeguridad: Number,
  recepcionesProgramadas: Number,
  componentes: [this],
});

const anidadoComponenteSchema = new mongoose.Schema({
  componentes: [componenteSchema],
});

componenteSchema.add(anidadoComponenteSchema);

const productoSchema = new mongoose.Schema({
  nombre: String,
  tamanoLote: String,
  tiempoSuministro: Number,
  inventarioDisponible: Number,
  inventarioSeguridad: Number,
  recepcionesProgramadas: Number,
  componentes: [componenteSchema]
});

const Producto = mongoose.model('Producto', productoSchema);

app.listen(3000, () => {
  console.log('Server listening on port 3000');
});

app.get('/productos', async (req, res) => {
  const productos = await Producto.find();
  res.send(productos);
});

app.delete('/productos/:id', async (req, res) => {
  const producto = await Producto.findByIdAndDelete(req.params.id);
  res.send(producto);
});

app.post('/productos', async (req, res) => {
  const nuevoProducto = new Producto({
    nombre: req.body.nombre,
    tamanoLote: req.body.tamanoLote,
    tiempoSuministro: req.body.tiempoSuministro,
    inventarioDisponible: req.body.inventarioDisponible,
    inventarioSeguridad: req.body.inventarioSeguridad,
    recepcionesProgramadas: req.body.recepcionesProgramadas
  });
  const productoGuardado = await nuevoProducto.save();
  res.send(productoGuardado);
});

app.put('/productos/:id', async (req, res) => {
  try {
    const producto = await Producto.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!producto) {
      return res.status(404).send();
    }
    res.send(producto);
  } catch (e) {
    res.status(500).send();
  }
});

app.get('/productos/:id', async (req, res) => {
  try {
    const producto = await Producto.findById(req.params.id);
    if (!producto) {
      return res.status(404).send();
    }
    res.send(producto);
  } catch (e) {
    res.status(500).send();
  }
});

// Agregar un componente a un producto existente
app.post('/productos/:id/componentes', async (req, res) => {
  const producto = await Producto.findById(req.params.id);
  if (!producto) {
    return res.status(404).send();
  }

  producto.componentes.push(req.body);
  const productoGuardado = await producto.save();
  res.send(productoGuardado);
});

// Agregar un componente a un componente existente
app.post('/productos/:idProducto/componentes/:idComponente/componentes', async (req, res) => {
  const producto = await Producto.findById(req.params.idProducto);
  if (!producto) {
    return res.status(404).send();
  }

  const componente = producto.componentes.id(req.params.idComponente);
  if (!componente) {
    return res.status(404).send();
  }

  componente.componentes.push(req.body);
  const productoGuardado = await producto.save();
  res.send(productoGuardado);
});

app.delete('/productos/:productoId/componentes/:componenteId', async (req, res) => {
  const { productoId, componenteId } = req.params;
  // Encuentra el producto correspondiente
  let producto = await Producto.findById(productoId);
  if (!producto) {
    return res.status(404).send('Producto no encontrado');
  }
  // Elimina el componente del array de componentes del producto
  producto.componentes = producto.componentes.filter((componente) => componente._id.toString() !== componenteId);
  // Guarda el producto modificado
  producto = await producto.save();
  // Responde con el producto modificado
  res.json(producto);
});

app.put('/productos/:productoId/componentes/:componenteId/:componenteIdNivel2?', async (req, res) => {
  const producto = await Producto.findById(req.params.productoId);
  if (!producto) {
    return res.status(404).send();
  }

  let componente;
  if (req.params.componenteIdNivel2) {
    const componenteNivel1 = producto.componentes.id(req.params.componenteId);
    if (!componenteNivel1) {
      return res.status(404).send();
    }
    componente = componenteNivel1.componentes.id(req.params.componenteIdNivel2);
    if (!componente) {
      return res.status(404).send();
    }
  } else {
    componente = producto.componentes.id(req.params.componenteId);
    if (!componente) {
      return res.status(404).send();
    }
  }
  componente.set(req.body);
  const productoActualizado = await producto.save();
  res.send(productoActualizado);
});

app.get('/productos/:productoId/componentes/:componenteId/:componenteIdNivel2?', async (req, res) => {
  const producto = await Producto.findById(req.params.productoId);
  if (!producto) {
    return res.status(404).send();
  }
  let componente;
  if (req.params.componenteIdNivel2) {
    const componenteNivel1 = producto.componentes.id(req.params.componenteId);
    if (!componenteNivel1) {
      return res.status(404).send();
    }
    componente = componenteNivel1.componentes.id(req.params.componenteIdNivel2);
    if (!componente) {
      return res.status(404).send();
    }
  } else {
    componente = producto.componentes.id(req.params.componenteId);
    if (!componente) {
      return res.status(404).send();
    }
  }
  res.send(componente);
});

app.delete('/productos/:productoId/componentes/:componenteId/componentesNivel2/:componenteNivel2Id', async (req, res) => {
  const { productoId, componenteId, componenteNivel2Id } = req.params;
  // Encuentra el producto correspondiente
  let producto = await Producto.findById(productoId);
  if (!producto) {
    return res.status(404).send('Producto no encontrado');
  }
  // Encuentra el componente de nivel 1
  let componenteNivel1 = producto.componentes.find((componente) => componente._id.toString() === componenteId);
  if (!componenteNivel1) {
    return res.status(404).send('Componente de nivel 1 no encontrado');
  }
  // Elimina el componente de nivel 2 del array de componentes de nivel 2 del componente de nivel 1
  componenteNivel1.componentes = componenteNivel1.componentes.filter((componente) => componente._id.toString() !== componenteNivel2Id);
  // Guarda el producto modificado
  producto = await producto.save();
  // Responde con el producto modificado
  res.json(producto);
});



app.post('/productos/:idProducto/componentes/:idComponente/componentes/:idComponenteNivel2/componentes', async (req, res) => {
  const producto = await Producto.findById(req.params.idProducto);
  if (!producto) {
    return res.status(404).send();
  }
  const componenteNivel1 = producto.componentes.id(req.params.idComponente);
  if (!componenteNivel1) {
    return res.status(404).send();
  }
  const componenteNivel2 = componenteNivel1.componentes.id(req.params.idComponenteNivel2);
  if (!componenteNivel2) {
    return res.status(404).send();
  }
  componenteNivel2.componentes.push(req.body);
  const productoGuardado = await producto.save();
  res.send(productoGuardado);
});


app.delete('/productos/:productoId/componentes/:componenteId/componentesNivel2/:componenteNivel2Id/componentesNivel3/:componenteNivel3Id', async (req, res) => {
  const { productoId, componenteId, componenteNivel2Id, componenteNivel3Id } = req.params;
  // Encuentra el producto correspondiente
  let producto = await Producto.findById(productoId);
  if (!producto) {
    return res.status(404).send('Producto no encontrado');
  }
  // Encuentra el componente de nivel 1
  let componenteNivel1 = producto.componentes.find((componente) => componente._id.toString() === componenteId);
  if (!componenteNivel1) {
    return res.status(404).send('Componente de nivel 1 no encontrado');
  }
  // Encuentra el componente de nivel 2
  let componenteNivel2 = componenteNivel1.componentes.find((componente) => componente._id.toString() === componenteNivel2Id);
  if (!componenteNivel2) {
    return res.status(404).send('Componente de nivel 2 no encontrado');
  }
  // Elimina el componente de nivel 3 del array de componentes de nivel 3 del componente de nivel 2
  componenteNivel2.componentes = componenteNivel2.componentes.filter((componente) => componente._id.toString() !== componenteNivel3Id);
  // Guarda el producto modificado
  producto = await producto.save();
  // Responde con el producto modificado
  res.json(producto);
});

app.put('/productos/:productoId/componentes/:componenteId/:componenteIdNivel2/:componenteIdNivel3', async (req, res) => {
  const producto = await Producto.findById(req.params.productoId);
  if (!producto) {
    return res.status(404).send();
  }

  const componenteNivel1 = producto.componentes.id(req.params.componenteId);
  if (!componenteNivel1) {
    return res.status(404).send();
  }

  const componenteNivel2 = componenteNivel1.componentes.id(req.params.componenteIdNivel2);
  if (!componenteNivel2) {
    return res.status(404).send();
  }

  const componenteNivel3 = componenteNivel2.componentes.id(req.params.componenteIdNivel3);
  if (!componenteNivel3) {
    return res.status(404).send();
  }

  componenteNivel3.set(req.body);
  const productoActualizado = await producto.save();
  res.send(productoActualizado);
});

app.get('/productos/:productoId/componentes/:componenteId/:componenteIdNivel2/:componenteIdNivel3', async (req, res) => {
  const producto = await Producto.findById(req.params.productoId);
  if (!producto) {
    return res.status(404).send();
  }

  const componenteNivel1 = producto.componentes.id(req.params.componenteId);
  if (!componenteNivel1) {
    return res.status(404).send();
  }

  const componenteNivel2 = componenteNivel1.componentes.id(req.params.componenteIdNivel2);
  if (!componenteNivel2) {
    return res.status(404).send();
  }

  const componenteNivel3 = componenteNivel2.componentes.id(req.params.componenteIdNivel3);
  if (!componenteNivel3) {
    return res.status(404).send();
  }

  res.send(componenteNivel3);
});
