// progress.js - Progress Tracking Management

class ProgressManager {
    constructor() {
        this.userProgress = {};
        this.courses = [];
        this.init();
    }

    init() {
        this.loadUserProgress();
        this.setupProgressListeners();
    }

    // Load user progress data
    loadUserProgress() {
        // Simulating API call
        setTimeout(() => {
            this.userProgress = {
                totalCourses: 6,
                completedCourses: 2,
                hoursLearned: 45,
                certificatesEarned: 2,
                currentStreak: 7,
                quizzesCompleted: 15,
                averageScore: 85
            };
            this.displayProgress();
        }, 300);
    }

    // Display progress information
    displayProgress() {
        const progressList = document.getElementById('progressList');
        
        if (!progressList) return;

        // Get courses data from global variable or load it
        const coursesData = window.courses || this.getDefaultCourses();
        
        progressList.innerHTML = coursesData.map(course => `
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

    // Update progress statistics
    updateProgressStats() {
        const elements = {
            completedCourses: document.getElementById('completedCourses'),
            hoursLearned: document.getElementById('hoursLearned'),
            certificatesEarned: document.getElementById('certificatesEarned'),
            currentStreak: document.getElementById('currentStreak')
        };

        Object.keys(elements).forEach(key => {
            if (elements[key]) {
                elements[key].textContent = this.userProgress[key];
            }
        });
    }

    // Update quiz progress
    updateQuizProgress() {
        this.userProgress.quizzesCompleted++;
        this.userProgress.hoursLearned += 0.5;
        
        // Simulate API call to update progress
        setTimeout(() => {
            this.showNotification('Progress berhasil diperbarui!');
            this.updateStatistics();
        }, 500);
    }

    // Update overall statistics
    updateStatistics() {
        // Animate counter updates
        this.animateCounter('totalStudents', 1250);
        this.animateCounter('totalCourses', 6);
        this.animateCounter('totalQuizzes', this.userProgress.quizzesCompleted || 15);
        
        // Update success rate
        const successRate = this.userProgress.averageScore || 85;
        const successRateElement = document.getElementById('successRate');
        if (successRateElement) {
            successRateElement.textContent = successRate + '%';
        }
    }

    // Animate counter with smooth transition
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

    // Update course progress
    updateCourseProgress(courseId, newProgress) {
        const course = this.courses.find(c => c.id === courseId);
        if (course) {
            course.progress = Math.min(Math.max(newProgress, 0), 100);
            this.displayProgress();
            this.saveProgressToStorage();
        }
    }

    // Save progress to localStorage (if available)
    saveProgressToStorage() {
        try {
            const progressData = {
                userProgress: this.userProgress,
                courses: this.courses,
                timestamp: new Date().toISOString()
            };
            // In a real application, you would send this to your backend
            console.log('Progress saved:', progressData);
        } catch (error) {
            console.error('Error saving progress:', error);
        }
    }

    // Load progress from storage
    loadProgressFromStorage() {
        try {
            // In a real application, you would load this from your backend
            const savedData = JSON.parse(localStorage.getItem('eduHubProgress') || '{}');
            if (savedData.userProgress) {
                this.userProgress = savedData.userProgress;
            }
            if (savedData.courses) {
                this.courses = savedData.courses;
            }
        } catch (error) {
            console.error('Error loading progress:', error);
        }
    }

    // Auto-save progress periodically
    setupAutoSave() {
        setInterval(() => {
            // Simulate auto-save progress
            if (Math.random() > 0.95) { // 5% chance every interval
                this.courses.forEach(course => {
                    if (course.progress > 0 && course.progress < 100 && Math.random() > 0.8) {
                        course.progress = Math.min(course.progress + Math.floor(Math.random() * 5), 100);
                    }
                });
                this.displayProgress();
            }
        }, 10000); // Every 10 seconds
    }

    // Setup event listeners
    setupProgressListeners() {
        // Listen for course enrollment events
        document.addEventListener('courseEnrolled', (event) => {
            this.handleCourseEnrollment(event.detail);
        });

        // Listen for quiz completion events
        document.addEventListener('quizCompleted', (event) => {
            this.handleQuizCompletion(event.detail);
        });
    }

    // Handle course enrollment
    handleCourseEnrollment(courseData) {
        const course = this.courses.find(c => c.id === courseData.id);
        if (course && course.progress === 0) {
            course.progress = 5; // Start with 5% progress
            this.displayProgress();
            this.saveProgressToStorage();
        }
    }

    // Handle quiz completion
    handleQuizCompletion(quizData) {
        this.userProgress.quizzesCompleted++;
        this.userProgress.hoursLearned += 0.5;
        
        // Update average score
        const totalQuizzes = this.userProgress.quizzesCompleted;
        const currentAverage = this.userProgress.averageScore || 0;
        this.userProgress.averageScore = Math.round(
            ((currentAverage * (totalQuizzes - 1)) + quizData.score) / totalQuizzes
        );
        
        this.updateProgressStats();
        this.saveProgressToStorage();
    }

    // Get default courses data
    getDefaultCourses() {
        return [
            {
                id: 1,
                title: "JavaScript Fundamentals",
                category: "programming",
                progress: 75
            },
            {
                id: 2,
                title: "UI/UX Design Mastery",
                category: "design",
                progress: 45
            },
            {
                id: 3,
                title: "Digital Marketing Strategy",
                category: "business",
                progress: 30
            },
            {
                id: 4,
                title: "Data Science with Python",
                category: "science",
                progress: 0
            },
            {
                id: 5,
                title: "Web Development Bootcamp",
                category: "programming",
                progress: 60
            },
            {
                id: 6,
                title: "Graphic Design Essentials",
                category: "design",
                progress: 90
            }
        ];
    }

    // Show notification
    showNotification(message, type = 'success') {
        const notification = document.getElementById('notification');
        const notificationText = document.getElementById('notificationText');
        
        if (notification && notificationText) {
            notificationText.textContent = message;
            notification.className = `notification ${type}`;
            notification.classList.add('show');
            
            setTimeout(() => {
                notification.classList.remove('show');
            }, 3000);
        }
    }

    // Get user statistics
    getUserStats() {
        return {
            ...this.userProgress,
            completionRate: this.calculateCompletionRate(),
            averageProgressPerCourse: this.calculateAverageProgress()
        };
    }

    // Calculate completion rate
    calculateCompletionRate() {
        const totalCourses = this.courses.length;
        const completedCourses = this.courses.filter(course => course.progress >= 100).length;
        return totalCourses > 0 ? Math.round((completedCourses / totalCourses) * 100) : 0;
    }

    // Calculate average progress across all courses
    calculateAverageProgress() {
        if (this.courses.length === 0) return 0;
        const totalProgress = this.courses.reduce((sum, course) => sum + course.progress, 0);
        return Math.round(totalProgress / this.courses.length);
    }

    // Export progress data
    exportProgress() {
        const progressData = {
            userProgress: this.userProgress,
            courses: this.courses,
            statistics: this.getUserStats(),
            exportDate: new Date().toISOString()
        };
        
        return progressData;
    }
}

// Initialize Progress Manager when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    window.progressManager = new ProgressManager();
});

// Export for module use
if (typeof module !== 'undefined' && module.exports) {
    module.exports = ProgressManager;
}