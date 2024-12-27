import { displayStats } from "./site.js";

export const events = [{
    id: 1,
    event: "ComicCon",
    city: "New York",
    state: "New York",
    attendance: 240000,
    date: "06/01/2017",
},
{
    id: 2,
    event: "ComicCon",
    city: "New York",
    state: "New York",
    attendance: 250000,
    date: "06/01/2018",
},
{
    id: 3,
    event: "ComicCon",
    city: "New York",
    state: "New York",
    attendance: 257000,
    date: "06/01/2019",
},
{
    id: 4,
    event: "ComicCon",
    city: "San Diego",
    state: "California",
    attendance: 130000,
    date: "06/01/2017",
},
{
    id: 5,
    event: "ComicCon",
    city: "San Diego",
    state: "California",
    attendance: 140000,
    date: "06/01/2018",
},
{
    id: 6,
    event: "ComicCon",
    city: "San Diego",
    state: "California",
    attendance: 150000,
    date: "06/01/2019",
},
{
    id: 7,
    event: "HeroesCon",
    city: "Charlotte",
    state: "North Carolina",
    attendance: 40000,
    date: "06/01/2017",
},
{
    id: 8,
    event: "HeroesCon",
    city: "Charlotte",
    state: "North Carolina",
    attendance: 45000,
    date: "06/01/2018",
},
{
    id: 9,
    event: "HeroesCon",
    city: "Charlotte",
    state: "North Carolina",
    attendance: 50000,
    date: "06/01/2019",
},
];

export function getEvents(element) {
    let city = element.getAttribute("data-city");
    let curEvents = JSON.parse(localStorage.getItem("eventsArray")) || events;

    let filteredEvents = curEvents;
    //filter events based on city selected
    //new filter function
    if (city != "All") {
        filteredEvents = curEvents.filter(function (event) {
            if (event.city == city) {
                return event;
            }
        })
    }
    document.getElementById("statsHeader").innerHTML = `Stats for ${city} Events`

    //display the states for selected city
    displayStats(filteredEvents);
}