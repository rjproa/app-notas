const d = document,
  ls = localStorage,
  date = new Date(),
  $fragment = d.createDocumentFragment(),
  $crudTitle = d.querySelector(".crud-title"),
  $formList = d.querySelector(".form-list"),
  $crudSection = d.getElementById("crud-section");


if (ls.length === 1 || ls.length === 0) {
  ls.setItem("checkItemList", []);
}

function capitalizarPrimeraLetra(str) {
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
}

function titleEdit() {
  const $title = d.getElementById("title");
  $title.textContent = `Hola, ${ls.getItem("user")}`;
}

const formValidation = () => {
  const $formName = d.querySelector(".form-name-container");
  $formName.classList.remove("is-active");

  const $inputs = d.querySelectorAll(".form-name [required]");
  $inputs.forEach((input) => {
    const $span = d.createElement("span");
    $span.id = input.name;
    $span.textContent = input.title;
    $span.classList.add("contact-form-error", "none");
    input.insertAdjacentElement("afterend", $span);
  });

  d.addEventListener("keyup", (e) => {
    if (e.target.matches(".form-name [required]")) {
      let $input = e.target,
        pattern = $input.pattern;

      if (pattern && $input.value !== "") {
        let regex = new RegExp(pattern);
        return !regex.exec($input.value)
          ? d.getElementById($input.name).classList.add("is-active")
          : d.getElementById($input.name).classList.remove("is-active")
      }
    };
  })

  d.addEventListener("submit", (e) => {
    e.preventDefault();
    ls.setItem("user", capitalizarPrimeraLetra(d.getElementById("person").value));
    $formName.classList.add("is-active");
    titleEdit();
  });
}

const dateFunction = (day, numberDay, month) => {
  const $date = d.getElementById("date");
  switch (day) {
    case 0:
      day = "Domingo"
      break;
    case 1:
      day = "Lunes"
      break;
    case 2:
      day = "Martes"
      break;
    case 3:
      day = "Miercoles"
      break;
    case 4:
      day = "Jueves"
      break;
    case 5:
      day = "Viernes"
      break;
    case 6:
      day = "S??bado"
      break;
  }

  switch (month) {
    case 0:
      month = "Enero"
      break;
    case 1:
      month = "Febrero"
      break;
    case 2:
      month = "Marzo"
      break;
    case 3:
      month = "Abril"
      break;
    case 4:
      month = "Mayo"
      break;
    case 5:
      month = "Junio"
      break;
    case 6:
      month = "Julio"
      break;
    case 7:
      month = "Agosto"
      break;
    case 8:
      month = "Setiembre"
      break;
    case 9:
      month = "Octubre"
      break;
    case 10:
      month = "Noviembre"
      break;
    case 11:
      month = "Diciembre"
      break;
  }

  $date.textContent = `${day} ${numberDay} de ${month} `;
}

const printCheck = (el) => {
  let items = el.split(",");
  items.splice(0, 1);
  items.forEach(li => {
    let $list = d.querySelector(`[data-list="list-${li}"]`),
      $textMesage = $list.querySelector(".list-mensaje"),
      $iconCheck = $list.querySelector(".icon-check"),
      $iconNoCheck = $list.querySelector(".icon-no-check");

    $textMesage.classList.toggle("is-active");
    $iconCheck.classList.toggle("none");
    $iconNoCheck.classList.toggle("none");
  })

}

const getAll = async () => {
  // Obtener -- GET
  let i = 0;
  while (i < ls.length) {
    if (ls.key(i) !== 'user' && ls.key(i) !== 'checkItemList') {
      let $clone = d.importNode(d.querySelector(".list-example"), true);
      $clone.querySelector(".list-mensaje").textContent = capitalizarPrimeraLetra(ls.getItem(ls.key(i)));
      $clone.classList.remove("list-example");
      $clone.id = ls.key(i);
      $clone.dataset.list = `list-${ls.key(i)}`;
      $clone.querySelector(".btn-check-fill").dataset.id = ls.key(i);
      $clone.querySelector(".btn-delete-fill").dataset.id = ls.key(i);
      $fragment.appendChild($clone);
    }
    i++;
  }
  $crudSection.appendChild($fragment);
  printCheck(ls.getItem("checkItemList"));
}

const removeCheckItemList = (id) => {
  let arr = ls.getItem("checkItemList").split(",");
  if (arr.includes(id)) {
    let position = arr.indexOf(id)
    arr.splice(position, 1)
  }
  ls.setItem("checkItemList", arr)
}

const editCheckItemList = (id) => {
  let arr = ls.getItem("checkItemList").split(",");
  if (arr.includes(id)) {
    let position = arr.indexOf(id)
    arr.splice(position, 1)
  } else {
    arr.push(id);
  }
  ls.setItem("checkItemList", arr)
}

const checkItem = (id) => {
  let $list = d.querySelector(`[data-list="list-${id}"]`),
    $textMesage = $list.querySelector(".list-mensaje"),
    $iconCheck = $list.querySelector(".icon-check"),
    $iconNoCheck = $list.querySelector(".icon-no-check");

  $textMesage.classList.toggle("is-active");
  $iconCheck.classList.toggle("none");
  $iconNoCheck.classList.toggle("none");
}

let listPhrase = [
  "Un sue??o no se hace realidad por arte de magia, necesita sudor, determinaci??n y trabajo duro",
  "Para tener ??xito tu deseo de alcanzarlo debe ser mayor que tu miedo al fracaso",
  "Cuando pierdas, no pierdas la lecci??n",
  "No cuentes los d??as, haz que los d??as cuenten ",
  "El mejor momento del d??a es ahora ",
  "Si la oportunidad no llama, construye una puerta",
  "Si te ca??ste ayer, lev??ntate hoy ",
  "Si no pierdes, no puedes disfrutar de las victoria",
  "Piensa, sue??a, cree y atr??vete ",
  "Aseg??rate de que colocas tus pies en el lugar correcto, y luego mantente firme",
  "Si te caes siete veces, lev??ntate ocho",
  "Si puedes so??arlo, puedes hacerlo ",
  "La vida es como montar en bicicleta. para mantener el equilibrio tienes que avanzar ",
  "El ??xito es la suma de peque??os esfuerzos, que se repiten d??a tras d??a",
  "La forma m??s r??pida de cambiar es convivir con personas que ya son como quieres ser",
  "La felicidad no es algo que pospones para el futuro; es algo que dise??as para el presente",
  "Vive la vida que amas. Ama la vida que vives",
  "Trabajar duro por algo que no te importa se llama estr??s. Trabajar duro por algo que te importa de verdad se llama pasi??n",
  "El fracaso se convierte en ??xito si aprendes de ??l",
  "Todos nuestros sue??os se pueden volver realidad si tenemos el coraje de perseguirlos",
  "Nuestra mayor debilidad reside en rendirnos. La forma m??s segura de tener ??xito es intentarlo una vez m??s",
  "No es el m??s fuerte de las especies el que sobrevive, tampoco es el m??s inteligente el que sobrevive. Es aquel que es m??s adaptable al cambio",
  "Nos detuvimos en busca de monstruos debajo de la cama cuando nos dimos cuenta de que estaban dentro de nosotros",
  "Un mono americano, despu??s de emborracharse de brandy, nunca m??s lo tocar??a, y esto es mucho m??s sabio de lo que har??an la mayor??a de hombres",
  "La mente humana evolucion?? para creer en los dioses. No evolucion?? para creer en la biolog??a",
  "El genio se hace con un 1% de talento, y un 99% de trabajo",
  "Los errores no son fracasos, son se??al de que lo estamos intentando",
  "Trabaja duro en silencio y deja que tu ??xito haga todo el ruido"
]

const draw = () => {
  let $phrase = d.querySelector(".phrase"),
    random = Math.floor(Math.random() * listPhrase.length),
    winner = listPhrase[random];

  $phrase.textContent = `"${winner}"`;
  console.log(random);
}

if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('./sw.js')
    .then(reg => console.log('Registro de SW exitoso', reg))
    .catch(err => console.warn('Error al tratar de registrar el SW', err));
}

if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('./sw.js')
    .then(reg => console.log('Registro de SW exitoso', reg))
    .catch(err => console.warn('Error al tratar de registrar el SW', err));
}

d.addEventListener("DOMContentLoaded", (e) => {
  if (ls.getItem("user") === null) formValidation();
  titleEdit();
  dateFunction(date.getDay(), date.getDate(), date.getMonth());
  getAll();
  draw();
});

d.addEventListener("click", (e) => {
  if (e.target.matches(".btn-delete-fill")) {
    //  Delete - DELETE
    let isDelete = confirm(`??Est??s seguro de eliminar esta tarea?`)
    if (isDelete) {
      ls.removeItem(e.target.dataset.id)
      removeCheckItemList(`${e.target.dataset.id}`);
      location.reload();
    }
  }

  if (e.target.matches(".btn-check-fill")) {
    checkItem(e.target.dataset.id);
    editCheckItemList(e.target.dataset.id);
  }
})

d.addEventListener("submit", (e) => {
  if (e.target === $formList) {
    e.preventDefault();
    if (!e.target.id.value) {
      //  Create - POST
      let UUID = Number.parseInt(Math.random() * (100 ** 10));
      ls.setItem(`${UUID}`, `${e.target.list.value}`)
      location.reload()
    }
  }
});


