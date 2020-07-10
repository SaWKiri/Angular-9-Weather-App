

export class CityWeather {
  LocalObservationDateTime: Date;
  EpochTime: number;
  WeatherText: string;
  WeatherIcon: number;
  HasPrecipitation: boolean;
  PrecipitationType: string;
  IsDayTime: boolean;
  Temperature:Temperature;
  MobileLink: string;
  Link: string;
}


export class Temperature {
  Metric: MetricParams;
  Imperial: ImperialParams;
}


export class MetricParams {
  Value: number;
  Unit: string;
  UnitType: number;
}


export class ImperialParams {
  Value: number;
  Unit: string;
  UnitType: number;
}
