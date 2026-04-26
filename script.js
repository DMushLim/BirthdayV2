// ============================================
// CONFIGURATION - EDIT THIS SECTION
// ============================================

// Letter images - add as many as you want
// EDIT: Replace with your image paths
const letterImages = [
    'media/images/placeholder.png',
    'media/images/placeholder.png',
    'media/images/placeholder.png'
];

// Gift image - the image that appears inside the gift
// EDIT THIS: Replace with your gift image path
const giftImageSrc = 'media/gift/placeholder.png';

// ============================================
// MAIN SCRIPT
// ============================================

document.addEventListener('DOMContentLoaded', () => {
    // DOM Elements
    const letterButton = document.getElementById('letter');
    const letterImage = document.getElementById('letter-image');
    const contents = document.getElementById('contents');
    const overlay = document.getElementById('overlay');
    const textElement = document.querySelector('.text');
    const imagesContainer = document.querySelector('.images');
    const prevButton = document.querySelector('.previous');
    const nextButton = document.querySelector('.next');
    const giftButton = document.getElementById('gift-open-button');
    const giftImage = document.getElementById('gift-image');
    const gift = document.getElementById('gift');
    const giftContent = document.getElementById('gift-content');
    const giftInside = document.getElementById('gift-inside');
    const downloadLink = document.getElementById('download-link');
    const downloadButton = document.getElementById('download-button');

    // Image paths for button state changes
    const letterEndSrc = 'media/letter_end_png.png';
    const giftEndSrc = 'media/gift_end_png.png';

    // State variables
    let currentIndex = -1; // -1 = text, 0+ = images
    let isLetterOpen = false;
    let isGiftOpen = false;

    // ========== LETTER FUNCTIONS ==========

    // Open the letter popup
    function openLetter() {
        isLetterOpen = true;
        
        // Change button image to "opened" state
        const img = new Image();
        img.src = letterEndSrc;
        setTimeout(() => {
            letterImage.src = letterEndSrc;
        }, 50);
        letterButton.disabled = true;

        // Darken background
        overlay.classList.add('active');

        // Show letter content
        contents.style.display = 'block';
        
        // Show text with zoom animation (delayed)
        setTimeout(() => {
            textElement.classList.add('active');
            setTimeout(() => {
                textElement.classList.add('show');
                
                // Show navigation arrows after text appears
                setTimeout(() => {
                    updateNavigation();
                }, 300);
            }, 50);
        }, 300);
    }

    // Update navigation arrows visibility
    function updateNavigation() {
        const totalItems = letterImages.length + 1; // text + images
        
        // Show previous button from any item except the first (-1)
        if (currentIndex > -1) {
            prevButton.classList.add('visible');
        } else {
            prevButton.classList.remove('visible');
        }

        // Show next button if not on last item
        if (currentIndex < totalItems - 1) {
            nextButton.classList.add('visible');
        } else {
            nextButton.classList.remove('visible');
        }
    }

    // Navigate to specific item
    function goToItem(index) {
        const totalItems = letterImages.length + 1;
        
        // Hide current item with animation
        if (currentIndex === -1) {
            textElement.classList.remove('show');
        } else {
            const currentImg = imagesContainer.querySelector('.image');
            if (currentImg) currentImg.classList.remove('show');
        }

        // Update index after brief delay
        setTimeout(() => {
            currentIndex = index;

            // Show new item
            if (currentIndex === -1) {
                // Show text
                imagesContainer.classList.remove('active');
                textElement.classList.add('active');
                setTimeout(() => {
                    textElement.classList.add('show');
                    updateNavigation();
                }, 50);
            } else {
                // Show image
                textElement.classList.remove('active');
                imagesContainer.classList.add('active');
                
                let imgElement = imagesContainer.querySelector('.image');
                if (!imgElement) {
                    imgElement = document.createElement('img');
                    imgElement.className = 'image';
                    imagesContainer.appendChild(imgElement);
                }
                
                imgElement.src = letterImages[currentIndex];
                
                setTimeout(() => {
                    imgElement.classList.add('show');
                    updateNavigation();
                }, 50);
            }
        }, 200);
    }

    // Close the letter and show gift
    function closeLetter() {
        isLetterOpen = false;
        
        // Hide content
        textElement.classList.remove('show', 'active');
        imagesContainer.classList.remove('active');
        const img = imagesContainer.querySelector('.image');
        if (img) img.classList.remove('show');
        
        prevButton.classList.remove('visible');
        nextButton.classList.remove('visible');

        // Hide overlay and contents, then show gift
        setTimeout(() => {
            contents.style.display = 'none';
            overlay.classList.remove('active');
            
            // Show gift
            gift.style.display = 'block';
        }, 300);
    }

    // ========== GIFT FUNCTIONS ==========

    // Open the gift popup
    function openGift() {
        isGiftOpen = true;
        
        // Change button image to "opened" state
        const img = new Image();
        img.src = giftEndSrc;
        setTimeout(() => {
            giftImage.src = giftEndSrc;
        }, 50);
        giftButton.disabled = true;

        // Darken background
        overlay.classList.add('active');

        // Show gift content
        giftContent.classList.add('active');
        
        // Configure download link
        downloadLink.href = giftImageSrc;

        // Zoom animation for gift image
        setTimeout(() => {
            giftInside.src = giftImageSrc;
            giftInside.classList.add('show');
            
            // Show download button after image
            setTimeout(() => {
                downloadButton.classList.add('visible');
            }, 400);
        }, 300);
    }

    // ========== EVENT LISTENERS ==========

    // Letter button click
    letterButton.addEventListener('click', openLetter);

    // Previous navigation
    prevButton.addEventListener('click', () => {
        const totalItems = letterImages.length + 1;
        if (currentIndex > -1) {
            goToItem(currentIndex - 1);
        }
    });

    // Next navigation
    nextButton.addEventListener('click', () => {
        const totalItems = letterImages.length + 1;
        if (currentIndex < totalItems - 1) {
            if (currentIndex === totalItems - 2) {
                // Last image - close letter
                closeLetter();
            } else {
                goToItem(currentIndex + 1);
            }
        }
    });

    // Gift button click
    giftButton.addEventListener('click', openGift);
});