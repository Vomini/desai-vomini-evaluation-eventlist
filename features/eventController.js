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
        this.setupDeleteEvent();
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
            this.#view.addBtn.addEventListener('click', (e) => {
                e.preventDefault(); // Prevent the default form submission behavior
                this.#view.addEvent();
    
                const plusBtn = document.querySelector('.add-button');
                if (plusBtn) {
                    plusBtn.addEventListener('click', (e) => {
                        e.preventDefault(); // Prevent the default form submission behavior
    
                        const eventItem = document.getElementById('event-temp');
    
                        const eventNameInput = eventItem.querySelector("td input[type='text']");
                        const eventStartInput = eventItem.querySelector(".startDate");
                        const eventEndInput = eventItem.querySelector(".endDate");
    
                        const eventName = eventNameInput.value;
                        const eventStart = eventStartInput.value;
                        const eventEnd = eventEndInput.value;
                        console.log(eventName, eventStart, eventEnd);
    
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
                            }).catch((error) => {
                                console.error('Error posting event:', error);
                            });
                        }
                    });
                }
    
                const cancelBtn = document.querySelector('.cancel-button');
                if (cancelBtn) {
                    cancelBtn.addEventListener('click', (e) => {
                        e.preventDefault(); // Prevent the default form submission behavior
                        this.#view.removeEvent('event-temp'); // Clean up the temporary row
                    });
                }
            });
        } else {
            console.error('Add Event button not found');
        }
    }
    
    setupDeleteEvent() {
        // Select the parent container that holds all the delete buttons

        // Add event listener to the parent container
        this.#view.eventList.addEventListener("click", async(e) => {
            // Check if the clicked element is a delete button
          
            const deleteButton = e.target.closest('.delete-button');
            console.log(deleteButton);
        
        // If a delete button was clicked or one of its child elements was clicked
            if (deleteButton) {
                let eventItem = deleteButton;
                while (eventItem && eventItem.nodeName !== 'TR') {
                    eventItem = eventItem.parentNode;
                    console.log(eventItem);
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
            }
        });
    }


    setupEditEvent() {
        if (this.#view.eventList) {
            this.#view.eventList.addEventListener('click', async (e) => {
                // Handle edit button click
                const editButton = e.target.closest('.edit-button');
                if (editButton) {
                    let eventItem = editButton;
                    while (eventItem && eventItem.nodeName !== 'TR') {
                        eventItem = eventItem.parentNode;
                        console.log(eventItem);
                    }
                    if (eventItem) {
                        const eventId = eventItem.id;
                        console.log(eventId);
                        const event = this.#model.getEvents().find(event => event.id === eventId);
                        console.log(event);
                        
        
                        this.#view.editEvent(event);
    
                    // Set up the save button click listener
                    const saveBtn = eventItem.querySelector('.save-button');
                    if (saveBtn) {
                        saveBtn.addEventListener('click', async () => {
                            const updatedEventName = eventItem.querySelector("td input[type='text']").value;
                            const updatedStartDate = eventItem.querySelector(".startDate").value;
                            const updatedEndDate = eventItem.querySelector(".endDate").value;
                            console.log(updatedEventName, updatedStartDate, updatedEndDate );
    
                            if (!updatedEventName || !updatedStartDate || !updatedEndDate) {
                                alert('Input not valid');
                                return;
                            }
    
                            const updatedEvent = {
                                id: eventId,
                                eventName: updatedEventName,
                                startDate: updatedStartDate,
                                endDate: updatedEndDate
                            };
    
                            try {
                                await eventAPI.editEventAPI(updatedEvent);
                                this.#model.editEvent(updatedEvent); // Assuming updateEvent is a method in your model to update the event
                                this.#view.renderEventList(updatedEvent); // Re-render the updated event
                                this.#view.removeEvent(eventItem.id); // Remove the edit row
                            } catch (error) {
                                console.error('Failed to edit event:', error);
                            }
                        });
                    }
                }
            }
            });
        }
    }
}
    
    
                


    

