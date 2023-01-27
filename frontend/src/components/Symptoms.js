import React from 'react'

function Symptoms({formData, setFormData}) {
  return (
    <div className='symptoms-container'>
        <input type="text" placeholder='Allergies' value={formData.allergies} onChange={(event) => setFormData({...formData, allergies:event.target.value})}/>
        <input type="text" placeholder='Conditions' value={formData.conditions} onChange={(event) => setFormData({...formData, conditions:event.target.value})}/>
    </div>
  );
}

export default Symptoms