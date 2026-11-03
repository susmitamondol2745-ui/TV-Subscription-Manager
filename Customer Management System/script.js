// Login logic
function handleLogin(event) {
    event.preventDefault();
    document.getElementById('login-view').style.display = 'none';
    document.getElementById('app-workspace').style.display = 'flex';
    switchView('dashboard');
}

// Logout logic
function handleLogout() {
    document.getElementById('app-workspace').style.display = 'none';
    document.getElementById('login-view').style.display = 'block';
}

// View switching inside main dashboard
function switchView(viewId) {
    document.querySelectorAll('.workspace-section').forEach(section => {
        section.classList.remove('active');
    });

    document.querySelectorAll('.sidebar-menu li').forEach(li => {
        li.classList.remove('active');
    });

    if (viewId === 'dashboard') {
        document.getElementById('dashboard-view').classList.add('active');
        document.getElementById('nav-dashboard').classList.add('active');
    } else if (viewId === 'customers') {
        document.getElementById('customers-view').classList.add('active');
        document.getElementById('nav-customers').classList.add('active');
        document.getElementById('table-title').innerText = "Customers";
        document.getElementById('table-subtitle').innerText = "30 customers · Manage subscriptions and renewals";
        loadCustomerData('all');
    } else if (viewId === 'expiring') {
        document.getElementById('customers-view').classList.add('active');
        document.getElementById('nav-expiring').classList.add('active');
        document.getElementById('table-title').innerText = "Expiring Soon";
        document.getElementById('table-subtitle').innerText = "4 subscriptions expire within the next 10 days";
        loadCustomerData('expiring');
    } else if (viewId === 'expired') {
        document.getElementById('customers-view').classList.add('active');
        document.getElementById('nav-expired').classList.add('active');
        document.getElementById('table-title').innerText = "Expired Subscriptions";
        document.getElementById('table-subtitle').innerText = "2 subscriptions have expired. Renew them or follow up.";
        loadCustomerData('expired');
    } else if (viewId === 'detail') {
        document.getElementById('detail-view').classList.add('active');
    } else if (viewId === 'add-customer') {
        document.getElementById('add-customer-view').classList.add('active');
    } else if (viewId === 'settings') {
        document.getElementById('settings-view').classList.add('active');
        document.getElementById('nav-settings').classList.add('active');
    }
}

// Load dynamic data for Customer views
function loadCustomerData(type) {
    const tbody = document.getElementById('customer-table-body');
    if (!tbody) return;

    if (type === 'all') {
        tbody.innerHTML = `
            <tr onclick="switchView('detail')" style="cursor:pointer;">
                <td>
                    <div class="customer-info-cell">
                        <span class="avatar-sm">JS</span>
                        <div><h4>John Smith</h4><p>john@email.com</p></div>
                    </div>
                </td>
                <td>+1 555 012 3456</td>
                <td>Jul 8, 2026</td>
                <td>3 mo</td>
                <td>Oct 8</td>
                <td><span class="status-badge orange">● 3 days left</span></td>
                <td>
                    <button class="btn-secondary" onclick="event.stopPropagation(); openModal('reminder-modal')">Message</button>
                    <button class="btn-primary" onclick="event.stopPropagation(); openModal('renew-modal')">Renew</button>
                </td>
            </tr>
            <tr>
                <td>
                    <div class="customer-info-cell">
                        <span class="avatar-sm">MB</span>
                        <div><h4>Michael Brown</h4><p>michael@email.com</p></div>
                    </div>
                </td>
                <td>+1 555 013 7788</td>
                <td>Jul 12, 2026</td>
                <td>3 mo</td>
                <td>Oct 12</td>
                <td><span class="status-badge orange">● 7 days left</span></td>
                <td>
                    <button class="btn-secondary" onclick="openModal('reminder-modal')">Message</button>
                    <button class="btn-primary" onclick="openModal('renew-modal')">Renew</button>
                </td>
            </tr>
        `;
    } else if (type === 'expiring') {
        tbody.innerHTML = `
            <tr onclick="switchView('detail')" style="cursor:pointer;">
                <td>
                    <div class="customer-info-cell">
                        <span class="avatar-sm">JS</span>
                        <div><h4>John Smith</h4><p>john@email.com</p></div>
                    </div>
                </td>
                <td>+1 555 012 3456</td>
                <td>Jul 8, 2026</td>
                <td>3 mo</td>
                <td>Oct 8</td>
                <td><span class="status-badge orange">● 3 days left</span></td>
                <td>
                    <button class="btn-secondary" onclick="event.stopPropagation(); openModal('reminder-modal')">Send Reminder</button>
                    <button class="btn-primary" onclick="event.stopPropagation(); openModal('renew-modal')">Renew</button>
                </td>
            </tr>
        `;
    } else if (type === 'expired') {
        tbody.innerHTML = `
            <tr>
                <td>
                    <div class="customer-info-cell">
                        <span class="avatar-sm">RH</span>
                        <div><h4>Robert Hall</h4><p>robert@email.com</p></div>
                    </div>
                </td>
                <td>+1 555 017 4410</td>
                <td>Apr 3, 2026</td>
                <td>6 mo</td>
                <td>Oct 3</td>
                <td><span class="status-badge red">● Expired 2 days ago</span></td>
                <td>
                    <button class="btn-primary" onclick="openModal('renew-modal')">Renew</button>
                    <button class="btn-secondary" onclick="openModal('reminder-modal')">Message</button>
                </td>
            </tr>
        `;
    }
}

function openModal(modalId) {
    document.getElementById(modalId).classList.add('open');
}

function closeModal(modalId) {
    document.getElementById(modalId).classList.remove('open');
}