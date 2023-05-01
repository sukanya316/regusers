import { useEffect } from 'react'
import {useForm} from 'react-hook-form'
import {yupResolver} from '@hookform/resolvers/yup'
import * as Yup from 'yup'
import { Redirect } from 'react-router-dom'

import './index.css'

const schema = Yup.object().shape({
  name: Yup.string().required('name required'),
  dob: Yup.string().required(),
  sex: Yup.string().required(),
  mobile: Yup.string().nullable().matches(/^[6-9]\d{9}$/gi).optional(),
  emergencyContact: Yup.string().matches(/^[6-9]\d{9}$/gi).optional(),
  idType: Yup.string().optional(),
  govtId: Yup.string().when('idType',{
    is:'Aadhar',
    then:Yup.string().required()
  })
  // Yup.string().test(val => {
  //   if (val !== '') {
  //     const id = Yup.ref('idType')
  //     console.log(register('idType'))
  //     return id === 'Aadhar'
  //       ? Yup.string().matches('^[2-9]{1}[0-9]{3}\\s[0-9]{4}\\s[0-9]{4}$')
  //       : Yup.string().matches('[A-Z]{5}[0-9]{4}[A-Z]{1}')
  //           .min(10, 'You need to be older than 10 to register')
  //           .required()
  //   }
  //   return Yup.string()
  //     .min(10, 'You need to be older than 10 to register')
  //     .optional()
  // }),
 
},[['mobile','idType']]
)


const Users=(props)=>{
    const {history}=props
    
  const {
    register,
    handleSubmit,
    formState: {errors},
    reset,
  } = useForm({
    resolver: yupResolver(schema),
  })

  const onSubmitHandler = data => {
    appendData(data)
    reset()
  }

  const getUsers=async()=>{
    const url="http://localhost:8081/users"
    const response=await fetch(url)
    const data= await response.json()
    console.log(data)
    return <Redirect to="/users"/>
    
  }

 const appendData=async(userData)=>{
    // const userData={
    //   id:5,
    //   name:'Vijju',
    //   age:24,
    //   sex:'female'
    // }
    console.log(userData)
   
    const response=await fetch('http://localhost:8081/users',{
      method:"POST",
      headers:{
        'Content-type':'application/json'
      },
      body:JSON.stringify(userData)
    })
    console.log(response)
    const data =await response.json()
    console.log(data)
    return <Redirect to="/users"/>
    // history.replace('/users')
  
   // getUsers()
  }

  const onCancel=()=>{
  reset()
  }

  useEffect(()=>{
    getUsers()
  },[])

 
    return(
      <div className='main-contianer'>
      <div>
      <form onSubmit={handleSubmit(onSubmitHandler)}>
        <h2>Personal Details</h2>
        <div className="items-container">
          <div className="item-container">
            <label htmlFor="name">Name*</label>
            <input
              {...register('name')}
              type="text"
              placeholder="Enter Name"
              id="name"
              required
            />
            <p>{errors.name?.message}</p>
          </div>

          <div className="item-container">
            <label htmlFor="dob-age">Date of Birth or Age*</label>
            <input
              {...register('dob')}
              type="text"
              placeholder="DD/MM/YYYY or age in years"
              id="dob-age"
              required
            />
            <p>{errors.dob?.message}</p>
          </div>

          <div className="item-container">
            <label htmlFor="sex">
              Sex<sup>*</sup>
            </label>
            <select
              {...register('sex')}
              id="sex"
              placeholder="Enter Sex"
              defaultValue=""
              required
            >
              <option value="" disabled hidden>
                --
              </option>
              <option>Male</option>
              <option>Female</option>
            </select>
            <p>{errors.sex?.message}</p>
          </div>

          <div className="item-container">
            <label htmlFor="mobile">Mobile</label>
            <input
              {...register('mobile')}
              type="string"
              placeholder="Enter Mobile"
              id="mobile"
            />
            <p>{errors.mobile?.message}</p>
          </div>

          <div className="item-container">
            <label  htmlFor="govt-id-type">Govt Issued ID</label>
            <select {...register('idType')} id="govt-id-type" defaultValue="">
              <option value="" disabled hidden>
                --
              </option>
              <option>Aadhar</option>
              <option>PAN</option>
            </select>
            <input
              {...register('govtId')}
              type="text"
              placeholder="Enter Govt ID"
              id="govt-id"
            />
            <p>{errors.govtId?.message}</p>
          </div>
        </div>
        <h2>Contact Details</h2>
        <div className="items-container">
          <div className="item-container">
        <label htmlFor="guardian">Guardian Details</label>
        <select
          defaultValue=""
          placeholder="Select guardian"
          {...register('guardian')}
          id="guardian"
        >
          <option value="" disabled hidden>
            --
          </option>
          <option>Father</option>
          <option>Mother</option>
          <option>Sister</option>
          <option>Brother</option>
          <option>Grand Mother</option>
          <option>Grand Father</option>
        </select>
        <input
          {...register('guardianName')}
          placeholder="Enter Guardian Name"
          id="guardian-name"
        />
        </div>
        <div className="item-container">
        <label htmlFor="email">Email</label>
        <input
          {...register('email')}
          type="email"
          placeholder="Enter Email"
          id="email"
        />
        </div>

        <div className="item-container">
        <label htmlFor="emergency-no">Emergency Contact Number</label>
        <input
          {...register('emergencyContact')}
          placeholder="Enter Emergency Mobile No"
          id="emergency-no"
        />
        </div>
        </div>

        <h2>Address Details</h2>
        <div className="items-container">

          <div className="item-container">
        <label htmlFor="address">Address</label>
        <input
          {...register('address')}
          type="text"
          placeholder="Enter Address"
          id="address"
        />
        </div>

        <div className="item-container">
        <label htmlFor="city">City</label>
        <input {...register('city')} type="text" id="city"/>
        </div>

        <div className="item-container">
        <label htmlFor="country">Country</label>
        <input
          {...register('country')}
          type="search"
          id="country"
          placeholder="Enter Country"
        />
        </div>

        <div className="item-container">
        <label htmlFor="pincode">Pincode</label>
        <input
          {...register('pincode')}
          type="number"
          placeholder="Enter PINcode"
          id="pincode"
        />
        </div>
        </div>

        <h2>Other Details</h2>
        <div className="items-container">
          <div className="item-container">
        <label htmlFor="occupation">Occupation</label>
        <input
          {...register('occupation')}
          type="text"
          placeholder="Enter Occupation"
          id="occupation"
        />
        </div>

        <div className="item-container">
        <label htmlFor="religion">Religion</label>
        <input
          {...register('religion')}
          type="text"
          placeholder="Enter Religion"
          id="religion"
        />
        </div>

        <div className="item-container">
        <label htmlFor="marital">Marital Status</label>
        <select {...register('maritalStatus')} defaultValue="" id="marital">
          <option value="" disabled hidden>
            --
          </option>
          <option>Married</option>
          <option>Un Married</option>
        </select>
        </div>

        <div className="item-container">
        <label htmlFor="blood-group">Blood Group</label>
        <select {...register('bloodGroup')} defaultValue="" id="blood-group">
          <option value="" disabled hidden>
            --
          </option>
          <option>A+</option>
          <option>`B-`</option>
          <option>O+</option>
          <option>`O-`</option>
          <option>AB+</option>
          <option>`AB-`</option>
        </select>
        </div>

        <div className="item-container">
        <label htmlFor="nation">Nationality</label>
        <input
          {...register('nationality')}
          type="search"
          placeholder="Enter Nation"
          id="nation"
        />
        </div>
        </div>
        <div className='btns-container'>
          <button type='button' className='cancel-btn' onClick={onCancel}>Cancel</button>
        <button type="submit" className='submit-btn'>Submit</button>
        </div>
      </form>
    </div>
 
    </div>
    )
  
}
export default Users