/**
 * QURAN REVIEW - JAVASCRIPT APPLICATION
 * Professional Quran Memorization & Review System
 */

// ===================================
// APP STATE & CONFIGURATION
// ===================================

const QuranReview = {
    // App Configuration
    config: {
        appName: 'QuranReview',
        version: '1.0.0',
        storageKey: 'quranreview_data',
        themeKey: 'quranreview_theme',
        
        // Default Settings
        defaultSettings: {
            userName: '',
            dailyGoal: 5,
            theme: 'light',
            notifications: true
        },
        
        // Quran Data (Simplified for demo)
        surahs: [
            { id: 1, name: 'الفاتحة', englishName: 'Al-Fatihah', ayahs: 7, type: 'meccan' },
            { id: 2, name: 'البقرة', englishName: 'Al-Baqarah', ayahs: 286, type: 'medinan' },
            { id: 3, name: 'آل عمران', englishName: 'Aal-E-Imran', ayahs: 200, type: 'medinan' },
            { id: 4, name: 'النساء', englishName: 'An-Nisa', ayahs: 176, type: 'medinan' },
            { id: 5, name: 'المائدة', englishName: 'Al-Ma\'idah', ayahs: 120, type: 'medinan' },
            { id: 6, name: 'الأنعام', englishName: 'Al-An\'am', ayahs: 165, type: 'meccan' },
            { id: 7, name: 'الأعراف', englishName: 'Al-A\'raf', ayahs: 206, type: 'meccan' },
            { id: 8, name: 'الأنفال', englishName: 'Al-Anfal', ayahs: 75, type: 'medinan' },
            { id: 9, name: 'التوبة', englishName: 'At-Tawbah', ayahs: 129, type: 'medinan' },
            { id: 10, name: 'يونس', englishName: 'Yunus', ayahs: 109, type: 'meccan' }
        ]
    },
    
    // App State
    state: {
        currentPage: 'home',
        memorizationData: [],
        settings: {},
        todayDate: new Date().toISOString().split('T')[0]
    },
    
    // ===================================
    // INITIALIZATION
    // ===================================
    
    init() {
        console.log('🕌 QuranReview App Initializing...');
        
        // Load saved data
        this.loadData();
        
        // Initialize theme
        this.initTheme();
        
        // Setup navigation
        this.setupNavigation();
        
        // Setup forms
        this.setupForms();
        
        // Render initial page
        this.navigateTo('home');
        
        // Setup auto-save
        this.setupAutoSave();
        
        console.log('✅ QuranReview App Ready!');
    },
    
    // ===================================
    // DATA MANAGEMENT
    // ===================================
    
    loadData() {
        try {
            // Load settings
            const savedSettings = localStorage.getItem(this.config.themeKey);
            this.state.settings = savedSettings ? 
                JSON.parse(savedSettings) : 
                { ...this.config.defaultSettings };
            
            // Load memorization data
            const savedData = localStorage.getItem(this.config.storageKey);
            this.state.memorizationData = savedData ? 
                JSON.parse(savedData) : 
                this.getDefaultMemorizationData();
            
            console.log('📁 Data loaded successfully');
        } catch (error) {
            console.error('❌ Error loading data:', error);
            this.state.settings = { ...this.config.defaultSettings };
            this.state.memorizationData = this.getDefaultMemorizationData();
        }
    },
    
    saveData() {
        try {
            localStorage.setItem(this.config.storageKey, JSON.stringify(this.state.memorizationData));
            localStorage.setItem(this.config.themeKey, JSON.stringify(this.state.settings));
            console.log('💾 Data saved successfully');
        } catch (error) {
            console.error('❌ Error saving data:', error);
            this.showNotification('خطأ في حفظ البيانات', 'error');
        }
    },
    
    getDefaultMemorizationData() {
        return [
            {
                id: 1,
                surahId: 1,
                surahName: 'الفاتحة',
                fromAyah: 1,
                toAyah: 7,
                status: 'mastered',
                dateAdded: '2024-01-01',
                lastReviewed: '2024-02-06',
                reviewCount: 15
            },
            {
                id: 2,
                surahId: 2,
                surahName: 'البقرة',
                fromAyah: 1,
                toAyah: 5,
                status: 'weak',
                dateAdded: '2024-01-15',
                lastReviewed: '2024-02-01',
                reviewCount: 8
            },
            {
                id: 3,
                surahId: 3,
                surahName: 'آل عمران',
                fromAyah: 1,
                toAyah: 3,
                status: 'new',
                dateAdded: '2024-02-07',
                lastReviewed: null,
                reviewCount: 0
            }
        ];
    },
    
    // ===================================
    // THEME MANAGEMENT
    // ===================================
    
    initTheme() {
        const theme = this.state.settings.theme || 'light';
        document.documentElement.setAttribute('data-theme', theme);
        this.updateThemeToggle(theme);
    },
    
    toggleTheme() {
        const currentTheme = this.state.settings.theme;
        const newTheme = currentTheme === 'light' ? 'dark' : 'light';
        
        this.state.settings.theme = newTheme;
        document.documentElement.setAttribute('data-theme', newTheme);
        this.updateThemeToggle(newTheme);
        this.saveData();
        
        console.log('🎨 Theme changed to:', newTheme);
    },
    
    updateThemeToggle(theme) {
        const toggle = document.getElementById('theme-toggle');
        if (toggle) {
            toggle.textContent = theme === 'light' ? '🌙' : '☀️';
        }
    },
    
    // ===================================
    // NAVIGATION
    // ===================================
    
    setupNavigation() {
        // Navigation links
        document.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const page = link.getAttribute('data-page');
                this.navigateTo(page);
            });
        });
        
        // Theme toggle
        const themeToggle = document.getElementById('theme-toggle');
        if (themeToggle) {
            themeToggle.addEventListener('click', () => this.toggleTheme());
        }
    },
    
    navigateTo(pageName) {
        // Update navigation
        document.querySelectorAll('.nav-link').forEach(link => {
            link.classList.remove('active');
        });
        document.querySelector(`[data-page="${pageName}"]`).classList.add('active');
        
        // Update pages
        document.querySelectorAll('.page').forEach(page => {
            page.classList.remove('active');
        });
        document.getElementById(`${pageName}-page`).classList.add('active');
        
        this.state.currentPage = pageName;
        
        // Render page content
        this.renderPage(pageName);
        
        console.log('📍 Navigated to:', pageName);
    },
    
    // ===================================
    // PAGE RENDERING
    // ===================================
    
    renderPage(pageName) {
        switch (pageName) {
            case 'home':
                this.renderHomePage();
                break;
            case 'memorization':
                this.renderMemorizationPage();
                break;
            case 'progress':
                this.renderProgressPage();
                break;
            case 'settings':
                this.renderSettingsPage();
                break;
        }
    },
    
    renderHomePage() {
        // Update motivation
        this.updateDailyMotivation();
        
        // Update stats
        this.updateHomeStats();
    },
    
    renderMemorizationPage() {
        this.renderMemorizationTable();
        this.setupMemorizationActions();
    },
    
    renderProgressPage() {
        this.renderProgressStats();
        this.renderProgressChart();
    },
    
    renderSettingsPage() {
        this.renderSettingsForm();
    },
    
    // ===================================
    // HOME PAGE FUNCTIONS
    // ===================================
    
    updateDailyMotivation() {
        const motivations = [
            { text: 'خَيْرُكُمْ مَنْ تَعَلَّمَ الْقُرْآنَ وَعَلَّمَهُ', source: 'رواه البخاري' },
            { text: 'الْقُرْآنُ كَلامُ اللهِ، مَنْ قَرَأَهُ فَقَدْ تَكَلَّمَ مَعَ اللهِ', source: 'حديث قدسي' },
            { text: 'مَثَلُ الْمُؤْمِنِ الَّذِي يَقْرَأُ الْقُرْآنَ كَمَثَلِ الْأُتْرُجَّةِ، رِيحُهَا طَيِّبٌ وَطَعْمُهَا طَيِّبٌ', source: 'رواه البخاري' },
            { text: 'سَيَأْتِي عَلَى النَّاسِ زَمَانٌ يَتَعَلَّمُونَ فِيهِ الْقُرْآنَ، ثُمَّ يَقْرَؤُونَهُ', source: 'رواه البخاري' }
        ];
        
        const today = new Date().getDate();
        const motivation = motivations[today % motivations.length];
        
        const textElement = document.getElementById('motivation-text');
        const sourceElement = document.getElementById('motivation-source');
        
        if (textElement) textElement.textContent = motivation.text;
        if (sourceElement) sourceElement.textContent = motivation.source;
    },
    
    updateHomeStats() {
        const stats = this.calculateStats();
        
        const totalSurahsElement = document.getElementById('home-total-surahs');
        const masteredElement = document.getElementById('home-mastered');
        const weakElement = document.getElementById('home-weak');
        const newElement = document.getElementById('home-new');
        
        if (totalSurahsElement) totalSurahsElement.textContent = stats.total;
        if (masteredElement) masteredElement.textContent = stats.mastered;
        if (weakElement) weakElement.textContent = stats.weak;
        if (newElement) newElement.textContent = stats.new;
    },
    
    // ===================================
    // MEMORIZATION PAGE FUNCTIONS
    // ===================================
    
    renderMemorizationTable() {
        const tableBody = document.getElementById('memorization-table-body');
        if (!tableBody) return;
        
        const todayData = this.getTodayMemorizationData();
        
        // Render sections separately to avoid duplication
        let html = '';
        
        // Previously memorized section
        if (todayData.previouslyMemorized.length > 0) {
            html += `
                <tr class="section-header">
                    <td colspan="5" style="background: var(--accent-green); color: white; text-align: center; font-weight: bold;">
                        📚 محفوظ سابقًا (للتثبيت)
                    </td>
                </tr>
            `;
            html += todayData.previouslyMemorized.map(item => this.createTableRow(item)).join('');
        }
        
        // Today's review section
        if (todayData.todayReview.length > 0) {
            html += `
                <tr class="section-header">
                    <td colspan="5" style="background: var(--accent-gold); color: white; text-align: center; font-weight: bold;">
                        📋 مراجعة اليوم
                    </td>
                </tr>
            `;
            html += todayData.todayReview.map(item => this.createTableRow(item)).join('');
        }
        
        // New memorization section
        if (todayData.newMemorization.length > 0) {
            html += `
                <tr class="section-header">
                    <td colspan="5" style="background: var(--accent-red); color: white; text-align: center; font-weight: bold;">
                        ✨ حفظ جديد
                    </td>
                </tr>
            `;
            html += todayData.newMemorization.map(item => this.createTableRow(item)).join('');
        }
        
        // No data message
        if (todayData.previouslyMemorized.length === 0 && 
            todayData.todayReview.length === 0 && 
            todayData.newMemorization.length === 0) {
            html += `
                <tr>
                    <td colspan="5" style="text-align: center; padding: 2rem; color: var(--text-secondary);">
                        لا توجد عناصر للحفظ اليوم. أضف حفظًا جديدًا للبدء!
                    </td>
                </tr>
            `;
        }
        
        tableBody.innerHTML = html;
    },
    
    createTableRow(item) {
        return `
            <tr>
                <td class="arabic-text">${item.surahName}</td>
                <td>${item.fromAyah} - ${item.toAyah}</td>
                <td>${this.getStatusBadge(item.status)}</td>
                <td>${item.lastReviewed ? new Date(item.lastReviewed).toLocaleDateString('ar-SA') : 'لم يراجع بعد'}</td>
                <td>
                    <button class="btn btn-sm btn-primary" onclick="QuranReview.markAsReviewed(${item.id})" title="تسجيل المراجعة">
                        ✓ مراجعة
                    </button>
                    <button class="btn btn-sm btn-secondary" onclick="QuranReview.openTarteel(${item.surahId}, ${item.fromAyah}, ${item.toAyah})" title="فتح في تطبيق ترتيل">
                        🎧 ترتيل
                    </button>
                    <button class="btn btn-sm btn-danger" onclick="QuranReview.deleteItem(${item.id})" title="حذف العنصر">
                        حذف
                    </button>
                </td>
            </tr>
        `;
    },
    
        
        
    getStatusBadge(status) {
        const badges = {
            mastered: '<span class="status-badge status-mastered">✓ متقن</span>',
            weak: '<span class="status-badge status-weak">⚠ ضعيف</span>',
            new: '<span class="status-badge status-new">+ جديد</span>'
        };
        return badges[status] || status;
    },
    
    setupMemorizationActions() {
        // Add new memorization form
        const addForm = document.getElementById('add-memorization-form');
        if (addForm) {
            addForm.addEventListener('submit', (e) => {
                e.preventDefault();
                this.addNewMemorization();
            });
        }
    },
    
    addNewMemorization() {
        const surahSelect = document.getElementById('surah-select');
        const fromAyahInput = document.getElementById('from-ayah');
        const toAyahInput = document.getElementById('to-ayah');
        
        const surahId = parseInt(surahSelect.value);
        const surah = this.config.surahs.find(s => s.id === surahId);
        const fromAyah = parseInt(fromAyahInput.value);
        const toAyah = parseInt(toAyahInput.value);
        
        if (!surah || fromAyah < 1 || toAyah < fromAyah || toAyah > surah.ayahs) {
            this.showNotification('بيانات غير صحيحة', 'error');
            return;
        }
        
        const newItem = {
            id: Date.now(),
            surahId: surahId,
            surahName: surah.name,
            fromAyah: fromAyah,
            toAyah: toAyah,
            status: 'new',
            dateAdded: this.state.todayDate,
            lastReviewed: null,
            reviewCount: 0
        };
        
        this.state.memorizationData.push(newItem);
        this.saveData();
        this.renderMemorizationPage();
        
        // Reset form
        document.getElementById('add-memorization-form').reset();
        
        this.showNotification('تمت إضافة الحفظ الجديد', 'success');
    },
    
    markAsReviewed(itemId) {
        const item = this.state.memorizationData.find(i => i.id === itemId);
        if (!item) return;
        
        item.lastReviewed = this.state.todayDate;
        item.reviewCount = (item.reviewCount || 0) + 1;
        
        // Update status based on review count
        if (item.reviewCount >= 10) {
            item.status = 'mastered';
        } else if (item.reviewCount >= 3) {
            item.status = 'weak';
        }
        
        this.saveData();
        this.renderMemorizationPage();
        
        this.showNotification('تم تسجيل المراجعة', 'success');
    },
    
    deleteItem(itemId) {
        if (!confirm('هل أنت متأكد من حذف هذا العنصر؟')) return;
        
        this.state.memorizationData = this.state.memorizationData.filter(i => i.id !== itemId);
        this.saveData();
        this.renderMemorizationPage();
        
        this.showNotification('تم حذف العنصر', 'info');
    },
    
    // ===================================
    // PROGRESS PAGE FUNCTIONS
    // ===================================
    
    renderProgressStats() {
        const stats = this.calculateStats();
        
        // Update stat cards
        const elements = {
            'progress-total': stats.total,
            'progress-mastered': stats.mastered,
            'progress-weak': stats.weak,
            'progress-new': stats.new,
            'progress-average': stats.averageReviews.toFixed(1)
        };
        
        Object.entries(elements).forEach(([id, value]) => {
            const element = document.getElementById(id);
            if (element) element.textContent = value;
        });
    },
    
    renderProgressChart() {
        const chartContainer = document.getElementById('progress-chart');
        if (!chartContainer) return;
        
        const last7Days = this.getLast7DaysProgress();
        
        chartContainer.innerHTML = last7Days.map(day => `
            <div class="chart-bar" style="height: ${day.percentage}%" title="${day.date}: ${day.count} مراجعات">
            </div>
        `).join('');
    },
    
    getLast7DaysProgress() {
        const days = [];
        const today = new Date();
        
        for (let i = 6; i >= 0; i--) {
            const date = new Date(today);
            date.setDate(date.getDate() - i);
            const dateString = date.toISOString().split('T')[0];
            
            const count = this.state.memorizationData.filter(item => 
                item.lastReviewed === dateString
            ).length;
            
            days.push({
                date: dateString,
                count: count,
                percentage: Math.min((count / 5) * 100, 100)
            });
        }
        
        return days;
    },
    
    // ===================================
    // SETTINGS PAGE FUNCTIONS
    // ===================================
    
    renderSettingsForm() {
        const form = document.getElementById('settings-form');
        if (!form) return;
        
        // Populate form with current settings
        document.getElementById('user-name').value = this.state.settings.userName || '';
        document.getElementById('daily-goal').value = this.state.settings.dailyGoal || 5;
        document.getElementById('notifications').checked = this.state.settings.notifications || false;
    },
    
    setupForms() {
        // Settings form
        const settingsForm = document.getElementById('settings-form');
        if (settingsForm) {
            settingsForm.addEventListener('submit', (e) => {
                e.preventDefault();
                this.saveSettings();
            });
        }
    },
    
    saveSettings() {
        this.state.settings = {
            userName: document.getElementById('user-name').value,
            dailyGoal: parseInt(document.getElementById('daily-goal').value),
            theme: this.state.settings.theme,
            notifications: document.getElementById('notifications').checked
        };
        
        this.saveData();
        this.showNotification('تم حفظ الإعدادات', 'success');
    },
    
    // ===================================
    // UTILITY FUNCTIONS
    // ===================================
    
    calculateStats() {
        const total = this.state.memorizationData.length;
        const mastered = this.state.memorizationData.filter(item => item.status === 'mastered').length;
        const weak = this.state.memorizationData.filter(item => item.status === 'weak').length;
        const newMemorization = this.state.memorizationData.filter(item => item.status === 'new').length;
        
        const totalReviews = this.state.memorizationData.reduce((sum, item) => sum + (item.reviewCount || 0), 0);
        const averageReviews = total > 0 ? totalReviews / total : 0;
        
        return {
            total,
            mastered,
            weak,
            new: newMemorization,
            averageReviews
        };
    },
    
    showNotification(message, type = 'info') {
        // Create notification element
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.textContent = message;
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            left: 50%;
            transform: translateX(-50%);
            background: ${type === 'error' ? '#dc3545' : type === 'success' ? '#28a745' : '#17a2b8'};
            color: white;
            padding: 12px 24px;
            border-radius: 8px;
            z-index: 1000;
            box-shadow: 0 4px 6px rgba(0,0,0,0.1);
            animation: slideDown 0.3s ease;
        `;
        
        document.body.appendChild(notification);
        
        // Remove after 3 seconds
        setTimeout(() => {
            notification.remove();
        }, 3000);
    },
    
    setupAutoSave() {
        // Auto-save every 30 seconds
        setInterval(() => {
            this.saveData();
        }, 30000);
        
        // Save before page unload
        window.addEventListener('beforeunload', () => {
            this.saveData();
        });
    },
    
    // ===================================
    // DATA MANAGEMENT FUNCTIONS
    // ===================================
    
    exportData() {
        try {
            const data = {
                version: this.config.version,
                exportDate: new Date().toISOString(),
                settings: this.state.settings,
                memorizationData: this.state.memorizationData
            };
            
            const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = `quranreview-backup-${new Date().toISOString().split('T')[0]}.json`;
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
            URL.revokeObjectURL(url);
            
            this.showNotification('تم تصدير البيانات بنجاح', 'success');
        } catch (error) {
            console.error('❌ Error exporting data:', error);
            this.showNotification('خطأ في تصدير البيانات', 'error');
        }
    },
    
    importData() {
        try {
            const input = document.createElement('input');
            input.type = 'file';
            input.accept = '.json';
            
            input.onchange = (e) => {
                const file = e.target.files[0];
                if (!file) return;
                
                const reader = new FileReader();
                reader.onload = (event) => {
                    try {
                        const data = JSON.parse(event.target.result);
                        
                        // Validate data structure
                        if (!data.memorizationData || !Array.isArray(data.memorizationData)) {
                            throw new Error('Invalid data structure');
                        }
                        
                        // Backup current data
                        const backup = { ...this.state };
                        
                        // Import new data
                        this.state.memorizationData = data.memorizationData || [];
                        this.state.settings = { ...this.config.defaultSettings, ...data.settings };
                        
                        // Save imported data
                        this.saveData();
                        
                        // Refresh UI
                        this.renderPage(this.state.currentPage);
                        
                        this.showNotification('تم استيراد البيانات بنجاح', 'success');
                    } catch (error) {
                        console.error('❌ Error parsing imported data:', error);
                        this.showNotification('ملف غير صالح. يرجى التحقق من البيانات', 'error');
                    }
                };
                
                reader.readAsText(file);
            };
            
            input.click();
        } catch (error) {
            console.error('❌ Error importing data:', error);
            this.showNotification('خطأ في استيراد البيانات', 'error');
        }
    },
    
    clearData() {
        if (!confirm('هل أنت متأكد من مسح جميع البيانات؟ هذا الإجراء لا يمكن التراجع عنه.')) return;
        
        try {
            // Clear LocalStorage
            localStorage.removeItem(this.config.storageKey);
            localStorage.removeItem(this.config.themeKey);
            
            // Reset to defaults
            this.state.memorizationData = this.getDefaultMemorizationData();
            this.state.settings = { ...this.config.defaultSettings };
            
            // Refresh UI
            this.renderPage(this.state.currentPage);
            
            this.showNotification('تم مسح جميع البيانات', 'info');
        } catch (error) {
            console.error('❌ Error clearing data:', error);
            this.showNotification('خطأ في مسح البيانات', 'error');
        }
    },
    
    // ===================================
    // TARTEEL INTEGRATION
    // ===================================
    
    openTarteel(surahId, fromAyah, toAyah) {
        try {
            // Official Tarteel smart deep link
            const url = 'https://tarteel.go.link/?adj_t=1d1pgcav&adj_engagement_type=fallback_click';
            window.open(url, '_blank', 'noopener,noreferrer');
            
            console.log(`🎧 Opening Tarteel for Surah ${surahId}, Ayahs ${fromAyah}-${toAyah}`);
        } catch (error) {
            console.error('❌ Error opening Tarteel:', error);
            this.showNotification('خطأ في فتح تطبيق ترتيل', 'error');
        }
    },
    
    // ===================================
    // IMPROVED SPACED REPETITION
    // ===================================
    
    shouldReviewToday(item) {
        if (!item.lastReviewed) return true;
        
        const lastReview = new Date(item.lastReviewed);
        const today = new Date();
        const daysSinceReview = Math.floor((today - lastReview) / (1000 * 60 * 60 * 24));
        
        // Enhanced spaced repetition schedule
        const reviewCount = item.reviewCount || 0;
        let requiredDays;
        
        if (reviewCount === 0) {
            requiredDays = 1;  // First review: next day
        } else if (reviewCount === 1) {
            requiredDays = 2;  // Second review: after 2 days
        } else if (reviewCount === 2) {
            requiredDays = 4;  // Third review: after 4 days
        } else if (reviewCount === 3) {
            requiredDays = 7;  // Fourth review: after 1 week
        } else if (reviewCount === 4) {
            requiredDays = 14; // Fifth review: after 2 weeks
        } else if (reviewCount >= 5 && reviewCount <= 7) {
            requiredDays = 21; // Reviews 6-8: after 3 weeks
        } else if (reviewCount >= 8 && reviewCount <= 12) {
            requiredDays = 30; // Reviews 9-13: after 1 month
        } else {
            requiredDays = 45; // Reviews 14+: after 1.5 months
        }
        
        // Weak items need more frequent review
        if (item.status === 'weak') {
            requiredDays = Math.max(1, Math.floor(requiredDays * 0.5));
        }
        
        return daysSinceReview >= requiredDays;
    },
    
    // ===================================
    // IMPROVED MEMORIZATION DATA ORGANIZATION
    // ===================================
    
    getTodayMemorizationData() {
        const today = this.state.todayDate;
        
        // Previously memorized (mastered items for revision)
        const previouslyMemorized = this.state.memorizationData.filter(item => 
            item.status === 'mastered' && !this.shouldReviewToday(item)
        );
        
        // Today's review (items that need review today)
        const todayReview = this.state.memorizationData.filter(item => 
            this.shouldReviewToday(item)
        );
        
        // New memorization (items added today)
        const newMemorization = this.state.memorizationData.filter(item => 
            item.status === 'new' && item.dateAdded === today
        );
        
        return {
            previouslyMemorized,
            todayReview,
            newMemorization
        };
    }
};

// ===================================
// INITIALIZATION
// ===================================

// Wait for DOM to be ready
document.addEventListener('DOMContentLoaded', () => {
    QuranReview.init();
});

// Add slideDown animation
const style = document.createElement('style');
style.textContent = `
    @keyframes slideDown {
        from { transform: translate(-50%, -100%); opacity: 0; }
        to { transform: translate(-50%, 0); opacity: 1; }
    }
`;
document.head.appendChild(style);

// Global error handling
window.addEventListener('error', (e) => {
    console.error('❌ Application Error:', e.error);
    QuranReview.showNotification('حدث خطأ في التطبيق', 'error');
});

// Make QuranReview available globally
window.QuranReview = QuranReview;
