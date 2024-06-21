class EventModel{
    #events;
    constructor(){
        this.#events = [];
    }

    setEvents(events){
        this.#events = events;
    }

    getEvents(){
        return [...this.#events];
    }

    addEvent(event){
        this.#events.push(event);
    }

    removeEvent(eventId){
        this.#events = this.#events.filter(event => event.id !== eventId);
    }

    editEvent(event){
        const eventIndex = this.#events.findIndex(e => e.id === event.id);
        this.#events[eventIndex] = event;
    }
}