import React, { useState } from "react";
import './dz6.css';

export function Form() {
    const [formData, setFormData] = useState({
        userId: "",
        password: "",
        name: "",
        address: "",
        country: "",
        zipCode: "",
        email: "",
        sex: "",
        language: "",
        about: ""
    });

    const [errors, setErrors] = useState({});
    const [touched, setTouched] = useState({});

    const handleChange = (e) => {
        const { id, value } = e.target;
        setFormData({ ...formData, [id]: value });
    };

    const handleBlur = (e) => {
        const { id, value } = e.target;
        validateField(id, value);
        setTouched({ ...touched, [id]: true });
    };

    const validateField = (id, value) => {
        let error = "";

        switch (id) {
            case "userId":
                if (value.length < 5 || value.length > 7) {
                    error = "User ID must be between 5 and 7 characters";
                }
                break;
            case "password":
                if (value.length < 7 || value.length > 12) {
                    error = "Password must be between 7 and 12 characters";
                }
                break;
            case "name":
                if (!/^[a-zA-Z]+$/.test(value)) {
                    error = "Name must contain only alphabets";
                }
                break;
            case "address":
                if (!/^[a-zA-Z0-9\s]+$/.test(value)) {
                    error = "Address must contain only alphanumeric characters";
                }
                break;
            case "country":
                if (!value) {
                    error = "Country must be selected";
                }
                break;
            case "zipCode":
                if (!/^[a-zA-Z0-9\s]+$/.test(value)) {
                    error = "ZIP Code must contain only alphanumeric characters";
                }
                break;
            case "email":
                if (!/^\S+@\S+\.\S+$/.test(value)) {
                    error = "Email must be a valid email address";
                }
                break;
            case "sex":
                if (!value) {
                    error = "Sex must be selected";
                }
                break;
            default:
                break;
        }

        setErrors({ ...errors, [id]: error });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        let valid = true;
        Object.keys(formData).forEach((key) => {
            validateField(key, formData[key]);
            if (errors[key]) {
                valid = false;
            }
        });

        if (valid) {
            alert("Form submitted successfully");
        }
    };

    return (
        <div className="Container">
            <form onSubmit={handleSubmit}>
                {["userId", "password", "name", "address", "country", "zipCode", "email"].map((field) => (
                    <div key={field} className="form-group">
                        <label htmlFor={field}>{field.charAt(0).toUpperCase() + field.slice(1)}:</label>
                        {field === "country" ? (
                            <select id={field} value={formData[field]} onChange={handleChange} onBlur={handleBlur}>
                                <option value="">Select a country</option>
                                <option value="Ukraine">Ukraine</option>
                                <option value="USA">USA</option>
                                <option value="Canada">Canada</option>
                            </select>
                        ) : (
                            <input type={field === "password" ? "password" : "text"} id={field} value={formData[field]} onChange={handleChange} onBlur={handleBlur} />
                        )}
                        {touched[field] && errors[field] && <div className="error">{errors[field]}</div>}
                        {touched[field] && (errors[field] ? <span className="status-icon">❌</span> : <span className="status-icon">✔️</span>)}
                    </div>
                ))}
                <div className="form-group">
                    <label>Sex:</label>
                    <label>
                        <input type="radio" id="sex" name="sex" value="Male" checked={formData.sex === "Male"} onChange={handleChange} onBlur={handleBlur} />
                        Male
                    </label>
                    <label>
                        <input type="radio" id="sex" name="sex" value="Female" checked={formData.sex === "Female"} onChange={handleChange} onBlur={handleBlur} />
                        Female
                    </label>
                    {touched.sex && errors.sex && <div className="error">{errors.sex}</div>}
                    {touched.sex && (errors.sex ? <span className="status-icon">❌</span> : <span className="status-icon">✔️</span>)}
                </div>
                <div className="form-group">
                    <label>Language:</label>
                    <label>
                        <input type="checkbox" id="language" name="language" value="English" checked={formData.language === "English"} onChange={handleChange} />
                        English
                    </label>
                    <label>
                        <input type="checkbox" id="language" name="language" value="Non English" checked={formData.language === "Non English"} onChange={handleChange} />
                        Non English
                    </label>
                </div>
                <div className="form-group">
                    <label htmlFor="about">About:</label>
                    <textarea id="about" value={formData.about} onChange={handleChange}></textarea>
                </div>
                <button type="submit">Submit</button>
            </form>
        </div>
    );
}
