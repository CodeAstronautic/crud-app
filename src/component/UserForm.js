import React, { useEffect, useState } from "react";
import { useDispatch } from 'react-redux';
import { addUser, updateUser } from "../redux/userSlice";

const UserForm = ({ handleClose, userdata }) => {
    const dispatch = useDispatch();
    const defaultEducation = { degree: '' };
    const defaultExperience = { company: '' };

    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        dob: "",
        address: "",
        education: [defaultEducation],
        experience: [defaultExperience],
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleDynamicChange = (section, index, name, value) => {
        const updated = [...formData[section]];
        updated[index][name] = value;
        setFormData((prev) => ({ ...prev, [section]: updated }));
    };

    const addField = (section, defaultVal) => {
        setFormData((prev) => ({
            ...prev,
            [section]: [...prev[section], { ...defaultVal }],
        }));
    };

    const removeField = (section, index) => {
        setFormData((prev) => ({
            ...prev,
            [section]: prev[section].filter((_, i) => i !== index),
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!formData.firstName || !formData.email) return alert("First name and email are required.");

        if (userdata) {
            dispatch(updateUser(formData));
            handleClose();
        } else {
            dispatch(addUser(formData));
        }

        setFormData({
            firstName: "",
            lastName: "",
            email: "",
            phone: "",
            dob: "",
            address: "",
            education: [defaultEducation],
            experience: [defaultExperience],
        });
    };

    useEffect(() => {
        if (userdata) {
            setFormData(userdata);
        }
    }, [userdata]);

    return (
        <div>
            <h2>{userdata ? "Update" : "Add"} User</h2>
            {userdata && <p onClick={handleClose} style={{ cursor: "pointer" }}>X</p>}
            <form onSubmit={handleSubmit}>
                <input name="firstName" type="text" placeholder="First Name" onChange={handleChange} value={formData.firstName} />
                <input name="lastName" type="text" placeholder="Last Name" onChange={handleChange} value={formData.lastName} />
                <input name="email" type="email" placeholder="Email" onChange={handleChange} value={formData.email} />
                <input name="phone" type="text" placeholder="Phone" onChange={handleChange} value={formData.phone} />
                <input name="dob" type="date" placeholder="DOB" onChange={handleChange} value={formData.dob} />
                <input name="address" type="text" placeholder="Address" onChange={handleChange} value={formData.address} />

                <h3>Education</h3>
                {formData.education.map((edu, i) => (
                    <div key={i} style={{ display: "flex", gap: 10 }}>
                        <input placeholder="Degree" value={edu.degree} onChange={(e) => handleDynamicChange('education', i, 'degree', e.target.value)} />
                        <button type="button" onClick={() => removeField("education", i)} style={{ width: 35 }}>X</button>
                    </div>
                ))}
                <button type="button" onClick={() => addField('education', defaultEducation)}>Add More Education</button>

                <h3>Experience</h3>
                {formData.experience.map((exp, i) => (
                    <div key={i} style={{ display: "flex", gap: 10 }}>
                        <input placeholder="Company" value={exp.company} onChange={(e) => handleDynamicChange('experience', i, 'company', e.target.value)} />
                        <button type="button" onClick={() => removeField("experience", i)} style={{ width: 35 }}>X</button>
                    </div>
                ))}
                <button type="button" onClick={() => addField('experience', defaultExperience)}>Add More Experience</button>

                <button type="submit">{userdata?.id ? "Update" : "Submit"} User</button>
            </form>
        </div>
    );
};

export default UserForm;
