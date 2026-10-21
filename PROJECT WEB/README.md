# Prabu Sensi Ultra — Website Store Panel

Website storefront statis untuk jual panel Prabu Sensi Ultra. Tema dark royal gold, katalog fitur, daftar harga perorangan & reseller, checkout WhatsApp, dan pembayaran **QRIS statis milik sendiri** (tanpa payment gateway, tanpa Midtrans).

Frontend murni HTML/CSS/JS. Tanpa build step, tanpa framework, tanpa backend. Semua transaksi diverifikasi manual oleh admin lewat bukti bayar di WhatsApp.

## Fitur

- Hero dengan emblem logo, status server, dan statistik.
- Katalog 7 fitur dengan filter kategori (`Aim`, `ESP Visuals`, `Safety`) dan pencarian.
- 8 paket perorangan + 4 paket reseller, harga per hari dan badge hemat otomatis.
- Harga paket ditambah **biaya admin wajib Rp500** di setiap order.
- Gambar QRIS resmi tampil di section pembayaran dan di modal checkout.
- Tombol **Unduh Foto QRIS** — pembeli bisa langsung menyimpan gambar QRIS ke HP dan membayarnya dari m-banking / e-wallet.
- Tombol **Salin Nominal** supaya pembeli tidak salah ketik jumlah transfer.
- Checkout menghasilkan teks order lengkap (kode order, paket, harga paket, biaya admin, total, data pembeli) untuk dikirim ke WhatsApp admin.
- Deep link checkout: `?paket=week` atau `?paket=rs25&tipe=reseller`.
- Support penuh Free Fire MSI 5.22 terbaru, **v7a only** — **PC / laptop Windows + emulator**.
- Alur order 4 langkah dan FAQ accordion.
- Counter pengguna aktif mulai dari **50** dan nambah tiap order QR dikirim.
- Responsive (desktop, tablet, mobile), meta SEO + OG image, favicon.
- Animasi reveal, ticker, dan hover halus dengan dukungan `prefers-reduced-motion`.

## Kompatibilitas

Panel ini **PC / emulator only**. Copy situs fokus ke Windows + emulator, tanpa label platform lain.

| Platform | Status |
| --- | --- |
| Windows 10/11 + emulator | Didukung |
| Emulator yang dipakai | BlueStacks |
| Arsitektur Free Fire | v7a (armeabi-v7a, 32-bit) only |

Catatan operasional:

- Pembeli main lewat emulator di PC/laptop Windows, pakai APK Free Fire **v7a**. APK arm64 / x86_64 tidak didukung panel.
- Halaman menampilkan info ini di hero, section Game Support, FAQ, dan field Game di checkout.
- Label `PC / EMULATOR ONLY` ada di ticker, dan `V7A Only · Support for MSI 5.22` ada di kartu game + hero note.
- Kalau nanti ada build platform atau arsitektur lain, update teks di `index.html` (hero, section Game, FAQ) plus README ini.

## Counter pengguna aktif

Angka mulai dari **50**. Setiap checkout yang dikirim ke WhatsApp menambah 1, lalu disimpan di browser pembeli:

- Key `localStorage`: `psu_active_users` (angka) dan `psu_counted_orders` (kode order yang sudah dihitung, maksimal 50).
- Klik ulang dengan kode order yang sama tidak menambah lagi.
- Counter ini per-browser, bukan global. Pengunjung lain tetap melihat angka dasar 50 sampai mereka melakukan order sendiri. Untuk angka global real-time butuh backend atau database; situs ini sengaja statis.
- `BASE_ACTIVE_USERS` ada di `assets/js/app.js` kalau mau ganti angka awal.

## Garansi & update

Kebijakan yang dipakai di situs (FAQ, ticker, catatan paket):

- Setelah key dikirim, admin lepas tanggung jawab atas pemakaian panel.
- Yang tetap dilayani hanya masalah dari sisi panel: bug, key salah, atau fitur yang tidak aktif.
- Tidak ada free update. Kalau panel di-patch untuk versi game baru, key update dijual terpisah dan pembeli harus beli lagi.
- **Tidak ada janji reset HWID gratis, update gratis, atau garansi penuh** di copy mana pun. Kalau mengubah teks, jaga konsistensi ini.
- Paket Lifetime tetap ada, tapi artinya masa aktif tanpa batas — bukan update selamanya.

## Struktur

```
index.html
assets/
  css/style.css
  js/app.js
  img/
    logo.png          logo asli PRABU SENSI ULTRA (1254x1254, tanpa edit)
    freefire.png      ikon game Free Fire
    qris-prabu.jpg    gambar QRIS resmi Prabu (NMID ID1026559353366)
    og-cover.jpg      social preview 1200x630
```

Tidak ada folder `api/` dan tidak ada file PHP. Seluruh situs bisa jalan di hosting statis apa pun.

## Jalankan lokal

Dari folder ini:

```bash
python -m http.server 8080
```

Buka `http://localhost:8080`. Bisa juga pakai ekstensi Live Server di VS Code, atau buka `index.html` langsung di browser.

Tombol download QRIS butuh halaman diakses lewat `http://` atau `https://`. Kalau file dibuka lewat `file://`, sebagian browser tetap mengunduh, sebagian cuma membuka gambarnya di tab baru — pakai server lokal untuk hasil paling konsisten.

## Konfigurasi toko

Semua pengaturan ada di bagian atas `assets/js/app.js`:

```js
const STORE = {
  name: "Prabu Sensi Ultra",
  whatsapp: "6282262919154",          // format 62xxx, tanpa + dan spasi
  discord: "https://discord.gg/UFZdEjSz7x",
  tiktok: "https://www.tiktok.com/@prabuu121?is_from_webapp=1&sender_device=pc",
  qris: "assets/img/qris-prabu.jpg",
  currency: "Rp",
};

const ADMIN_FEE = 500;
```

| Field | Keterangan |
| --- | --- |
| `whatsapp` | Nomor admin. Dipakai untuk semua tombol WhatsApp dan pengiriman order. |
| `discord` | Link invite server Discord. |
| `tiktok` | Link profil TikTok. |
| `qris` | Path gambar QRIS. Ganti kalau gambar QRIS diganti. |
| `name` | Nama toko yang muncul di teks order. |
| `ADMIN_FEE` | Biaya admin wajib yang ditambahkan ke setiap paket. Saat ini Rp500. |

Link di header, footer, section pembayaran, dan modal checkout otomatis mengikuti konfigurasi ini. Gambar QRIS di halaman ikut tersinkron dari `STORE.qris`, termasuk tombol unduh.

## Alur pembayaran QRIS

QRIS di sini adalah **QRIS statis merchant** (bukan QRIS dinamis per transaksi). Artinya nominal tidak terkunci oleh sistem — pembeli wajib mengetik jumlah yang benar.

1. Pembeli pilih paket di section Harga, modal checkout terbuka.
2. Ringkasan order menampilkan: harga paket, biaya admin Rp500, dan total bayar.
3. Pembeli menekan **Unduh Foto QRIS** (gambar tersimpan sebagai `QRIS-PRABU-<kode-order>.jpg`) atau langsung scan QR yang tampil di layar.
4. Pembeli membuka m-banking / e-wallet, scan QRIS, lalu memasukkan nominal **pas** sesuai total di checkout. Tombol **Salin Nominal** membantu.
5. Pembeli isi nama dan nomor WhatsApp, lalu tekan **Kirim via WhatsApp**.
6. Pesan WhatsApp otomatis berisi kode order, paket, durasi, harga paket, biaya admin, total, dan data pembeli untuk dicocokkan admin.
7. Admin cek mutasi QRIS, cocokkan nominal + kode order, lalu kirim key manual.
8. Pembeli kirim screenshot bukti bayar di chat yang sama.

### Kenapa nominal harus pas

Nominal masuk ke rekening merchant tanpa keterangan otomatis. Satu-satunya cara admin mencocokkan order adalah dari **jumlah transfer** dan **kode order** yang dikirim pembeli. Karena itu biaya admin Rp500 ditambahkan sebagai pembeda: order 1 hari jadi Rp10.500, bukan Rp10.000 bulat.

Kalau nominal dibulatkan sendiri oleh pembeli (misal bayar Rp10.000), admin tidak punya bukti kuat bahwa itu order 1 hari dan bukan sisa transaksi lain. Checkout sudah menegaskan ini di dua tempat: ringkasan total dan kotak nominal QRIS.

### Kalau ada dua order dengan nominal sama

Bisa terjadi — dua orang beli paket 1 hari di hari yang sama, nominalnya sama-sama Rp10.500. Pencocokan tetap mungkin lewat jam transfer dan nama pengirim di mutasi. Kalau mau lebih ketat, tambahkan digit unik per order (misalnya 3 digit terakhir kode order) ke nominal, lalu sesuaikan teks checkout. Nominal per paket saat ini sudah +Rp500 sesuai permintaan, tanpa digit tambahan.

## Ubah harga

Edit object `PLANS` di `assets/js/app.js`. Ada dua tier: `personal` dan `reseller`.

```js
{
  id: "week",              // dipakai untuk deep link ?paket=week
  name: "1 Minggu",
  days: 7,
  price: 60000,            // harga paket, BELUM termasuk biaya admin
  old: 75000,              // harga coret, opsional
  badge: "Paling Laris",   // opsional
  popular: true,           // border emas + tombol gold
  // note: "5 key · masa aktif 7 hari.", // opsional, tampil di bawah harga
  features: ["Semua fitur kebuka", "Proses order prioritas", "Grup tips & config"],
}
```

- `price` adalah harga paket. Total yang dibayar pembeli = `price + ADMIN_FEE`.
- `days: 0` = Lifetime (harga per hari tidak dihitung).
- Diskon dihitung otomatis dari `Rp10.000/hari` untuk tier personal.
- Untuk reseller, tambahkan `accounts: 25` (jumlah key). Persentase hemat dihitung dari `old`.

Harga saat ini (belum termasuk Rp500):

| Paket | Harga paket | Total bayar |
| --- | --- | --- |
| 1 Hari | Rp10.000 | Rp10.500 |
| 3 Hari | Rp28.000 | Rp28.500 |
| 1 Minggu | Rp60.000 | Rp60.500 |
| 2 Minggu | Rp105.000 | Rp105.500 |
| 1 Bulan | Rp180.000 | Rp180.500 |
| 2 Bulan | Rp320.000 | Rp320.500 |
| 3 Bulan | Rp450.000 | Rp450.500 |
| Lifetime | Rp700.000 | Rp700.500 |

Reseller: Starter 5 key Rp200.000, Pro 10 key Rp350.000, Sultan 25 key Rp750.000, Partner 50 key Rp1.250.000 — semua ditambah Rp500 saat checkout.

## Ubah katalog

Edit array `FEATURES` di `assets/js/app.js`. Setiap item:

```js
{
  name: "ESP Healthbar",
  desc: "Deskripsi singkat.",
  cat: "ESP",          // label di kartu
  catKey: "esp",       // filter: aim | esp | safety
  tier: "PRO",         // ULTRA | PRO | NEW
  icon: "pulse",       // key dari object ICONS
  games: "Free Fire",  // teks kanan bawah kartu
}
```

Katalog sekarang: AimNeck, ESP Line, ESP Command Box, ESP Healthbar, Anti-Ban Shield, HWID Spoofer, Stream Mode.

Kalau menambah kategori baru, tambahkan tombol filter di `index.html`:

```html
<button class="chip" data-filter="misc" role="tab" aria-selected="false">Misc</button>
```

lalu pakai `catKey` yang sama di item katalog.

## Ganti gambar QRIS

1. Simpan gambar QRIS baru (JPG/PNG) ke `assets/img/`, misalnya `qris-prabu.jpg` (timpa file lama).
2. Kalau nama file berubah, update `STORE.qris` di `assets/js/app.js` dan atribut `src` gambar di `index.html` (section `#pembayaran` dan modal checkout).
3. Pastikan gambar tajam saat di-scan. Resolusi 1000px ke atas lebih aman. Jangan crop bagian sudut QR atau logo QRIS.
4. Cek ulang NMID yang ditulis di teks section pembayaran (`index.html`) supaya cocok dengan kartu QRIS baru.

Tombol unduh otomatis mengikuti `STORE.qris`, jadi tidak perlu mengubah dua tempat untuk file yang sama.

## Logo & aset brand

- `assets/img/logo.png` — logo asli PRABU SENSI ULTRA, 1254x1254. Dipakai apa adanya di header, hero, footer, favicon, dan apple touch icon. Jangan diedit, jangan di-crop, jangan diganti SVG.
- `assets/img/freefire.png` — ikon game Free Fire untuk kartu support.
- `assets/img/qris-prabu.jpg` — kartu QRIS asli dari merchant, dipakai tanpa edit.
- `assets/img/og-cover.jpg` — preview sosial 1200x630.

Mau ganti logo? Timpa `assets/img/logo.png` dengan file asli baru. Jangan ubah rasio atau menambahkan efek permanen ke file-nya.

## Deploy

Frontend tidak butuh build command dan tidak butuh PHP. Upload seluruh isi folder ke hosting apa pun:

- **cPanel / hosting biasa** — upload ke `public_html`.
- **Netlify / Vercel / GitHub Pages** — drag and drop folder, langsung jalan.
- **VPS / Nginx** — arahkan document root ke folder ini.

Setelah domain aktif:

- Ganti `og:image` di `index.html` jadi URL absolut:

  ```html
  <meta property="og:image" content="https://domain-lo.com/assets/img/og-cover.jpg" />
  ```

- Aktifkan HTTPS. Link `wa.me` dan gambar QRIS tetap jalan di HTTP, tapi checkout di HP lebih aman dan lebih dipercaya di HTTPS.
- Pastikan `assets/img/qris-prabu.jpg` ikut ter-upload dan ukurannya wajar (210 KB saat ini).

## Checklist sebelum live

- [ ] `STORE.whatsapp`, Discord, dan TikTok sudah benar.
- [ ] `STORE.qris` menunjuk ke gambar QRIS yang aktif.
- [ ] NMID di teks section pembayaran cocok dengan kartu QRIS.
- [ ] `ADMIN_FEE` masih Rp500 dan total di checkout sudah ikut berubah.
- [ ] Semua harga di `PLANS` sudah final.
- [ ] Katalog sesuai menu panel yang aktif (AimNeck, ESP Line, ESP Command Box, ESP Healthbar).
- [ ] Semua teks kompatibilitas konsisten: PC / emulator + `Support for MSI 5.22` + `v7a only`.
- [ ] Counter pengguna aktif mulai dari 50 dan naik setelah order dikirim via WhatsApp.
- [ ] `assets/img/logo.png` tetap file logo asli, tanpa edit.
- [ ] Tes **Pilih paket** → **Unduh Foto QRIS** → file benar-benar terunduh di HP.
- [ ] Tes **Salin Nominal** menyalin angka total (contoh `10500`).
- [ ] Tes **Kirim via WhatsApp**: pesan berisi kode order, harga paket, biaya admin, dan total.
- [ ] Scan QRIS pakai aplikasi banking/e-wallet sungguhan dan pastikan nama merchant `PRABU STUR` muncul.
- [ ] Cek tampilan di HP: QRIS tidak terpotong, tombol tidak keluar layar.
- [ ] Ganti `og:image` jadi URL absolut dan aktifkan HTTPS.

## Catatan operasional

- Verifikasi pembayaran manual. Tidak ada webhook, tidak ada status otomatis, tidak ada database.
- Data order terakhir (nama + nomor WhatsApp) disimpan di `localStorage` browser pembeli untuk isi otomatis form berikutnya. Tidak ada data yang dikirim ke server mana pun.
- Kode order dibuat di browser (`PSU-XXXXX`) dan hanya dipakai sebagai penanda di chat WhatsApp.
- Karena QRIS statis, refund dan sengketa nominal diselesaikan manual lewat WhatsApp. Simpan mutasi QRIS minimal 3 bulan.
