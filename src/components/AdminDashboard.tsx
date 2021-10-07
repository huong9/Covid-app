import { AxiosResponse } from "axios";
import { ChangeEvent, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router";
import { Dispatch } from "redux";
import { getData } from "../api/http";
import { logOut } from "../redux/actions/userAction";
import { Brief } from "../types/brief.type";
import { Country } from "../types/countries.type";
import { RootState } from "../types/rootState.type";
import TableData from "./TableData";

const Admin = () => {
  const { user } = useSelector((store: RootState) => store);
  const dispatch = useDispatch<Dispatch<any>>();
  const history = useHistory();

  const [briefWorld, setBriefWorld] = useState<Brief>();
  const [countries, setCountries] = useState<Country[]>();
  const [currentCountry, setCurrentCountry] =
    useState<Country["countryregion"]>("Vietnam");
  const [briefCountries, setBriefCountries] = useState<Brief>();

  useEffect(() => {
    if (!user) {
      history.push("/login");
    }
  }, [user, history]);

  useEffect(() => {
    getData("/api/brief")?.then((res: AxiosResponse<{ brief: Brief }>) =>
      setBriefWorld(res.data.brief)
    );

    getData("/api/countries")?.then(
      (res: AxiosResponse<{ countries: Country[] }>) =>
        setCountries(res.data.countries)
    );
  }, []);

  useEffect(() => {
    const finded = countries?.find(
      (country) =>
        country.countryregion.toLowerCase() === currentCountry.toLowerCase()
    );

    if (finded) {
      const dataBrief: Brief = {
        confirmed: finded.confirmed,
        deaths: finded.deaths,
        recovered: finded.recovered,
      };

      setBriefCountries(dataBrief);
    }
  }, [currentCountry, countries]);

  const handleLogOut = () => {
    dispatch(logOut());
  };

  const handleChangeCountry = (event: ChangeEvent<HTMLSelectElement>) => {
    setCurrentCountry(event.target.value);
  };

  return (
    <div className="container">
      <div className="d-flex justify-content-between p-2">
        <h2>Covid Dashboard </h2>
        <span onClick={handleLogOut}>{user && user.email}</span>
      </div>

      <div>
        <h3>World Wide</h3>
        {briefWorld && <TableData data={briefWorld} />}
      </div>

      <div>
        <h3>Regional</h3>
        <select value={currentCountry} onChange={handleChangeCountry}>
          {countries?.map((country) => (
            <option key={country.countryregion} value={country.countryregion}>
              {country.countryregion}
            </option>
          ))}
        </select>

        {briefCountries && <TableData data={briefCountries} />}
      </div>
    </div>
  );
};

export default Admin;
