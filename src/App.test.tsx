import App, { IPersonFormData } from './App';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { validateFormData } from './utils/personHelpers';

// Mock the console error to avoid unnecessary output during tests
console.error = jest.fn();

describe('App component', () => {
  test('renders App component correctly', () => {
    render(<App />);
    // Check if the form is rendered
    expect(screen.getByText(/First Name/i)).toBeInTheDocument();
    expect(screen.getByText(/Last Name/i)).toBeInTheDocument();
    expect(screen.getByText(/Date Of Birth/i)).toBeInTheDocument();
    expect(screen.getByText(/Job/i)).toBeInTheDocument();
    expect(screen.getByText(/Bio/i)).toBeInTheDocument();
    expect(screen.getByText(/City/i)).toBeInTheDocument();
    expect(screen.getByText(/Country/i)).toBeInTheDocument();
    expect(screen.getByText(/Longitude/i)).toBeInTheDocument();
    expect(screen.getByText(/Latitude/i)).toBeInTheDocument();
  });

  test('submits the form correctly', async () => {
    render(<App />);
    // Fill in the form
    console.log(screen.getAllByLabelText(/Bio*/))
    userEvent.type(screen.getByLabelText(/First Name*/i), 'John');
    userEvent.type(screen.getByLabelText(/Last Name*/i), 'Doe');
    userEvent.type(screen.getByLabelText(/Date Of Birth*/i), '2023-11-22');
    const jobSelect = await screen.findByLabelText(/Job*/i);
    userEvent.selectOptions(jobSelect, 'Firefighter');
    userEvent.type(screen.getAllByLabelText(/Bio*/)[1], 'Lorem ipsum');
    userEvent.type(screen.getByLabelText(/City*/i), 'London');
    userEvent.type(screen.getByLabelText(/Country*/i), 'United Kingdom');
    userEvent.type(screen.getByLabelText(/Longitude*/i), '40.7128');
    userEvent.type(screen.getByLabelText(/Latitude*/i), '-74.0060');

    // Submit the form
    fireEvent.click(screen.getByText(/Submit/i));

    // Wait for the card to be displayed
    await waitFor(() => {
      expect(screen.getByText(/Close/i)).toBeInTheDocument();
    });
  });

  test('shows an error message if form is submitted with empty fields', async () => {
    render(<App />);

    // Submit the form without filling in any fields
    fireEvent.click(screen.getByText(/Submit/i));

    // Wait for the error message to be displayed
    await waitFor(() => {
      expect(screen.getByText(/Please fill all fields/i)).toBeInTheDocument();
    });
  });
});

describe('validateFormData', () => {
  test('returns true when all fields are filled', () => {
    const formData: IPersonFormData = {
      firstName: 'John',
      lastName: 'Doe',
      dateOfBirth: '2023-11-22',
      job: 'Developer',
      bio: 'Lorem ipsum',
      city: 'New York',
      country: 'USA',
      long: '40.7128',
      lat: '-74.0060',
    };

    const [isValid] = validateFormData(formData);

    expect(isValid).toBe(true);
  });

  test('returns false when at least one field is empty', () => {
    const formData: IPersonFormData = {
      firstName: 'John',
      lastName: 'Doe',
      dateOfBirth: '2023-11-22',
      job: '', // Empty job
      bio: 'Lorem ipsum',
      city: 'New York',
      country: 'USA',
      long: '40.7128',
      lat: '-74.0060',
    };

    const [isValid, reason] = validateFormData(formData);

    expect(isValid).toBe(false);
    expect(reason).toBe('required');
  });

  test('validates lng and lat fields', () => {
    const formData: IPersonFormData = {
      firstName: 'John',
      lastName: 'Doe',
      dateOfBirth: '2023-11-22',
      job: 'Developer',
      bio: 'Lorem ipsum',
      city: 'New York',
      country: 'USA',
      long: 'avc',
      lat: 'fwdew',
    };

    const [isValid, reason] = validateFormData(formData);

    expect(isValid).toBe(false);
    expect(reason).toBe('latlng');
  });
});
