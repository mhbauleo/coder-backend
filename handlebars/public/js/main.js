const socket = io.connect();

// Vista de productos

socket.on("productos", (data) => {
  renderProductos(data);
});

function renderProductos(data) {
  const htmlList = data.map((producto) => {
    return `<tr>
                <td>${producto.title}</td>
                <td>${producto.price}</td>
                <td><img src=${producto.thumbnail} alt=${producto.title}></td>
            </tr>`;
  });

  htmlList.unshift(`<tr>
                        <th>Nombre</th>
                        <th>Precio</th>
                        <th>Foto</th>
                    </tr>`);

  const html = htmlList.join(" ");
  document.getElementById("vistaProductos").innerHTML = html;
}

function agregarProducto(e) {
  const producto = {
    title: document.getElementById("title").value,
    price: document.getElementById("price").value,
    thumbnail: document.getElementById("thumbnail").value,
  };
  socket.emit("productos", producto);
  return false;
}

// Chat

socket.on("mensajes", (data) => {
  renderMensajes(data);
});

function renderMensajes(data) {
  const html = data
    .map((mensaje) => {
      return `<div>
        <span class="email">${mensaje.email}</span> <span class="fecha">[${mensaje.fecha}]</span> : 
        <em class="mensaje">${mensaje.text}</em> </div>`;
    })
    .join(" ");
  document.getElementById("mensajes").innerHTML = html;
}

function agregarMensaje(e) {
  const date = new Date().toLocaleString();

  const mensaje = {
    email: document.getElementById("email").value,
    text: document.getElementById("texto").value,
    fecha: date,
  };

  socket.emit("mensajes", mensaje);
  return false;
}
