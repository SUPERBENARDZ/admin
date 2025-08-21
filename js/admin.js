/**
 * AgribaseGroup E-commerce Website
 * Admin Panel JavaScript
 */

document.addEventListener('DOMContentLoaded', function() {
    // Check if user is logged in
    checkAdminLogin();
    
    // Initialize admin components
    initAdminComponents();
    
    // Initialize data visualization if on dashboard
    if (window.location.pathname.includes('dashboard.html')) {
        initDashboardCharts();
    }
    
    // Initialize product management if on products page
    if (window.location.pathname.includes('products.html')) {
        initProductManagement();
    }
    
    // Initialize order management if on orders page
    if (window.location.pathname.includes('orders.html')) {
        initOrderManagement();
    }
    
    // Initialize agent management if on agents page
    if (window.location.pathname.includes('agents.html')) {
        initAgentManagement();
    }
});

/**
 * Check if admin is logged in
 */
function checkAdminLogin() {
    const adminLoggedIn = localStorage.getItem('adminLoggedIn');
    
    if (!adminLoggedIn || adminLoggedIn !== 'true') {
        // Redirect to login page if not logged in
        if (!window.location.pathname.includes('index.html')) {
            window.location.href = 'index.html';
        }
    }
    
    // Logout functionality
    const logoutBtn = document.getElementById('logout-btn');
    
    if (logoutBtn) {
        logoutBtn.addEventListener('click', function() {
            // Clear login status
            localStorage.removeItem('adminLoggedIn');
            
            // Redirect to login page
            window.location.href = 'index.html';
        });
    }
}

/**
 * Initialize admin components
 */
function initAdminComponents() {
    // Mobile sidebar toggle
    const sidebarToggle = document.querySelector('.sidebar-toggle');
    const adminSidebar = document.querySelector('.admin-sidebar');
    
    if (sidebarToggle && adminSidebar) {
        sidebarToggle.addEventListener('click', function() {
            adminSidebar.classList.toggle('active');
            this.classList.toggle('active');
        });
    }
    
    // Notifications dropdown
    const notificationToggle = document.querySelector('.notification-toggle');
    const notificationDropdown = document.querySelector('.notification-dropdown');
    
    if (notificationToggle && notificationDropdown) {
        notificationToggle.addEventListener('click', function(e) {
            e.preventDefault();
            notificationDropdown.classList.toggle('show');
        });
        
        // Close dropdown when clicking outside
        document.addEventListener('click', function(e) {
            if (!notificationToggle.contains(e.target) && !notificationDropdown.contains(e.target)) {
                notificationDropdown.classList.remove('show');
            }
        });
    }
    
    // User dropdown
    const userToggle = document.querySelector('.admin-user');
    const userDropdown = document.querySelector('.user-dropdown');
    
    if (userToggle && userDropdown) {
        userToggle.addEventListener('click', function(e) {
            e.preventDefault();
            userDropdown.classList.toggle('show');
        });
        
        // Close dropdown when clicking outside
        document.addEventListener('click', function(e) {
            if (!userToggle.contains(e.target) && !userDropdown.contains(e.target)) {
                userDropdown.classList.remove('show');
            }
        });
    }
}

/**
 * Initialize dashboard charts
 */
function initDashboardCharts() {
    // Sales chart
    const salesChartCanvas = document.getElementById('sales-chart');
    
    if (salesChartCanvas) {
        // In a real implementation, this would use a charting library like Chart.js
        console.log('Sales chart would be initialized here');
    }
    
    // Products chart
    const productsChartCanvas = document.getElementById('products-chart');
    
    if (productsChartCanvas) {
        // In a real implementation, this would use a charting library like Chart.js
        console.log('Products chart would be initialized here');
    }
    
    // Orders chart
    const ordersChartCanvas = document.getElementById('orders-chart');
    
    if (ordersChartCanvas) {
        // In a real implementation, this would use a charting library like Chart.js
        console.log('Orders chart would be initialized here');
    }
}

/**
 * Initialize product management
 */
function initProductManagement() {
    // View mode toggle
    const viewModeSelect = document.getElementById('view-mode');
    const tableView = document.getElementById('table-view');
    const gridView = document.getElementById('grid-view');
    
    if (viewModeSelect && tableView && gridView) {
        viewModeSelect.addEventListener('change', function() {
            const viewMode = this.value;
            
            if (viewMode === 'table') {
                tableView.style.display = 'block';
                gridView.style.display = 'none';
            } else {
                tableView.style.display = 'none';
                gridView.style.display = 'block';
            }
            
            // Save preference to localStorage
            localStorage.setItem('productViewMode', viewMode);
        });
        
        // Load saved preference
        const savedViewMode = localStorage.getItem('productViewMode');
        if (savedViewMode) {
            viewModeSelect.value = savedViewMode;
            viewModeSelect.dispatchEvent(new Event('change'));
        }
    }
    
    // Product filtering
    const categoryFilter = document.getElementById('category-filter');
    const searchInput = document.getElementById('search-products');
    const applyFiltersBtn = document.getElementById('apply-filters-btn');
    
    if (categoryFilter && searchInput && applyFiltersBtn) {
        applyFiltersBtn.addEventListener('click', function() {
            filterProducts();
        });
        
        // Filter on enter key in search input
        searchInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                filterProducts();
            }
        });
    }
    
    // Bulk actions
    const selectAllCheckbox = document.getElementById('select-all');
    const productCheckboxes = document.querySelectorAll('.product-checkbox');
    const bulkActionSelect = document.getElementById('bulk-action');
    const applyBulkActionBtn = document.getElementById('apply-bulk-action');
    
    if (selectAllCheckbox && productCheckboxes.length > 0 && bulkActionSelect && applyBulkActionBtn) {
        // Select all checkbox
        selectAllCheckbox.addEventListener('change', function() {
            const isChecked = this.checked;
            
            productCheckboxes.forEach(checkbox => {
                checkbox.checked = isChecked;
            });
        });
        
        // Apply bulk action
        applyBulkActionBtn.addEventListener('click', function() {
            const selectedAction = bulkActionSelect.value;
            const selectedProducts = [];
            
            productCheckboxes.forEach(checkbox => {
                if (checkbox.checked) {
                    selectedProducts.push(checkbox.value);
                }
            });
            
            if (selectedProducts.length === 0) {
                alert('Please select at least one product');
                return;
            }
            
            if (selectedAction === '') {
                alert('Please select an action');
                return;
            }
            
            // Confirm bulk action
            if (confirm(`Are you sure you want to ${selectedAction} ${selectedProducts.length} products?`)) {
                // In a real implementation, this would perform the action on the server
                alert(`${selectedAction} action applied to ${selectedProducts.length} products`);
            }
        });
    }
    
    // Product image upload preview
    const productImageInput = document.getElementById('edit-product-image');
    const imagePreview = document.getElementById('edit-image-preview');
    
    if (productImageInput && imagePreview) {
        productImageInput.addEventListener('change', function() {
            if (this.files && this.files[0]) {
                const reader = new FileReader();
                
                reader.onload = function(e) {
                    imagePreview.src = e.target.result;
                };
                
                reader.readAsDataURL(this.files[0]);
            }
        });
    }
    
    // Product form validation
    const productForm = document.getElementById('product-form');
    
    if (productForm) {
        productForm.addEventListener('submit', function(e) {
            let isValid = true;
            
            // Required fields
            const requiredFields = [
                'edit-product-name',
                'edit-product-price-min',
                'edit-product-price-max',
                'edit-product-description'
            ];
            
            requiredFields.forEach(field => {
                const input = document.getElementById(field);
                if (input && input.value.trim() === '') {
                    showError(input, 'This field is required');
                    isValid = false;
                } else {
                    clearError(input);
                }
            });
            
            // Price validation
            const minPrice = parseFloat(document.getElementById('edit-product-price-min').value);
            const maxPrice = parseFloat(document.getElementById('edit-product-price-max').value);
            
            if (!isNaN(minPrice) && !isNaN(maxPrice) && minPrice > maxPrice) {
                showError(document.getElementById('edit-product-price-max'), 'Max price must be greater than min price');
                isValid = false;
            }
            
            // If form is not valid, prevent submission
            if (!isValid) {
                e.preventDefault();
            } else {
                // In a real implementation, this would submit the form to the server
                // For this demo, we'll just show a success message
                e.preventDefault();
                
                const productId = this.getAttribute('data-product-id');
                const productName = document.getElementById('edit-product-name').value;
                
                if (productId) {
                    alert(`Product "${productName}" has been updated successfully.`);
                } else {
                    alert(`Product "${productName}" has been added successfully.`);
                }
                
                // Close modal
                document.getElementById('product-modal').style.display = 'none';
            }
        });
    }
}

/**
 * Filter products based on category and search query
 */
function filterProducts() {
    const category = document.getElementById('category-filter').value;
    const searchQuery = document.getElementById('search-products').value.toLowerCase();
    
    const productRows = document.querySelectorAll('#table-view tbody tr');
    const productCards = document.querySelectorAll('#grid-view .product-card');
    
    let visibleCount = 0;
    
    // Filter table rows
    productRows.forEach(row => {
        const productName = row.querySelector('td:nth-child(2)').textContent.toLowerCase();
        const productCategory = row.querySelector('td:nth-child(3)').textContent.toLowerCase();
        
        const matchesCategory = category === '' || productCategory.includes(category.toLowerCase());
        const matchesSearch = searchQuery === '' || productName.includes(searchQuery);
        
        if (matchesCategory && matchesSearch) {
            row.style.display = '';
            visibleCount++;
        } else {
            row.style.display = 'none';
        }
    });
    
    // Filter grid cards
    productCards.forEach(card => {
        const productName = card.querySelector('.product-card-title').textContent.toLowerCase();
        const productCategory = card.querySelector('.product-card-category').textContent.toLowerCase();
        
        const matchesCategory = category === '' || productCategory.includes(category.toLowerCase());
        const matchesSearch = searchQuery === '' || productName.includes(searchQuery);
        
        if (matchesCategory && matchesSearch) {
            card.style.display = '';
        } else {
            card.style.display = 'none';
        }
    });
    
    // Update results count
    const resultsCount = document.querySelector('.results-count');
    if (resultsCount) {
        resultsCount.textContent = `Showing ${visibleCount} of ${productRows.length} products`;
    }
}

/**
 * Initialize order management
 */
function initOrderManagement() {
    // Order status update
    const statusSelects = document.querySelectorAll('.order-status-select');
    
    statusSelects.forEach(select => {
        select.addEventListener('change', function() {
            const orderId = this.getAttribute('data-order-id');
            const newStatus = this.value;
            
            // In a real implementation, this would update the order status on the server
            alert(`Order #${orderId} status updated to ${newStatus}`);
            
            // Update status badge
            const statusBadge = document.querySelector(`.order-status-badge[data-order-id="${orderId}"]`);
            if (statusBadge) {
                // Remove all status classes
                statusBadge.classList.remove('status-pending', 'status-processing', 'status-completed', 'status-cancelled');
                
                // Add new status class
                statusBadge.classList.add(`status-${newStatus.toLowerCase()}`);
                
                // Update text
                statusBadge.textContent = newStatus;
            }
        });
    });
    
    // Order filtering
    const statusFilter = document.getElementById('status-filter');
    const dateFromFilter = document.getElementById('date-from');
    const dateToFilter = document.getElementById('date-to');
    const searchOrderInput = document.getElementById('search-orders');
    const applyOrderFiltersBtn = document.getElementById('apply-order-filters');
    
    if (statusFilter && dateFromFilter && dateToFilter && searchOrderInput && applyOrderFiltersBtn) {
        applyOrderFiltersBtn.addEventListener('click', function() {
            filterOrders();
        });
    }
    
    // Order details view
    const viewOrderButtons = document.querySelectorAll('.view-order-btn');
    
    viewOrderButtons.forEach(button => {
        button.addEventListener('click', function() {
            const orderId = this.getAttribute('data-order-id');
            
            // In a real implementation, this would fetch order details from the server
            // For this demo, we'll just show a modal with dummy data
            showOrderDetails(orderId);
        });
    });
}

/**
 * Filter orders based on status, date range, and search query
 */
function filterOrders() {
    const status = document.getElementById('status-filter').value;
    const dateFrom = document.getElementById('date-from').value;
    const dateTo = document.getElementById('date-to').value;
    const searchQuery = document.getElementById('search-orders').value.toLowerCase();
    
    const orderRows = document.querySelectorAll('.orders-table tbody tr');
    
    let visibleCount = 0;
    
    orderRows.forEach(row => {
        const orderId = row.querySelector('td:nth-child(1)').textContent.toLowerCase();
        const customerName = row.querySelector('td:nth-child(2)').textContent.toLowerCase();
        const orderDate = row.querySelector('td:nth-child(3)').getAttribute('data-date');
        const orderStatus = row.querySelector('.order-status-badge').textContent.toLowerCase();
        
        const matchesStatus = status === '' || orderStatus === status.toLowerCase();
        const matchesDateFrom = dateFrom === '' || orderDate >= dateFrom;
        const matchesDateTo = dateTo === '' || orderDate <= dateTo;
        const matchesSearch = searchQuery === '' || 
                             orderId.includes(searchQuery) || 
                             customerName.includes(searchQuery);
        
        if (matchesStatus && matchesDateFrom && matchesDateTo && matchesSearch) {
            row.style.display = '';
            visibleCount++;
        } else {
            row.style.display = 'none';
        }
    });
    
    // Update results count
    const resultsCount = document.querySelector('.results-count');
    if (resultsCount) {
        resultsCount.textContent = `Showing ${visibleCount} of ${orderRows.length} orders`;
    }
}

/**
 * Initialize agent management
 */
function initAgentManagement() {
    // Agent application approval/rejection
    const approveButtons = document.querySelectorAll('.approve-agent-btn');
    const rejectButtons = document.querySelectorAll('.reject-agent-btn');
    
    approveButtons.forEach(button => {
        button.addEventListener('click', function() {
            const agentId = this.getAttribute('data-agent-id');
            
            // In a real implementation, this would approve the agent application on the server
            if (confirm('Are you sure you want to approve this agent application?')) {
                // Generate agent code
                const agentCode = generateAgentCode();
                
                alert(`Agent application approved. Agent code: ${agentCode}`);
                
                // Update status badge
                const statusBadge = document.querySelector(`.agent-status-badge[data-agent-id="${agentId}"]`);
                if (statusBadge) {
                    // Remove all status classes
                    statusBadge.classList.remove('status-pending', 'status-approved', 'status-rejected');
                    
                    // Add approved class
                    statusBadge.classList.add('status-approved');
                    
                    // Update text
                    statusBadge.textContent = 'Approved';
                }
                
                // Update buttons
                this.style.display = 'none';
                const rejectBtn = document.querySelector(`.reject-agent-btn[data-agent-id="${agentId}"]`);
                if (rejectBtn) {
                    rejectBtn.style.display = 'none';
                }
                
                // Add agent code to table
                const agentCodeCell = document.querySelector(`.agent-code[data-agent-id="${agentId}"]`);
                if (agentCodeCell) {
                    agentCodeCell.textContent = agentCode;
                }
            }
        });
    });
    
    rejectButtons.forEach(button => {
        button.addEventListener('click', function() {
            const agentId = this.getAttribute('data-agent-id');
            
            // In a real implementation, this would reject the agent application on the server
            if (confirm('Are you sure you want to reject this agent application?')) {
                alert('Agent application rejected.');
                
                // Update status badge
                const statusBadge = document.querySelector(`.agent-status-badge[data-agent-id="${agentId}"]`);
                if (statusBadge) {
                    // Remove all status classes
                    statusBadge.classList.remove('status-pending', 'status-approved', 'status-rejected');
                    
                    // Add rejected class
                    statusBadge.classList.add('status-rejected');
                    
                    // Update text
                    statusBadge.textContent = 'Rejected';
                }
                
                // Update buttons
                this.style.display = 'none';
                const approveBtn = document.querySelector(`.approve-agent-btn[data-agent-id="${agentId}"]`);
                if (approveBtn) {
                    approveBtn.style.display = 'none';
                }
            }
        });
    });
    
    // Agent filtering
    const statusFilter = document.getElementById('agent-status-filter');
    const searchAgentInput = document.getElementById('search-agents');
    const applyAgentFiltersBtn = document.getElementById('apply-agent-filters');
    
    if (statusFilter && searchAgentInput && applyAgentFiltersBtn) {
        applyAgentFiltersBtn.addEventListener('click', function() {
            filterAgents();
        });
    }
}

/**
 * Filter agents based on status and search query
 */
function filterAgents() {
    const status = document.getElementById('agent-status-filter').value;
    const searchQuery = document.getElementById('search-agents').value.toLowerCase();
    
    const agentRows = document.querySelectorAll('.agents-table tbody tr');
    
    let visibleCount = 0;
    
    agentRows.forEach(row => {
        const agentName = row.querySelector('td:nth-child(1)').textContent.toLowerCase();
        const agentEmail = row.querySelector('td:nth-child(2)').textContent.toLowerCase();
        const agentPhone = row.querySelector('td:nth-child(3)').textContent.toLowerCase();
        const agentStatus = row.querySelector('.agent-status-badge').textContent.toLowerCase();
        
        const matchesStatus = status === '' || agentStatus === status.toLowerCase();
        const matchesSearch = searchQuery === '' || 
                             agentName.includes(searchQuery) || 
                             agentEmail.includes(searchQuery) || 
                             agentPhone.includes(searchQuery);
        
        if (matchesStatus && matchesSearch) {
            row.style.display = '';
            visibleCount++;
        } else {
            row.style.display = 'none';
        }
    });
    
    // Update results count
    const resultsCount = document.querySelector('.results-count');
    if (resultsCount) {
        resultsCount.textContent = `Showing ${visibleCount} of ${agentRows.length} agents`;
    }
}

/**
 * Generate a random agent code
 */
function generateAgentCode() {
    // Get the next agent number
    const nextAgentNumber = document.querySelectorAll('.agent-code').length + 1;
    
    // Format the agent code
    return `AG${String(nextAgentNumber).padStart(3, '0')}`;
}

/**
 * Show error message for an input
 */
function showError(input, message) {
    // Remove any existing error message
    clearError(input);
    
    // Create error message element
    const errorMessage = document.createElement('div');
    errorMessage.className = 'error-message';
    errorMessage.textContent = message;
    
    // Add error class to input
    input.classList.add('error');
    
    // Insert error message after input
    input.parentNode.insertBefore(errorMessage, input.nextSibling);
}

/**
 * Clear error message for an input
 */
function clearError(input) {
    // Remove error class from input
    input.classList.remove('error');
    
    // Remove any existing error message
    const errorMessage = input.parentNode.querySelector('.error-message');
    if (errorMessage) {
        errorMessage.remove();
    }
}