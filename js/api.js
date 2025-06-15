// api.js - API Integration and Data Management
class EduHubAPI {
    constructor() {
        this.baseURL = 'https://api.eduhub.com'; // Replace with actual API URL
        this.courses = [];
        this.userProgress = {};
        this.quizData = {};
    }

    // API Integration - Functionality 1: Course Management
    async loadCourses() {
        try {
            // Simulating API call - replace with actual fetch
            return new Promise((resolve) => {
                setTimeout(() => {
                    const courses = [
                        {
                            id: 1,
                            title: "JavaScript Fundamentals",
                            description: "Pelajari dasar-dasar JavaScript dari nol hingga mahir",
                            category: "programming",
                            duration: "8 minggu",
                            difficulty: "Pemula",
                            students: 1250,
                            rating: 4.8,
                            progress: 75
                        },
                        {
                            id: 2,
                            title: "UI/UX Design Mastery",
                            description: "Menguasai prinsip-prinsip desain untuk pengalaman pengguna yang optimal",
                            category: "design",
                            duration: "6 minggu",
                            difficulty: "Menengah",
                            students: 890,
                            rating: 4.9,
                            progress: 45
                        },
                        {
                            id: 3,
                            title: "Digital Marketing Strategy",
                            description: "Strategi pemasaran digital yang efektif untuk bisnis modern",
                            category: "business",
                            duration: "10 minggu",
                            difficulty: "Lanjutan",
                            students: 567,
                            rating: 4.7,
                            progress: 30
                        },
                        {
                            id: 4,
                            title: "Data Science with Python",
                            description: "Analisis data dan machine learning menggunakan Python",
                            category: "science",
                            duration: "12 minggu",
                            difficulty: "Lanjutan",
                            students: 734,
                            rating: 4.8,
                            progress: 0
                        },
                        {
                            id: 5,
                            title: "Web Development Bootcamp",
                            description: "Kursus lengkap pengembangan web full-stack",
                            category: "programming",
                            duration: "16 minggu",
                            difficulty: "Menengah",
                            students: 1456,
                            rating: 4.9,
                            progress: 60
                        },
                        {
                            id: 6,
                            title: "Graphic Design Essentials",
                            description: "Dasar-dasar desain grafis untuk pemula",
                            category: "design",
                            duration: "4 minggu",
                            difficulty: "Pemula",
                            students: 923,
                            rating: 4.6,
                            progress: 90
                        }
                    ];
                    this.courses = courses;
                    resolve(courses);
                }, 500);
            });
        } catch (error) {
            console.error('Error loading courses:', error);
            throw error;
        }
    }

    // Real API call example (uncomment when ready to use actual API)
    /*
    async loadCourses() {
        try {
            const response = await fetch(`${this.baseURL}/courses`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${this.getAuthToken()}`
                }
            });
            
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            
            const courses = await response.json();
            this.courses = courses;
            return courses;
        } catch (error) {
            console.error('Error loading courses:', error);
            throw error;
        }
    }
    */

    // API Integration - Functionality 2: User Progress
    async loadUserProgress() {
        try {
            return new Promise((resolve) => {
                setTimeout(() => {
                    const userProgress = {
                        totalCourses: 6,
                        completedCourses: 2,
                        hoursLearned: 45,
                        certificatesEarned: 2,
                        currentStreak: 7,
                        quizzesCompleted: 15,
                        averageScore: 85
                    };
                    this.userProgress = userProgress;
                    resolve(userProgress);
                }, 300);
            });
        } catch (error) {
            console.error('Error loading user progress:', error);
            throw error;
        }
    }

    // API Integration - Functionality 3: Quiz Data
    initializeQuizData() {
        this.quizData = {
            programming: [
                {
                    question: "Apa itu JavaScript?",
                    options: [
                        "Bahasa pemrograman server-side",
                        "Bahasa pemrograman client-side",
                        "Database management system",
                        "Operating system"
                    ],
                    correct: 1
                },
                {
                    question: "Manakah yang bukan merupakan tipe data primitif di JavaScript?",
                    options: ["String", "Number", "Boolean", "Array"],
                    correct: 3
                },
                {
                    question: "Apa fungsi dari method 'getElementById()'?",
                    options: [
                        "Membuat element baru",
                        "Menghapus element",
                        "Mengambil element berdasarkan ID",
                        "Mengubah style element"
                    ],
                    correct: 2
                }
            ],
            design: [
                {
                    question: "Apa itu UX Design?",
                    options: [
                        "User Experience Design",
                        "User Interface Design",
                        "Universal Experience Design",
                        "Unique Experience Design"
                    ],
                    correct: 0
                },
                {
                    question: "Prinsip mana yang paling penting dalam desain UI?",
                    options: ["Warna", "Typography", "Usability", "Animasi"],
                    correct: 2
                }
            ],
            general: [
                {
                    question: "Apa kepanjangan dari HTML?",
                    options: [
                        "Hypertext Markup Language",
                        "Home Tool Markup Language",
                        "Hyperlinks and Text Markup Language",
                        "Hypertext Machine Language"
                    ],
                    correct: 0
                },
                {
                    question: "Siapa pendiri Microsoft?",
                    options: ["Steve Jobs", "Bill Gates", "Mark Zuckerberg", "Larry Page"],
                    correct: 1
                }
            ]
        };
        return this.quizData;
    }

    // API Integration - Functionality 4: Course Enrollment
    async enrollCourse(courseId) {
        try {
            return new Promise((resolve) => {
                setTimeout(() => {
                    const course = this.courses.find(c => c.id === courseId);
                    if (course && course.progress === 0) {
                        course.progress = 5; // Start with 5% progress
                    }
                    resolve({ success: true, course });
                }, 1000);
            });
        } catch (error) {
            console.error('Error enrolling in course:', error);
            throw error;
        }
    }

    // API Integration - Functionality 5: Contact Form Submission
    async submitContact(contactData) {
        try {
            return new Promise((resolve) => {
                setTimeout(() => {
                    const submission = {
                        ...contactData,
                        id: Date.now(),
                        timestamp: new Date().toISOString(),
                        status: 'submitted'
                    };
                    console.log('Contact form submitted:', submission);
                    resolve({ success: true, data: submission });
                }, 2000);
            });
        } catch (error) {
            console.error('Error submitting contact form:', error);
            throw error;
        }
    }

    // Update quiz progress
    async updateQuizProgress(score, category) {
        try {
            return new Promise((resolve) => {
                setTimeout(() => {
                    this.userProgress.quizzesCompleted++;
                    this.userProgress.hoursLearned += 0.5;
                    
                    // Calculate new average score
                    const totalQuizzes = this.userProgress.quizzesCompleted;
                    const currentTotal = this.userProgress.averageScore * (totalQuizzes - 1);
                    this.userProgress.averageScore = Math.round((currentTotal + score) / totalQuizzes);
                    
                    resolve({ 
                        success: true, 
                        progress: this.userProgress,
                        message: 'Progress berhasil diperbarui!'
                    });
                }, 500);
            });
        } catch (error) {
            console.error('Error updating quiz progress:', error);
            throw error;
        }
    }

    // Update course progress
    async updateCourseProgress(courseId, progress) {
        try {
            return new Promise((resolve) => {
                setTimeout(() => {
                    const course = this.courses.find(c => c.id === courseId);
                    if (course) {
                        course.progress = Math.min(progress, 100);
                        
                        // If course is completed, update user progress
                        if (course.progress === 100) {
                            this.userProgress.completedCourses++;
                            this.userProgress.certificatesEarned++;
                        }
                    }
                    resolve({ success: true, course });
                }, 300);
            });
        } catch (error) {
            console.error('Error updating course progress:', error);
            throw error;
        }
    }

    // Get authentication token (implement based on your auth system)
    getAuthToken() {
        return localStorage.getItem('authToken') || '';
    }

    // Set authentication token
    setAuthToken(token) {
        localStorage.setItem('authToken', token);
    }

    // Clear authentication token
    clearAuthToken() {
        localStorage.removeItem('authToken');
    }

    // Get user data
    getUserData() {
        return {
            courses: this.courses,
            progress: this.userProgress,
            quizData: this.quizData
        };
    }

    // Error handling utility
    handleError(error, context = '') {
        console.error(`API Error ${context}:`, error);
        
        // You can add more sophisticated error handling here
        if (error.status === 401) {
            // Handle unauthorized access
            this.clearAuthToken();
            window.location.href = '/login';
        } else if (error.status === 500) {
            // Handle server errors
            this.showNotification('Terjadi kesalahan server. Silakan coba lagi nanti.', 'error');
        }
        
        return {
            success: false,
            error: error.message || 'Terjadi kesalahan yang tidak diketahui'
        };
    }

    // Utility method for showing notifications (should be implemented in main.js)
    showNotification(message, type = 'success') {
        if (window.showNotification) {
            window.showNotification(message, type);
        } else {
            console.log(`${type.toUpperCase()}: ${message}`);
        }
    }
}

// Export the API class
if (typeof module !== 'undefined' && module.exports) {
    module.exports = EduHubAPI;
} else {
    window.EduHubAPI = EduHubAPI;
}