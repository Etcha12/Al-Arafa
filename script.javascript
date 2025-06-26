// script.js

// --- Data Dummy ---
const dummyAccounts = [
    { memberId: "030410", username: "Fachriza", password: "password123" },
    { memberId: "030411", username: "Akmal", password: "password123" },
    { memberId: "030412", username: "Rangga", password: "password123" },
    { memberId: "030500", username: "Alif", password: "password123" },
    { memberId: "030350", username: "Ali", password: "password123" },
    { memberId: "030351", username: "Khaerudin", password: "password123" },
];

const dummyBooks = [
    { id: 'b1', title: "Don Quixote", author: "Miguel de Cervantes", status: "Tersedia", stock: 2 },
    { id: 'b2', title: "Thinking Fast and Slow", author: "Daniel Kahneman", status: "Tersedia", stock: 3 },
    { id: 'b3', title: "To Kill a Mockingbird", author: "Harper Lee", status: "Dipinjam", stock: 0 },
    { id: 'b4', title: "Atomic Habits", author: "James Clear", status: "Tersedia", stock: 1 },
    { id: 'b5', title: "Harry Potter and the Sorcerer's Stone", author: "J.K. Rowling", status: "Tersedia", stock: 2 },
    { id: 'b6', title: "Negeri 5 Menara", author: "Ahmad Fuadi", status: "Tersedia", stock: 1 },
    { id: 'b7', title: "Laskar Pelangi", author: "Andrea Hirata", status: "Dipinjam", stock: 0 },
    { id: 'b8', title: "Laut Bercerita", author: "Leila S. Chudori", status: "Tersedia", stock: 3 },
    { id: 'b9', title: "Max Havelaar", author: "Multatuli", status: "Tersedia", stock: 1 },
    { id: 'b10', title: "The Secret History of the World", author: "Jonathan Black", status: "Tersedia", stock: 2 },
    { id: 'b11', title: "Sapiens: A Brief History of Humankind", author: "Yuval Noah Harari", status: "Tersedia", stock: 2 },
    { id: 'b12', title: "Filosofi Teras", author: "Henry Manampiring", status: "Dipinjam", stock: 0 },
    { id: 'b13', title: "Bumi Manusia", author: "Pramoedya Ananta Toer", status: "Tersedia", stock: 1 },
    { id: 'b14', title: "Cantik Itu Luka", author: "Eka Kurniawan", status: "Tersedia", stock: 1 },
    { id: 'b15', title: "Rich Dad Poor Dad", author: "Robert T. Kiyosaki", status: "Tersedia", stock: 2 },
];

const dummyRooms = [
    { id: 'r1', name: "Ruang Produksi Video", price: "Gratis", availability: "Tersedia", isPaid: false },
    { id: 'r2', name: "Ruang Produksi Podcast", price: "Gratis", availability: "Tersedia", isPaid: false },
    { id: 'r3', name: "Auditorium", price: "Rp 500.000 / Jam", availability: "Tersedia (Perlu Reservasi)", isPaid: true, basePricePerHour: 500000 }
];

const dummyTrainings = [
    { id: 't1', name: "Pelatihan Kewirausahaan", target: "masyarakat umum", schedule: "setiap hari Sabtu, 08:00 WIB", totalQuota: 15, filledQuota: 12 },
    { id: 't2', name: "Pelatihan Literasi Digital & Informasi", target: "siswa dan mahasiswa", schedule: "setiap Selasa, 16:00 WIB", totalQuota: 20, filledQuota: 18 },
    { id: 't3', name: "Pelatihan Penggunaan Software", target: "siswa dan mahasiswa", schedule: "setiap Rabu, 16:00 WIB", totalQuota: 18, filledQuota: 18 }, // Penuh
    { id: 't4', name: "Pelatihan Desain Pembelajaran", target: "guru dan dosen", schedule: "setiap Minggu, 08:00 WIB", totalQuota: 10, filledQuota: 5 }
];

let loggedInUser = null;

// --- General Modal Functions ---
function openModal(modalId) {
    document.getElementById(modalId).classList.remove("hidden");
    document.body.style.overflow = "hidden";
}

function closeModal(modalId) {
    document.getElementById(modalId).classList.add("hidden");
    document.body.style.overflow = "auto";
}

// --- Login Modal Functions ---
function openLoginModal() {
    openModal("loginModal");
    document.getElementById('errorMessage').classList.add('hidden');
    document.getElementById('loginForm').reset();
}

function closeLoginModal() {
    closeModal("loginModal");
}

function updateAuthUI() {
    const authArea = document.getElementById('authArea');
    if (!authArea) return; // Ensure authArea exists on the current page

    let loginButton = document.getElementById('loginButton');
    let welcomeButton = document.getElementById('welcomeButton');
    let welcomeMessageSpan = document.getElementById('welcomeMessage');
    let logoutButton = document.getElementById('logoutButton');

    // Create elements if they don't exist (for multi-page setup)
    if (!loginButton) {
        loginButton = document.createElement('button');
        loginButton.id = 'loginButton';
        loginButton.className = 'btn-primary px-4 py-2 rounded-md text-sm font-semibold shadow-md';
        loginButton.innerHTML = '<i class="fas fa-sign-in-alt mr-2"></i>Masuk';
        loginButton.onclick = openLoginModal;
        authArea.appendChild(loginButton);
    }
    if (!welcomeButton) {
        welcomeButton = document.createElement('button');
        welcomeButton.id = 'welcomeButton';
        welcomeButton.className = 'bg-gray-200 text-gray-800 px-4 py-2 rounded-md text-sm font-semibold cursor-default';
        welcomeButton.innerHTML = '<i class="fas fa-user-circle mr-2"></i><span id="welcomeMessage"></span>';
        authArea.appendChild(welcomeButton);
        welcomeMessageSpan = welcomeButton.querySelector('#welcomeMessage');
    }
    if (!logoutButton) {
        logoutButton = document.createElement('button');
        logoutButton.id = 'logoutButton';
        logoutButton.className = 'bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded-md text-xs font-semibold shadow-md';
        logoutButton.textContent = 'Keluar';
        logoutButton.onclick = logout;
        authArea.appendChild(logoutButton);
    }

    if (loggedInUser) {
        loginButton.classList.add('hidden');
        welcomeButton.classList.remove('hidden');
        logoutButton.classList.remove('hidden');
        if (welcomeMessageSpan) welcomeMessageSpan.textContent = loggedInUser.username;
    } else {
        loginButton.classList.remove('hidden');
        welcomeButton.classList.add('hidden');
        logoutButton.classList.add('hidden');
        if (welcomeMessageSpan) welcomeMessageSpan.textContent = '';
    }
}

function logout() {
    loggedInUser = null;
    updateAuthUI();
    // Redirect to home or refresh if needed, or just close modals
    if (window.location.pathname.includes('layanan.html')) {
        closeServiceModal(); // Close service modal if open
    }
    alert("Anda telah berhasil keluar.");
}

document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.getElementById('loginForm');
    if (loginForm) {
        loginForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const inputIdentifier = document.getElementById('memberIdOrUsername').value.trim();
            const password = document.getElementById('password').value;
            let foundAccount = null;

            for (let i = 0; i < dummyAccounts.length; i++) {
                const account = dummyAccounts[i];
                if ((account.memberId === inputIdentifier || account.username.toLowerCase() === inputIdentifier.toLowerCase()) && account.password === password) {
                    foundAccount = account;
                    break;
                }
            }

            if (foundAccount) {
                loggedInUser = foundAccount;
                closeLoginModal();
                updateAuthUI();
                alert(`Selamat datang, ${loggedInUser.username}!`);
            } else {
                document.getElementById('errorMessage').classList.remove('hidden');
            }
        });
    }
    updateAuthUI(); // Initial UI update on page load
});


// --- Service Modal Functions (for layanan.html) ---
function handleServiceClick(serviceType, id = null) {
    if (!loggedInUser) {
        openNotLoggedInModal();
    } else {
        openServiceModal(serviceType, id);
    }
}

function openServiceModal(serviceType, selectedItemId = null) {
    const modalTitle = document.getElementById('serviceModalTitle');
    const modalContent = document.getElementById('serviceModalContent');
    const serviceModalForm = document.getElementById('serviceModalForm');
    const confirmationMessage = document.getElementById('confirmationMessage');
    const additionalFields = document.getElementById('additionalServiceFormFields');

    if (!modalTitle || !modalContent || !serviceModalForm || !confirmationMessage || !additionalFields) {
        console.error("Service modal elements not found. Are you on layanan.html?");
        return;
    }

    modalContent.innerHTML = '';
    additionalFields.innerHTML = '';
    serviceModalForm.classList.remove('hidden');
    confirmationMessage.classList.add('hidden');

    document.getElementById('formName').value = loggedInUser ? loggedInUser.username : '';
    document.getElementById('formMemberId').value = loggedInUser ? loggedInUser.memberId : '';

    if (serviceType === 'pinjamRuangan') {
        modalTitle.textContent = 'Peminjaman Ruangan';
        let contentHtml = '<p class="mb-4 text-gray-700">Berikut daftar ruangan yang bisa dipinjam:</p><div class="grid grid-cols-1 gap-4">';
        
        dummyRooms.forEach(room => {
            contentHtml += `
                <div class="bg-blue-50 p-4 rounded-lg border border-blue-200">
                    <h3 class="text-xl font-bold text-blue-800 mb-2">${room.name} <span class="text-blue-600 font-normal text-base">(${room.price})</span></h3>
                    <p class="text-gray-600 text-sm">Status: <span class="font-semibold ${room.availability === 'Tersedia' || room.availability.includes('Tersedia') ? 'text-green-600' : 'text-red-600'}">${room.availability}</span></p>
                    <p class="text-gray-600 text-sm mt-1">Sistem Ketersediaan: Mohon hubungi kami untuk info ketersediaan slot waktu dan reservasi.</p>
                </div>
            `;
        });
        contentHtml += '</div><p class="mt-6 text-gray-600 text-sm">Untuk mengajukan peminjaman, silakan isi form di bawah.</p>';
        modalContent.innerHTML = contentHtml;

        additionalFields.innerHTML = `
            <div>
                <label class="block text-sm font-medium text-gray-700">Pilih Ruangan</label>
                <select id="selectedRoom" class="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm" required onchange="handleRoomSelection(this.value)">
                    <option value="">-- Pilih Ruangan --</option>
                    ${dummyRooms.map(room => `<option value="${room.id}" ${selectedItemId === room.id ? 'selected' : ''}>${room.name} (${room.price}) - ${room.availability}</option>`).join('')}
                </select>
            </div>
            <div id="roomDateTimeWrapper">
                <label class="block text-sm font-medium text-gray-700">Tanggal & Waktu Peminjaman</label>
                <input type="datetime-local" id="roomDateTime" class="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm" required />
            </div>
            <div id="auditoriumPaymentFields" class="hidden">
                <label class="block text-sm font-medium text-gray-700">Durasi Peminjaman (Jam)</label>
                <input type="number" id="durationHours" min="1" value="1" class="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm" oninput="calculateAuditoriumCost()" />
                <p class="text-sm text-gray-600 mt-2">Estimasi Biaya: <span id="estimatedCost" class="font-semibold text-blue-700">Rp 0</span></p>
            </div>
        `;
        if (selectedItemId) {
            handleRoomSelection(selectedItemId);
        }

    } else if (serviceType === 'pinjamBuku') {
        modalTitle.textContent = 'Peminjaman Buku';
        let contentHtml = '<p class="mb-4 text-gray-700">Berikut koleksi buku yang tersedia di perpustakaan kami. Anda dapat meminjam hingga 3 buku:</p><div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">';
        
        dummyBooks.forEach(book => {
            contentHtml += `
                <div class="bg-blue-50 p-4 rounded-lg shadow-sm border border-blue-200">
                    <h3 class="text-lg font-bold text-blue-800">${book.title}</h3>
                    <p class="text-gray-700 text-sm">Oleh: ${book.author}</p>
                    <p class="text-sm mt-2">Status: <span class="font-semibold ${book.status === 'Tersedia' ? 'text-green-600' : 'text-red-600'}">${book.status} ${book.status === 'Tersedia' ? `(${book.stock} tersedia)` : ''}</span></p>
                </div>
            `;
        });
        contentHtml += '</div><p class="mt-6 text-gray-600 text-sm">Pilih buku yang ingin Anda pinjam (maksimal 3 buku) di bawah ini:</p>';
        modalContent.innerHTML = contentHtml;

        additionalFields.innerHTML = `
            <div id="bookSelectionCheckboxes" class="space-y-2">
                ${dummyBooks.map(book => `
                    <label class="inline-flex items-center">
                        <input type="checkbox" name="selectedBooks" value="${book.id}" class="form-checkbox text-blue-600" ${book.status !== 'Tersedia' ? 'disabled' : ''}>
                        <span class="ml-2 text-gray-700 ${book.status !== 'Tersedia' ? 'line-through text-gray-500' : ''}">${book.title} - ${book.author} (${book.status})</span>
                    </label>
                `).join('')}
            </div>
            <div>
                <label class="block text-sm font-medium text-gray-700">Tanggal Pengembalian (Maks 7 hari dari sekarang)</label>
                <input type="date" id="bookReturnDate" class="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm" required />
            </div>
        `;

    } else if (serviceType === 'daftarPelatihan') {
        modalTitle.textContent = 'Daftar Pelatihan';
        let contentHtml = '<p class="mb-4 text-gray-700">Berikut daftar pelatihan yang bisa Anda ikuti. Klik pada kotak pelatihan untuk mendaftar:</p><div class="grid grid-cols-1 md:grid-cols-2 gap-4">';
        
        dummyTrainings.forEach(training => {
            const isFull = training.filledQuota >= training.totalQuota;
            contentHtml += `
                <div class="bg-blue-50 p-4 rounded-lg border border-blue-200 cursor-pointer card-hover-effect ${isFull ? 'opacity-60 cursor-not-allowed' : ''}" 
                     onclick="if(!${isFull}){handleServiceClick('daftarPelatihan', '${training.id}')}">
                    <h3 class="text-xl font-bold text-blue-800 mb-1">${training.name}</h3>
                    <p class="text-gray-700 text-sm mt-1"><i class="fas fa-users mr-2 text-blue-600"></i>Target Peserta: ${training.target}</p>
                    <p class="text-gray-700 text-sm"><i class="fas fa-calendar-alt mr-2 text-blue-600"></i>Jadwal: ${training.schedule}</p>
                    <p class="text-sm mt-2">Kuota: <span class="font-semibold ${isFull ? 'text-red-600' : 'text-green-600'}">${training.filledQuota}/${training.totalQuota}</span> ${isFull ? '(PENUH)' : ''}</p>
                </div>
            `;
        });
        contentHtml += '</div><p class="mt-6 text-gray-600 text-sm">Untuk mendaftar, silakan isi form di bawah.</p>';
        modalContent.innerHTML = contentHtml;

        const selectedTraining = dummyTrainings.find(t => t.id === selectedItemId);
        additionalFields.innerHTML = `
            <div>
                <label class="block text-sm font-medium text-gray-700">Pilih Pelatihan</label>
                <select id="selectedTraining" class="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm" required>
                    <option value="">-- Pilih Pelatihan --</option>
                    ${dummyTrainings.map(training => `
                        <option value="${training.id}" ${selectedTraining && selectedTraining.id === training.id ? 'selected' : ''} ${training.filledQuota >= training.totalQuota ? 'disabled' : ''}>
                            ${training.name} (${training.schedule}) - Kuota: ${training.filledQuota}/${training.totalQuota} ${training.filledQuota >= training.totalQuota ? '(PENUH)' : ''}
                        </option>
                    `).join('')}
                </select>
            </div>
        `;
    }

    openModal("serviceModal");
    document.getElementById('serviceSubmissionForm').dataset.serviceType = serviceType;
}

function closeServiceModal() {
    closeModal("serviceModal");
    document.getElementById('serviceSubmissionForm').reset();
    document.getElementById('confirmationMessage').classList.add('hidden');
    document.getElementById('serviceModalForm').classList.remove('hidden');
    const auditoriumPaymentFields = document.getElementById('auditoriumPaymentFields');
    if (auditoriumPaymentFields) auditoriumPaymentFields.classList.add('hidden');
}

function handleRoomSelection(roomId) {
    const selectedRoom = dummyRooms.find(room => room.id === roomId);
    const auditoriumPaymentFields = document.getElementById('auditoriumPaymentFields');
    const roomDateTimeWrapper = document.getElementById('roomDateTimeWrapper');

    if (selectedRoom && selectedRoom.isPaid) {
        auditoriumPaymentFields.classList.remove('hidden');
        document.getElementById('durationHours').value = 1;
        calculateAuditoriumCost();
        roomDateTimeWrapper.classList.remove('hidden');
    } else {
        auditoriumPaymentFields.classList.add('hidden');
        roomDateTimeWrapper.classList.remove('hidden');
    }
}

function calculateAuditoriumCost() {
    const selectedRoomId = document.getElementById('selectedRoom').value;
    const selectedRoom = dummyRooms.find(room => room.id === selectedRoomId);
    const durationHours = parseInt(document.getElementById('durationHours').value) || 0;
    let estimatedCost = 0;

    if (selectedRoom && selectedRoom.isPaid) {
        estimatedCost = selectedRoom.basePricePerHour * durationHours;
    }
    document.getElementById('estimatedCost').textContent = `Rp ${estimatedCost.toLocaleString('id-ID')}`;
}

document.addEventListener('DOMContentLoaded', () => {
    const serviceSubmissionForm = document.getElementById('serviceSubmissionForm');
    if (serviceSubmissionForm) {
        serviceSubmissionForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const serviceType = this.dataset.serviceType;
            const name = document.getElementById('formName').value;
            const memberId = document.getElementById('formMemberId').value;
            let confirmationDetail = '';

            if (serviceType === 'pinjamRuangan') {
                const selectedRoomId = document.getElementById('selectedRoom').value;
                const selectedRoom = dummyRooms.find(room => room.id === selectedRoomId);
                const roomDateTime = document.getElementById('roomDateTime').value;
                let costInfo = '';

                if (selectedRoom && selectedRoom.isPaid) {
                    const durationHours = parseInt(document.getElementById('durationHours').value) || 0;
                    const estimatedCost = selectedRoom.basePricePerHour * durationHours;
                    costInfo = ` dengan estimasi biaya Rp ${estimatedCost.toLocaleString('id-ID')}`;
                }
                confirmationDetail = `Permohonan peminjaman **${selectedRoom ? selectedRoom.name : 'Ruangan Tidak Dikenal'}** oleh **${name} (No. Anggota: ${memberId})** pada tanggal **${new Date(roomDateTime).toLocaleString('id-ID')}**${costInfo} berhasil diajukan.`;
            } else if (serviceType === 'pinjamBuku') {
                const selectedBookCheckboxes = Array.from(document.querySelectorAll('input[name="selectedBooks"]:checked'));
                if (selectedBookCheckboxes.length === 0) {
                    alert('Mohon pilih setidaknya satu buku.');
                    return;
                }
                if (selectedBookCheckboxes.length > 3) {
                    alert('Anda hanya bisa meminjam maksimal 3 buku.');
                    return;
                }
                const selectedBookIds = selectedBookCheckboxes.map(cb => cb.value);
                const selectedBooksTitles = selectedBookIds.map(id => dummyBooks.find(book => book.id === id).title).join(', ');
                const bookReturnDate = document.getElementById('bookReturnDate').value;

                selectedBookIds.forEach(id => {
                    const book = dummyBooks.find(b => b.id === id);
                    if (book && book.stock > 0) {
                        book.stock--;
                        if (book.stock === 0) {
                            book.status = 'Dipinjam';
                        }
                    }
                });

                confirmationDetail = `Permohonan peminjaman buku **"${selectedBooksTitles}"** oleh **${name} (No. Anggota: ${memberId})** berhasil diajukan. Mohon kembalikan sebelum tanggal **${new Date(bookReturnDate).toLocaleDateString('id-ID')}**.`;
            } else if (serviceType === 'daftarPelatihan') {
                const selectedTrainingId = document.getElementById('selectedTraining').value;
                const selectedTraining = dummyTrainings.find(t => t.id === selectedTrainingId);
                
                if (selectedTraining && selectedTraining.filledQuota < selectedTraining.totalQuota) {
                    selectedTraining.filledQuota++;
                } else if (selectedTraining && selectedTraining.filledQuota >= selectedTraining.totalQuota) {
                    alert('Maaf, kuota pelatihan ini sudah penuh.');
                    return;
                }

                confirmationDetail = `Pendaftaran pelatihan **${selectedTraining ? selectedTraining.name : 'Pelatihan Tidak Dikenal'}** oleh **${name} (No. Anggota: ${memberId})** berhasil. Detail lebih lanjut akan dikirim ke email Anda.`;
            }

            document.getElementById('serviceModalForm').classList.add('hidden');
            document.getElementById('confirmationDetail').innerHTML = confirmationDetail;
            document.getElementById('confirmationMessage').classList.remove('hidden');
        });
    }
});

// --- Not Logged In Modal Functions ---
function openNotLoggedInModal() {
    openModal("notLoggedInModal");
}

function closeNotLoggedInModal() {
    closeModal("notLoggedInModal");
}

function goToLoginFromNotification() {
    closeNotLoggedInModal();
    openLoginModal();
}

// Global event listener for closing modals by clicking outside
document.addEventListener('click', (event) => {
    const loginModal = document.getElementById('loginModal');
    const serviceModal = document.getElementById('serviceModal');
    const notLoggedInModal = document.getElementById('notLoggedInModal');

    if (loginModal && !loginModal.classList.contains('hidden') && !loginModal.querySelector('.modal-content').contains(event.target) && event.target !== document.getElementById('loginButton')) {
        closeLoginModal();
    }
    if (serviceModal && !serviceModal.classList.contains('hidden') && !serviceModal.querySelector('.modal-content').contains(event.target) && !event.target.closest('.service-button')) {
        closeServiceModal();
    }
    if (notLoggedInModal && !notLoggedInModal.classList.contains('hidden') && !notLoggedInModal.querySelector('.modal-content').contains(event.target) && event.target !== document.getElementById('loginButton')) {
        closeNotLoggedInModal();
    }
});

