const eventAPI=(() => {
    const url = "http://localhost:3000/events";
    const fetchEventsAPI = async () => {
        const response = await fetch(url);
        const data = await  response.json();
        return data;
    };

    const postEventAPI = async (newEvent) =>{
        const response = await fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(newEvent)
        });
        return await response.json();
    };

    const deleteEventAPI = async (eventId) =>{
        const response = await fetch(`${url}/${eventId}`, {
            method: "DELETE"
        });
        return await response.json();
    };

    const editEventAPI = async (event) =>{
        const response = await fetch(`${url}/${event.id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(event)
        });
        return await response.json();
    };

    return{
        fetchEventsAPI,
        postEventAPI,
        deleteEventAPI,
        editEventAPI
    };
})();