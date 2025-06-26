const dummyUsers = [
    { username: 'Fachriza', password: 'password123' },
    { username: 'Akmal', password: 'password123' },
    { username: 'Rangga', password: 'password123' },
    { username: 'Alif', password: 'password123' },
    { username: 'Ali', password: 'password123' },
    { username: 'Khaerudin', password: 'password123' }
];

let currentUser = null;

function updateAuthUI() {
    const loginBtn = document.getElementById('login-btn');
    const userProfile = document.getElementById('user-profile');
    const welcomeMessage = document.getElementById('welcome-message');
    const logoutBtn = document.getElementById('logout-btn');

    if (loginBtn && userProfile && welcomeMessage && logoutBtn) {
        if (currentUser) {
            loginBtn.classList.add('hidden');
            userProfile.classList.remove('hidden');
            welcomeMessage.textContent = `Halo, ${currentUser.username}!`;
        } else {
            loginBtn.classList.remove('hidden');
            userProfile.classList.add('hidden');
            welcomeMessage.textContent = '';
        }
    }
}

function handleLogin(event) {
    event.preventDefault();
    const usernameInput = document.getElementById('username').value;
    const passwordInput = document.getElementById('password').value;
    const loginError = document.getElementById('login-error');

    const foundUser = dummyUsers.find(user => 
        user.username.toLowerCase() === usernameInput.toLowerCase() && user.password === passwordInput
    );

    if (foundUser) {
        currentUser = foundUser;
        localStorage.setItem('loggedInUser', JSON.stringify(currentUser)); // Store user in local storage
        window.location.href = 'index.html'; // Redirect to home or dashboard
    } else {
        loginError.classList.remove('hidden');
    }
}

function handleLogout() {
    currentUser = null;
    localStorage.removeItem('loggedInUser'); // Clear user from local storage
    window.location.href = 'index.html'; // Redirect to home
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', () => {
    const storedUser = localStorage.getItem('loggedInUser');
    if (storedUser) {
        currentUser = JSON.parse(storedUser);
    }
    updateAuthUI();

    const loginForm = document.getElementById('login-form');
    if (loginForm) {
        loginForm.addEventListener('submit', handleLogin);
    }

    const loginBtn = document.getElementById('login-btn');
    if (loginBtn) {
        loginBtn.addEventListener('click', () => {
            window.location.href = 'login.html'; // Redirect to login page
        });
    }

    const logoutBtn = document.getElementById('logout-btn');
    if (logoutBtn) {
        logoutBtn.addEventListener('click', handleLogout);
    }
});

// Function to check if user is logged in (for protected pages)
function checkAuth() {
    const storedUser = localStorage.getItem('loggedInUser');
    if (!storedUser) {
        alert('Anda harus login untuk mengakses halaman ini.');
        window.location.href = 'login.html'; // Redirect to login if not authenticated
    } else {
        currentUser = JSON.parse(storedUser);
    }
}
