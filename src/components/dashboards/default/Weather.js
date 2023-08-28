import React, { useEffect, useState } from 'react';
// import PropTypes from 'prop-types';
import { Card, Col, Row } from 'react-bootstrap';
import FalconCardHeader from 'components/common/FalconCardHeader';
import CardDropdown from 'components/common/CardDropdown';
import weatherIcon from 'assets/img/icons/weather-icon.png';
import Flex from 'components/common/Flex';
import { useFetching } from '../../../hooks/useFetching';

const Weather = () => {
  const [weatherVidget, setWeatherVidget] = useState();
  const [fetchWeather, isWeatherLoading, weatherError] = useFetching(
    async () => {
      const response = await fetch(
        'https://api.openweathermap.org/data/2.5/weather?lat=55.7522&lon=37.6156&appid=92e4bd50d697552d8c6d2bc1f3cf195f'
      );
      const data = await response.json();
      setWeatherVidget(data);
    }
  );

  useEffect(() => {
    fetchWeather();
  }, []);
  if (isWeatherLoading) {
    return <div>Loading...</div>;
  } else if (weatherVidget)
    return (
      <Card className="h-100">
        {weatherError && <h1>Ошибка {weatherError}</h1>}
        <FalconCardHeader
          title="Weather"
          light={false}
          titleTag="h6"
          className="pb-0"
          endEl={<CardDropdown />}
        />
        <Card.Body className="pt-2">
          <Row className="g-0 h-100 align-items-center">
            <Col as={Flex} alignItems="center">
              <img className="me-3" src={weatherIcon} alt="" height="60" />
              <div>
                <h6 className="mb-2">{weatherVidget.name}</h6>
                <div className="fs--2 fw-semi-bold">
                  <div className="text-warning">
                    {weatherVidget.weather[0].main}
                  </div>
                  Precipitation: 7%
                </div>
              </div>
            </Col>
            <Col xs="auto" className="text-center ps-2">
              <div className="fs-4 fw-normal font-sans-serif text-primary mb-1 lh-1">
                {Math.round(weatherVidget.main.temp - 273)}°
              </div>
              <div className="fs--1 text-800">
                {Math.round(weatherVidget.main.temp_max - 273)}° /{' '}
                {Math.round(weatherVidget.main.temp_min - 273)}°
              </div>
            </Col>
          </Row>
        </Card.Body>
      </Card>
    );
};
// Weather.propTypes = {
//   name: PropTypes.string.isRequired,
//   main: PropTypes.shape({
//     temp: PropTypes.number.isRequired,
//     temp_max: PropTypes.number.isRequired,
//     temp_min: PropTypes.number.isRequired
//   }).isRequired,
//   weather: PropTypes.arrayOf(
//     PropTypes.shape({
//       main: PropTypes.string.isRequired
//     })
//   ).isRequired
// };
export default Weather;
// data: {
//   city,
//   condition,
//   precipitation,
//   temperature,
//   highestTemperature,
//   lowestTemperature
// },
// ...rest
