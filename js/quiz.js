/**
 * EduHub Quiz System
 * Sistem quiz interaktif untuk platform pembelajaran online
 * Author: EduHub Development Team
 * Version: 1.0.0
 */

class QuizSystem {
    constructor() {
        this.quizData = {};
        this.currentQuiz = null;
        this.currentQuestionIndex = 0;
        this.userAnswers = [];
        this.score = 0;
        this.timeLeft = 0;
        this.timer = null;
        this.userProgress = {
            quizzesCompleted: 0,
            totalScore: 0,
            averageScore: 0,
            hoursLearned: 0
        };
        
        this.initializeQuizData();
        this.setupEventListeners();
    }

    /**
     * Inisialisasi data quiz untuk berbagai kategori
     */
    initializeQuizData() {
        this.quizData = {
            programming: {
                title: "Quiz Programming",
                timeLimit: 300, // 5 menit
                questions: [
                    {
                        question: "Apa itu JavaScript?",
                        options: [
                            "Bahasa pemrograman server-side",
                            "Bahasa pemrograman client-side",
                            "Database management system",
                            "Operating system"
                        ],
                        correct: 1,
                        explanation: "JavaScript adalah bahasa pemrograman yang utamanya digunakan untuk pengembangan web sisi klien (client-side)."
                    },
                    {
                        question: "Manakah yang bukan merupakan tipe data primitif di JavaScript?",
                        options: ["String", "Number", "Boolean", "Array"],
                        correct: 3,
                        explanation: "Array adalah tipe data non-primitif (object) di JavaScript. Tipe data primitif meliputi: string, number, boolean, null, undefined, symbol, dan bigint."
                    },
                    {
                        question: "Apa fungsi dari method 'getElementById()'?",
                        options: [
                            "Membuat element baru",
                            "Menghapus element",
                            "Mengambil element berdasarkan ID",
                            "Mengubah style element"
                        ],
                        correct: 2,
                        explanation: "getElementById() adalah method DOM yang digunakan untuk mengambil/memilih element HTML berdasarkan atribut ID."
                    },
                    {
                        question: "Apa yang dimaksud dengan 'hoisting' dalam JavaScript?",
                        options: [
                            "Proses pengurutan array",
                            "Pemindahan deklarasi ke atas scope",
                            "Penghapusan variabel otomatis",
                            "Konversi tipe data"
                        ],
                        correct: 1,
                        explanation: "Hoisting adalah mekanisme JavaScript dimana deklarasi variabel dan fungsi dipindahkan ke atas scope mereka selama fase kompilasi."
                    },
                    {
                        question: "Manakah cara yang benar untuk membuat array di JavaScript?",
                        options: [
                            "let arr = [];",
                            "let arr = new Array();",
                            "let arr = [1, 2, 3];",
                            "Semua jawaban benar"
                        ],
                        correct: 3,
                        explanation: "Semua cara tersebut valid untuk membuat array di JavaScript. Bracket notation ([]) adalah cara yang paling umum digunakan."
                    }
                ]
            },
            design: {
                title: "Quiz UI/UX Design",
                timeLimit: 240, // 4 menit
                questions: [
                    {
                        question: "Apa itu UX Design?",
                        options: [
                            "User Experience Design",
                            "User Interface Design",
                            "Universal Experience Design",
                            "Unique Experience Design"
                        ],
                        correct: 0,
                        explanation: "UX Design adalah User Experience Design, yaitu proses menciptakan produk yang memberikan pengalaman yang bermakna dan relevan kepada pengguna."
                    },
                    {
                        question: "Prinsip mana yang paling penting dalam desain UI?",
                        options: ["Warna", "Typography", "Usability", "Animasi"],
                        correct: 2,
                        explanation: "Usability adalah prinsip terpenting dalam UI design karena interface yang mudah digunakan akan memberikan pengalaman pengguna yang baik."
                    },
                    {
                        question: "Apa yang dimaksud dengan 'wireframe' dalam desain?",
                        options: [
                            "Sketsa kasar layout halaman",
                            "Warna utama desain",
                            "Font yang digunakan",
                            "Animasi transisi"
                        ],
                        correct: 0,
                        explanation: "Wireframe adalah sketsa atau blueprint kasar yang menunjukkan struktur dan layout dasar dari sebuah halaman atau aplikasi."
                    },
                    {
                        question: "Berapa jumlah warna maksimal yang disarankan dalam satu palette desain?",
                        options: ["3-5 warna", "5-7 warna", "7-10 warna", "Tidak ada batasan"],
                        correct: 0,
                        explanation: "Palette warna yang efektif biasanya terdiri dari 3-5 warna utama untuk menjaga konsistensi dan keharmonisan visual."
                    }
                ]
            },
            general: {
                title: "Quiz Pengetahuan Umum",
                timeLimit: 180, // 3 menit
                questions: [
                    {
                        question: "Apa kepanjangan dari HTML?",
                        options: [
                            "Hypertext Markup Language",
                            "Home Tool Markup Language",
                            "Hyperlinks and Text Markup Language",
                            "Hypertext Machine Language"
                        ],
                        correct: 0,
                        explanation: "HTML adalah singkatan dari Hypertext Markup Language, yaitu bahasa markup standar untuk membuat halaman web."
                    },
                    {
                        question: "Siapa pendiri Microsoft?",
                        options: ["Steve Jobs", "Bill Gates", "Mark Zuckerberg", "Larry Page"],
                        correct: 1,
                        explanation: "Bill Gates adalah salah satu pendiri Microsoft bersama dengan Paul Allen pada tahun 1975."
                    },
                    {
                        question: "Apa kepanjangan dari CPU?",
                        options: [
                            "Central Processing Unit",
                            "Computer Processing Unit",
                            "Central Program Unit",
                            "Computer Program Unit"
                        ],
                        correct: 0,
                        explanation: "CPU adalah Central Processing Unit, komponen utama komputer yang menjalankan instruksi program."
                    },
                    {
                        question: "Dalam tahun berapa World Wide Web (WWW) diciptakan?",
                        options: ["1989", "1991", "1993", "1995"],
                        correct: 1,
                        explanation: "World Wide Web diciptakan oleh Tim Berners-Lee pada tahun 1991 saat bekerja di CERN."
                    }
                ]
            },
            business: {
                title: "Quiz Business & Marketing",
                timeLimit: 360, // 6 menit
                questions: [
                    {
                        question: "Apa yang dimaksud dengan ROI dalam bisnis?",
                        options: [
                            "Return on Investment",
                            "Rate of Interest",
                            "Revenue of Income",
                            "Risk of Investment"
                        ],
                        correct: 0,
                        explanation: "ROI (Return on Investment) adalah metrik keuangan yang digunakan untuk mengukur efisiensi investasi atau membandingkan efisiensi beberapa investasi."
                    },
                    {
                        question: "Dalam marketing mix 4P, apa yang dimaksud dengan 'Place'?",
                        options: [
                            "Tempat produksi",
                            "Tempat penyimpanan",
                            "Saluran distribusi",
                            "Tempat kantor"
                        ],
                        correct: 2,
                        explanation: "Dalam marketing mix 4P, 'Place' merujuk pada saluran distribusi atau cara produk sampai ke konsumen."
                    },
                    {
                        question: "Apa yang dimaksud dengan B2B dalam bisnis?",
                        options: [
                            "Business to Business",
                            "Business to Buyer",
                            "Brand to Business",
                            "Business to Bank"
                        ],
                        correct: 0,
                        explanation: "B2B (Business to Business) adalah model bisnis dimana perusahaan menjual produk atau layanan kepada perusahaan lain."
                    }
                ]
            }
        };
    }

    /**
     * Setup event listeners untuk interaksi pengguna
     */
    setupEventListeners() {
        // Event listener untuk pemilihan kategori quiz
        const quizCategory = document.getElementById('quizCategory');
        if (quizCategory) {
            quizCategory.addEventListener('change', () => this.loadQuiz());
        }

        // Event listener untuk keyboard shortcuts
        document.addEventListener('keydown', (e) => {
            if (this.currentQuiz) {
                // Angka 1-4 untuk memilih jawaban
                if (e.key >= '1' && e.key <= '4') {
                    const optionIndex = parseInt(e.key) - 1;
                    this.selectOption(optionIndex);
                }
                // Enter untuk submit jawaban
                else if (e.key === 'Enter') {
                    if (document.getElementById('nextBtn').style.display === 'none') {
                        this.submitAnswer();
                    } else {
                        this.nextQuestion();
                    }
                }
                // Escape untuk keluar dari quiz
                else if (e.key === 'Escape') {
                    this.confirmExitQuiz();
                }
            }
        });
    }

    /**
     * Load quiz berdasarkan kategori yang dipilih
     */
    loadQuiz() {
        const category = document.getElementById('quizCategory').value;
        if (!category || !this.quizData[category]) {
            this.resetQuiz();
            return;
        }

        this.currentQuiz = this.quizData[category];
        this.currentQuestionIndex = 0;
        this.userAnswers = [];
        this.score = 0;
        this.timeLeft = this.currentQuiz.timeLimit;

        // Tampilkan container quiz
        const quizQuestions = document.getElementById('quizQuestions');
        const quizResults = document.getElementById('quizResults');
        
        if (quizQuestions) quizQuestions.style.display = 'block';
        if (quizResults) quizResults.style.display = 'none';

        this.showQuestion();
        this.startTimer();
    }

    /**
     * Tampilkan pertanyaan saat ini
     */
    showQuestion() {
        if (this.currentQuestionIndex >= this.currentQuiz.questions.length) {
            this.showResults();
            return;
        }

        const question = this.currentQuiz.questions[this.currentQuestionIndex];
        const questionText = document.getElementById('questionText');
        const quizOptions = document.getElementById('quizOptions');
        const nextBtn = document.getElementById('nextBtn');

        if (questionText) {
            questionText.innerHTML = `
                <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1rem;">
                    <span>Pertanyaan ${this.currentQuestionIndex + 1} dari ${this.currentQuiz.questions.length}</span>
                    <span id="timerDisplay" style="color: #ff6b6b; font-weight: bold;">⏰ ${this.formatTime(this.timeLeft)}</span>
                </div>
                ${question.question}
            `;
        }

        if (quizOptions) {
            quizOptions.innerHTML = question.options.map((option, index) => `
                <div class="quiz-option" onclick="quizSystem.selectOption(${index})" data-option="${index}">
                    <span class="option-number">${index + 1}.</span>
                    <span class="option-text">${option}</span>
                </div>
            `).join('');
        }

        if (nextBtn) {
            nextBtn.style.display = 'none';
        }

        // Update progress bar
        this.updateProgressBar();
    }

    /**
     * Update progress bar quiz
     */
    updateProgressBar() {
        const progress = ((this.currentQuestionIndex + 1) / this.currentQuiz.questions.length) * 100;
        let progressBar = document.getElementById('quizProgressBar');
        
        if (!progressBar) {
            // Buat progress bar jika belum ada
            const questionText = document.getElementById('questionText');
            if (questionText && questionText.parentNode) {
                const progressContainer = document.createElement('div');
                progressContainer.innerHTML = `
                    <div style="width: 100%; background: #e9ecef; border-radius: 5px; margin: 1rem 0;">
                        <div id="quizProgressBar" style="height: 8px; background: linear-gradient(90deg, #667eea, #764ba2); border-radius: 5px; transition: width 0.3s ease; width: ${progress}%;"></div>
                    </div>
                `;
                questionText.parentNode.insertBefore(progressContainer, questionText.nextSibling);
            }
        } else {
            progressBar.style.width = progress + '%';
        }
    }

    /**
     * Pilih opsi jawaban
     */
    selectOption(optionIndex) {
        if (optionIndex < 0 || optionIndex >= this.currentQuiz.questions[this.currentQuestionIndex].options.length) {
            return;
        }

        // Hapus seleksi sebelumnya
        document.querySelectorAll('.quiz-option').forEach(option => {
            option.classList.remove('selected');
        });

        // Tambahkan seleksi ke opsi yang dipilih
        const selectedOption = document.querySelector(`[data-option="${optionIndex}"]`);
        if (selectedOption) {
            selectedOption.classList.add('selected');
        }

        // Simpan jawaban
        this.userAnswers[this.currentQuestionIndex] = optionIndex;
    }

    /**
     * Submit jawaban untuk pertanyaan saat ini
     */
    submitAnswer() {
        if (this.userAnswers[this.currentQuestionIndex] === undefined) {
            this.showNotification('Pilih jawaban terlebih dahulu!', 'error');
            return;
        }

        const question = this.currentQuiz.questions[this.currentQuestionIndex];
        const userAnswer = this.userAnswers[this.currentQuestionIndex];
        const isCorrect = userAnswer === question.correct;

        // Update skor
        if (isCorrect) {
            this.score++;
            this.showNotification('Jawaban benar! 🎉', 'success');
        } else {
            this.showNotification(`Jawaban salah. ${question.explanation}`, 'error');
        }

        // Tampilkan penjelasan
        this.showExplanation(question, isCorrect);

        // Tampilkan tombol next
        const nextBtn = document.getElementById('nextBtn');
        if (nextBtn) {
            nextBtn.style.display = 'inline-block';
        }

        // Disable semua opsi
        document.querySelectorAll('.quiz-option').forEach(option => {
            option.style.pointerEvents = 'none';
            option.style.opacity = '0.7';
        });

        // Highlight jawaban yang benar
        const correctOption = document.querySelector(`[data-option="${question.correct}"]`);
        if (correctOption) {
            correctOption.style.background = '#d4edda';
            correctOption.style.borderColor = '#28a745';
        }
    }

    /**
     * Tampilkan penjelasan untuk jawaban
     */
    showExplanation(question, isCorrect) {
        const explanationDiv = document.createElement('div');
        explanationDiv.className = 'quiz-explanation';
        explanationDiv.innerHTML = `
            <div style="
                margin-top: 1rem; 
                padding: 1rem; 
                background: ${isCorrect ? '#d4edda' : '#f8d7da'}; 
                border: 1px solid ${isCorrect ? '#c3e6cb' : '#f5c6cb'}; 
                border-radius: 10px;
                color: ${isCorrect ? '#155724' : '#721c24'};
            ">
                <strong>${isCorrect ? '✅ Benar!' : '❌ Salah!'}</strong><br>
                <em>Penjelasan:</em> ${question.explanation}
            </div>
        `;

        const quizOptions = document.getElementById('quizOptions');
        if (quizOptions) {
            quizOptions.appendChild(explanationDiv);
        }
    }

    /**
     * Pindah ke pertanyaan berikutnya
     */
    nextQuestion() {
        // Hapus penjelasan sebelumnya
        const explanation = document.querySelector('.quiz-explanation');
        if (explanation) {
            explanation.remove();
        }

        // Enable kembali semua opsi
        document.querySelectorAll('.quiz-option').forEach(option => {
            option.style.pointerEvents = 'auto';
            option.style.opacity = '1';
            option.style.background = '';
            option.style.borderColor = '';
        });

        this.currentQuestionIndex++;
        this.showQuestion();
    }

    /**
     * Tampilkan hasil quiz
     */
    showResults() {
        this.stopTimer();
        
        const quizQuestions = document.getElementById('quizQuestions');
        const quizResults = document.getElementById('quizResults');
        
        if (quizQuestions) quizQuestions.style.display = 'none';
        if (quizResults) quizResults.style.display = 'block';

        const totalQuestions = this.currentQuiz.questions.length;
        const percentage = Math.round((this.score / totalQuestions) * 100);
        const timeSpent = this.currentQuiz.timeLimit - this.timeLeft;

        // Update hasil
        const finalScore = document.getElementById('finalScore');
        if (finalScore) {
            finalScore.textContent = `${this.score}/${totalQuestions}`;
        }

        // Tambahkan detail hasil
        const scoreText = document.getElementById('scoreText');
        if (scoreText) {
            scoreText.innerHTML = `
                <div style="text-align: center; margin: 2rem 0;">
                    <div style="font-size: 3rem; margin-bottom: 1rem;">
                        ${this.getScoreEmoji(percentage)}
                    </div>
                    <div style="font-size: 1.5rem; font-weight: bold; color: #667eea; margin-bottom: 0.5rem;">
                        Skor: ${this.score}/${totalQuestions} (${percentage}%)
                    </div>
                    <div style="color: #666; margin-bottom: 1rem;">
                        Waktu yang digunakan: ${this.formatTime(timeSpent)}
                    </div>
                    <div style="color: #666;">
                        ${this.getScoreMessage(percentage)}
                    </div>
                </div>
                
                <div style="margin-top: 2rem;">
                    <h4>Ringkasan Jawaban:</h4>
                    <div id="answerSummary"></div>
                </div>
            `;
        }

        // Tampilkan ringkasan jawaban
        this.showAnswerSummary();

        // Update progress pengguna
        this.updateUserProgress(percentage, timeSpent);
    }

    /**
     * Tampilkan ringkasan jawaban
     */
    showAnswerSummary() {
        const summaryContainer = document.getElementById('answerSummary');
        if (!summaryContainer) return;

        const summary = this.currentQuiz.questions.map((question, index) => {
            const userAnswer = this.userAnswers[index];
            const isCorrect = userAnswer === question.correct;
            
            return `
                <div style="
                    margin: 1rem 0; 
                    padding: 1rem; 
                    border-left: 4px solid ${isCorrect ? '#28a745' : '#dc3545'};
                    background: ${isCorrect ? '#f8f9fa' : '#fff5f5'};
                ">
                    <div style="font-weight: bold; margin-bottom: 0.5rem;">
                        ${index + 1}. ${question.question}
                    </div>
                    <div style="color: ${isCorrect ? '#28a745' : '#dc3545'};">
                        ${isCorrect ? '✅' : '❌'} 
                        Jawaban Anda: ${question.options[userAnswer] || 'Tidak dijawab'}
                    </div>
                    ${!isCorrect ? `
                        <div style="color: #28a745; margin-top: 0.5rem;">
                            ✅ Jawaban yang benar: ${question.options[question.correct]}
                        </div>
                    ` : ''}
                </div>
            `;
        }).join('');

        summaryContainer.innerHTML = summary;
    }

    /**
     * Dapatkan emoji berdasarkan skor
     */
    getScoreEmoji(percentage) {
        if (percentage >= 90) return '🏆';
        if (percentage >= 80) return '🎉';
        if (percentage >= 70) return '👍';
        if (percentage >= 60) return '😊';
        return '💪';
    }

    /**
     * Dapatkan pesan berdasarkan skor
     */
    getScoreMessage(percentage) {
        if (percentage >= 90) return 'Luar biasa! Anda benar-benar menguasai materi ini!';
        if (percentage >= 80) return 'Bagus sekali! Pengetahuan Anda sangat baik!';
        if (percentage >= 70) return 'Baik! Anda sudah memahami sebagian besar materi!';
        if (percentage >= 60) return 'Cukup baik! Masih ada ruang untuk perbaikan!';
        return 'Jangan menyerah! Terus belajar dan coba lagi!';
    }

    /**
     * Mulai timer untuk quiz
     */
    startTimer() {
        this.timer = setInterval(() => {
            this.timeLeft--;
            this.updateTimerDisplay();

            if (this.timeLeft <= 0) {
                this.timeUp();
            }
        }, 1000);
    }

    /**
     * Hentikan timer
     */
    stopTimer() {
        if (this.timer) {
            clearInterval(this.timer);
            this.timer = null;
        }
    }

    /**
     * Update tampilan timer
     */
    updateTimerDisplay() {
        const timerDisplay = document.getElementById('timerDisplay');
        if (timerDisplay) {
            timerDisplay.textContent = `⏰ ${this.formatTime(this.timeLeft)}`;
            
            // Ubah warna jika waktu hampir habis
            if (this.timeLeft <= 30) {
                timerDisplay.style.color = '#ff0000';
                timerDisplay.style.fontWeight = 'bold';
            } else if (this.timeLeft <= 60) {
                timerDisplay.style.color = '#ff6b6b';
            }
        }
    }

    /**
     * Format waktu dalam menit:detik
     */
    formatTime(seconds) {
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = seconds % 60;
        return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
    }

    /**
     * Fungsi ketika waktu habis
     */
    timeUp() {
        this.stopTimer();
        this.showNotification('Waktu habis! Quiz akan berakhir.', 'error');
        
        setTimeout(() => {
            this.showResults();
        }, 2000);
    }

    /**
     * Restart quiz
     */
    restartQuiz() {
        this.stopTimer();
        
        const quizCategory = document.getElementById('quizCategory');
        if (quizCategory) {
            quizCategory.value = '';
        }
        
        this.resetQuiz();
    }

    /**
     * Reset quiz ke kondisi awal
     */
    resetQuiz() {
        this.stopTimer();
        
        const quizQuestions = document.getElementById('quizQuestions');
        const quizResults = document.getElementById('quizResults');
        
        if (quizQuestions) quizQuestions.style.display = 'none';
        if (quizResults) quizResults.style.display = 'none';
        
        // Reset progress bar
        const progressBar = document.getElementById('quizProgressBar');
        if (progressBar && progressBar.parentNode) {
            progressBar.parentNode.remove();
        }
        
        this.currentQuiz = null;
        this.currentQuestionIndex = 0;
        this.userAnswers = [];
        this.score = 0;
        this.timeLeft = 0;
    }

    /**
     * Konfirmasi keluar dari quiz
     */
    confirmExitQuiz() {
        if (this.currentQuiz && confirm('Apakah Anda yakin ingin keluar dari quiz? Progress akan hilang.')) {
            this.restartQuiz();
        }
    }

    /**
     * Update progress pengguna
     */
    updateUserProgress(percentage, timeSpent) {
        this.userProgress.quizzesCompleted++;
        this.userProgress.totalScore += percentage;
        this.userProgress.averageScore = Math.round(this.userProgress.totalScore / this.userProgress.quizzesCompleted);
        this.userProgress.hoursLearned += Math.round(timeSpent / 60 * 100) / 100; // Convert to hours

        // Simpan ke localStorage (jika tersedia)
        try {
            localStorage.setItem('eduhub_user_progress', JSON.stringify(this.userProgress));
        } catch (e) {
            console.log('LocalStorage not available');
        }

        // Trigger event untuk update statistik global
        const event = new CustomEvent('quizCompleted', {
            detail: {
                score: percentage,
                timeSpent: timeSpent,
                category: this.currentQuiz.title
            }
        });
        document.dispatchEvent(event);
    }

    /**
     * Load progress pengguna dari localStorage
     */
    loadUserProgress() {
        try {
            const saved = localStorage.getItem('eduhub_user_progress');
            if (saved) {
                this.userProgress = { ...this.userProgress, ...JSON.parse(saved) };
            }
        } catch (e) {
            console.log('Could not load user progress');
        }
    }

    /**
     * Tampilkan notifikasi
     */
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
        } else {
            // Fallback jika element notifikasi tidak ada
            alert(message);
        }
    }

    /**
     * Dapatkan statistik pengguna
     */
    getUserStats() {
        return {
            ...this.userProgress,
            currentQuiz: this.currentQuiz ? this.currentQuiz.title : null,
            isQuizActive: this.currentQuiz !== null
        };
    }

    /**
     * Export hasil quiz ke PDF (memerlukan library tambahan)
     */
    exportToPDF() {
        // Implementasi export PDF bisa ditambahkan dengan library seperti jsPDF
        this.showNotification('Fitur export PDF akan segera tersedia!', 'info');
    }

    /**
     * Share hasil quiz ke media sosial
     */
    shareResults() {
        if (this.score && this.currentQuiz) {
            const percentage = Math.round((this.score / this.currentQuiz.questions.length) * 100);
            const text = `Saya baru saja menyelesaikan ${this.currentQuiz.title} di EduHub dengan skor ${percentage}%! 🎉`;
            
            if (navigator.share) {
                navigator.share({
                    title: 'Hasil Quiz EduHub',
                    text: text,
                    url: window.location.href
                });
            } else {
                // Fallback: copy to clipboard
                navigator.clipboard.writeText(text).then(() => {
                    this.showNotification('Hasil quiz berhasil disalin ke clipboard!');
                });
            }
        }
    }
}

// Inisialisasi sistem quiz ketika DOM loaded
document.addEventListener('DOMContentLoaded', function() {
    window.quizSystem = new QuizSystem();
    
    // Load user progress
    quizSystem.loadUserProgress();
    
    // Setup global functions untuk kompatibilitas dengan HTML
    window.loadQuiz = () => quizSystem.loadQuiz();
    window.selectOption = (index) => quizSystem.selectOption(index);
    window.submitAnswer = () => quizSystem.submitAnswer();
    window.nextQuestion = () => quizSystem.nextQuestion();
    window.restartQuiz = () => quizSystem.restartQuiz();
    window.resetQuiz = () => quizSystem.resetQuiz();
});

// Export untuk penggunaan sebagai module
if (typeof module !== 'undefined' && module.exports) {
    module.exports = QuizSystem;
}