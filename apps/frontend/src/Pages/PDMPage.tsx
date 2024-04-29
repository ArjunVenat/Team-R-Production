import React, { useState } from "react";

interface FormData {
  department: string;
  ratingInterval: string;
  language: string;
  certification: string;
  specialtyTraining: string;
}

const SampleForm: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    department: "",
    ratingInterval: "",
    language: "",
    certification: "",
    specialtyTraining: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Handle form submission, e.g., sending data to backend
    console.log(formData);
  };

  return (
    <div>
      <h2>Sample Form</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="department">Department:</label>
          <select
            id="department"
            name="department"
            value={formData.department}
            onChange={handleChange}
          >
            <option value="">Select Department</option>
            <option value="dept1">Department 1</option>
            <option value="dept2">Department 2</option>
            <option value="dept3">Department 3</option>
          </select>
        </div>
        <div>
          <label htmlFor="ratingInterval">Rating Interval:</label>
          <select
            id="ratingInterval"
            name="ratingInterval"
            value={formData.ratingInterval}
            onChange={handleChange}
          >
            <option value="">Select Rating Interval</option>
            <option value="low">Low</option>
            <option value="high">High</option>
          </select>
        </div>
        <div>
          <label htmlFor="language">Language:</label>
          <select
            id="language"
            name="language"
            value={formData.language}
            onChange={handleChange}
          >
            <option value="">Select Language</option>
            <option value="english">English</option>
            <option value="spanish">Spanish</option>
            <option value="french">French</option>
          </select>
        </div>
        <div>
          <label htmlFor="certification">Certification:</label>
          <select
            id="certification"
            name="certification"
            value={formData.certification}
            onChange={handleChange}
          >
            <option value="">Select Certification</option>
            <option value="cert1">Certification 1</option>
            <option value="cert2">Certification 2</option>
            <option value="cert3">Certification 3</option>
          </select>
        </div>
        <div>
          <label htmlFor="specialtyTraining">Specialty Training:</label>
          <select
            id="specialtyTraining"
            name="specialtyTraining"
            value={formData.specialtyTraining}
            onChange={handleChange}
          >
            <option value="">Select Specialty Training</option>
            <option value="training1">Training 1</option>
            <option value="training2">Training 2</option>
            <option value="training3">Training 3</option>
          </select>
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default SampleForm;
