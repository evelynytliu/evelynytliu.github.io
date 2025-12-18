document.addEventListener('DOMContentLoaded', () => {
    const grid = document.getElementById('project-grid');
    const loading = document.getElementById('loading');
    const filterBtns = document.querySelectorAll('.filter-btn');
    const lightbox = document.getElementById('lightbox');
    const lightboxCarousel = document.getElementById('lightbox-carousel');
    const lightboxCaption = document.getElementById('lightbox-caption');
    const lightboxClose = document.getElementById('lightbox-close');

    let allData = [];
    let msnry;

    // Load Data
    if (window.projectData) {
        allData = window.projectData;
        renderProjects('all');
        loading.style.display = 'none';
    } else {
        // Fallback or Error
        console.error('Data not found. Make sure data.js is loaded.');
        loading.innerText = '載入失敗（找不到 data.js）';
    }

    // Render Function
    function renderProjects(filterCategory) {
        grid.innerHTML = '<div class="grid-sizer w-full md:w-[48%] lg:w-[32%] hidden"></div>'; // Reset grid + sizer

        // Check for ?view=all parameter
        const urlParams = new URLSearchParams(window.location.search);
        const showAll = urlParams.get('view') === 'all';

        const filteredData = filterCategory === 'all'
            ? allData
            : allData.filter(item => {
                if (filterCategory === 'Case Studies' && item.category === 'Case Studies') return true;
                if (filterCategory === 'Code' && item.category === 'Code') return true;
                if (filterCategory === 'Design' && item.category === 'Design') return true;
                if (filterCategory === 'Life Lab' && item.category === 'Life Lab') return true;
                if (filterCategory === 'Traces' && item.category === 'Traces') return true;
                return false;
            });

        // Apply Private Filter
        let finalData = showAll ? filteredData : filteredData.filter(item => !item.private);

        // Sort: Pin "Case Studies" to the top
        finalData = [...finalData].sort((a, b) => {
            const isACase = a.category === 'Case Studies';
            const isBCase = b.category === 'Case Studies';
            // a comes first (-1) if it is case study and b is not
            if (isACase && !isBCase) return -1;
            // b comes first (1) if it is case study and a is not
            if (!isACase && isBCase) return 1;
            return 0;
        });

        finalData.forEach((item, index) => {
            const card = document.createElement('div');
            // Masonry item classes
            card.className = `card-item w-full md:w-[48%] lg:w-[32%] mb-8 p-0 md:px-3 text-left group cursor-pointer`;
            card.setAttribute('data-category', item.category);

            // Determine badge style
            let badgeClass = 'bg-gray-100 text-gray-600';
            if (item.category === 'Design') badgeClass = 'bg-orange-50 text-orange-600 border border-orange-100';
            if (item.category === 'Code') badgeClass = 'bg-blue-50 text-blue-600 border border-blue-100 font-mono text-xs';
            if (item.category === 'Life Lab') badgeClass = 'bg-emerald-50 text-emerald-600 border border-emerald-100 font-medium';
            if (item.category === 'Case Studies') badgeClass = 'bg-[#3A4E5C] text-white border border-[#2A3B47] shadow-sm font-semibold tracking-wide';

            // Image logic
            const imageUrl = item.image;
            const galleryImages = item.images && item.images.length > 0 ? item.images : [item.image];

            // Escape single quotes for the inline onclick handler
            const isCodeOrNotion = item.category === 'Code';

            // Prepare data for lightbox
            const itemData = JSON.stringify({
                images: galleryImages,
                title: item.title,
                description: item.description || '',
                link: item.link || '',
                category: item.category
            }).replace(/"/g, "&quot;");

            const isCaseStudy = item.category === 'Case Studies';

            // Click Action:
            // Case Study -> Lightbox (Text Content)
            // Code/Notion -> Lightbox (Text Content)
            // Design -> Lightbox (Image Gallery)
            // Traces -> Direct Navigation (New Page)
            let clickAction;

            if (item.category === 'Traces') {
                clickAction = `window.location.href='${item.link}'`;
            } else if (isCaseStudy || isCodeOrNotion) {
                // Pass full item data for text display
                const safeItem = JSON.stringify(item).replace(/"/g, "&quot;");
                clickAction = `openLightbox(${safeItem})`;
            } else {
                // Design (Image Gallery)
                const safeItem = JSON.stringify(item).replace(/"/g, "&quot;");
                clickAction = `openLightbox(${safeItem})`;
            }

            const isGallery = galleryImages.length > 1;
            const stackClass = isGallery ? 'card-stacked' : '';

            // Gallery Indicator Badge (Top Right)
            const galleryIndicatorHtml = isGallery ? `
                <div class="${isGallery ? 'absolute top-3 right-3' : 'hidden'} gallery-indicator text-white text-[10px] font-medium px-2 py-1 rounded-full flex items-center gap-1 z-10">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="w-3 h-3">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M16.5 8.25V6a2.25 2.25 0 00-2.25-2.25H6A2.25 2.25 0 003.75 6v8.25A2.25 2.25 0 006 16.5h2.25m8.25-8.25H18a2.25 2.25 0 012.25 2.25V18A2.25 2.25 0 0118 20.25h-7.5A2.25 2.25 0 018.25 18v-1.5m8.25-8.25h-6a2.25 2.25 0 00-2.25 2.25v6" />
                    </svg>
                    ${galleryImages.length}
                </div>
            ` : '';

            // Private Indicator Badge (Top Left)
            const privateBadge = item.private ? `
                 <div class="absolute top-3 left-3 bg-red-500/80 backdrop-blur text-white text-[10px] font-medium px-2 py-1 rounded-full z-10">
                    <i class="fas fa-eye-slash"></i> Private
                 </div>
            ` : '';

            // 3 Distinct Frame Styles based on index (Left, Middle, Right)
            const styles = ['frame-style-a', 'frame-style-b', 'frame-style-c'];
            const currentStyle = styles[index % 3];

            // Special styling class for Case Studies
            const extraClass = item.category === 'Case Studies' ? 'case-study-card' : '';

            const frameClass = `card-base ${currentStyle} ${extraClass}`;

            // Random decorative doodle injection matching the style somewhat
            let doodleHtml = '';
            // High frequency of doodles
            if (index % 1 === 0) {
                const doodleTypes = [
                    { class: 'doodle-dots-cloud', html: '' },
                    { class: 'doodle-dots-cloud', html: '' },
                    { class: 'doodle-squiggle-line', html: '' },
                    { class: 'doodle-solid-circle', html: '' },
                    { class: 'doodle-lines-burst', html: '' },
                    { class: 'doodle-donut', html: '' }
                ];

                // Random doodle
                const randIndex = (index + Math.floor(Math.random() * doodleTypes.length)) % doodleTypes.length;
                const doodle = doodleTypes[randIndex];

                let posStyle = '';
                // Customize doodle position slightly based on frame style to avoid overlap
                if (currentStyle === 'frame-style-a') {
                    // Frame is bottom-left heavy, so put doodles top-right or top-left high
                    if (doodle.class === 'doodle-dots-cloud') posStyle = 'top: -20px; left: -20px;';
                    else posStyle = 'top: -10px; right: -10px; transform: rotate(15deg);';
                } else if (currentStyle === 'frame-style-b') {
                    // Frame is bulgy top/bottom, corners are safer
                    if (doodle.class === 'doodle-squiggle-line') posStyle = 'bottom: -15px; left: 20%; transform: rotate(-5deg);';
                    else posStyle = 'top: -15px; right: -5px;';
                } else {
                    // Frame C is Top-Right heavy (Orange), so put doodle Bottom-Left
                    posStyle = 'bottom: -10px; left: -10px; transform: rotate(-10deg);';
                }

                doodleHtml = `<div class="doodle ${doodle.class}" style="${posStyle}">${doodle.html}</div>`;
            }

            // Special styling for Case Studies Label
            let categoryDisplay = item.category;
            if (item.category === 'Case Studies') {
                categoryDisplay = `
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-3 h-3 inline-block mr-1 -mt-0.5 text-yellow-300">
                      <path fill-rule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z" clip-rule="evenodd" />
                    </svg>${item.category}
                 `;
            }

            // Card HTML
            card.innerHTML = `
                <div class="${frameClass} ${stackClass}" onclick="${clickAction}">
                    ${doodleHtml}
                    <!-- Add group/image for specific image hover effects -->
                    <div class="card-image-container relative aspect-auto group/image overflow-hidden">
                        ${galleryIndicatorHtml}
                        ${privateBadge}
                        <!-- Use placeholder if code/notion, or actual image for design -->
                        <img src="${imageUrl}" alt="${item.title}" class="w-full h-auto object-cover block transition-transform duration-500 group-hover/image:scale-105">
                        
                        <!-- Overlay for "View" or "Visit" - Only visible on image hover -->
                        <div class="card-overlay absolute inset-0 flex items-center justify-center pointer-events-none opacity-0 group-hover/image:opacity-100 transition-opacity duration-300">
                            <span class="bg-white/90 backdrop-blur px-4 py-2 rounded-full text-sm font-medium text-gray-900 shadow-md transform translate-y-2 group-hover/image:translate-y-0 transition-transform duration-300">
                                ${isCodeOrNotion ? '閱讀更多' : (isGallery ? '查看相簿' : '放大檢視')}
                            </span>
                        </div>
                    </div>
                    
                    <div class="frame-content">
                        <div class="flex items-center justify-between mb-3">
                            <span class="text-[10px] uppercase tracking-wider font-semibold px-2 py-1 rounded ${badgeClass} flex items-center">
                                ${categoryDisplay}
                            </span>
                            <span class="text-xs text-gray-400 font-medium">
                                ${item.tags ? item.tags[0] : ''}
                            </span>
                        </div>
                        <!-- Updated hover color to use theme blue/teal -->
                        <h3 class="text-lg font-medium text-gray-900 leading-snug card-title group-hover:text-[#7CA5B8] transition-colors">
                            ${item.title}
                        </h3>
                        ${item.description && !item.description.startsWith('Project: ') ? `<p class="mt-2 text-sm text-gray-500 line-clamp-2">${item.description}</p>` : ''}
                    </div>
                </div>
            `;

            grid.appendChild(card);

            // Stagger animation
            setTimeout(() => {
                card.classList.add('visible');
            }, index * 50);
        });

        // Initialize/Re-initialize Masonry after images load
        if (msnry) {
            msnry.destroy();
        }

        imagesLoaded(grid, function () {
            msnry = new Masonry(grid, {
                itemSelector: '.card-item',
                columnWidth: '.grid-sizer',
                percentPosition: true,
                gutter: 0 // We handle spacing with padding inside items
            });
            msnry.layout();
        });
    }

    // Filter Logic
    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Active State
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            const filterValue = btn.getAttribute('data-filter');
            renderProjects(filterValue);
        });
    });

    // Lightbox Logic
    let currentGallery = [];
    let currentIndex = 0;
    let currentItem = null;

    window.openLightbox = (itemData) => {
        // Parse item data
        if (typeof itemData === 'string') {
            // Old format compatibility (just images array)
            currentGallery = [itemData];
            currentItem = { images: currentGallery, title: '', description: '', link: '', category: 'Design' };
        } else {
            currentItem = itemData;
            currentGallery = currentItem.images || [];
        }

        currentIndex = 0;

        const isTextMode = currentItem.category === 'Code' || currentItem.category === 'Case Studies';

        if (isTextMode) {
            // Text mode for Code/Notion
            displayTextContent();
        } else {
            // Image gallery mode
            updateLightboxCarousel();
            setupLightboxNav();
        }

        lightbox.classList.remove('hidden');
        setTimeout(() => {
            lightbox.classList.remove('opacity-0');
        }, 10);
        document.body.style.overflow = 'hidden';
    };

    function displayTextContent() {
        // Hide carousel, show text
        lightboxCarousel.style.display = 'none';

        // Create text container
        let textContainer = document.getElementById('lightbox-text');
        if (!textContainer) {
            textContainer = document.createElement('div');
            textContainer.id = 'lightbox-text';
            textContainer.className = 'max-w-2xl mx-auto bg-white rounded-lg p-8 overflow-y-auto max-h-[80vh]';
            lightbox.insertBefore(textContainer, lightboxClose);
        }

        textContainer.style.display = 'block';
        textContainer.innerHTML = `
            <h2 class="text-3xl font-bold mb-4 text-gray-900">${currentItem.title}</h2>
            <div class="prose prose-lg text-gray-700 whitespace-pre-line mb-6">
                ${currentItem.description || ''}
            </div>
            ${currentItem.link ? `
                <a href="${currentItem.link}" target="_blank" class="inline-flex items-center gap-2 bg-evelyn-blue hover:bg-evelyn-dark text-white px-6 py-3 rounded-full font-medium transition-colors">
                    前往專案網站 
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="w-5 h-5">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" />
                    </svg>
                </a>
            ` : ''}
        `;

        lightboxCaption.style.display = 'none';
    }

    function updateLightboxCarousel() {
        // Ensure carousel is visible
        lightboxCarousel.style.display = 'flex';
        const textContainer = document.getElementById('lightbox-text');
        if (textContainer) textContainer.style.display = 'none';

        const track = document.getElementById('lightbox-track');
        track.style.willChange = 'transform'; // Optimize for animation

        // Use container width for better accuracy
        const containerWidth = lightboxCarousel.clientWidth || window.innerWidth;

        // Clear existing images
        track.innerHTML = '';

        // Load 3 images: prev, current, next
        const imagesToLoad = [];
        const prevIndex = (currentIndex - 1 + currentGallery.length) % currentGallery.length;
        const nextIndex = (currentIndex + 1) % currentGallery.length;

        if (currentGallery.length > 1) {
            imagesToLoad.push({ src: currentGallery[prevIndex], position: -1 });
        }
        imagesToLoad.push({ src: currentGallery[currentIndex], position: 0 });
        if (currentGallery.length > 1) {
            imagesToLoad.push({ src: currentGallery[nextIndex], position: 1 });
        }

        // Create image elements
        imagesToLoad.forEach(({ src, position }) => {
            const img = document.createElement('img');
            img.src = src;
            img.className = 'max-h-full md:max-h-[90vh] object-contain rounded-none md:rounded shadow-2xl flex-shrink-0';
            img.style.width = `${containerWidth}px`;
            img.style.maxWidth = '100%';
            track.appendChild(img);
        });

        // Position track to show current image
        const offset = currentGallery.length > 1 ? -containerWidth : 0;
        track.style.transform = `translateX(${offset}px)`;
        track.style.transition = 'none';

        // Update caption
        updateCaption();
    }

    function updateCaption() {
        const counterHtml = currentGallery.length > 1
            ? `<span class="bg-white/20 backdrop-blur px-2 py-0.5 rounded text-xs font-mono ml-2">${currentIndex + 1} / ${currentGallery.length}</span>`
            : '';

        const descHtml = currentItem.description
            ? `<p class="text-gray-200 text-sm md:text-base leading-relaxed mt-2 max-w-3xl whitespace-pre-line">${currentItem.description}</p>`
            : '';

        lightboxCaption.innerHTML = `
            <div class="max-w-7xl mx-auto w-full pointer-events-auto">
                <div class="flex flex-col items-start justify-end">
                    <h3 class="text-xl md:text-2xl font-bold font-serif tracking-wide flex items-center">
                        ${currentItem.title}
                        ${counterHtml}
                    </h3>
                    ${descHtml}
                </div>
            </div>
        `;

        // Styling for the Caption Area (Bottom Overlay)
        lightboxCaption.className = 'absolute bottom-0 left-0 w-full bg-gradient-to-t from-black/95 via-black/70 to-transparent p-6 pb-8 pt-24 text-white transition-opacity duration-300 pointer-events-none';
        lightboxCaption.style.display = 'block';
    }

    function setupLightboxNav() {
        // Remove existing nav if any
        const oldNav = document.getElementById('lightbox-nav');
        if (oldNav) oldNav.remove();

        if (currentGallery.length > 1) {
            const nav = document.createElement('div');
            nav.id = 'lightbox-nav';
            nav.innerHTML = `
                <button id="lb-prev" class="hidden md:block absolute left-4 top-1/2 transform -translate-y-1/2 text-white bg-black/20 hover:bg-black/50 p-3 rounded-full backdrop-blur transition-all z-50">
                    ←
                </button>
                <button id="lb-next" class="hidden md:block absolute right-4 top-1/2 transform -translate-y-1/2 text-white bg-black/20 hover:bg-black/50 p-3 rounded-full backdrop-blur transition-all z-50">
                    →
                </button>
            `;
            lightbox.appendChild(nav);

            document.getElementById('lb-prev').addEventListener('click', (e) => {
                e.stopPropagation();
                currentIndex = (currentIndex - 1 + currentGallery.length) % currentGallery.length;
                updateLightboxCarousel();
            });

            document.getElementById('lb-next').addEventListener('click', (e) => {
                e.stopPropagation();
                currentIndex = (currentIndex + 1) % currentGallery.length;
                updateLightboxCarousel();
            });
        }
    }

    const closeLightbox = () => {
        lightbox.classList.add('opacity-0');
        setTimeout(() => {
            lightbox.classList.add('hidden');
            // Clear carousel track
            const track = document.getElementById('lightbox-track');
            if (track) track.innerHTML = '';
            lightboxCarousel.style.display = 'flex';
            const textContainer = document.getElementById('lightbox-text');
            if (textContainer) textContainer.style.display = 'none';
        }, 300);
        document.body.style.overflow = '';
    };

    // Keyboard Navigation
    document.addEventListener('keydown', (e) => {
        if (lightbox.classList.contains('hidden')) return;

        if (e.key === 'Escape') closeLightbox();

        const isImageMode = lightboxCarousel.style.display !== 'none';
        if (isImageMode && currentGallery.length > 1) {
            if (e.key === 'ArrowLeft') {
                currentIndex = (currentIndex - 1 + currentGallery.length) % currentGallery.length;
                updateLightboxCarousel();
            }
            if (e.key === 'ArrowRight') {
                currentIndex = (currentIndex + 1) % currentGallery.length;
                updateLightboxCarousel();
            }
        }
    });

    // Touch Navigation (Carousel-based Live Swipe)
    let touchStartX = 0;
    let currentTranslate = 0;
    let isDragging = false;
    let startOffset = 0;

    const carousel = document.getElementById('lightbox-carousel');

    // Only bind if carousel exists
    if (carousel) {
        carousel.addEventListener('touchstart', (e) => {
            const track = document.getElementById('lightbox-track');
            if (!track || currentGallery.length <= 1) {
                isDragging = false;
                return;
            }

            isDragging = true;
            touchStartX = e.touches[0].clientX;

            // Store the current offset

            // Use container width for better accuracy
            const containerWidth = carousel.clientWidth || window.innerWidth;
            startOffset = -containerWidth; // Track is offset by one image width

            // Remove transition for immediate 1:1 following
            track.style.transition = 'none';
        }, { passive: false });

        carousel.addEventListener('touchmove', (e) => {
            if (!isDragging) return;

            // Critical: prevent scrolling/native gestures while dragging
            e.preventDefault();

            const currentX = e.touches[0].clientX;
            currentTranslate = currentX - touchStartX;

            const track = document.getElementById('lightbox-track');
            // Move track with finger (shows adjacent images)
            track.style.transform = `translateX(${startOffset + currentTranslate}px)`;
        }, { passive: false });

        carousel.addEventListener('touchend', (e) => {
            if (!isDragging) return;
            isDragging = false;

            const swipeThreshold = 50;
            const track = document.getElementById('lightbox-track');

            // Add transition back for smooth animate
            track.style.transition = 'transform 0.3s ease-out';

            if (Math.abs(currentTranslate) > swipeThreshold) {
                // Swipe Detected - change image
                if (currentTranslate < 0) {
                    // Next Image (Swipe Left)
                    currentIndex = (currentIndex + 1) % currentGallery.length;
                } else {
                    // Prev Image (Swipe Right)
                    currentIndex = (currentIndex - 1 + currentGallery.length) % currentGallery.length;
                }
                updateLightboxCarousel();
            } else {
                // Snap back to current image
                track.style.transform = `translateX(${startOffset}px)`;
            }

            currentTranslate = 0;
        }, { passive: true });
    }

    if (lightboxClose) {
        lightboxClose.addEventListener('click', closeLightbox);
    }

    if (lightbox) {
        lightbox.addEventListener('click', (e) => {
            if (e.target === lightbox) closeLightbox();
        });
    }

    // Scroll Hint Logic
    const filtersContainer = document.getElementById('filters-container');
    const scrollHint = document.getElementById('filter-scroll-hint');

    if (filtersContainer && scrollHint) {
        const checkScroll = () => {
            const isEnd = filtersContainer.scrollLeft + filtersContainer.clientWidth >= filtersContainer.scrollWidth - 10;
            if (isEnd) {
                scrollHint.classList.add('opacity-0');
            } else {
                scrollHint.classList.remove('opacity-0');
            }
        };

        filtersContainer.addEventListener('scroll', checkScroll);
        // Check initially
        checkScroll();
        // Also check on resize
        window.addEventListener('resize', checkScroll);
    }
});
