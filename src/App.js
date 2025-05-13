import React, { useState } from 'react';

const weekdays = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

export default function EventGenerator() {
const [startDate, setStartDate] = useState("");
const [dayOfWeek, setDayOfWeek] = useState("Monday");
const [time, setTime] = useState("09:00");
const [count, setCount] = useState(5);
const [viewStart, setViewStart] = useState("");
const [viewEnd, setViewEnd] = useState("");
const [instances, setInstances] = useState([]);

const generateInstances = () => {
const dayIndex = weekdays.indexOf(dayOfWeek);
const result = [];
let current = new Date(startDate);

// Move to the first matching weekday
while (current.getDay() !== dayIndex) {
current.setDate(current.getDate() + 1);
}

for (let i = 0; i < count; i++) {
const eventDate = new Date(current);
const formatted = `${eventDate.toISOString().split('T')[0]} ${time}`;
result.push(formatted);
current.setDate(current.getDate() + 7); // Next week
}

const filtered = result.filter(date => {
const d = new Date(date);
return (!viewStart || d >= new Date(viewStart)) && (!viewEnd || d <= new Date(viewEnd));
});

setInstances(filtered);
};

return (
<div style={{ padding: 20, fontFamily: 'Arial' }}>
<h2>Weekly Recurring Event Generator</h2>

<label>Start Date: <input type="date" value={startDate} onChange={e => setStartDate(e.target.value)} /></label><br /><br />

<label>Day of Week:
<select value={dayOfWeek} onChange={e => setDayOfWeek(e.target.value)}>
{weekdays.map(day => <option key={day}>{day}</option>)}
</select>
</label><br /><br />

<label>Time: <input type="time" value={time} onChange={e => setTime(e.target.value)} /></label><br /><br />

<label>Number of Occurrences: <input type="number" value={count} onChange={e => setCount(parseInt(e.target.value))} /></label><br /><br />

<label>View Start Date: <input type="date" value={viewStart} onChange={e => setViewStart(e.target.value)} /></label><br /><br />

<label>View End Date: <input type="date" value={viewEnd} onChange={e => setViewEnd(e.target.value)} /></label><br /><br />

<button onClick={generateInstances}>Generate Instances</button>

<h3>Generated Instances</h3>
<ul>
{instances.map((inst, idx) => <li key={idx}>{inst}</li>)}
</ul>
</div>
);
}

