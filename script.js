class EventTarget {
    constructor() {
        this.listeners = new Map();
    }

    addEventListener(event, callback) {
        if (!this.listeners.has(event)) {
            this.listeners.set(event, new Set());
        }

        const eventListeners = this.listeners.get(event);

        if (!eventListeners.has(callback)) {
            eventListeners.add(callback);
        }
    }

    removeEventListener(event, callback) {
        if (this.listeners.has(event)) {
            const eventListeners = this.listeners.get(event);
            eventListeners.delete(callback);

            if (eventListeners.size === 0) {
                this.listeners.delete(event);
            }
        }
    }

    dispatchEvent(event) {
        if (this.listeners.has(event)) {
            const eventListeners = this.listeners.get(event);
            for (const callback of eventListeners) {
                callback();
            }
        }
    }
}

// Sample Usage
const target = new EventTarget();
const logHello = () => console.log('hello');
const logWorld = () => console.log('world');

target.addEventListener('hello', logHello);
target.addEventListener('world', logWorld);

target.dispatchEvent('hello'); // Console logs: hello
target.dispatchEvent('world'); // Console logs: world

target.removeEventListener('hello', logHello);

target.dispatchEvent('hello'); // No effect, as 'hello' listener was removed
target.dispatchEvent('world'); // Console logs: world