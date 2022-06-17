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

socket.on("compresion", (data) => {
  console.log(data)
  document.getElementById("compresion").innerHTML = Math.floor(data.compresion)
});

function renderMensajes(data) {
  const html = data
    .map((mensaje) => {
      return `<div>
        <span class="email">${mensaje.author.email}</span> <span class="fecha">[${mensaje.fecha}]</span> : 
        <em class="mensaje">${mensaje.text}</em> <img class="avatar" src=${mensaje.author.avatar} alt=${mensaje.author.email}></div>`;
    })
    .join(" ");
  document.getElementById("mensajes").innerHTML = html;
}

function agregarMensaje(e) {
  const date = new Date().toLocaleString();

  const mensaje = {
    author: {
      email: document.getElementById("email").value,
      nombre: document.getElementById("nombre").value,
      apellido: document.getElementById("apellido").value,
      edad: document.getElementById("edad").value,
      alias: document.getElementById("alias").value,
      avatar: document.getElementById("avatar").value,
    },
    text: document.getElementById("text").value,
    fecha: date,
  };

  socket.emit("mensajes", mensaje);
  return false;
}
