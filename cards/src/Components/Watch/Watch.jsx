import React, { useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import './Watch.css';
import moment from 'moment/moment';

export const Watch = () => {
  const [timersId, setTimersId] = useState([]);
  const [watchItems, setWatchItems] = useState([]);

  useEffect(() => {
    return () => {
      timersId.forEach((timerId) => clearInterval(timerId));
    };
  }, []);

  const createWatchItem = (city = 'Moscow', newZone = 0) => {
    if (city.length === 0) city = 'Moscow'
    const newId = uuidv4();
    setWatchItems((prev) => [
      ...prev,
      { id: newId, city: city, zone: moment().add(newZone, 'hours').format('LTS') },
    ]);
    const timerId = setInterval(() => {
      setWatchItems((prev) => {
        const index = prev.findIndex((watch) => watch.id === newId);
        const newArr = prev.slice();
        newArr[index].zone = moment().add(newZone, 'hours').format('LTS');
        return newArr;
      })
    }, 1000);
    setTimersId((prev) => [...prev, { watchId: newId, timerId: timerId }]);
  };

  const [cityValue, setCityValue] = useState('');
  const [timeZoneValue, setTimeZoneValue] = useState('');

  const handleSubmit = (evt) => {
    evt.preventDefault();
    createWatchItem(cityValue, timeZoneValue);
    setCityValue('');
    setTimeZoneValue('');
  };

  const deleteWatch = (id) => {
    const timerId = timersId.find((timer) => timer.watchId === id).timerId;
    clearInterval(timerId);
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
          <button className="button" type="submit">
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
