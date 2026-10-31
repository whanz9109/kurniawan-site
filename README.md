# Situs personal Kurniawan T. Waskito

Situs statis (HTML, CSS, JavaScript biasa) tanpa proses build. Bisa langsung di-host di Cloudflare Pages atau GitHub Pages.

## Struktur

| Path | Isi |
|---|---|
| `index.html`, `publikasi.html`, `topik-bimbingan.html`, `industri.html` | Halaman bahasa Indonesia |
| `en/` | Halaman bahasa Inggris (`index`, `publications`, `supervision`, `industry`) |
| `assets/data/publications.js` | **Daftar publikasi** (satu file untuk ID dan EN) |
| `assets/js/publications.js` | Pencarian, filter, dan urutan di halaman Publikasi |
| `assets/img/` | Foto profil, foto riset, dan `og-image.jpg` (pratinjau tautan) |
| `assets/cv/` | CV publik (ID dan EN) |
| `sitemap.xml`, `robots.txt`, `favicon.svg` | SEO dan ikon |

## Pembaruan yang sering dilakukan

- **Menambah publikasi:** buka `assets/data/publications.js`, salin satu baris, ubah isinya. Penjelasan tiap kolom ada di bagian atas file. Halaman Publikasi ID dan EN otomatis ikut berubah. Angka ringkas di beranda dan di kepala halaman Publikasi (23 jurnal, 8 prosiding, 1 buku) masih ditulis manual, jadi perbarui juga angka itu.
- **Mengganti CV:** timpa file di `assets/cv/` dengan nama yang sama.
- **Mengganti foto:** timpa file di `assets/img/` dengan nama yang sama (JPG, lebar sekitar 1200 px).

## Sumber foto hero beranda

Unsplash dan Pexels tidak mewajibkan kredit, tetapi sumbernya dicatat di sini.

| File | Sumber |
|---|---|
| hero-angin-albany.jpg | Foto pribadi, Albany Wind Farm, Australia Barat, Desember 2025 |
| hero-kapal.jpg | Bent Van Aeken, Unsplash |
| hero-floating-pv.jpg | Abdulaziz Hasan, Pexels |
| hero-ombak.jpg | Rod Long, Unsplash |
| hero-turbin-arus-selat-haya.jpg | Foto pribadi, uji platform turbin arus di Selat Haya bersama tim Universitas Pattimura |
| hero-elektroliser-aem.jpg | Foto pribadi, rig uji elektroliser AEM dan fuel cell |
| hero-copv-hidrogen.jpg | Foto pribadi, prototipe tangki hidrogen COPV tipe IV |

## Sumber foto kartu sektor (bagian Pengembangan program)

| Berkas | Sumber |
|---|---|
| sektor-penumpang.jpg | Julius Jansson, Unsplash |
| sektor-tanker.jpg | Shaah Shahidh, Unsplash |
| sektor-galangan.jpg | Haberdoedas, Unsplash |
| sektor-klasifikasi.jpg | Nathan Cima, Unsplash |
| sektor-pelabuhan.jpg | Wolfgang Weiser, Unsplash |
| sektor-migas.jpg | Leonardo Benitez, Unsplash |
| sektor-konstruksi.jpg | Royce Fonseca, Unsplash |
| sektor-lng-terapung.jpg | Julia Taubitz, Unsplash |
| sektor-angin-lepas-pantai.jpg | Xu X, Pexels |
| sektor-akuakultur.jpg | Norbert Buduczki, Unsplash |
| sektor-kapal-patroli.jpg | Royce Fonseca, Unsplash |
| sektor-kapal-tenggelam.jpg | Kecelakaan kapal penumpang, Juli 2018; sumber: [Mongabay Indonesia](https://mongabay.co.id/2018/07/07/cuaca-buruk-di-perairan-indonesia-kemenhub-keluarkan-maklumat-pelayaran/) |
| sektor-wave-flume.jpg | Foto pribadi, uji model di wave flume |

## Galeri cuplikan program

Berkas `assets/video/sim-*.mp4` (H.264, 15 fps, 3 detik, tanpa suara) dan poster `assets/img/sim-*.jpg` adalah keluaran program hidrodinamika milik Kurniawan untuk lambung acuan DTMB 5415, KCS, dan KVLCC2. Strip judul asli yang menyebut metode sudah dipotong; keterangan di situs sengaja tidak menyebut skema pemodelan.

Grafik hasil (`assets/img/grafik-*.png`) dan tangkapan layar antarmuka (`assets/img/studio-*.png`) juga keluaran program Kurniawan. Judul yang menyebut metode dipotong, dan satu label legenda pada grafik perbandingan KVLCC2 diganti menjadi "Program". Legenda "pflow" (nama program) dibiarkan. Data pembanding: Sadat-Hosseini dkk. (2013) untuk KVLCC2; Park dkk. (2019) untuk S-VLCC; uji model untuk kapal kontainer 6750 TEU.

## Domain

Semua alamat lengkap (canonical, hreflang, og:url, sitemap) memakai `https://kurniawanwaskito.com`. Kalau domain final berbeda, cari dan ganti teks itu di semua file.

## Menjalankan di komputer sendiri

```
cd website-kurniawan
python3 -m http.server 8000
```
lalu buka http://localhost:8000.
