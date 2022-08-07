import React, { useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import "./Watch.css";
import moment from "moment/moment";

export const Watch = () => {
  const [watchItems, setWatchItems] = useState([
    { id: uuidv4(), city: "Moscow", zone: moment().format("LTS") },
    { id: uuidv4(), city: "New-York", zone: moment().format("LTS") },
  ]);

  const refreshClock = () => {
    for (let i = 0; i < setWatchItems.length; i++) {
      return {
        ...watchItems,
        zone: (watchItems[i].zone = moment().format("LTS")),
      };
    }
  };

  useEffect(() => {
    const timerId = setInterval(() => refreshClock(), 1000);
    return function cleanup() {
      clearInterval(timerId);
    };
  }, []);

  const createWatchItem = (city, zone) => {
    const newWatchItem = [
      ...watchItems,
      { id: uuidv4(), city: city, zone: moment().format("LTS") },
    ];
    setWatchItems(newWatchItem);
  };

  const [cityValue, setCityValue] = useState("");
  const [timeZoneValue, setTimeZoneValue] = useState("");

  const handleSubmit = (evt) => {
    evt.preventDefault();
    createWatchItem(cityValue, timeZoneValue);
    setCityValue("");
    setTimeZoneValue("");
  };

  const deleteWatch = (id) => {
    const removeWatchItem = watchItems.filter((item) => item.id !== id);
    setWatchItems(removeWatchItem);
  };
  return (
    <div className="container">
      <div className="input__group">
        <form onSubmit={handleSubmit}>
          <label>
            Название
            <input
              placeholder="Введите Город"
              value={cityValue}
              onChange={(event) => setCityValue(event.target.value)}
              type="text"
              name="watch"
              className="input__name"
            />
          </label>
          <label>
            Временная зона
            <input
              placeholder="+0"
              value={timeZoneValue}
              onChange={(event) => setTimeZoneValue(event.target.value)}
              type="number"
              name="zone"
              className="input__name"
            />
          </label>
          <button onClick={handleSubmit} className="button" type="button">
            Добавить
          </button>
        </form>
      </div>
      <div className="watches">
        {watchItems.map((el) => (
          <div key={el.id}>
            <button className="remove" onClick={() => deleteWatch(el.id)}>
              X
            </button>
            <p>{el.city}</p>
            <p>{el.zone}</p>
          </div>
        ))}
      </div>
    </div>
  );
};
