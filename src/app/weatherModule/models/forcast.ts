export class Forcast {
  Headline: Headline;
  DailyForecasts: DailyForecast[];
}

export class Headline {
  EffectiveDate: Date;
  EffectiveEpochDate: number;
  Severity: number;
  Text: string;
  Category: string;
  EndDate: Date;
  EndEpochDate: number;
  MobileLink: string;
  Link: string;
}

export class DailyForecast {
  Date: Date;
  EpochDate: number;
  Temperature: Temperature;
  Day: Condition;
  Night: Condition;
  Source: Sources[];
  MobileLink: string;
  Link: string;
}

export class Temperature {
  Minimum: Temp;
  Maximum: Temp;
}

export class Temp {
  Value: number;
  Unit: string;
  UnitType: number;
}

export class Condition{
  Icon: number;
  IconPhrase: string;
  HasPrecipitation: boolean;
}

export class Sources {
  0:string
}
