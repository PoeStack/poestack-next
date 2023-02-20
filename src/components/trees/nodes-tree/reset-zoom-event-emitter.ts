export type ResetEventEmitter = {
    listeners: Record<string, ()=>void>;
    dispatch(): void;
    subscribe(listener: any, callback: () => void): void;
    unsubscribe(listener: any): void;
}

/**
 * Create a basic event emitter the zoomable svg can use as a signal to
 * reset the zoom state.
 * @returns A basic even emitter
 */
function createResetZoomEventEmitter(): ResetEventEmitter {
    return {
        listeners: {},

        dispatch() {
            Object.entries(this.listeners).forEach(([listener, callback]) => callback());
        },
        subscribe(listener: string, callback: () => void) {
            if(!this.listeners[listener]){
                this.listeners[listener] = callback;
            }
        },
        unsubscribe(listener: string) {
            if(this.listeners[listener]) {
                delete this.listeners[listener];
            }
        }
    }
}

export default createResetZoomEventEmitter;