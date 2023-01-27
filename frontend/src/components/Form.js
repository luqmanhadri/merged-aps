import React, {useState} from 'react'
import Symptoms from './Symptoms';

function Form () {

    const [page, setPage] = useState(0);
    const [formData, setFormData] = useState({
        allergies: "",
        conditions: "",
    })

    const FormTitles = ["Report Daily Symptoms"];

    const PageDisplay = () => {
        if (page == 0){
            return <Symptoms formData={formData} setFormData={setFormData}/>;
        } 
    }

  return (
    <div className='form'>
        <div className='form-container'>
            <div className='header'>
            <h1>{FormTitles[page]}</h1>
            </div>
            <div className='body'>{PageDisplay()}</div>
            <div className='footer'>
                <button
                disabled={page == 0}
                onClick={() => {
                    setPage((currPage) => currPage - 1);
                }}
                >Prev</button>
                <button
                onClick={() => {
                    if (page === FormTitles.length - 1){
                        alert("FORM SUBMITTED");
                        console.log(formData);

                    } else{
                        setPage((currPage) => currPage + 1);
                    }
                    
                }}
                >
                    {page === FormTitles.length - 1 ? "Submit" : "Next"}</button>
            </div>
        </div>
    </div>
  )
}

export default Form;