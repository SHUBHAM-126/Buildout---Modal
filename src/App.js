import { useState, useRef } from 'react'

function App() {

  const [showModal, setShowModal] = useState(false)

  return (
    <div className='main-wrapper'>

      <h1>User Details Modal</h1>

      <button onClick={() => setShowModal(prev => !prev)}>Open Form</button>

      {showModal && <Modal showModal={showModal} handleModal={() => setShowModal(prev => !prev)} />}

    </div>
  );
}


// MODAL COMPONENT
function Modal({ showModal, handleModal }) {

  const [formData, setFormData] = useState({
    username: '',
    email: '',
    phone: '',
    dob: ''
  })

  const handleChange = (e) => {

    const { name, value } = e.target

    setFormData({ ...formData, [name]: value })

  }

  const handleSubmit = (e) => {

    e.preventDefault()

    if(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(formData.email) != true){
      window.alert('Invalid email. Please check your email address.')
      return 
    }

    if (formData.phone.length != 10) {
      window.alert('Invalid phone number. Please enter a 10-digit phone number.')
      return
    }

    const current_time = new Date().getTime()
    const selectedDate = new Date(formData.dob).getTime()

    console.log(selectedDate)

    if (current_time < selectedDate || !selectedDate) {
      window.alert("Invalid date of birth. Date of birth cannot be in the future.")
      return
    }

    setFormData({
      username: '',
      email: '',
      phone: '',
      dob: ''
    })

    handleModal()


  }


  return (

    <div className='modal'
      onClick={(e) => { 

        if(e.target.classList.contains('modal')){
          handleModal()
        }

       }}
    >

      <div className="modal-content">

        <h2>Fill Details</h2>

        <form onSubmit={handleSubmit}>

          <label htmlFor="username">Username:</label>
          <input id="username" name="username" type="text" value={formData.username} onChange={handleChange}  />

          <label htmlFor="email">Email Address:</label>
          <input id="email" name="email" type="text" value={formData.email} onChange={handleChange}  />

          <label htmlFor="phone">Phone Number:</label>
          <input id="phone" name="phone" type="number" value={formData.phone} onChange={handleChange}  />

          <label htmlFor="dob">Date of Birth:</label>
          <input id="dob" name="dob" type="date" value={formData.dob} onChange={handleChange}  />

          <button type='submit' className='submit-button'>Submit</button>

        </form>

      </div>

    </div>
  )
}

export default App;
