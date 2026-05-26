# Product Dashboard: Optimasi UI & Error Handling

Proyek ini adalah sebuah aplikasi Dashboard Produk berbasis React yang diimplementasikan dengan teknik optimasi performa antarmuka (UI) tingkat lanjut dan manajemen kesalahan (*error handling*) yang tangguh. Proyek ini dibuat untuk memahami siklus render, manajemen state asinkron, dan pemulihan UI (*error recovery*).

## 📊 Alur Kerja Aplikasi (Workflow)

Aplikasi ini beroperasi dengan alur kerja yang terbagi menjadi tiga fase utama: **Fase Inisialisasi & Fetching Data**, **Fase Interaksi & Optimasi Filter**, serta **Fase Manajemen Error**.

### 1. Inisialisasi & Fetching Data (Async Phase)
[App Muat Pertama Kali]
        │
        ▼
[Custom Hook: useProducts()] ──► Memanggil API (Simulasi Error Otomatis)
        │
        ├──► JIKA ERROR (404): Menampilkan Fallback UI Jaringan (Merah) + Tombol "Retry"
        │                      └─► Pengguna klik "Retry" ──► URL diperbaiki ──► Fetch Ulang
        │
        └──► JIKA SUKSES: State `products` terisi ──► Loading Berhenti ──► Render UI Utama

### 2. Interaksi & Optimasi UI (Render Phase)
[Pengguna Klik Tombol Filter]
        │
        ▼
[useTransition (startTransition)] ──► Menandai update filter sebagai 'Non-Urgent'
        │                             └─► `isPending` aktif ──► Muncul teks "Memproses filter..."
        │
[App Render Ulang]
        │
        ├──► [useMemo]: `expensiveCalculation` HANYA berjalan jika `products` atau `filter` berubah.
        │               Mencegah kalkulasi berat berjalan sia-sia di render lain.
        │
        └──► [React.memo]: Komponen `FilterBar`, `ProductList`, dan `ProductItem` memeriksa properti (props).
                           Karena referensi data stabil, komponen-komponen ini MENCEGAH re-render massal.

### 3. Manajemen Kesalahan Komponen (Render Error Phase)
[Error Terjadi di Komponen UI (Misal: ProductItem)]
        │
        ▼
[ErrorBoundary] Menangkap error melalui `getDerivedStateFromError`
        │
        ├──► Memblokir kerusakan UI global (layar putih/blank)
        │
        └──► Menampilkan Fallback UI Error (Kotak Merah) + Tombol "Coba Lagi"
                └─► Klik "Coba Lagi" ──► Reset state error ──► UI mencoba merender ulang

## 🛠️ Fitur & Teknik Optimasi yang Diterapkan

* **`React.memo`**: Dibungkus pada `FilterBar`, `ProductList`, dan `ProductItem` untuk memastikan komponen anak tidak melakukan *re-render* berantai jika properti yang diterima sama secara referensi.
* **`useMemo`**: Digunakan untuk meng-cache hasil dari `expensiveCalculation`. Loop simulasi yang memakan waktu tidak akan dieksekusi ulang kecuali state filter atau data produk benar-benar berubah.
* **`useTransition` (React 18)**: Mengoptimalkan pengalaman pengguna dengan memisahkan pembaruan state yang mendesak dengan pembaruan UI yang berat, menjaga aplikasi tetap responsif.
* **Graceful Degradation (Async Error)**: Menggunakan blok `try/catch/finally` di dalam *custom hook* untuk menangkap error jaringan (seperti HTTP 404) dan menyediakan mekanisme pemulihan URL dinamis.
* **UI Error Recovery**: Komponen kelas `ErrorBoundary` dilengkapi dengan method `handleRetry` untuk mereset kondisi error tanpa harus memaksa pengguna melakukan *hard-reload* pada browser.

## 📂 Struktur Folder Proyek

* **`src/components/`**: Berisi komponen presentasional (`FilterBar.jsx`, `ProductItem.jsx`, `ProductList.jsx`) dan pembungkus error (`ErrorBoundary.jsx`).
* **`src/hooks/`**: Berisi *custom logic* (`useProducts.js`) untuk memisahkan pengambilan data dari tampilan antarmuka.
* **`src/utils/`**: Berisi fungsi *helper* eksternal seperti `helpers.js`.
* **`src/App.js`**: Komponen utama yang mengatur state, transisi, dan merangkai seluruh antarmuka.

## 🚀 Cara Menjalankan Secara Lokal

1. Clone repositori ini atau masuk ke direktori proyek melalui terminal.
2. Install dependensi dengan perintah: `npm install`
3. Jalankan server pengembangan lokal: `npm start`
4. Buka http://localhost:3000 di browser.