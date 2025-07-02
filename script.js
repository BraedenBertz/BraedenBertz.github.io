/**
 * Portfolio Website JavaScript
 * Handles loading screen, navigation, project display, and debug functionality
 */

// =============================================================================
// PROJECT CONFIGURATION
// =============================================================================

const projectsData = {
    projects: [
        {
            segmentId: "SEGMENT 00874",
            title: "PROJECT ONE",
            status: "NOMINAL",
            technologies: "REACT NODE.JS EXPRESS",
            htmlFile: "project_one.html",
            links: {
                github: "https://github.com/yourusername/project-one",
                youtube: "https://youtube.com/channel/your-channel"
            }
        },
        {
            segmentId: "SEGMENT 10981",
            title: "PROJECT TWO",
            status: "NOMINAL",
            technologies: "PYTHON DJANGO SQL",
            htmlFile: "project_two.html",
            links: {
                github: "https://github.com/yourusername/project-two",
                youtube: "https://youtube.com/channel/your-channel"
            }
        },
        {
            segmentId: "SEGMENT 20176",
            title: "PROJECT THREE",
            status: "NOMINAL",
            technologies: "TYPESCRIPT NEXT.JS",
            htmlFile: "project_three.html",
            links: {
                github: "https://github.com/yourusername/project-three",
                youtube: "https://youtube.com/channel/your-channel"
            }
        },
        {
            type: "corrupted",
            title: "Communication Failure"
        },
        {
            segmentId: "SEGMENT 31904",
            title: "PROJECT FIVE",
            status: "NOMINAL",
            technologies: "VUE.JS FIREBASE",
            htmlFile: "project_five.html",
            links: {
                github: "https://github.com/yourusername/project-five",
                youtube: "https://youtube.com/channel/your-channel"
            }
        },
        {
            segmentId: "SEGMENT 32050",
            title: "PROJECT SIX",
            status: "NOMINAL",
            technologies: "FLUTTER DART",
            htmlFile: "project_six.html",
            links: {
                github: "https://github.com/yourusername/project-six",
                youtube: "https://youtube.com/channel/your-channel"
            }
        }
    ]
};

// =============================================================================
// PROJECT DISPLAY MODULE
// =============================================================================

const ProjectDisplay = {
    /**
     * Display project information in the project details panel
     * @param {string} htmlFile - The filename of the selected project segment
     */
    displayProject(htmlFile) {
        const projectDiv = document.getElementById('project_div');
        const displayDiv = projectDiv.querySelector('#project_display');
        
        if (!displayDiv) return;
        
        // Show loading state
        displayDiv.innerHTML = `
            <p style="color: var(--NEON_GREEN);">Loading project details...</p>
        `;
        
        // Fetch and display the HTML file
        fetch(`projects/${htmlFile}`)
            .then(response => {
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                return response.text();
            })
            .then(html => {
                displayDiv.innerHTML = html;
            })
            .catch(error => {
                console.error('Error loading project file:', error);
                displayDiv.innerHTML = `
                    <p style="color: red;">Error loading project details</p>
                    <p>File: ${htmlFile}</p>
                    <p>Error: ${error.message}</p>
                `;
            });
    },

    /**
     * Create a normal project segment element
     * @param {Object} project - Project data object
     * @returns {HTMLElement} - The created project segment element
     */
    createProjectSegment(project) {
        const segment = document.createElement('div');
        segment.className = 'project-segment';
        segment.onclick = () => this.displayProject(project.htmlFile);
        
        // Create social icons HTML
        const socialIconsHtml = project.links ? `
            <div class="social-icons">
                ${project.links.github ? `
                    <a href="${project.links.github}" target="_blank">
                        <img src="github.svg" />
                    </a>
                ` : ''}
                ${project.links.youtube ? `
                    <a href="${project.links.youtube}" target="_blank">
                        <img src="youtube.svg" />
                    </a>
                ` : ''}
            </div>
        ` : '';
        
        segment.innerHTML = `
            <span class="segment-id">${project.segmentId}</span>
            ${socialIconsHtml}
            <div class="segment-title">${project.title}</div>
            <div class="nominal">-- ${project.status} --</div>
            <div class="repair-text">${project.technologies}</div>
        `;
        
        return segment;
    },

    /**
     * Create a corrupted project segment element
     * @param {Object} project - Project data object
     * @returns {HTMLElement} - The created corrupted segment element
     */
    createCorruptedSegment(project) {
        const segment = document.createElement('div');
        segment.className = 'project-segment corrupted';
        
        segment.innerHTML = `
            <div class="corruption-line"></div>
            <div class="corruption-text">${project.title}</div>
            <div class="corruption-line"></div>
            <button class="debug-btn" onclick="showDebugBox()">DEBUG</button>
        `;
        
        return segment;
    },

    /**
     * Render all project segments from the configuration
     */
    renderProjects() {
        const projectsGrid = document.querySelector('.projects-grid');
        if (!projectsGrid) return;
        
        // Clear existing content
        projectsGrid.innerHTML = '';
        
        // Create and append each project segment
        projectsData.projects.forEach(project => {
            let segmentElement;
            
            if (project.type === 'corrupted') {
                segmentElement = this.createCorruptedSegment(project);
            } else {
                segmentElement = this.createProjectSegment(project);
            }
            
            projectsGrid.appendChild(segmentElement);
        });
    }
};

// =============================================================================
// LOADING SCREEN MODULE
// =============================================================================

const LoadingScreen = {
    targetCount: 65536,
    duration: 2000, // 2 seconds

    /**
     * Initialize the loading screen sequence
     */
    init() {
        document.addEventListener('DOMContentLoaded', () => {
            this.startSequence();
        });
    },

    /**
     * Start the loading sequence with timed steps
     */
    startSequence() {
        // Step 1: Show backplane test
        setTimeout(() => {
            this.showBackplaneTest();
            
            // Step 2: Show nodes counter
            setTimeout(() => {
                this.showNodesCounter();
            }, 500);
        }, 1500);
    },

    /**
     * Display backplane test success
     */
    showBackplaneTest() {
        const backplaneSuccess = document.querySelector('#backplane .success');
        if (backplaneSuccess) {
            backplaneSuccess.classList.remove('hidden');
        }
    },

    /**
     * Show and animate the nodes counter
     */
    showNodesCounter() {
        const nodesElement = document.querySelector('#nodes');
        const countElement = document.querySelector('#nodeCount');
        
        if (nodesElement) {
            nodesElement.classList.remove('hidden');
        }
        
        if (countElement) {
            this.animateCounter(countElement);
        }
    },

    /**
     * Animate the counter from 0 to target count
     * @param {HTMLElement} countElement - The element to update with count
     */
    animateCounter(countElement) {
        const startTime = Date.now();

        const updateCounter = () => {
            const currentTime = Date.now();
            const elapsed = currentTime - startTime;

            if (elapsed < this.duration) {
                const progress = elapsed / this.duration;
                const currentCount = Math.floor(this.targetCount * progress);
                countElement.textContent = currentCount.toLocaleString();
                requestAnimationFrame(updateCounter);
            } else {
                // Animation complete
                countElement.textContent = this.targetCount.toLocaleString();
                this.showNodesSuccess();
            }
        };

        requestAnimationFrame(updateCounter);
    },

    /**
     * Show nodes success and continue to error phase
     */
    showNodesSuccess() {
        const nodesSuccess = document.querySelector('#nodes .success');
        if (nodesSuccess) {
            nodesSuccess.classList.remove('hidden');
        }

        // Step 3: Show error after 1 second
        setTimeout(() => {
            this.showError();
        }, 1000);
    },

    /**
     * Show error message and complete loading
     */
    showError() {
        const errorElement = document.querySelector('#error');
        if (errorElement) {
            errorElement.classList.remove('hidden');
        }

        // Step 4: Hide loading screen and show content after 2 seconds
        setTimeout(() => {
            this.completeLoading();
        }, 2000);
    },

    /**
     * Complete the loading process and show main content
     */
    completeLoading() {
        const loadingScreen = document.querySelector('#loadingScreen');
        const mainContent = document.querySelector('#mainContent');

        if (loadingScreen) {
            loadingScreen.classList.add('hidden');
        }
        
        if (mainContent) {
            mainContent.classList.add('visible');
        }
    }
};

// =============================================================================
// DEBUG MODULE
// =============================================================================

const Debug = {
    /**
     * Show the debug box
     */
    show() {
        const debugBox = document.getElementById('debugBox');
        if (debugBox) {
            debugBox.style.display = 'block';
        }
    },

    /**
     * Hide the debug box
     */
    close() {
        const debugBox = document.getElementById('debugBox');
        if (debugBox) {
            debugBox.style.display = 'none';
        }
    }
};

// Global functions for backward compatibility
function showDebugBox() {
    Debug.show();
}

function closeDebugBox() {
    Debug.close();
}

// =============================================================================
// NAVIGATION MODULE
// =============================================================================

const Navigation = {
    elements: {},
    panels: {},

    /**
     * Initialize the navigation system
     */
    init() {
        this.cacheElements();
        this.bindEvents();
        this.setDefaultPanel();
    },

    /**
     * Cache DOM elements for better performance
     */
    cacheElements() {
        this.elements = {
            leftPanel: document.getElementById('leftPanel'),
            rightPanel: document.getElementById('rightPanel'),
            leftPanelOverlay: document.getElementById('leftPanelOverlay'),
            hamburgerBtn: document.getElementById('hamburgerBtn'),
            treeItems: document.querySelectorAll('.tree-item')
        };

        this.panels = {
            about: document.getElementById('aboutPanel'),
            experience: document.getElementById('experiencePanel'),
            projects: document.getElementById('projectsPanel')
        };
    },

    /**
     * Bind event listeners
     */
    bindEvents() {
        // Hamburger menu events
        if (this.elements.hamburgerBtn) {
            this.elements.hamburgerBtn.addEventListener('click', (e) => {
                e.stopPropagation();
                this.toggleMobileMenu();
            });
        }

        if (this.elements.leftPanelOverlay) {
            this.elements.leftPanelOverlay.addEventListener('click', () => {
                this.hideMobileMenu();
            });
        }

        // Window resize event
        window.addEventListener('resize', () => {
            if (window.innerWidth > 900) {
                this.hideMobileMenu();
            }
        });

        // Tree item click events
        this.elements.treeItems.forEach(item => {
            item.addEventListener('click', (e) => {
                this.handlePanelSwitch(e.target);
            });
        });
    },

    /**
     * Toggle mobile menu visibility
     */
    toggleMobileMenu() {
        const isVisible = this.elements.leftPanel.classList.contains('mobile-visible');
        
        if (isVisible) {
            this.hideMobileMenu();
        } else {
            this.showMobileMenu();
        }
    },

    /**
     * Show mobile menu
     */
    showMobileMenu() {
        this.elements.leftPanel.classList.add('mobile-visible');
        this.elements.rightPanel.classList.add('hidden');
        this.elements.leftPanelOverlay.style.display = 'block';
    },

    /**
     * Hide mobile menu
     */
    hideMobileMenu() {
        this.elements.leftPanel.classList.remove('mobile-visible');
        this.elements.rightPanel.classList.remove('hidden');
        this.elements.leftPanelOverlay.style.display = 'none';
    },

    /**
     * Handle panel switching when tree item is clicked
     * @param {HTMLElement} clickedItem - The clicked tree item
     */
    handlePanelSwitch(clickedItem) {
        // Remove active class from all items and panels
        this.elements.treeItems.forEach(item => item.classList.remove('active'));
        Object.values(this.panels).forEach(panel => {
            if (panel) panel.classList.remove('active');
        });

        // Add active class to clicked item
        clickedItem.classList.add('active');
        
        // Show corresponding panel
        const panelKey = clickedItem.getAttribute('data-panel');
        if (this.panels[panelKey]) {
            this.panels[panelKey].classList.add('active');
        }

        // Hide mobile menu after clicking on mobile
        if (window.innerWidth <= 900) {
            this.hideMobileMenu();
        }
    },

    /**
     * Set the default active panel
     */
    setDefaultPanel() {
        const aboutTreeItem = document.querySelector('.tree-item[data-panel="about"]');
        if (aboutTreeItem) {
            aboutTreeItem.click();
        }
    }
};

// =============================================================================
// APPLICATION INITIALIZATION
// =============================================================================

// Initialize all modules when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    Navigation.init();
    ProjectDisplay.renderProjects();
});

// Initialize loading screen
LoadingScreen.init();