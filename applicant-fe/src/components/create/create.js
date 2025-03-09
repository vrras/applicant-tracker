import React, { useState } from 'react';
import { Form, FormGroup, Button, FormInput } from 'semantic-ui-react';
import axios from 'axios';
import { useHistory } from 'react-router';
import { ROLE } from '../../utils/constants';

export default function Create() {
  let history = useHistory();
  const [fullname, setFullname] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [role, setRole] = useState('');
  const [yoe, setYoe] = useState(null);
  const [location, setLocation] = useState('');
  const [resumeUrl, setResumeUrl] = useState('');

  const sendDataToAPI = () => {
    axios.post(`${process.env.REACT_APP_API_URL}/v1/applicants`, {
      name: fullname,
      email,
      phone,
      role,
      location: location.toLowerCase(),
      yoe: parseInt(yoe),
      resumeUrl
    }).then(() => {
      history.push('/')
    })
  }
  return (
    <div>
      <h3>Upload a new candidate application</h3>
      <div className="ui segment">
        <Form>
          <FormGroup widths='equal'>
            <FormInput
              label='Full Name'
              placeholder='Enter first & lastname'
              name="fullname"
              onChange={(e) => setFullname(e.target.value)}
            />
            <FormInput
              label='Phone No.'
              placeholder='Enter phone number including country prefix'
              name="phone"
              onChange={(e) => setPhone(e.target.value)}
            />
          </FormGroup>
          <FormGroup widths='equal'>
            <FormInput
              label='Email address'
              placeholder='Enter email address'
              name="email"
              onChange={(e) => setEmail(e.target.value)}
            />
            <Form.Field>
              <label>Role</label>
              <select name="role" onChange={(e) => setRole(e.target.value)}>
                <option value="">Select Role</option>
                {Object.entries(ROLE).map(([key, value]) => (
                  <option key={key} value={key}>{value}</option>
                ))}
              </select>
            </Form.Field>
          </FormGroup>
          <FormGroup widths='equal'>
            <FormInput
              label='Years of experience'
              placeholder='e.g 5'
              name="yoe"
              onChange={(e) => setYoe(e.target.value)}
            />
            <FormInput
              label='Location'
              placeholder='Enter the country'
              name="location"
              onChange={(e) => setLocation(e.target.value.toLowerCase())}
            />
          </FormGroup>
          <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', textAlign: 'center', backgroundColor: '#f0f0f5', padding: '30px', marginBottom: "60px" }}>
            <p style={{ fontSize: '1.2em', fontWeight: 'bold' }}>Upload resume url</p>
            <FormInput
              width={8}
              placeholder='Enter resume url'
              name="resumeUrl"
              onChange={(e) => setResumeUrl(e.target.value)}
            />
          </div>
          <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '20px' }}>
            <div style={{ width: '30%' }}>
              <Button fluid color='green' type='submit' onClick={sendDataToAPI}>Submit</Button>
            </div>
          </div>
        </Form>
      </div>
    </div>
  )
}
