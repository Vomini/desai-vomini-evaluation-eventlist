class EventView{
    constructor(){
        this.addBtn = document.getElementById('add-event');
        this.eventList = document.querySelector('.event-list');
    }

    
    addEvent() {
        const eventItem = document.createElement("tr");
        eventItem.id = 'event-temp'; // Use 'event-temp' as the temporary ID

        const eventName = document.createElement("td");
        eventName.innerHTML = `<input type="text">`;
        eventItem.appendChild(eventName);

        const eventStart = document.createElement("td");
        eventStart.innerHTML = `<input type="date">`;
        eventItem.appendChild(eventStart);

        const eventEnd = document.createElement("td");
        eventEnd.innerHTML = `<input type="date">`;
        eventItem.appendChild(eventEnd);

        const eventActions = document.createElement("td");
        const actionButtons = document.createElement("div");
        actionButtons.className = "action-buttons";

        const addButton = document.createElement("button");
        addButton.className = "add-button";
        addButton.innerHTML = '<svg focusable viewBox="0 0 24 24" aria-hidden="true" xmlns="http://www.w3.org/2000/svg"><path d="M12 6V18M18 12H6" stroke="#FFFFFF" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/></svg>';
        actionButtons.appendChild(addButton);

        const cancelButton = document.createElement("button");
        cancelButton.className = "cancel-button";
        cancelButton.innerHTML = '<svg focusable="false" aria-hidden="true" viewBox="0 0 32 32" version="1.1" xmlns="http://www.w3.org/2000/svg"><path d="M19.587 16.001l6.096 6.096c0.396 0.396 0.396 1.039 0 1.435l-2.151 2.151c-0.396 0.396-1.038 0.396-1.435 0l-6.097-6.096-6.097 6.096c-0.396 0.396-1.038 0.396-1.434 0l-2.152-2.151c-0.396-0.396-0.396-1.038 0-1.435l6.097-6.096-6.097-6.097c-0.396-0.396-0.396-1.039 0-1.435l2.153-2.151c0.396-0.396 1.038-0.396 1.434 0l6.096 6.097 6.097-6.097c0.396-0.396 1.038-0.396 1.435 0l2.151 2.152c0.396 0.396 0.396 1.038 0 1.435l-6.096 6.096z"></path></svg>';
        actionButtons.appendChild(cancelButton);

        eventActions.appendChild(actionButtons);
        eventItem.appendChild(eventActions);

        this.eventList.appendChild(eventItem);
    }

    renderEventList(event) {
        const { id, eventName, startDate, endDate } = event;
        const eventItem = document.createElement("tr");
        eventItem.id = `${id}`;

        const event_name = document.createElement("td");
        event_name.textContent = eventName;
        eventItem.appendChild(event_name);

        const eventStart = document.createElement("td");
        eventStart.textContent = startDate;
        eventItem.appendChild(eventStart);

        const eventEnd = document.createElement("td");
        eventEnd.textContent = endDate;
        eventItem.appendChild(eventEnd);

        const eventActions = document.createElement("td");
        const actionButtons = document.createElement("div");
        actionButtons.className = "action-buttons";

        const editButton = document.createElement("button");
        editButton.className = "edit-button";
        editButton.innerHTML = '<svg focusable="false" aria-hidden="true" viewBox="0 0 24 24" data-testid="EditIcon" aria-label="fontSize small"><path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34a.9959.9959 0 0 0-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z"></path></svg>';
        // editButton.addEventListener("click", () => {
        //     this.editEvent(event);
        // });
        actionButtons.appendChild(editButton);

        const deleteButton = document.createElement("button");
        deleteButton.className = `delete-button`;
        deleteButton.innerHTML = '<svg focusable="false" aria-hidden="true" viewBox="0 0 24 24" data-testid="DeleteIcon" aria-label="fontSize small"><path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z"></path></svg>';
    
        actionButtons.appendChild(deleteButton);

        eventActions.appendChild(actionButtons);
        eventItem.appendChild(eventActions);

        this.eventList.appendChild(eventItem);
    }

    removeEvent(eventId) {
        const eventItem = document.getElementById(eventId);
        if (eventItem) {
            eventItem.remove();
        }
    }

    editEvent(event) {
        const { id, name, start, end } = event;
        const eventItem = document.getElementById(`${id}`);
        console.log(eventItem);

        const eventName = eventItem.querySelector("td");
        const eventStart = eventItem.querySelector("td:nth-child(2)");
        const eventEnd = eventItem.querySelector("td:nth-child(3)");

        // Store original data

        const originalData = {
            name: eventName.textContent,
            start: eventStart.textContent,
            end: eventEnd.textContent
        };


        eventName.innerHTML = `<input type="text" value="${originalData.name}">`;
        eventStart.innerHTML = `<input type="date" value="${originalData.start}">`;
        eventEnd.innerHTML = `<input type="date" value="${originalData.end}">`;


    
        const actionButtons = eventItem.querySelector(".action-buttons");
        actionButtons.innerHTML = "";

        const saveButton = document.createElement("button");
        saveButton.className = "save-button";
        saveButton.innerHTML = '<svg focusable="false" aria-hidden="true" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M21,20V8.414a1,1,0,0,0-.293-.707L16.293,3.293A1,1,0,0,0,15.586,3H4A1,1,0,0,0,3,4V20a1,1,0,0,0,1,1H20A1,1,0,0,0,21,20ZM9,8h4a1,1,0,0,1,0,2H9A1,1,0,0,1,9,8Zm7,11H8V15a1,1,0,0,1,1-1h6a1,1,0,0,1,1,1Z"/></svg>';
        
        actionButtons.appendChild(saveButton);

        const cancelButton = document.createElement("button");
        cancelButton.className = "cancel-button";
        cancelButton.innerHTML = '<svg focusable="false" aria-hidden="true" viewBox="0 0 32 32" version="1.1" xmlns="http://www.w3.org/2000/svg"><path d="M19.587 16.001l6.096 6.096c0.396 0.396 0.396 1.039 0 1.435l-2.151 2.151c-0.396 0.396-1.038 0.396-1.435 0l-6.097-6.096-6.097 6.096c-0.396 0.396-1.038 0.396-1.434 0l-2.152-2.151c-0.396-0.396-0.396-1.038 0-1.435l6.097-6.096-6.097-6.097c-0.396-0.396-0.396-1.039 0-1.435l2.153-2.151c0.396-0.396 1.038-0.396 1.434 0l6.096 6.097 6.097-6.097c0.396-0.396 1.038-0.396 1.435 0l2.151 2.152c0.396 0.396 0.396 1.038 0 1.435l-6.096 6.096z"></path></svg>';
        cancelButton.addEventListener("click",()=>{
            eventName.innerHTML = originalData.name;
            eventStart.innerHTML=originalData.start;
            eventEnd.innerHTML=originalData.end;
            actionButtons.innerHTML = "";
            const editButton = document.createElement("button");
            editButton.className = "edit-button";
            editButton.innerHTML = '<svg focusable="false" aria-hidden="true" viewBox="0 0 24 24" data-testid="EditIcon" aria-label="fontSize small"><path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34a.9959.9959 0 0 0-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z"></path></svg>';
            actionButtons.appendChild(editButton);
            const deleteButton = document.createElement("button");
            deleteButton.className = `delete-button`;
            deleteButton.innerHTML = '<svg focusable="false" aria-hidden="true" viewBox="0 0 24 24" data-testid="DeleteIcon" aria-label="fontSize small"><path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z"></path></svg>';
        
            actionButtons.appendChild(deleteButton);

        })
    
        
        actionButtons.appendChild(cancelButton);


    }
}