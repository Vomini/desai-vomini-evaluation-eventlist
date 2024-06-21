class EventController{
    #model;
    #view;
    constructor(model, view){
        this.#model = model;
        this.#view = view;
        this.initApp();
    }

    initApp(){
        this.setUpevents();
        this.fetchEvents();
    }

    setUpevents(){
        this.setupAddEvent();
        // this.setupDeleteEvent();
        this.setupEditEvent();
    }

    async fetchEvents() {
        try {
            const events = await eventAPI.fetchEventsAPI();
            this.#model.setEvents(events);
            this.#model.getEvents().forEach(event => this.#view.renderEventList(event));
        } catch (error) {
            console.error('Failed to fetch events:', error);
        }
    }

    setupAddEvent() {
        if (this.#view.addBtn) {
            this.#view.addBtn.addEventListener('click', () => {
                this.#view.addEvent();

                const plusBtn = document.querySelector('.add-button');
                if (plusBtn) {
                    plusBtn.addEventListener('click', () => {
                        const eventItem = document.getElementById('event-temp');
                        const eventName = eventItem.querySelector("input[type='text']").value;
                        const eventStart = eventItem.querySelector("input[type='date']").value;
                        const eventEnd = eventItem.querySelector("input[type='date']").value;

                        if (!eventName || !eventStart || !eventEnd) {
                            alert("Input not valid");
                            return;
                        } else {
                            const newEvent = {
                                eventName: eventName,
                                startDate: eventStart,
                                endDate: eventEnd
                            };
                            eventAPI.postEventAPI(newEvent).then((_event) => {
                                this.#model.addEvent(_event);
                                this.#view.renderEventList(_event);
                                this.#view.removeEvent('event-temp'); // Clean up the temporary row
                            });
                        }
                    });
                }

                const cancelBtn = document.querySelector('.cancel-button');
                if (cancelBtn) {
                    cancelBtn.addEventListener('click', () => {
                        this.#view.removeEvent('event-temp'); // Clean up the temporary row
                    });
                }
            });
        } else {
            console.error('Add Event button not found');
        }
    }

    setupDeleteEvent() {
        const deleteButtons = document.querySelectorAll('[class^="delete-button"]');
        deleteButtons.forEach(button => {
            button.addEventListener('click', async (e) => {
                let eventItem = e.target;
                // Traverse up the DOM tree to find the parent <tr> element
                while (eventItem && eventItem.nodeName !== 'TR') {
                    eventItem = eventItem.parentNode;
                }
                if (eventItem) {
                    const eventId = eventItem.id;
                    console.log(eventId);
                    try {
                        await eventAPI.deleteEventAPI(eventId);
                        this.#model.removeEvent(eventId);
                        this.#view.removeEvent(eventId);
                    } catch (error) {
                        console.error('Failed to delete event:', error);
                    }
                }
            });
        });
    }
    
    

    setupEditEvent() {
        if (this.#view.eventList) {
            this.#view.eventList.addEventListener('click', async (e) => {
                if (e.target.classList.contains('edit-button')) {
                    const eventItem = e.target.closest('tr');
                    const eventId = eventItem.id;
                    const event = this.#model.getEvents().find(event => event.id === eventId);
                    this.#view.editEvent(event);
    
                    const saveButton = document.querySelector('.save-button');
                    if(saveButton) {
                    saveButton.addEventListener("click", async () => {
                        const newName = eventItem.querySelector("input[type='text']").value;
                        const newStart = eventItem.querySelector("input[type='date']").value;
                        const newEnd = eventItem.querySelector("input[type='date']").value;
                        console.log(newName, newStart, newEnd);
    
                        if (!newName || !newStart || !newEnd) {
                            alert("Input not valid");
                            return;
                        }
    
                        const updatedEvent = { id: event.id, name: newName, start: newStart, end: newEnd };
    
                        try {
                            await eventAPI.editEventAPI(updatedEvent);
                            this.#model.editEvent(updatedEvent);
                            this.#view.renderEventList(updatedEvent);
                            this.#view.removeEvent(eventId);
                        } catch (error) {
                            console.error('Failed to edit event:', error);
                        }
                    });
                }
            }
            });
        } else {
            console.error('Event list not found');
        }
    }
    
}
