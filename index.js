const API_URL = "http://localhost:3000/events"

const eventView = new EventView();
const eventModel = new EventModel();

const eventController = new EventController(eventModel, eventView);
