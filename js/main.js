// main.js - Main Application Logic and UI Management
class EduHubApp {
    constructor() {
        this.api = new EduHubAPI();
        this.courses = [];
        this.userProgress = {};
        this.currentPage = 'home';
        
        this.init();
    }

    // Initialize the application
    async init() {
        try {
            await this.loadInitialData();
            this.setupEventListeners();
            this.updateStatistics();
            this.initializeInteractiveElements();
            console.log('EduHub App initialized successfully');
        } catch (error) {
            console.error('Error initializing app:', error);
            this.showNotification('Gagal memuat aplikasi. Silakan refresh halaman.', 'error');
        }
    }

    // Load initial data from API
    async loadInitialData() {
        try {
            const [courses, userProgress] = await Promise.all([
                this.api.loadCourses(),
                this.api.loadUserProgress()
            ]);
            
            this.courses = courses;
            this.userProgress = userProgress;
            this.api.initializeQuizData();
            
        } catch (error) {
            console.error('Error loading initial data:', error);
            throw error;
        }
    }

    // Setup event listeners
    setupEventListeners() {
        // Navigation event listeners
        document.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const page = link.dataset.page;
                this.showPage(page);
            });
        });

        // Mobile menu toggle
        const mobileMenuBtn = document.querySelector('.mobile-menu');
        if (mobileMenuBtn) {
            mobileMenuBtn.addEventListener('click', this.toggleMobileMenu);
        }

        // Course filter
        const courseFilter = document.getElementById('courseFilter');
        if (courseFilter) {
            courseFilter.addEventListener('change', () => this.filterCourses());
        }

        // Contact form
        const contactForm = document.getElementById('contactForm');
        if (contactForm) {
            contactForm.addEventListener('submit', (e) => this.submitContact(e));
        }

        // Keyboard navigation
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                document.querySelector('.nav-links').classList.remove('active');
            }
        });

        // Responsive design
        window.addEventListener('resize', () => {
            if (window.innerWidth > 768) {
                document.querySelector('.nav-links').classList.remove('active');
            }
        });

        // Auto-save progress simulation
        this.startAutoSave();
    }

    // Navigation functionality
    showPage(pageId) {
        // Hide all pages
        document.querySelectorAll('.page').forEach(page => {
            page.classList.remove('active');
        });
        
        // Show selected page
        const targetPage = document.getElementById(pageId);
        if (targetPage) {
            targetPage.classList.add('active');
        }
        
        // Update navigation active state
        document.querySelectorAll('.nav-link').forEach(link => {
            link.classList.remove('active');
        });
        
        const activeNavLink = document.querySelector(`[data-page="${pageId}"]`);
        if (activeNavLink) {
            activeNavLink.classList.add('active');
        }
        
        this.currentPage = pageId;
        
        // Load page-specific data
        this.loadPageData(pageId);
    }

    // Load page-specific data
    loadPageData(pageId) {
        switch(pageId) {
            case 'courses':
                this.displayCourses();
                break;
            case 'progress':
                this.displayProgress();
                break;
            case 'quiz':
                // Quiz functionality is handled by quiz.js
                if (window.quizManager) {
                    window.quizManager.resetQuiz();
                }
                break;
            case 'home':
                this.updateStatistics();
                break;
        }
    }

    // Mobile menu toggle
    toggleMobileMenu() {
        const navLinks = document.querySelector('.nav-links');
        navLinks.classList.toggle('active');
    }

    // Course management
    displayCourses() {
        const courseGrid = document.getElementById('courseGrid');
        if (!courseGrid) return;

        const filter = document.getElementById('courseFilter')?.value || '';
        
        let filteredCourses = this.courses;
        if (filter) {
            filteredCourses = this.courses.filter(course => course.category === filter);
        }
        
        courseGrid.innerHTML = filteredCourses.map(course => `
            <div class="course-card">
                <div class="course-image">
                    <i class="fas ${this.getCourseIcon(course.category)}"></i>
                </div>
                <div class="course-content">
                    <div class="course-title">${course.title}</div>
                    <div class="course-description">${course.description}</div>
                    <div class="course-meta">
                        <span><i class="fas fa-clock"></i> ${course.duration}</span>
                        <span><i class="fas fa-users"></i> ${course.students}</span>
                        <span><i class="fas fa-star"></i> ${course.rating}</span>
                    </div>
                    <div class="progress-bar" style="margin-top: 1rem;">
                        <div class="progress-fill" style="width: ${course.progress}%"></div>
                    </div>
                    <button class="btn-primary" onclick="app.enrollCourse(${course.id})" style="margin-top: 1rem; width: 100%;">
                        ${course.progress > 0 ? 'Lanjutkan' : 'Daftar'}
                    </button>
                </div>
            </div>
        `).join('');
    }

    getCourseIcon(category) {
        const icons = {
            'programming': 'fa-code',
            'design': 'fa-palette',
            'business': 'fa-briefcase',
            'science': 'fa-flask'
        };
        return icons[category] || 'fa-book';
    }

    filterCourses() {
        this.displayCourses();
    }

    // Course enrollment
    async enrollCourse(courseId) {
        try {
            const course = this.courses.find(c => c.id === courseId);
            if (!course) return;

            this.showNotification(`Mendaftar kursus: ${course.title}...`);
            
            const result = await this.api.enrollCourse(courseId);
            
            if (result.success) {
                this.showNotification(`Berhasil mendaftar kursus: ${course.title}!`);
                this.displayCourses(); // Refresh course display
                
                // Switch to progress page after enrollment
                setTimeout(() => {
                    this.showPage('progress');
                }, 1500);
            }
        } catch (error) {
            console.error('Error enrolling in course:', error);
            this.showNotification('Gagal mendaftar kursus. Silakan coba lagi.', 'error');
        }
    }

    // Progress display
    displayProgress() {
        const progressList = document.getElementById('progressList');
        if (!progressList) return;
        
        progressList.innerHTML = this.courses.map(course => `
            <div class="progress-item">
                <div>
                    <strong>${course.title}</strong>
                    <div style="color: #666; font-size: 0.9rem;">${course.category}</div>
                </div>
                <div class="progress-bar">
                    <div class="progress-fill" style="width: ${course.progress}%"></div>
                </div>
                <div style="color: #667eea; font-weight: bold;">${course.progress}%</div>
            </div>
        `).join('');
        
        // Update progress statistics
        this.updateProgressStats();
    }

    updateProgressStats() {
        const elements = {
            completedCourses: document.getElementById('completedCourses'),
            hoursLearned: document.getElementById('hoursLearned'),
            certificatesEarned: document.getElementById('certificatesEarned'),
            currentStreak: document.getElementById('currentStreak')
        };

        Object.keys(elements).forEach(key => {
            if (elements[key] && this.userProgress[key] !== undefined) {
                elements[key].textContent = this.userProgress[key];
            }
        });
    }

    // Statistics management
    updateStatistics() {
        // Animate counter updates
        this.animateCounter('totalStudents', 1250);
        this.animateCounter('totalCourses', this.courses.length);
        this.animateCounter('totalQuizzes', this.userProgress.quizzesCompleted || 15);
        
        // Update success rate
        const successRate = this.userProgress.averageScore || 85;
        const successRateElement = document.getElementById('successRate');
        if (successRateElement) {
            successRateElement.textContent = successRate + '%';
        }
    }

    animateCounter(elementId, targetValue) {
        const element = document.getElementById(elementId);
        if (!element) return;

        const startValue = 0;
        const duration = 2000;
        const startTime = performance.now();
        
        const updateCounter = (currentTime) => {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            const currentValue = Math.floor(startValue + (targetValue - startValue) * progress);
            
            element.textContent = currentValue;
            
            if (progress < 1) {
                requestAnimationFrame(updateCounter);
            }
        };
        
        requestAnimationFrame(updateCounter);
    }

    // Contact form submission
    async submitContact(event) {
        event.preventDefault();
        
        const formData = new FormData(event.target);
        const contactData = {
            name: formData.get('name'),
            email: formData.get('email'),
            subject: formData.get('subject'),
            message: formData.get('message')
        };
        
        // Show loading state
        const submitBtn = event.target.querySelector('button[type="submit"]');
        const originalText = submitBtn.textContent;
        submitBtn.innerHTML = '<span class="loading"></span> Mengirim...';
        submitBtn.disabled = true;
        
        try {
            const result = await this.api.submitContact(contactData);
            
            if (result.success) {
                event.target.reset(); // Reset form
                this.showNotification('Pesan berhasil dikirim! Kami akan segera menghubungi Anda.');
            }
        } catch (error) {
            console.error('Error submitting contact form:', error);
            this.showNotification('Gagal mengirim pesan. Silakan coba lagi.', 'error');
        } finally {
            // Reset button state
            submitBtn.textContent = originalText;
            submitBtn.disabled = false;
        }
    }

    // Notification system
    showNotification(message, type = 'success') {
        const notification = document.getElementById('notification');
        const notificationText = document.getElementById('notificationText');
        
        if (!notification || !notificationText) return;

        notificationText.textContent = message;
        notification.className = `notification ${type}`;
        notification.classList.add('show');
        
        setTimeout(() => {
            notification.classList.remove('show');
        }, 3000);
    }

    // Interactive elements initialization
    initializeInteractiveElements() {
        // Add hover effects to cards
        document.querySelectorAll('.course-card, .feature-card, .stat-card').forEach(card => {
            card.addEventListener('mouseenter', function() {
                this.style.transform = 'translateY(-5px)';
                this.style.transition = 'transform 0.3s ease';
            });
            
            card.addEventListener('mouseleave', function() {
                this.style.transform = 'translateY(0)';
            });
        });

        // Add smooth scrolling for anchor links
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                const target = document.querySelector(this.getAttribute('href'));
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            });
        });
    }

    // Auto-save progress simulation
    startAutoSave() {
        setInterval(() => {
            // Simulate auto-save progress
            if (Math.random() > 0.95) { // 5% chance every interval
                this.courses.forEach(course => {
                    if (course.progress > 0 && course.progress < 100 && Math.random() > 0.8) {
                        const oldProgress = course.progress;
                        course.progress = Math.min(course.progress + Math.floor(Math.random() * 5), 100);
                        
                        // Update course progress via API
                        if (oldProgress !== course.progress) {
                            this.api.updateCourseProgress(course.id, course.progress);
                        }
                    }
                });
                
                // Refresh current page if we're on courses or progress
                if (this.currentPage === 'courses' || this.currentPage === 'progress') {
                    this.loadPageData(this.currentPage);
                }
            }
        }, 10000); // Every 10 seconds
    }

    // Utility methods
    getCourseById(courseId) {
        return this.courses.find(course => course.id === courseId);
    }

    updateUserProgress(progressData) {
        this.userProgress = { ...this.userProgress, ...progressData };
        this.updateStatistics();
        this.updateProgressStats();
    }

    // Performance monitoring
    monitorPerformance() {
        window.addEventListener('load', () => {
            setTimeout(() => {
                if (performance.timing) {
                    const loadTime = performance.timing.loadEventEnd - performance.timing.navigationStart;
                    console.log('Page load time:', loadTime + 'ms');
                }
            }, 0);
        });
    }

    // Service Worker registration for PWA capabilities
    registerServiceWorker() {
        if ('serviceWorker' in navigator) {
            window.addEventListener('load', () => {
                navigator.serviceWorker.register('/sw.js')
                    .then((registration) => {
                        console.log('ServiceWorker registration successful');
                    })
                    .catch((err) => {
                        console.log('ServiceWorker registration failed');
                    });
            });
        }
    }
}

// Initialize the application when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.app = new EduHubApp();
});

// Make functions globally available for onclick handlers
window.showPage = (pageId) => {
    if (window.app) {
        window.app.showPage(pageId);
    }
};

window.toggleMobileMenu = () => {
    if (window.app) {
        window.app.toggleMobileMenu();
    }
};

window.showNotification = (message, type) => {
    if (window.app) {
        window.app.showNotification(message, type);
    }
};