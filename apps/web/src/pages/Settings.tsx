import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '../components/ui/Card';
import { Input } from '../components/ui/Input';
import { Select } from '../components/ui/Select';
import { Button } from '../components/ui/Button';

const Settings = () => {
  return (
    <div className="space-y-6 max-w-2xl">
      <h1 className="text-2xl font-bold">Settings</h1>
      <Card>
        <CardHeader><CardTitle>Profile Info</CardTitle></CardHeader>
        <CardContent className="space-y-4">
          <Input label="Full Name" defaultValue="Demo User" />
          <Input label="Email" type="email" defaultValue="demo@example.com" />
          <Input label="Phone" defaultValue="+91 9876543210" />
          <Button>Update Profile</Button>
        </CardContent>
      </Card>

      <Card>
        <CardHeader><CardTitle>Preferences</CardTitle></CardHeader>
        <CardContent className="space-y-4">
          <Select label="Language">
            <option value="en">English</option>
            <option value="hi">Hindi (हिन्दी)</option>
          </Select>
        </CardContent>
      </Card>
    </div>
  );
};
export default Settings;
