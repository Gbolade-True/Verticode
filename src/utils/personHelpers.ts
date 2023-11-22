import { IPersonFormData } from "../App";
import IPerson from "../models/Person";
import { coordinateRegex } from "./constants";

export const initialFormData: IPersonFormData = {
  firstName: '',
  lastName: '',
  dateOfBirth: '',
  job: '',
  bio: '',
  city: '',
  country: '',
  long: '',
  lat: '',
};

export const validateFormData = (formData: IPersonFormData) :[boolean, 'required' | 'latlng' | ''] => {
  let canSubmit = true;
  let reason: 'required' | 'latlng' | '' = '';

  (Object.keys(formData) as (keyof IPersonFormData)[]).forEach((key) => {
    if (formData[key] === '' || formData[key] === null || formData[key] === undefined) {
      canSubmit = false
      reason = 'required'
    }
  })

  if(!canSubmit) return [canSubmit, reason]
  
  if(!isValidCoordinate(formData.lat) || !isValidCoordinate(formData.long)) {
    canSubmit = false
    reason = 'latlng'
  }
  return [canSubmit, reason];
}

export const mapPersonFormDataToPerson = (formData: IPersonFormData) :IPerson => {
  let person = {} as IPerson;
  person.firstName = formData.firstName;
  person.lastName = formData.lastName;
  person.job = formData.job;
  person.bio = formData.bio;
  person.location = {
    city: formData.city,
    country: formData.country,
    lat: formData.lat,
    long: formData.long,
  };
  person.bio = formData.bio;
  person.dateOfBirth = new Date(formData.dateOfBirth);
  //Mock estimatedScore calcuation
  person.estimatedScore = Math.floor(Math.random() * 10) + 1;

  return person;
};

export const isValidCoordinate = (input: string) => coordinateRegex.test(input);