let data = JSON.parse(localStorage.getItem("sholat")) || [];

function render(filteredData = data) {
  let list = document.getElementById("list");
  list.innerHTML = "";

  let sholatCount = 0;
  let tidakCount = 0;
  let haidCount = 0;

  filteredData.forEach((item, index) => {
    let li = document.createElement("li");
    li.classList.add(item.status);

    li.innerHTML = `
      ${item.nama} - ${item.sholat} (${item.status}) <br>
      <small>${item.tanggal}</small>
      <button class="hapus-btn" onclick="hapus(${index})">Hapus</button>
    `;

    list.appendChild(li);

    if (item.status === "sholat") sholatCount++;
    if (item.status === "tidak") tidakCount++;
    if (item.status === "haid") haidCount++;
  });

  document.getElementById("sholatCount").innerText = sholatCount;
  document.getElementById("tidakCount").innerText = tidakCount;
  document.getElementById("haidCount").innerText = haidCount;
}

function tambahData() {
  let nama = document.getElementById("nama").value;
  let sholat = document.getElementById("sholat").value;
  let status = document.getElementById("status").value;

  if (nama === "") {
    alert("Nama tidak boleh kosong!");
    return;
  }

  let tanggal = new Date().toLocaleDateString();

  data.push({ nama, sholat, status, tanggal });
  localStorage.setItem("sholat", JSON.stringify(data));

  document.getElementById("nama").value = "";

  render();
}

function hapus(index) {
  data.splice(index, 1);
  localStorage.setItem("sholat", JSON.stringify(data));
  render();
}

function hapusSemua() {
  if (confirm("Yakin hapus semua data?")) {
    data = [];
    localStorage.removeItem("sholat");
    render();
  }
}

function searchData() {
  let keyword = document.getElementById("search").value.toLowerCase();

  let hasil = data.filter((item) => item.nama.toLowerCase().includes(keyword));

  render(hasil);
}

render();
