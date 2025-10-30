// === کتابوں کا ڈیٹا ===
const booksData = [
    // اردو ناول
    {
        id: 1,
        title: "آگ کا دریا",
        author: "قرۃ العین حیدر",
        language: "urdu",
        genre: "novel",
        description: "برصغیر کی تقسیم پر مبنی شاہکار ناول",
        cover: "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=400&q=80",
        pdfUrl: "pdfs/urdu/aag-ka-darya.pdf",
        pages: 450,
        year: 1959,
        rating: 4.8
    },
    {
        id: 2,
        title: "راجہ گدھ",
        author: "عبداللہ حسین",
        language: "urdu",
        genre: "novel", 
        description: "پاکستان کے سیاسی حالات پر طنزیہ ناول",
        cover: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&q=80",
        pdfUrl: "pdfs/urdu/raja-gidh.pdf",
        pages: 320,
        year: 1963,
        rating: 4.6
    },

    // ہندی ناول
    {
        id: 3,
        title: "गोदान",
        author: "प्रेमचंद",
        language: "hindi",
        genre: "novel",
        description: "भारतीय ग्रामीण जीवन पर आधारित उपन्यास",
        cover: "https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?w=400&q=80",
        pdfUrl: "pdfs/hindi/godan.pdf",
        pages: 380,
        year: 1936,
        rating: 4.7
    },

    // پنجابی ناول
    {
        id: 4, 
        title: "पिंजर",
        author: "अमृता प्रीतम",
        language: "punjabi",
        genre: "novel",
        description: "विभाजन की त्रासदी पर आधारित उपन्यास",
        cover: "https://images.unsplash.com/photo-1483058712412-4245e9b90334?w=400&q=80",
        pdfUrl: "pdfs/punjabi/pinjar.pdf",
        pages: 280,
        year: 1950,
        rating: 4.5
    },

    // اردو شاعری
    {
        id: 5,
        title: "دیوانِ غالب",
        author: "مرزا غالب",
        language: "urdu", 
        genre: "poetry",
        description: "غالب کے کلام کا مکمل دیوان",
        cover: "https://images.unsplash.com/photo-1512820790803-83ca734da794?w=400&q=80",
        pdfUrl: "pdfs/urdu/dewan-e-ghalib.pdf",
        pages: 200,
        year: 1869,
        rating: 4.9
    },

    // افسانے
    {
        id: 6,
        title: "افسانے",
        author: "سعادت حسن منٹو",
        language: "urdu",
        genre: "short-stories",
        description: "منٹو کے منتخب افسانے",
        cover: "https://images.unsplash.com/photo-1589998059171-988d887df646?w=400&q=80", 
        pdfUrl: "pdfs/urdu/manto-stories.pdf",
        pages: 180,
        year: 1955,
        rating: 4.7
    },

    // مزید کتابیں شامل کریں...
];

// === فنکشنز ===

// کتابیں ڈسپلے کریں
function displayBooks(books, containerId) {
    const container = document.getElementById(containerId);
    if (!container) return;

    container.innerHTML = books.map(book => `
        <div class="book-card" data-language="${book.language}" data-genre="${book.genre}">
            <img src="${book.cover}" alt="${book.title}" class="book-cover">
            <div class="book-content">
                <h3 class="book-title">${book.title}</h3>
                <p class="book-author">${book.author}</p>
                <p class="book-description">${book.description}</p>
                <div class="book-meta">
                    <span>📖 ${book.pages} صفحات</span>
                    <span>⭐ ${book.rating}</span>
                    <span>${book.year}</span>
                </div>
                <div class="book-actions">
                    <button class="read-btn" onclick="readBook('${book.pdfUrl}')">📖 پڑھیں</button>
                    <button class="download-btn" onclick="downloadBook('${book.pdfUrl}', '${book.title}')">📥 ڈاؤنلوڈ</button>
                </div>
            </div>
        </div>
    `).join('');
}

// کتاب پڑھیں
function readBook(pdfUrl) {
    window.open(pdfUrl, '_blank', 'width=800,height=600');
    trackEvent('book', 'read', pdfUrl);
}

// کتاب ڈاؤنلوڈ کریں
function downloadBook(pdfUrl, title) {
    const link = document.createElement('a');
    link.href = pdfUrl;
    link.download = `${title}.pdf`;
    link.click();
    trackEvent('book', 'download', title);
}

// کتابیں تلاش کریں
function searchBooks() {
    const searchTerm = document.getElementById('searchInput')?.value.toLowerCase() || 
                      document.getElementById('heroSearchInput')?.value.toLowerCase() || '';
    
    const resultsContainer = document.getElementById('searchResults');
    const resultsTitle = document.getElementById('searchResultsTitle');
    const resultsSection = document.getElementById('searchResultsSection');

    if (searchTerm.trim() === '') {
        if (resultsSection) resultsSection.style.display = 'none';
        return;
    }

    if (resultsSection) resultsSection.style.display = 'block';

    const filteredBooks = booksData.filter(book => 
        book.title.toLowerCase().includes(searchTerm) ||
        book.author.toLowerCase().includes(searchTerm) ||
        book.description.toLowerCase().includes(searchTerm) ||
        book.genre.toLowerCase().includes(searchTerm) ||
        book.language.toLowerCase().includes(searchTerm)
    );

    if (resultsTitle) {
        resultsTitle.textContent = `تلاش کے نتائج (${filteredBooks.length})`;
    }

    if (resultsContainer) {
        displayBooks(filteredBooks, 'searchResults');
    }
}

// ناول فلٹر کریں
function filterNovels() {
    const languageFilter = document.getElementById('languageFilter')?.value;
    const authorFilter = document.getElementById('authorFilter')?.value;
    
    let filtered = booksData.filter(book => book.genre === 'novel');

    if (languageFilter && languageFilter !== 'all') {
        filtered = filtered.filter(book => book.language === languageFilter);
    }

    if (authorFilter && authorFilter !== 'all') {
        filtered = filtered.filter(book => book.author.toLowerCase().includes(authorFilter));
    }

    displayBooks(filtered, 'novelsGrid');
}

// ناول سورٹ کریں
function sortNovels() {
    const sortBy = document.getElementById('sortFilter')?.value;
    let novels = booksData.filter(book => book.genre === 'novel');

    switch(sortBy) {
        case 'popular':
            novels.sort((a, b) => b.rating - a.rating);
            break;
        case 'new':
            novels.sort((a, b) => b.year - a.year);
            break;
        case 'old':
            novels.sort((a, b) => a.year - b.year);
            break;
        case 'title':
            novels.sort((a, b) => a.title.localeCompare(b.title));
            break;
    }

    displayBooks(novels, 'novelsGrid');
}

// ایونٹ ٹریکنگ
function trackEvent(category, action, label) {
    if (typeof gtag !== 'undefined') {
        gtag('event', action, {
            'event_category': category,
            'event_label': label
        });
    }
    console.log(`Event: ${category} - ${action} - ${label}`);
}

// ڈراپ ڈاؤن سیٹ اپ
function setupDropdowns() {
    const dropdowns = document.querySelectorAll('.dropdown');
    
    dropdowns.forEach(dropdown => {
        dropdown.addEventListener('mouseenter', function() {
            this.querySelector('.dropdown-content').style.display = 'block';
        });
        
        dropdown.addEventListener('mouseleave', function() {
            this.querySelector('.dropdown-content').style.display = 'none';
        });
    });
}

// پیج لوڈ ہونے پر
document.addEventListener('DOMContentLoaded', function() {
    setupDropdowns();
    
    // فیچرڈ کتابیں دکھائیں
    const featuredBooks = booksData.slice(0, 6);
    displayBooks(featuredBooks, 'featuredBooks');
    
    // اگر ناول صفحہ پر ہیں تو ناول لوڈ کریں
    if (window.location.pathname.includes('novels')) {
        const novels = booksData.filter(book => book.genre === 'novel');
        displayBooks(novels, 'novelsGrid');
    }

    console.log('کتب خانہ ویب سائٹ لوڈ ہو گئی!');
});