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
document.querySelectorAll(".gal .ph,.story .ph").forEach(p => p.onclick = () => {
  const im = p.querySelector("img"); if (!im) return;
  $("#lightbox img").src = im.src; $("#lightbox").classList.add("on");
});
$("#lightbox").onclick = () => $("#lightbox").classList.remove("on");

$("#hadiahIn").innerHTML = `<div class="script big">Wedding Gift</div><p>Doa restu Anda sudah sangat berarti. Namun jika ingin memberi tanda kasih, dapat melalui:</p>` +
  C.hadiah.map(x => `<div class="blk"><b>${x.bank} – ${x.norek}</b><p>a.n. ${x.nama}</p><button class="btn sm" data-no="${x.norek}">Salin No. Rekening</button></div>`).join("");
document.querySelectorAll("[data-no]").forEach(b => b.onclick = async () => {
  try { await navigator.clipboard.writeText(b.dataset.no); b.textContent = "✔ Tersalin"; } catch (e) { b.textContent = b.dataset.no; }
  setTimeout(() => b.textContent = "Salin No. Rekening", 2000);
});

$("#ucapan").innerHTML = `<h2>Ucapan &amp; Doa</h2>
  <div class="stat"><div class="g"><b id="sH">0</b>Hadir</div><div class="r"><b id="sT">0</b>Tidak Hadir</div><div class="y"><b id="sB">0</b>Belum Pasti</div></div>
  <div class="form"><input id="fn" placeholder="Nama" maxlength="40"><textarea id="fp" placeholder="Ucapan & doa" maxlength="200"></textarea>
  <select id="fk"><option>Hadir</option><option>Tidak Hadir</option><option>Belum Pasti</option></select><button class="btn" id="kirim">Kirim</button></div>
  <div id="list"></div><p class="tutup">${C.penutup}</p><div class="script big">${dep(C.wanita.nama)} &amp; ${dep(C.pria.nama)}</div>`;
let U = []; try { U = JSON.parse(localStorage.getItem("ucapan") || "[]"); } catch (e) {}
function renderU() {
  $("#list").innerHTML = U.map(u => `<div class="msg"><b>${esc(u.n)}</b> <i>${esc(u.k)}</i><p>${esc(u.p)}</p></div>`).join("");
  ["Hadir", "Tidak Hadir", "Belum Pasti"].forEach((k, i) => $("#s" + "HTB"[i]).textContent = U.filter(u => u.k === k).length);
}
$("#kirim").onclick = () => {
  const n = $("#fn").value.trim(), p = $("#fp").value.trim(); if (!n || !p) return;
  U.unshift({ n, p, k: $("#fk").value });
  try { localStorage.setItem("ucapan", JSON.stringify(U)); } catch (e) {}
  $("#fn").value = $("#fp").value = ""; renderU();
};
renderU();

const au = $("#audio"); au.src = C.musik;
const play = () => au.play().then(() => $("#musik").classList.add("on")).catch(() => {});
$("#musik").onclick = () => au.paused ? play() : (au.pause(), $("#musik").classList.remove("on"));
$("#buka").onclick = () => { play(); document.getElementById("mempelai").scrollIntoView({ behavior: "smooth" }); };
const belumPasti = dataKomentar.filter(item => item.status.toLowerCase() === 'belum pasti').length;
const hadir = dataKomentar.filter(item => item.status.toLowerCase() === 'hadir').length;
const tidakHadir = dataKomentar.filter(item => item.status.toLowerCase() === 'tidak hadir').length;
document.getElementById('count-belum-pasti').innerText = belumPasti;
document.getElementById('count-hadir').innerText = hadir;
document.getElementById('count-tidak-hadir').innerText = tidakHadir;
