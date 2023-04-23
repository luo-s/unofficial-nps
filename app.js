// get API
function getIt(defaultInput) {
  $("#cards").empty();
  $("#carousel").empty();
  $("#results").empty();
  let input = $("#input").val();
  if (defaultInput !== undefined) {
    input = defaultInput;
  }
  $.get(
    `https://developer.nps.gov/api/v1/parks?parkCode=${input}&limit=500&api_key=7La6D6fg0dVgtXjh8QgGUrOT0ncoCgBk75P9mFhh`,
    (data) => {
      if (data.data.length === 0) {
        $.get(
          `https://developer.nps.gov/api/v1/parks?q=${input}&limit=500&api_key=7La6D6fg0dVgtXjh8QgGUrOT0ncoCgBk75P9mFhh`,
          (data) => {
            updatePark(data.data);
            return;
          }
        );
      } else if (data.data.length === 1) {
        updateParkDetail(data.data);
        // thingsToDo API
        $.get(
          `https://developer.nps.gov/api/v1/thingstodo?q=${input}&limit=500&api_key=7La6D6fg0dVgtXjh8QgGUrOT0ncoCgBk75P9mFhh`,
          (data) => {
            updateThingsToDo(data.data);
            return;
          }
        );
        // placesToGo API
        $.get(
          `https://developer.nps.gov/api/v1/places?q=${input}&limit=500&api_key=7La6D6fg0dVgtXjh8QgGUrOT0ncoCgBk75P9mFhh`,
          (data) => {
            updatePlacesToGo(data.data);
            return;
          }
        );
        // alerts API
        $.get(
          `https://developer.nps.gov/api/v1/alerts?q=${input}&api_key=7La6D6fg0dVgtXjh8QgGUrOT0ncoCgBk75P9mFhh`,
          (data) => {
            updateAlerts(data.data);
          }
        );
        return;
      } else {
        updatePark(data.data);
      }
    }
  );
}

// event listener
$("#yosemite").on("click", function () {
  getIt("yose");
});
$("#yellowStone").on("click", function () {
  getIt("yell");
});
$("#arch").on("click", function () {
  getIt("arch");
});
$("#grandTeton").on("click", function () {
  getIt("grte");
});
$("#joshuaTree").on("click", function () {
  getIt("jotr");
});
$("#zion").on("click", function () {
  getIt("zion");
});
$("#search").on("click", function () {
  getIt();
});
// random explore
$("#random").on("click", function () {
  let num1 = Math.floor(Math.random() * 468);
  let num2 = Math.floor(Math.random() * 468);
  let num3 = Math.floor(Math.random() * 468);
  $("#cards").empty();
  $("#carousel").empty();
  $("#results").empty();
  $.get(
    `https://developer.nps.gov/api/v1/parks?parkCode=""&limit=500&api_key=7La6D6fg0dVgtXjh8QgGUrOT0ncoCgBk75P9mFhh`,
    (data) => {
      updatePark([data.data[num1], data.data[num2], data.data[num3]]);
      return;
    }
  );
});

// handle result
function updatePark(data) {
  console.log(data);
  for (let ele of data) {
    const name = ele.fullName;
    const url = ele.url;
    const description = ele.description;
    const image = ele.images[0].url;
    const address = ele.addresses[0];
    const num = ele.contacts.phoneNumbers[0].phoneNumber.replace(/\D/g, "");
    const phoneNumber =
      num.slice(0, 3) + "-" + num.slice(3, 6) + "-" + num.slice(6, 10);
    const emailAddress = ele.contacts.emailAddresses[0].emailAddress;
    const parkCode = ele.parkCode;
    const html = `
      <div class="card" id="${parkCode}Card" style="width: 1000px;">
        <img src="${image}" class="card-img-top" alt="...">
        <div class="card-body">
          <a class="card-title" href="${url}" style="font-size:40px" target="_blank"">${name}</a>
          <p class="card-text">${description}</p>
        </div>
        <ul class="list-group list-group-flush">
          <li class="list-group-item">${address.line1}, ${address.city}, ${address.stateCode} ${address.postalCode}
          </li>
          <li class="list-group-item">Contact Number: ${phoneNumber} | Email: ${emailAddress}</li>
          <li id="buttons" class="list-group-item" class="buttons">
          <button type="button" id="${parkCode}" class="btn btn-success">${name}</button>
          </li>
        </ul>
      </div>
    `;
    $("#results").append($(`${html}`));
    // green button event listener
    $(`#${parkCode}`).on("click", function (event) {
      getIt(event.target.id);
    });
  }
}
function updateParkDetail(data) {
  for (let ele of data) {
    const name = ele.fullName;
    const url = ele.url;
    const description = ele.description;
    const image = ele.images; //array[index].url
    const directions = ele.directionsUrl;
    const directionsInfo = ele.directionsInfo;
    const address = ele.addresses[0];
    const num = ele.contacts.phoneNumbers[0].phoneNumber.replace(/\D/g, "");
    const phoneNumber =
      num.slice(0, 3) + "-" + num.slice(3, 6) + "-" + num.slice(6, 10);
    const emailAddress = ele.contacts.emailAddresses[0].emailAddress;
    const parkCode = ele.parkCode;
    const weatherInfo = ele.weatherInfo;
    const latitude = ele.latitude;
    const longitude = ele.longitude;

    const html = `
      <div class="card" id="${parkCode}Card" style="width: 1000px;">
        <div id="carouselpark" class="carousel slide">
          <div class="carousel-inner">
          </div>
          <button class="carousel-control-prev" type="button" data-bs-target="#carouselpark" data-bs-slide="prev">
            <span class="carousel-control-prev-icon" aria-hidden="true"></span>
            <span class="visually-hidden">Previous</span>
          </button>
          <button class="carousel-control-next" type="button" data-bs-target="#carouselpark" data-bs-slide="next">
            <span class="carousel-control-next-icon" aria-hidden="true"></span>
            <span class="visually-hidden">Next</span>
          </button>
        </div>
        <div class="card-body">
          <a class="card-title" href="${url}" style="font-size:40px" target="_blank"">${name}</a>
          <p class="card-text">${description}</p>
        </div>
        <ul class="list-group list-group-flush">
          <li class="list-group-item">${address.line1}, ${address.city}, ${address.stateCode} ${address.postalCode}
          </li>
          <li class="list-group-item">Contact Number: ${phoneNumber} | Email: ${emailAddress}</li>
          <li id="buttons" class="list-group-item" class="buttons">
          <button type="button" id="${parkCode}" class="btn btn-success">${name}</button>
          <button type="button" class="btn btn-dark"
          onclick="window.open('https://en.wikipedia.org/wiki/${name}')">Wikipedia
          </button>
          <button type="button" class="btn btn-primary" target="_blank"
          onclick="window.open('${directions}')">Direction
          </button>
          </li>
        </ul>
      </div>
    `;
    $("#results").append($(`${html}`));

    // add img carousel
    for (let i = 0; i < image.length; i++) {
      let imgdiv = document.createElement("div");
      if (i === 0) {
        imgdiv.className = "carousel-item active";
      } else {
        imgdiv.className = "carousel-item";
      }
      let img = document.createElement("img");
      img.src = image[i].url;
      img.className = "d-block w-100";
      img.alt = "picture failed to load";
      img.style = "height: 800px";
      $(".carousel-inner").append(imgdiv);
      imgdiv.append(img);
    }

    // green button event listener
    $(`#${parkCode}`).on("click", function (event) {
      getIt(event.target.id);
    });

    // add videos
    if (parkCode === "yose") {
      let iframeYose = document.createElement("iframe");
      iframeYose.id = "yoseVideo";
      iframeYose.src = "https://www.youtube.com/embed/s9M30w085SY";
      iframeYose.width = "100%";
      iframeYose.height = "600";
      $("#yoseCard").append($(iframeYose));
    }
    if (parkCode === "yell") {
      let iframeYell = document.createElement("iframe");
      iframeYell.id = "yellVideo";
      iframeYell.src = "https://www.youtube.com/embed/3RDYVVmVR2U";
      iframeYell.width = "100%";
      iframeYell.height = "600";
      $("#yellCard").append($(iframeYell));
    }
    if (parkCode === "arch") {
      let iframeArch = document.createElement("iframe");
      iframeArch.id = "archVideo";
      iframeArch.src = "https://www.youtube.com/embed/B4UKkCwbAmw";
      iframeArch.width = "100%";
      iframeArch.height = "600";
      $("#archCard").append($(iframeArch));
    }
    if (parkCode === "zion") {
      let iframeZion = document.createElement("iframe");
      iframeZion.id = "zionVideo";
      iframeZion.src = "https://www.youtube.com/embed/ecc7t3PkkiM";
      iframeZion.width = "100%";
      iframeZion.height = "600";
      $("#zionCard").append($(iframeZion));
    }
    if (parkCode === "jotr") {
      let iframeJotr = document.createElement("iframe");
      iframeJotr.id = "jotrVideo";
      iframeJotr.src = "https://www.youtube.com/embed/MQrSgsy6yHQ";
      iframeJotr.width = "100%";
      iframeJotr.height = "600";
      $("#jotrCard").append($(iframeJotr));
    }
    if (parkCode === "grte") {
      let iframeGrte = document.createElement("iframe");
      iframeGrte.id = "grteVideo";
      iframeGrte.src = "https://www.youtube.com/embed/oRxLvMHLI3I";
      iframeGrte.width = "100%";
      iframeGrte.height = "600";
      $("#grteCard").append($(iframeGrte));
    }
  }
}
function updateAlerts(data) {
  const html = `
    <div class="btn-group">
      <button type="button" class="btn btn-danger dropdown-toggle"
      data-bs-toggle="dropdown" aria-expanded="false" style="margin-right: 3px;">
        Alert
      </button>
      <ul class="dropdown-menu">
      </ul>
    </div>
    `;
  $("#buttons").append($(`${html}`));
  for (let ele of data) {
    if (ele.url === "") {
      continue;
    }
    const url = ele.url;
    const name = ele.title;
    const li = document.createElement("li");
    const a = document.createElement("a");
    a.className = "dropdown-item";
    a.target = "_blank";
    a.href = url;
    a.textContent = name;
    $(".dropdown-menu").append(li);
    li.append(a);
  }
}
function updateThingsToDo(data) {
  const html = `
    <div class="btn-group">
      <button type="button" class="btn btn-info dropdown-toggle"
      data-bs-toggle="dropdown" aria-expanded="false" style="margin-right: 3px;">
        Things To Do
      </button>
      <ul class="dropdown-menu">
      </ul>
    </div>
    `;
  $("#buttons").append($(`${html}`));
  for (let ele of data) {
    if (ele.url === "") {
      continue;
    }
    const url = ele.url;
    const name = ele.title;
    const li = document.createElement("li");
    const a = document.createElement("a");
    a.className = "dropdown-item";
    a.target = "_blank";
    a.href = url;
    a.textContent = name;
    $(".dropdown-menu").append(li);
    li.append(a);
  }
}
function updatePlacesToGo(data) {
  const html = `
    <div class="btn-group">
      <button type="button" class="btn btn-info dropdown-toggle"
      data-bs-toggle="dropdown" aria-expanded="false" style="margin-right: 3px;">
        Places To Go
      </button>
      <ul class="dropdown-menu">
      </ul>
    </div>
    `;
  $("#buttons").append($(`${html}`));
  for (let ele of data) {
    if (ele.url === "") {
      continue;
    }
    const url = ele.url;
    const name = ele.title;
    const li = document.createElement("li");
    const a = document.createElement("a");
    a.className = "dropdown-item";
    a.target = "_blank";
    a.href = url;
    a.textContent = name;
    $(".dropdown-menu").append(li);
    li.append(a);
  }
}
