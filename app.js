// Data Default Artikel
const dataArtikel = {
    judul: "Seri 1: Malam Tragedi - Lepasnya Kyuubi dan Kelahiran Pahlawan",
    penulis: "Sangpenjelajahkata",
    gambar: "https://images.unsplash.com/photo-1599839619722-39751411ea63?q=80&w=800&auto=format&fit=crop",
    konten: `
        <p>Malam itu seharusnya menjadi malam yang penuh kebahagiaan dan kedamaian. Fokus utama dari rentetan peristiwa bersejarah ini bermula dari proses kelahiran Naruto yang dijaga dengan sangat ketat. Pada momen sakral tersebut, segel yang menahan monster berekor sembilan berada pada titik terlemahnya.</p>
        <p>Tragedi yang sesungguhnya terjadi ketika manipulasi dari pihak luar berhasil mengeksploitasi kelemahan tersebut. Terlepasnya Kyuubi menghancurkan sebagian besar desa dan memakan banyak korban jiwa. Namun, di tengah puing-puing dan keputusasaan malam itu, kelahiran bayi tersebut membawa secercah harapan baru yang kelak menjadi fondasi bagi masa depan dunia ninja.</p>
    `
};

// Inisialisasi Database Lokal
function inisialisasiData() {
    if (!localStorage.getItem('forum_suka')) localStorage.setItem('forum_suka', 124);
    if (!localStorage.getItem('forum_tidak_suka')) localStorage.setItem('forum_tidak_suka', 3);
    if (!localStorage.getItem('forum_komentar')) {
        const komentarAwal = [
            { id: 1, nama: "PembacaSetia", teks: "Awal cerita yang sangat emosional. Menunggu kelanjutannya!", waktu: new Date().toLocaleString() }
        ];
        localStorage.setItem('forum_komentar', JSON.stringify(komentarAwal));
    }
}

// Fungsi Render Artikel
function renderArtikel() {
    document.getElementById('judul-artikel').innerHTML = dataArtikel.judul;
    document.getElementById('penulis-artikel').innerText = dataArtikel.penulis;
    document.getElementById('gambar-artikel').src = dataArtikel.gambar;
    document.getElementById('konten-artikel').innerHTML = dataArtikel.konten;
    
    document.getElementById('angka-suka').innerText = localStorage.getItem('forum_suka');
    document.getElementById('angka-tidak-suka').innerText = localStorage.getItem('forum_tidak_suka');
}

// Fungsi Render Komentar
function renderKomentar() {
    const daftarKomentar = JSON.parse(localStorage.getItem('forum_komentar'));
    const kontainer = document.getElementById('daftar-komentar');
    kontainer.innerHTML = '';

    // Menampilkan dari yang terbaru
    daftarKomentar.reverse().forEach(komentar => {
        const div = document.createElement('div');
        div.className = 'komentar-item';
        div.innerHTML = `
            <div class="nama-komentator">
                ${komentar.nama} <span class="waktu-komentar">${komentar.waktu}</span>
            </div>
            <div class="teks-komentar">${komentar.teks}</div>
        `;
        kontainer.appendChild(div);
    });
}

// Interaksi Suka / Tidak Suka
function tanganiInteraksi(jenis) {
    let suka = parseInt(localStorage.getItem('forum_suka'));
    let tidakSuka = parseInt(localStorage.getItem('forum_tidak_suka'));
    
    // Cek apakah user sudah vote di sesi ini
    if (sessionStorage.getItem('sudah_vote')) {
        alert("Anda sudah memberikan suara untuk artikel ini.");
        return;
    }

    if (jenis === 'suka') {
        suka += 1;
        localStorage.setItem('forum_suka', suka);
        document.getElementById('btn-suka').classList.add('aktif');
    } else {
        tidakSuka += 1;
        localStorage.setItem('forum_tidak_suka', tidakSuka);
        document.getElementById('btn-tidak-suka').classList.add('aktif');
    }
    
    sessionStorage.setItem('sudah_vote', 'true');
    renderArtikel();
}

// Kirim Komentar
document.getElementById('btn-kirim-komentar').addEventListener('click', () => {
    const inputNama = document.getElementById('nama-komentator').value.trim();
    const inputTeks = document.getElementById('input-komentar').value.trim();

    if (!inputTeks) {
        alert("Komentar tidak boleh kosong!");
        return;
    }

    const komentarBaru = {
        id: Date.now(),
        nama: inputNama || "Anonim",
        teks: inputTeks,
        waktu: new Date().toLocaleString()
    };

    const daftarKomentar = JSON.parse(localStorage.getItem('forum_komentar'));
    // Mengembalikan urutan sebelum ditambah agar tidak terbalik saat di-reverse lagi
    daftarKomentar.reverse(); 
    daftarKomentar.push(komentarBaru);
    
    localStorage.setItem('forum_komentar', JSON.stringify(daftarKomentar));
    
    // Bersihkan form
    document.getElementById('input-komentar').value = '';
    
    renderKomentar();
});

// Event Listeners
document.getElementById('btn-suka').addEventListener('click', () => tanganiInteraksi('suka'));
document.getElementById('btn-tidak-suka').addEventListener('click', () => tanganiInteraksi('tidak-suka'));

// Jalankan saat pertama kali dimuat
window.onload = () => {
    inisialisasiData();
    renderArtikel();
    renderKomentar();
};
