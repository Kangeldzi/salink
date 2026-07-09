// ================================================================
// SALINK - API CONNECTION
// ================================================================
// Backend: Google Apps Script
// URL: https://script.google.com/macros/s/AKfycbzTGcN2FcOsC_rx01tUSvdw_trm2gKpJqUMyJSbYNonDYSqP5yn2ChYVc3ubWqaAyZC8A/exec
// ================================================================

const API_URL = 'https://script.google.com/macros/s/AKfycbzTGcN2FcOsC_rx01tUSvdw_trm2gKpJqUMyJSbYNonDYSqP5yn2ChYVc3ubWqaAyZC8A/exec';

// ================================================================
// FUNGSI UTAMA PANGGIL API
// ================================================================

async function callAPI(action, data = {}) {
    try {
        const response = await fetch(API_URL, {
            method: 'POST',
            mode: 'no-cors', // Untuk mengatasi CORS
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                action: action,
                data: data
            })
        });
        
        // Karena mode 'no-cors', kita tidak bisa membaca response langsung
        // Gunakan pendekatan alternatif: kirim data dan redirect
        return { sukses: true, pesan: 'Permintaan terkirim!' };
    } catch (error) {
        console.error('❌ API Error:', error);
        return { sukses: false, pesan: error.message };
    }
}

// ================================================================
// ALTERNATIF: MENGGUNAKAN IFRAME / FORM SUBMIT
// ================================================================

function callAPIWithForm(action, data) {
    return new Promise((resolve, reject) => {
        const form = document.createElement('form');
        form.method = 'POST';
        form.action = API_URL;
        form.target = 'apiFrame';
        form.style.display = 'none';
        
        // Tambahkan field action
        const actionField = document.createElement('input');
        actionField.type = 'hidden';
        actionField.name = 'action';
        actionField.value = action;
        form.appendChild(actionField);
        
        // Tambahkan field data (JSON)
        const dataField = document.createElement('input');
        dataField.type = 'hidden';
        dataField.name = 'data';
        dataField.value = JSON.stringify(data);
        form.appendChild(dataField);
        
        document.body.appendChild(form);
        
        // Buat iframe untuk menerima response
        const iframe = document.createElement('iframe');
        iframe.name = 'apiFrame';
        iframe.style.display = 'none';
        document.body.appendChild(iframe);
        
        iframe.onload = function() {
            try {
                const response = iframe.contentDocument.body.textContent;
                const result = JSON.parse(response);
                resolve(result);
            } catch (e) {
                resolve({ sukses: true, pesan: 'Permintaan terkirim!' });
            }
            form.remove();
            iframe.remove();
        };
        
        form.submit();
    });
}

// ================================================================
// FUNGSI API - PENGGUNA (USERS)
// ================================================================

// DAFTAR PENGGUNA BARU
async function apiDaftarPengguna(data) {
    return await callAPI('daftarPengguna', data);
}

// LOGIN
async function apiMasuk(namaPengguna, kataSandi) {
    return await callAPI('masuk', {
        nama_pengguna: namaPengguna,
        kata_sandi: kataSandi
    });
}

// GET PROFIL PENGGUNA
async function apiGetPengguna(idPengguna) {
    return await callAPI('getPenggunaById', { id: idPengguna });
}

// UPDATE PROFIL
async function apiUpdateProfil(idPengguna, data) {
    return await callAPI('updateProfilPengguna', {
        id: idPengguna,
        data: data
    });
}

// GET ALL PENGGUNA (untuk search/invite)
async function apiGetAllPengguna() {
    return await callAPI('getAllPengguna', {});
}

// ================================================================
// FUNGSI API - POSTINGAN (POSTS)
// ================================================================

// BUAT POSTINGAN
async function apiBuatPostingan(data) {
    return await callAPI('buatPostingan', data);
}

// GET ALL POSTINGAN
async function apiGetAllPostingan(limit = 50) {
    return await callAPI('getAllPostingan', { limit: limit });
}

// GET POSTINGAN BY PENGGUNA
async function apiGetPostinganByPengguna(idPengguna) {
    return await callAPI('getPostinganByPengguna', { id_pengguna: idPengguna });
}

// UPDATE POSTINGAN (like, edit)
async function apiUpdatePostingan(idPostingan, field, value) {
    return await callAPI('updatePostingan', {
        id: idPostingan,
        field: field,
        value: value
    });
}

// HAPUS POSTINGAN
async function apiHapusPostingan(idPostingan, idPengguna) {
    return await callAPI('hapusPostingan', {
        id_postingan: idPostingan,
        id_pengguna: idPengguna
    });
}

// ================================================================
// FUNGSI API - KOMENTAR (COMMENTS)
// ================================================================

// BUAT KOMENTAR
async function apiBuatKomentar(data) {
    return await callAPI('buatKomentar', data);
}

// GET KOMENTAR BY POSTINGAN
async function apiGetKomentarByPostingan(idPostingan) {
    return await callAPI('getKomentarByPostingan', { id_postingan: idPostingan });
}

// TAMBAH BALASAN
async function apiTambahBalasan(idKomentar, data) {
    return await callAPI('tambahBalasan', {
        id_komentar: idKomentar,
        data: data
    });
}

// HAPUS KOMENTAR
async function apiHapusKomentar(idKomentar, idPengguna) {
    return await callAPI('hapusKomentar', {
        id_komentar: idKomentar,
        id_pengguna: idPengguna
    });
}

// ================================================================
// FUNGSI API - TEMAN (FRIENDS)
// ================================================================

// TAMBAH TEMAN
async function apiTambahTeman(data) {
    return await callAPI('tambahTeman', data);
}

// TERIMA TEMAN
async function apiTerimaTeman(idTeman) {
    return await callAPI('terimaTeman', { id_teman: idTeman });
}

// GET TEMAN BY PENGGUNA
async function apiGetTemanByPengguna(idPengguna) {
    return await callAPI('getTemanByPengguna', { id_pengguna: idPengguna });
}

// BLOKIR TEMAN
async function apiBlokirTeman(idTeman) {
    return await callAPI('blokirTeman', { id_teman: idTeman });
}

// ================================================================
// FUNGSI API - PRODUK (PRODUCTS)
// ================================================================

// BUAT PRODUK
async function apiBuatProduk(data) {
    return await callAPI('buatProduk', data);
}

// GET PRODUK BY PENJUAL
async function apiGetProdukByPenjual(idPenjual) {
    return await callAPI('getProdukByPenjual', { id_penjual: idPenjual });
}

// UPDATE PRODUK
async function apiUpdateProduk(idProduk, data) {
    return await callAPI('updateProduk', {
        id_produk: idProduk,
        data: data
    });
}

// ================================================================
// FUNGSI API - TRANSAKSI (TRANSACTIONS)
// ================================================================

// BUAT TRANSAKSI
async function apiBuatTransaksi(data) {
    return await callAPI('buatTransaksi', data);
}

// GET TRANSAKSI BY PENGGUNA
async function apiGetTransaksiByPengguna(idPengguna) {
    return await callAPI('getTransaksiByPengguna', { id_pengguna: idPengguna });
}

// UPDATE STATUS TRANSAKSI
async function apiUpdateStatusTransaksi(idTransaksi, status, waktuSelesai) {
    return await callAPI('updateStatusTransaksi', {
        id_transaksi: idTransaksi,
        status: status,
        waktu_selesai: waktuSelesai
    });
}

// ================================================================
// FUNGSI API - NOTIFIKASI (NOTIFICATIONS)
// ================================================================

// BUAT NOTIFIKASI
async function apiBuatNotifikasi(data) {
    return await callAPI('buatNotifikasi', data);
}

// GET NOTIFIKASI BY PENGGUNA
async function apiGetNotifikasiByPengguna(idPengguna) {
    return await callAPI('getNotifikasiByPengguna', { id_pengguna: idPengguna });
}

// TANDAI NOTIFIKASI DIBACA
async function apiTandaiNotifikasiDibaca(idNotifikasi) {
    return await callAPI('tandaiNotifikasiDibaca', { id_notifikasi: idNotifikasi });
}

// TANDAI SEMUA NOTIFIKASI DIBACA
async function apiTandaiSemuaNotifikasiDibaca(idPengguna) {
    return await callAPI('tandaiSemuaNotifikasiDibaca', { id_pengguna: idPengguna });
}

// ================================================================
// FUNGSI API - LAPORAN (REPORTS)
// ================================================================

// BUAT LAPORAN
async function apiBuatLaporan(data) {
    return await callAPI('buatLaporan', data);
}

// GET ALL LAPORAN
async function apiGetAllLaporan() {
    return await callAPI('getAllLaporan', {});
}

// GET LAPORAN AKTIF
async function apiGetLaporanAktif() {
    return await callAPI('getLaporanAktif', {});
}

// UPDATE STATUS LAPORAN
async function apiUpdateStatusLaporan(idLaporan, status, ditanganiOleh) {
    return await callAPI('updateStatusLaporan', {
        id_laporan: idLaporan,
        status: status,
        ditangani_oleh: ditanganiOleh
    });
}

// ================================================================
// FUNGSI API - STATISTIK (STATS)
// ================================================================

// GET STATISTIK DASHBOARD
async function apiGetStatistikDashboard() {
    return await callAPI('getStatistikDashboard', {});
}

// GET STATISTIK MINGGUAN (untuk grafik)
async function apiGetStatistikMingguan() {
    return await callAPI('getStatistikMingguan', {});
}

// GET DASHBOARD STATS
async function apiGetDashboardStats() {
    return await callAPI('getDashboardStats', {});
}

// ================================================================
// FUNGSI UTILITY - CEK KONEKSI
// ================================================================

async function apiCekKoneksi() {
    try {
        const response = await fetch(API_URL);
        const text = await response.text();
        return text.includes('SALINK Backend is running');
    } catch (error) {
        console.error('❌ Koneksi gagal:', error);
        return false;
    }
}

// ================================================================
// EXPORT
// ================================================================

if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        apiDaftarPengguna,
        apiMasuk,
        apiGetPengguna,
        apiUpdateProfil,
        apiGetAllPengguna,
        apiBuatPostingan,
        apiGetAllPostingan,
        apiGetPostinganByPengguna,
        apiUpdatePostingan,
        apiHapusPostingan,
        apiBuatKomentar,
        apiGetKomentarByPostingan,
        apiTambahBalasan,
        apiHapusKomentar,
        apiTambahTeman,
        apiTerimaTeman,
        apiGetTemanByPengguna,
        apiBlokirTeman,
        apiBuatProduk,
        apiGetProdukByPenjual,
        apiUpdateProduk,
        apiBuatTransaksi,
        apiGetTransaksiByPengguna,
        apiUpdateStatusTransaksi,
        apiBuatNotifikasi,
        apiGetNotifikasiByPengguna,
        apiTandaiNotifikasiDibaca,
        apiTandaiSemuaNotifikasiDibaca,
        apiBuatLaporan,
        apiGetAllLaporan,
        apiGetLaporanAktif,
        apiUpdateStatusLaporan,
        apiGetStatistikDashboard,
        apiGetStatistikMingguan,
        apiGetDashboardStats,
        apiCekKoneksi
    };
}
