// Dummy data for services (can be expanded)
const serviceData = {
    pinjamRuangan: {
        title: "Peminjaman Ruangan",
        description: "Pesan ruang produksi video, podcast, atau auditorium untuk berbagai kebutuhan acara dan kreasi Anda.",
        rooms: [
            { id: 'r1', name: "Ruang Produksi Video", price: "Gratis", availability: "Tersedia" },
            { id: 'r2', name: "Ruang Produksi Podcast", price: "Gratis", availability: "Tersedia" },
            { id: 'r3', name: "Auditorium", price: "Rp 500.000 / Jam", availability: "Tersedia (Perlu Reservasi)" }
        ]
    },
    pinjamBuku: {
        title: "Peminjaman Buku",
        description: "Akses koleksi buku, jurnal, dan sumber daya digital kami. Tingkatkan pengetahuan Anda dengan beragam topik yang tersedia.",
        books: [
            { id: 'b1', title: "Don Quixote", author: "Miguel de Cervantes", status: "Tersedia", stock: 2 },
            { id: 'b2', title: "Thinking Fast and Slow", author: "Daniel Kahneman", status: "Tersedia", stock: 3 },
            { id: 'b3', title: "To Kill a Mockingbird", author: "Harper Lee", status: "Dipinjam", stock: 0 },
            // ... more books
        ]
    },
    daftarPelatihan: {
        title: "Daftar Pelatihan",
        description: "Ikuti berbagai pelatihan keterampilan digital dan hidup yang relevan untuk meningkatkan kompetensi dan peluang Anda.",
        trainings: [
            { id: 't1', name: "Pelatihan Kewirausahaan", target: "masyarakat umum", schedule: "setiap hari Sabtu, 08:00 WIB", totalQuota: 15, filledQuota: 12 },
            { id: 't2', name: "Pelatihan Literasi Digital & Informasi", target: "siswa dan mahasiswa", schedule: "setiap Selasa, 16:00 WIB", totalQuota: 20, filledQuota: 18 },
            // ... more trainings
        ]
    }
};

function openServiceModal(serviceType) {
    // This function would dynamically load content into a modal based on serviceType
    // and check for authentication using `currentUser` from auth.js
    if (!currentUser) {
        alert('Anda harus login untuk mengakses layanan ini.');
        window.location.href = 'login.html';
        return;
    }

    const modal = document.getElementById('service-modal'); // Assume a modal element exists
    const modalTitle = document.getElementById('service-modal-title');
    const modalContent = document.getElementById('service-modal-content');

    const data = serviceData[serviceType];
    if (data) {
        modalTitle.textContent = data.title;
        let contentHTML = `<p>${data.description}</p>`;

        if (serviceType === 'pinjamRuangan') {
            contentHTML += '<h3>Daftar Ruangan:</h3><ul>';
            data.rooms.forEach(room => {
                contentHTML += `<li>${room.name} (${room.price}) - Status: ${room.availability}</li>`;
            });
            contentHTML += '</ul><p>Silakan hubungi staf untuk reservasi.</p>';
        } else if (serviceType === 'pinjamBuku') {
            contentHTML += '<h3>Koleksi Buku:</h3><ul>';
            data.books.forEach(book => {
                contentHTML += `<li>${book.title} oleh ${book.author} - Status: ${book.status} (${book.stock} tersedia)</li>`;
            });
            contentHTML += '</ul><p>Form peminjaman akan tersedia setelah Anda memilih buku.</p>';
        } else if (serviceType === 'daftarPelatihan') {
            contentHTML += '<h3>Jadwal Pelatihan:</h3><ul>';
            data.trainings.forEach(training => {
                const isFull = training.filledQuota >= training.totalQuota;
                contentHTML += `<li>${training.name} (${training.schedule}) - Kuota: ${training.filledQuota}/${training.totalQuota} ${isFull ? '(PENUH)' : ''}</li>`;
            });
            contentHTML += '</ul><p>Silakan isi form pendaftaran di bawah.</p>';
        }

        modalContent.innerHTML = contentHTML;
        modal.classList.remove('hidden'); // Show the modal
    }
}

// Example of how to trigger the modal from a button click (in services.html)
// document.getElementById('btn-pinjam-ruangan').addEventListener('click', () => openServiceModal('pinjamRuangan'));
