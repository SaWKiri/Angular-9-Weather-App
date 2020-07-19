import { CityWeather, MetricParams } from '../models/CityWeather';

export const autocomplete = [
  {
    AdministrativeArea: { ID: 'TA', LocalizedName: 'Tel Aviv' },
    Country: { ID: 'IL', LocalizedName: 'Israel' },
    Key: '215854',
    LocalizedName: 'Tel Aviv',
    Rank: 31,
    Type: 'City',
    Version: 1,
  },
  {
    AdministrativeArea: { ID: 'JA', LocalizedName: 'Jambi' },
    Country: { ID: 'ID', LocalizedName: 'Indonesia' },
    Key: '3431644',
    LocalizedName: 'Telanaipura',
    Rank: 45,
    Type: 'City',
    Version: 1,
  },
  {
    AdministrativeArea: { ID: 'TFW', LocalizedName: 'Telford and Wrekin' },
    Country: { ID: 'GB', LocalizedName: 'United Kingdom' },
    Key: '325876',
    LocalizedName: 'Telford',
    Rank: 51,
    Type: 'City',
    Version: 1,
  },
];

export const currentCondition = {
  LocalObservationDateTime: new Date('2020-07-09T13:15:00+03:00'),
  EpochTime: 1594289700,
  WeatherText: 'Partly sunny',
  WeatherIcon: 3,
  HasPrecipitation: false,
  PrecipitationType: null,
  IsDayTime: true,
  Temperature: {
    Metric: {
      Value: 29.9,
      Unit: 'C',
      UnitType: 17,
    } as MetricParams,
    Imperial: {
      Value: 86,
      Unit: 'F',
      UnitType: 18,
    } as MetricParams,
  },
  MobileLink:
    'http://m.accuweather.com/en/il/tel-aviv/215854/current-weather/215854?lang=en-us',
  Link:
    'http://www.accuweather.com/en/il/tel-aviv/215854/current-weather/215854?lang=en-us',
} as CityWeather;

export const currentConditionTelAviv = {
  LocalObservationDateTime: '2020-07-19T00:16:00+03:00',
  EpochTime: 1595106960,
  WeatherText: 'Clear',
  WeatherIcon: 33,
  HasPrecipitation: false,
  PrecipitationType: null,
  IsDayTime: false,
  Temperature: {
    Metric: { Value: 25.3, Unit: 'C', UnitType: 17 },
    Imperial: { Value: 78, Unit: 'F', UnitType: 18 },
  },
  MobileLink:
    'http://m.accuweather.com/en/il/tel-aviv/215854/current-weather/215854?lang=en-us',
  Link:
    'http://www.accuweather.com/en/il/tel-aviv/215854/current-weather/215854?lang=en-us',
};

export const currentCondition3431644 = {
  LocalObservationDateTime: '2020-07-19T04:25:00+07:00',
  EpochTime: 1595107500,
  WeatherText: 'Some clouds',
  WeatherIcon: 36,
  HasPrecipitation: false,
  PrecipitationType: null,
  IsDayTime: false,
  Temperature: {
    Metric: { Value: 24.4, Unit: 'C', UnitType: 17 },
    Imperial: { Value: 76, Unit: 'F', UnitType: 18 },
  },
  MobileLink:
    'http://m.accuweather.com/en/id/telanaipura/3431644/current-weather/3431644?lang=en-us',
  Link:
    'http://www.accuweather.com/en/id/telanaipura/3431644/current-weather/3431644?lang=en-us',
};

export const currentCondition325876 = {
  LocalObservationDateTime: '2020-07-19T05:25:00+08:00',
  EpochTime: 1595107500,
  WeatherText: 'Rain',
  WeatherIcon: 18,
  HasPrecipitation: true,
  PrecipitationType: 'Rain',
  IsDayTime: false,
  Temperature: {
    Metric: { Value: 27.2, Unit: 'C', UnitType: 17 },
    Imperial: { Value: 81, Unit: 'F', UnitType: 18 },
  },
  MobileLink:
    'http://m.accuweather.com/en/sg/telok-blangah-new-town/300558/current-weather/300558?lang=en-us',
  Link:
    'http://www.accuweather.com/en/sg/telok-blangah-new-town/300558/current-weather/300558?lang=en-us',
};

export const forcast = {
  Headline: {
    EffectiveDate: '2020-07-11T08:00:00+03:00',
    EffectiveEpochDate: 1594443600,
    Severity: 4,
    Text: 'Pleasant this weekend',
    Category: 'mild',
    EndDate: null,
    EndEpochDate: null,
    MobileLink:
      'http://m.accuweather.com/en/il/tel-aviv/215854/extended-weather-forecast/215854?lang=en-us',
    Link:
      'http://www.accuweather.com/en/il/tel-aviv/215854/daily-weather-forecast/215854?lang=en-us',
  },
  DailyForecasts: [
    {
      Date: '2020-07-08T07:00:00+03:00',
      EpochDate: 1594180800,
      Temperature: {
        Minimum: {
          Value: 75.0,
          Unit: 'F',
          UnitType: 18,
        },
        Maximum: {
          Value: 86.0,
          Unit: 'F',
          UnitType: 18,
        },
      },
      Day: {
        Icon: 1,
        IconPhrase: 'Sunny',
        HasPrecipitation: false,
      },
      Night: {
        Icon: 34,
        IconPhrase: 'Mostly clear',
        HasPrecipitation: false,
      },
      Sources: ['AccuWeather'],
      MobileLink:
        'http://m.accuweather.com/en/il/tel-aviv/215854/daily-weather-forecast/215854?lang=en-us',
      Link:
        'http://www.accuweather.com/en/il/tel-aviv/215854/daily-weather-forecast/215854?lang=en-us',
    },
    {
      Date: '2020-07-09T07:00:00+03:00',
      EpochDate: 1594267200,
      Temperature: {
        Minimum: {
          Value: 72.0,
          Unit: 'F',
          UnitType: 18,
        },
        Maximum: {
          Value: 86.0,
          Unit: 'F',
          UnitType: 18,
        },
      },
      Day: {
        Icon: 2,
        IconPhrase: 'Mostly sunny',
        HasPrecipitation: false,
      },
      Night: {
        Icon: 34,
        IconPhrase: 'Mostly clear',
        HasPrecipitation: false,
      },
      Sources: ['AccuWeather'],
      MobileLink:
        'http://m.accuweather.com/en/il/tel-aviv/215854/daily-weather-forecast/215854?day=1&lang=en-us',
      Link:
        'http://www.accuweather.com/en/il/tel-aviv/215854/daily-weather-forecast/215854?day=1&lang=en-us',
    },
    {
      Date: '2020-07-10T07:00:00+03:00',
      EpochDate: 1594353600,
      Temperature: {
        Minimum: {
          Value: 74.0,
          Unit: 'F',
          UnitType: 18,
        },
        Maximum: {
          Value: 86.0,
          Unit: 'F',
          UnitType: 18,
        },
      },
      Day: {
        Icon: 1,
        IconPhrase: 'Sunny',
        HasPrecipitation: false,
      },
      Night: {
        Icon: 34,
        IconPhrase: 'Mostly clear',
        HasPrecipitation: false,
      },
      Sources: ['AccuWeather'],
      MobileLink:
        'http://m.accuweather.com/en/il/tel-aviv/215854/daily-weather-forecast/215854?day=2&lang=en-us',
      Link:
        'http://www.accuweather.com/en/il/tel-aviv/215854/daily-weather-forecast/215854?day=2&lang=en-us',
    },
    {
      Date: '2020-07-11T07:00:00+03:00',
      EpochDate: 1594440000,
      Temperature: {
        Minimum: {
          Value: 78.0,
          Unit: 'F',
          UnitType: 18,
        },
        Maximum: {
          Value: 87.0,
          Unit: 'F',
          UnitType: 18,
        },
      },
      Day: {
        Icon: 2,
        IconPhrase: 'Mostly sunny',
        HasPrecipitation: false,
      },
      Night: {
        Icon: 35,
        IconPhrase: 'Partly cloudy',
        HasPrecipitation: false,
      },
      Sources: ['AccuWeather'],
      MobileLink:
        'http://m.accuweather.com/en/il/tel-aviv/215854/daily-weather-forecast/215854?day=3&lang=en-us',
      Link:
        'http://www.accuweather.com/en/il/tel-aviv/215854/daily-weather-forecast/215854?day=3&lang=en-us',
    },
    {
      Date: '2020-07-12T07:00:00+03:00',
      EpochDate: 1594526400,
      Temperature: {
        Minimum: {
          Value: 76.0,
          Unit: 'F',
          UnitType: 18,
        },
        Maximum: {
          Value: 87.0,
          Unit: 'F',
          UnitType: 18,
        },
      },
      Day: {
        Icon: 2,
        IconPhrase: 'Mostly sunny',
        HasPrecipitation: false,
      },
      Night: {
        Icon: 35,
        IconPhrase: 'Partly cloudy',
        HasPrecipitation: false,
      },
      Sources: ['AccuWeather'],
      MobileLink:
        'http://m.accuweather.com/en/il/tel-aviv/215854/daily-weather-forecast/215854?day=4&lang=en-us',
      Link:
        'http://www.accuweather.com/en/il/tel-aviv/215854/daily-weather-forecast/215854?day=4&lang=en-us',
    },
  ],
};

export const geoPositionSearchKriyatAtidim = {
  Version: 1,
  Key: '215805',
  Type: 'City',
  Rank: 95,
  LocalizedName: 'Kiryat Atidim',
  EnglishName: 'Kiryat Atidim',
  PrimaryPostalCode: '',
  Region: {
    ID: 'MEA',
    LocalizedName: 'Middle East',
    EnglishName: 'Middle East',
  },
  Country: { ID: 'IL', LocalizedName: 'Israel', EnglishName: 'Israel' },
  AdministrativeArea: {
    ID: 'TA',
    LocalizedName: 'Tel Aviv',
    EnglishName: 'Tel Aviv',
    Level: 1,
    LocalizedType: 'District',
    EnglishType: 'District',
    CountryID: 'IL',
  },
  TimeZone: {
    Code: 'IDT',
    Name: 'Asia/Jerusalem',
    GmtOffset: 3,
    IsDaylightSaving: true,
    NextOffsetChange: '2020-10-24T23:00:00Z',
  },
  GeoPosition: {
    Latitude: 32.117,
    Longitude: 34.845,
    Elevation: {
      Metric: { Value: 47, Unit: 'm', UnitType: 5 },
      Imperial: { Value: 154, Unit: 'ft', UnitType: 0 },
    },
  },
  IsAlias: false,
  SupplementalAdminAreas: [],
  DataSets: [
    'AirQualityCurrentConditions',
    'AirQualityForecasts',
    'Alerts',
    'ForecastConfidence',
  ],
};
