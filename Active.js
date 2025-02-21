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
