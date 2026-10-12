const C = CONFIG, $ = s => document.querySelector(s);
const foto = (src, cls = "") => `<div class="ph ${cls}"><img src="${src}" alt="" loading="lazy" onerror="this.remove()"></div>`;
const tamu = new URLSearchParams(location.search).get("to") || "Nama Tamu Undangan";
const esc = t => Object.assign(document.createElement("div"), { textContent: t }).innerHTML;
const dep = n => n.split(" ")[0];

$("#homeIn").innerHTML = `
  <div class="small">The Wedding Of</div>
  <div class="script big">${dep(C.wanita.nama)} &amp; ${dep(C.pria.nama)}</div>
  <p class="serif lg">${C.tanggalTeks}</p>
  <p>Kepada Yth. Bapak/Ibu/Saudara/i</p>
  <div class="guest">${esc(tamu)}</div>
  <div class="small">Menuju Hari Bahagia</div>
  <div class="cd"><div><b id="d">0</b><span>Hari</span></div><div><b id="h">0</b><span>Jam</span></div><div><b id="m">0</b><span>Menit</span></div><div><b id="s">0</b><span>Detik</span></div></div>
  <button class="btn" id="buka">Buka Undangan</button>`;
function tick() {
  const q = Math.floor(Math.max(0, new Date(C.tanggal) - new Date()) / 1000);
  d.textContent = Math.floor(q / 86400); h.textContent = Math.floor(q % 86400 / 3600);
  m.textContent = Math.floor(q % 3600 / 60); s.textContent = q % 60;
}
tick(); setInterval(tick, 1000);

const orang = o => `<div class="org">${foto(o.foto, "arch")}<div class="script">${o.lengkap}</div><p>${o.anak}</p><p class="serif">${o.ortu}</p></div>`;
$("#mempelai").innerHTML = `
  <div class="pg a3"><div class="in"><div class="script big">Kasih</div><p class="quote">“${C.ayat.teks}”</p><div class="small">${C.ayat.sumber}</div></div></div>
  <h2>Mempelai</h2>${orang(C.wanita)}<div class="script amp">&amp;</div>${orang(C.pria)}`;

$("#acaraIn").innerHTML = `<div class="script big">Save The Date</div>` + C.acara.map((a, i) =>
  (i ? '<div class="line"></div>' : '') + `<div class="blk"><div class="small">${a.judul}</div><h3>${a.tanggal}</h3><p>Pukul ${a.jam}</p><p><b>${a.tempat}</b><br>${a.alamat}</p>${a.maps ? `<a class="btn sm" href="${a.maps}" target="_blank">📍 Lihat Lokasi</a>` : ""}</div>`).join("");

$("#galeri").innerHTML = `<h2>Our Moments</h2>` +
  C.cerita.map(c => `<div class="story">${foto(c.foto)}<div><h3>${c.judul}</h3><p>${c.teks}</p></div></div>`).join("") +
  `<h2>Galeri</h2><div class="gal">${C.galeri.map(g => foto(g, "g")).join("")}</div>`;
document.querySelect
