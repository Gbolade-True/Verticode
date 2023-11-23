import { useState } from "react";
import logo from "./logo.png";
import Input from "./utils/input";
import { ISelectOptionsProps, TypeOrSelect } from "./utils/select/typeOrSelect";
import { JobOptions } from "./utils/constants";
import { Textarea } from "./utils/textarea";
import { PersonCard } from "./utils/card/personCard";
import { initialFormData, mapPersonFormDataToPerson, validateFormData } from "./utils/personHelpers";

const currentDate = new Date().toISOString().split('T')[0];
export interface IPersonFormData {
  firstName: string;
  lastName: string;
  dateOfBirth: string;
  job: string | 'Firefighter' | 'Police Officer' | 'Astronaut' | 'Developer';
  bio: string;
  city: string;
  country: string;
  long: string;
  lat: string;
}

function App() {
  const [formData, setFormData] = useState<IPersonFormData>(initialFormData);
  const [showFormResults, setShowFormResults] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    if(error) setError('');
    setFormData((prevData: any) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSelectClick = (name: string, item: ISelectOptionsProps) => {
    setFormData((prevData: any) => ({
      ...prevData,
      [name]: item.value,
    }));
  };

  const submit = (e: any) => {
    e.preventDefault();
    const [isValid, reason] = validateFormData(formData)
    if (!isValid) {
      setError(reason === 'required' ? 'Please fill all fields' : 'Please format lat or long correctly');
      return
    }

    const person = mapPersonFormDataToPerson(formData);
    setShowFormResults(true);
    return person;
  };

  const renderContent = () => {
    if (showFormResults) {
      return (
        <PersonCard 
          person={mapPersonFormDataToPerson(formData)} 
          onClose={() => setShowFormResults(false)}
        />
      )
    }

    return (
      <form className="w-full md:w-[600px] mx-auto p-4 bg-white shadow-md rounded-md">
        <h4 className="text-xl font-semibold my-4">Create Person</h4>
        <Input<IPersonFormData>
          label="First Name"
          type="text"
          id="firstName"
          name="firstName"
          value={formData.firstName}
          onChange={handleChange}
          required
        />
        <Input<IPersonFormData> 
          label="Last Name"
          type="text"
          id="lastName"
          name="lastName"
          value={formData.lastName}
          onChange={handleChange}
          required
        />
        <Input<IPersonFormData> 
          label="Date Of Birth"
          type="date"
          id="dateOfBirth"
          name="dateOfBirth"
          value={formData.dateOfBirth}
          onChange={handleChange}
          max={currentDate}
          required
        />
        <TypeOrSelect 
          label="Job"
          id="job"
          name="job"
          value={formData.job}
          onChange={handleChange}
          onSelectClick={handleSelectClick}
          required
          options={JobOptions}
        />
        <Textarea<IPersonFormData> 
          label="Bio"
          id="bio"
          name="bio"
          value={formData.bio}
          onChange={handleChange}
          required
        />
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Input<IPersonFormData> 
            label="City"
            type="text"
            id="city"
            name="city"
            value={formData.city}
            onChange={handleChange}
            required
          />
          <Input<IPersonFormData> 
            label="Country"
            type="text"
            id="country"
            name="country"
            value={formData.country}
            onChange={handleChange}
            required
          />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Input<IPersonFormData> 
            label="Longitude"
            type="text"
            id="long"
            name="long"
            value={formData.long}
            onChange={handleChange}
            placeholder="e.g 40.7128"
            required
          />
          <Input<IPersonFormData> 
            label="Latitude"
            type="text"
            id="lat"
            name="lat"
            value={formData.lat}
            placeholder="e.g. -74.0060"
            onChange={handleChange}
            required
          />
        </div>
        <p className="text-red-500 text-xs h-2">{error}</p>
        <button
          type="submit"
          className="bg-green text-white px-4 py-2 mt-4 rounded-md hover:bg-green-600"
          onClick={submit}
        >
          Submit
        </button>
      </form>
    )
  }

  return (
    <div className="bg-light-green p-4 md:p-8 min-h-screen">
      <img src={logo} className="mx-auto mb-12 h-16" alt='verticode_logo' />
      {renderContent()}
    </div>
  );
}

export default App;
