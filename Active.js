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
