import { AxiosResponse } from "axios";
import { ChangeEvent, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router";
import { Dispatch } from "redux";
import { getData } from "../api/callApi";
import { logOut } from "../redux/actions/userAction";
import { Brief } from "../types/brief.type";
import { Country } from "../types/countries.type";
import { RootState } from "../types/rootState.type";
import Chart from "./Chart";
import ShowData from "./ShowBrief";

const Admin = () => {
  const { user } = useSelector((store: RootState) => store);
  const dispatch = useDispatch<Dispatch<any>>();
  const history = useHistory();

  const [briefWorldWide, setBriefWorlWide] = useState<Brief>();
  const [countries, setCountries] = useState<Country[]>();
  const [timeseries, setTimeseries] = useState<any[]>([]);
  const [timeCurrent, setTimeCurrent] = useState();
  const [currentCountry, setCurrentCountry] = useState<string>("Vietnam");
  const [briefCountries, setBriefCountries] = useState<Brief>();

  useEffect(() => {
    if (!user) {
      history.push("/login");
    }
  }, [user, history]);

  useEffect(() => {
    getData("/api/brief")?.then((res: AxiosResponse<{ brief: Brief }>) =>
      setBriefWorlWide(res.data.brief)
    );

    getData("/api/countries")?.then(
      (res: AxiosResponse<{ countries: Country[] }>) =>
        setCountries(res.data.countries)
    );

    getData("/api/timeseries")?.then(
      (res: AxiosResponse<{ timeseries: any[] }>) => {
        setTimeseries(res.data.timeseries);
      }
    );
  }, []);

  useEffect(() => {
    const findCountry = countries?.find(
      (country) => country.countryregion === currentCountry
    );

    if (findCountry) {
      const dataBrief: Brief = {
        confirmed: findCountry.confirmed,
        deaths: findCountry.deaths,
        recovered: findCountry.recovered,
      };

      setBriefCountries(dataBrief);
    }
  }, [currentCountry, countries]);
  const dataChart = () => {
    if (timeseries) {
      console.log(timeseries);
      const item: any = timeseries.find(
        (time: any) => time.countryregion === currentCountry
      );

      setTimeCurrent(item);
    }
  };

  useEffect(() => {
    dataChart();
  }, [currentCountry, timeseries]);

  return (
    <div className="container">
      <div className="d-flex justify-content-between p-2 dashboard">
        <h3>Covid Dashboard </h3>
        <span onClick={() => dispatch(logOut())}>{user && user.email}</span>
      </div>
      <div className="data ">
        <div>
          <h3>World Wide</h3>
          {briefWorldWide && <ShowData data={briefWorldWide} />}
        </div>

        <div>
          <h3>Regional</h3>
          <select
            value={currentCountry}
            onChange={(event: ChangeEvent<HTMLSelectElement>) =>
              setCurrentCountry(event.target.value)
            }
          >
            {countries?.map((country) => (
              <option value={country.countryregion}>
                {country.countryregion}
              </option>
            ))}
          </select>
          {briefCountries && <ShowData data={briefCountries} />}
        </div>

        <Chart times={timeCurrent} />
      </div>
    </div>
  );
};

export default Admin;
