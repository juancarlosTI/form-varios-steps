//
import React, { forwardRef, useImperativeHandle, useState } from "react";
import { useForm } from "react-hook-form";
import styled, { keyframes } from "styled-components";



// Images
import arcadeIcon from '../../assets/images/icon-arcade.svg'
import advancedIcon from '../../assets/images/icon-advanced.svg'
import proIcon from '../../assets/images/icon-pro.svg'


const FormWithHook = forwardRef(({ onSubmit }, ref) => {
    const { register, handleSubmit, formState: { errors }, trigger } = useForm();

    const handleSubmitForm = (data) => {
        console.log(data);
    }

    useImperativeHandle(ref, () => ({
        validateForm: async () => {
            const isValid = await trigger();
            return isValid;
        }
    }));

    return (
        <form onSubmit={handleSubmit(handleSubmitForm)}>
            <label htmlFor="name" className="name description-field">Name {errors.name && <p>{errors.name.message}</p>}</label>
            <input
                type="text"
                id="name"
                placeholder="Full Name: "
                className="field"
                {
                ...register('name', {
                    required: 'This field is required'
                })
                }
            />

            <label htmlFor="email" className="email description-field">Email Adress{errors.email && <p>{errors.email.message}</p>}</label>
            <input
                type="text"
                id="email"
                placeholder="Example: ''"
                className="field"
                {
                ...register('email', {
                    required: 'This field is required'
                })
                }
            />

            <label htmlFor="phone-number" className="phone-number description-field">Phone Number{errors.phone_number && <p>{errors.phone_number.message}</p>}</label>
            <input
                type="text"
                id="phone-number"
                placeholder="55 11 000xx3412"
                className="field"
                {
                ...register('phone_number', {
                    required: 'This field is required'
                })
                }
            />
        </form>
    )
});

const Form = () => {

    const [formInfo, setFormInfo] = useState({
        stepActive: 1,
        selectedPlan:{name:null,price:null},
        planDuration:false,
        addons:[]
    })

    const handleBackStep = () => {
        if (formInfo.stepActive <= 4) {
            setFormInfo((prevState) => ({ ...prevState, stepActive: formInfo.stepActive - 1 }));
        }
    }

    const handleNextStep = () => {
        if (formInfo.stepActive === 1) {
            //Validar forms
            console.log('Validar forms');
            setFormInfo((prevState) => ({ ...prevState, stepActive: formInfo.stepActive + 1 }));
        } else if (formInfo.stepActive === 4) {
            console.log('Formulário enviado');
        } else {
            setFormInfo((prevState) => ({ ...prevState, stepActive: formInfo.stepActive + 1 }));
        }
    }

    const handlePlan = (selectedPlan) => {
        if (formInfo.selectedPlan.name === selectedPlan.name) {
            setFormInfo((prevState) => ({
                ...prevState,
                selectedPlan: {name:null,price:null}
            }))
        } else {
            setFormInfo((prevState) => ({
                ...prevState,
                selectedPlan: selectedPlan
            }));
        }
    }


    const handleAddons = (addons) => {
        if (formInfo.addons.find(a => a.name === addons.name)) {
            setFormInfo((prevState) => ({
                ...prevState, addons: formInfo.addons.filter(addon => addon.name !== addons.name)
            }))
        }
        else {
            setFormInfo((prevState) => ({
                ...prevState, addons: [addons]
            }))
        }
    }

    const handlePrint = (e) => {
        if (e.target.checked) {
            setFormInfo((prevState) => ({
                ...prevState, planDuration: true
            }))
        }
        else {
            setFormInfo((prevState) => ({
                ...prevState, planDuration: false
            }))
        }
        console.log(formInfo.selectedPlan)
    }

    
    const handleSubmit = () => {
        console.log('Formulário: Submit')
        setFormInfo({ stepActive: 1 })
    }


    return <Container>
        <FormCard className="main-box">
            <SideBar className="sidebar">
                <div className="image-side">
                    <img src="/images/bg-sidebar-desktop.svg" alt="Side bar" />
                    <div className="steps">
                        <div className="step">
                            <p className={`${formInfo.stepActive === 1 ? 'numbers active' : 'numbers'}`}>1</p>
                            <div className="step-content">
                                <p className="step-name">Step 1</p>
                                <p className="description-step">Your info</p>
                            </div>
                        </div>
                        <br />
                        <div className="step">
                            <p className={`${formInfo.stepActive === 2 ? 'numbers active' : 'numbers'}`}>2</p>
                            <div className="step-content">
                                <p className="step-name">Step 2</p><p className="description-step">Select Plan</p>
                            </div>
                        </div>
                        <br />
                        <div className="step">
                            <p className={`${formInfo.stepActive === 3 ? 'numbers active' : 'numbers'}`}>3</p>
                            <div className="step-content">
                                <p className="step-name">Step 3</p><p className="description-step">Add-ons</p>
                            </div>
                        </div>
                        <br />
                        <div className="step">
                            <p className={`${formInfo.stepActive === 4 ? 'numbers active' : 'numbers'}`}>4</p>
                            <div className="step-content">
                                <p className="step-name">Step 4</p><p className="description-step">Summary</p>
                            </div>
                        </div>
                        <br />
                    </div>
                </div>
            </SideBar>
            <FormBar className="form">
                <div key='1' className={`your-info ${formInfo.stepActive === 1 ? 'form-step enabled' : 'form-step disabled'}`}>

                    <h1 className="title-description">Personal info</h1>
                    <h3 className="subtitle-description">Please, provide your name, email adress and phone number.</h3>

                    <FormWithHook/>

                </div>
                <div key='2' className={`select-plan ${formInfo.stepActive === 2 ? 'form-step enabled' : 'form-step disabled'}`}>
                    <h1 className="title-description">Select Plan</h1>
                    <h3 className="subtitle-description">You have the option of monthly or yearly billing.</h3>
                    <div className="select-plan-description">
                        <div className={`plan-option ${formInfo.selectedPlan.name === 'Arcade' ? 'checked' : ''}`} onClick={() => {
                            if (formInfo.planDuration === false) {
                                return handlePlan({ name: 'Arcade', price: 9 })
                            }
                            else {
                                return handlePlan({ name: 'Arcade', price: 90 })
                            }
                        }}>
                            <img src={arcadeIcon} alt="Arcade" />
                            <p className="plan-name">Arcade</p>
                            <p className="price-description-plan">{formInfo.planDuration ? '90$/Year' : '9$/Mon'}</p>
                        </div>
                        <div className={`plan-option ${formInfo.selectedPlan.name === 'Advanced' ? 'checked' : ''}`} onClick={() => {
                            if (formInfo.planDuration === false) {
                                return handlePlan({ name: 'Advanced', price: 12 })
                            }
                            else {
                                return handlePlan({ name: 'Advanced', price: 120 })
                            }
                        }}>
                            <img src={advancedIcon} alt="Advanced" />
                            <p className="plan-name">Advanced</p>
                            <p className="price-description-plan">{formInfo.planDuration ? '120$/Year' : '12$/Mon'}</p>
                        </div>
                        <div className={`plan-option ${formInfo.selectedPlan.name === 'Pro' ? 'checked' : ''}`} onClick={() => {
                            if (formInfo.planDuration === false) {
                                return handlePlan({ name: 'Pro', price: 15 })
                            }
                            else {
                                return handlePlan({ name: 'Pro', price: 150 })
                            }
                        }}>
                            <img src={proIcon} alt="Pro" />
                            <p className="plan-name">Pro</p>
                            <p className="price-description-plan">{formInfo.planDuration ? '150$/Year' : '15$/Mon'}</p>
                        </div>
                        <div className="plan-duration">
                            <span className="switch-label-month">Monthly</span>
                            <label className="switch-toggle">
                                <input type="checkbox" id="toggle" onClick={(e) => handlePrint(e)} />
                                <span className="slider"></span>
                            </label>
                            <span className="switch-label-year">Yearly</span>
                        </div>
                    </div>
                </div>
                <div key='3' className={`add-ons ${formInfo.stepActive === 3 ? 'form-step enabled' : 'form-step disabled'}`}>
                    <h1 className="title-description">Pick add-ons</h1>
                    <h3 className="subtitle-description">Add-ons help enhance your gaming experience.</h3>
                    <div className="addons-description">
                        <label htmlFor="addon 1">
                            <div className={`add-on-option ${formInfo.addons.length > 0 ? formInfo.addons.map((addon) => {
                                if (addon.name === 'Online service') {
                                    return 'checked'
                                }
                                else {
                                    return null
                                }
                            }) : ''}`}>
                                <input type="checkbox" id="addon 1" onClick={() => {
                                    if (formInfo.planDuration) {
                                        return handleAddons({ name: 'Online service', price: 10 })
                                    } else {
                                        return handleAddons({ name: 'Online service', price: 1 })
                                    }
                                }} />
                                <div className="add-on-info">
                                    <p className="addon-service">Online service</p>
                                    <p className="addon-service-description">Access to multiplayer games</p>
                                </div>
                                <p className="price-description-addon">{formInfo.planDuration ? '10$/yr' : '1$/mo'}</p>
                            </div>
                        </label>
                        <label htmlFor="addon 2">
                            <div className={`add-on-option ${formInfo.addons.length > 0 ? formInfo.addons.map((addon) => {
                                if (addon.name === 'Larger storage') {
                                    return 'checked'
                                }
                                else {
                                    return null
                                }
                            }) : ''}`}>
                                <input type="checkbox" id="addon 2" onClick={() => {
                                    if (formInfo.planDuration) {
                                        return handleAddons({ name: 'Larger Storage', price: 20 })
                                    } else {
                                        return handleAddons({ name: 'Larger Storage', price: 2 })
                                    }
                                }} />
                                <div className="add-on-info">
                                    <p className="addon-service">Larger storage</p>
                                    <p className="addon-service-description">Extra 1TB of cloud save</p>
                                </div>
                                <p className="price-description-addon">{formInfo.planDuration ? '20$/yr' : '2$/mo'}</p>
                            </div>
                        </label>
                        <label htmlFor="addon 3">
                            <div className={`add-on-option ${formInfo.addons.length > 0 ? formInfo.addons.map((addon) => {
                                if (addon.name === 'Customizable profile') {
                                    return 'checked'
                                }
                                else {
                                    return null
                                }
                            }) : ''}`}>
                                <input type="checkbox" id="addon 3" onClick={() => {
                                    if (formInfo.planDuration) {
                                        return handleAddons({ name: 'Customizable profile', price: 20 })
                                    } else {
                                        return handleAddons({ name: 'customizable-profile', price: 2 })
                                    }
                                }} />
                                <div className="add-on-info">
                                    <p className="addon-service">Customizable Profile</p>
                                    <p className="addon-service-description">Custom theme in your profile</p>
                                </div>
                                <p className="price-description-addon">{formInfo.planDuration ? '20$/yr' : '2$/mo'}</p>
                            </div>
                        </label>
                    </div>
                </div>
                <div key='4' className={`summary ${formInfo.stepActive === 4 ? 'form-step enabled' : 'form-step disabled'}`}>
                    <h1 className="title-description">Finishing up</h1>
                    <h3 className="subtitle-description">Double check everything looks OK before confirming.</h3>
                    <div className="summary-description">
                        <div className="main-plan">
                            <div className="change-plan">
                                <p className="plan-name">{formInfo.selectedPlan.name}</p>
                                <p className="btn-change-plan" onClick={() => {
                                    setFormInfo((prevState) => ({ ...prevState, stepActive: 2 }))
                                }}>Change</p>
                            </div>
                            <p className="price-plan">{formInfo.selectedPlan.price}$</p>
                        </div>
                        <div className="other-services">
                            {formInfo.addons.length > 0 ? formInfo.addons.map((addon, index) => (<div className="service"><p key={index}>{addon.name}</p><p>+${addon.price}/yr</p></div>)) : 'Nenhum addon'}
                        </div>
                    </div>
                    <div className="total-billing">
                        <p>Total {formInfo.planDuration ? '(Per Year)' : '(Per Month)'} = ${formInfo.addons.length > 0 ? formInfo.addons.reduce((acc, addon) => acc + addon.price, 0) + formInfo.selectedPlan.price : formInfo.selectedPlan.price}</p>
                    </div>
                </div>
            </FormBar>
            <div className="form-navigation">
                <button className={`btn-nav ${formInfo.stepActive === 1 ? 'btn-backstep disabled' : 'btn-backstep'}`} onClick={(e) => {
                    e.preventDefault();
                    handleBackStep();
                }}>Go Back</button>

                <button className="btn-nav btn-nextstep" onClick={(e) => {
                    e.preventDefault();
                    handleNextStep();
                }}>{formInfo.stepActive === 4 ? 'Confirm' : 'Next step'}</button>
            </div>
        </FormCard>
    </Container >
}

const Container = styled.section`
    display:flex;
    width:100vw;
    height:100vh;
    justify-content:center;
    align-items:center;
    background-color:lightgrey;
    font-family:'Ubuntu';

`
const FormCard = styled.div`
    display:grid;
    grid-template-columns: 40% 1fr;
    grid-template-areas: "side-bar form"
                         "side-bar navigation";
    //justify-content:center;
    //flex-direction:column;
    //align-items:center;
    width:800px;
    height:600px;
    background-color:white;
    border-radius: 20px;
    font-size:12px;

    
    font-family:'Ubuntu Regular';


    .form {
        grid-area:form;
        display:flex;
        flex-direction:column;
        padding:20px;
        width:350px;
        margin-left:40px;
        margin-top:50px;
    }

    .form-step.enabled{
        display:block;
    }

    .form-step.disabled{
        display:none;
    }

    .form-navigation {
        grid-area:navigation;
        display:flex;
        justify-content:flex-end;
        align-items:flex-end;
        width:100%;
        transform:translate(-70px,-50px);
        //justify-self:flex-end;
    }

    .btn-nav {
        border-radius:7px;
        border:0;
        font-size:14px;
        font-weight:bold;
        width:100px;
        height:40px;
    }

    .btn-nextstep {
        width:100px;
        height:40px;
        background-color:#1d2e54;
        color:white;
        margin-left:150px;
    }

    .btn-nextstep:hover {
        background-color:#41527C;
        border-radius7px;
    }

    .btn-backstep {
        background-color:white;
        color:lightgrey;
    }

    .btn-backstep:hover {
        color:#1d2e54;
    }

    .btn-backstep.disabled {
        display:none;
    }

    
`
const FormBar = styled.div`

    label.description-field {
        display:flex;
        align-items:center;
        justify-content:space-between;
        padding: 3px 0;
    }

    label.description-field p{
        font-weight:bold;
        display:none;
        margin:0;
    }

    .field:hover {
        cursor:pointer;
    }

    .title-description {
        font-size:28px;
        margin:0;
    }

    .subtitle-description {
        color:lightgrey;
        font-size:18px;
        font-weight:normal;
        margin-bottom:50px;
    }

    .field {
        border-radius:10px;
        border-color:lightgrey;
        border-width:1px;
        border-style:solid;
        height:32px;
        padding:10px;
        font-size:16px;
        width:100%;
    }

    .field:focus {
        outline:none;
        border-color:blue;
    }

    .field::placeholder {
        color: lightgrey; /* Muda a cor do placeholder */
        font-size: 16px; /* Ajuste opcional para o tamanho da fonte */
    }

    label.description-field p.active {
        display:block;
        color:red;
    }

    .select-plan.enabled{
        display:block;
    }

    .select-plan-description {
        display:flex;
        flex-wrap:wrap;
        justify-content:center;
    }

    .plan-option {
        width:150px;
        height:150px;
        flex:1;
        background-color:white;
        color:black;
        margin:10px;
        border:1px solid #F0F0F0;
        border-radius:10px;
        padding:10px;
        transition:border 0.2s ease-in-out;
    }

    .plan-option.checked {
        border:1px solid blue;
    }

    .plan-option:hover {
        cursor:pointer;
        border: 1px solid blue;
        
    }

    .plan-duration {
        flex-basis:100%;
        display:flex;
        justify-content:center;
        align-items:center;
        height:50px; 
        background-color:#F0F0F0;
        margin-top:20px;
    }

    .switch-label-month, .switch-label-year {
        font-size:16px;
        color:black;
    }

    .switch-toggle {
        margin: 0 20px;
        width:51px;
        height:25px;
        //align-self:center;
        position:relative;
        display:flex;
    }

    .switch-toggle input {
        display:none;
    }

    .slider {
        position:absolute;
        cursor:pointer;
        top:0;
        right:0;
        left:0;
        bottom:0;
        background-color: #1d2e54;
        transition: 0.4s;
        border-radius: 26px;
    }

    .slider:before {
        position:absolute;
        content:"";
        width:20px;
        height:20px;
        left:3px;
        bottom:3px;
        background-color:white;
        transition:0.4s;
        border-radius:50%;
    }

    .switch-toggle input:checked + .slider:before {
        transform: translateX(24px);
    }

    .switch-toggle input:checked ~ .switch-label-year {
        color:#1d2e54;
        font-weight:bold;
    }

    .switch-toggle input:not(:checked) ~ .switch-label-month {
        color:#1d2e54;
        font-weight:bold;
    }

    .add-on-description {
        width:100%;
    }

    .add-on-option {
        width:100%;
        height:60px;
        display:grid;
        grid-template-columns: 5% 75% 20%;
        grid-template-areas: "checked info addon-price";
        align-items:center;
        padding:10px;
        font-size:18px;
        border: 1px solid lightgrey;
        border-radius:10px;
        margin-top:15px;
        cursor:pointer;
        transition:border 0.2s ease-in-out;
    }

    .add-on-option input {
        grid-area: checked;
        cursor:pointer;
    }

    .add-on-option.checked {
        border: 1px solid blue;
    }

    .add-on-option:hover {
        border: 1px solid blue;
    }

    .addon-service {
        font-weight:bold;
    }

    .addon-service-description {
        color:lightgrey;
    }

    .addon-on-info {
        grid-area: info;
    }

    .add-on-info p {
        margin-left:15px;
    }

    .price-description-addon {
        grid-area: addon-price;
        width:fit-content;
    }

    .summary-description {
        background-color:#F0F0F0;
        padding:20px;
        
    }

    .summary-description, .total-billing {
        font-size:18px;
    }

    .main-plan {
        display:grid;
        grid-template-columns: 90% 10%;
        grid-template-areas: "plan price";
        align-items:center;
    }

    .change-plan {
        display:flex;
        flex-direction:column;
        justify-content:center;
        grid-area:plan;
    }

    .change-plan a{
        width:fit-content;
    }

    .change-plan {
       //margin-bottom:20px;
    }

    .btn-change-plan {
        cursor:pointer;    
        width:fit-content;
        text-decoration-line:underline;
        text-decoration-color: blue;
    }

    .price-plan {
        grid-area:price;
        justify-self:end;
    }

    .other-services {
        display:flex;
        flex-direction:column;
        margin-top:20px;
        border-top: 1px solid black;
    }

    .other-services .service {
        display:flex;
        justify-content:space-between;
        margin: 10px 0;
    }

    .total-billing {
        padding:20px;
    }

    

    
`
const SideBar = styled.div`
    display:flex;
    grid-area:side-bar;
    justify-content:center;

    .image-side {
        position:relative;
        display:flex;

    }

    .image-side img {
        width:100%;
        height:90%;
        align-self:center;
    }

    .image-side .steps {
        position:absolute;
        display:flex;
        flex-direction:column;
        color:white;
        //left:50%;
        transform:translate(0,25%);
    }

    .step {
        display:flex;
        align-items:center;
    }

    .step-name {
        margin:0;
        font-size:18px;
    }

    .description-step {
        font-size:24px;
        font-weight:bold;
    }
    .numbers {
        font-size:22px;
        align-self:center;
        padding:2px 10px;
        border: 1px solid white;
        border-radius:50%;
        margin:0 20px;
    }

    .numbers.active {
        background-color:lightgrey;
        color:blue;
    }


    // .sidebar p {
    //     position:absolute;
    // }

    .sidebar img {
        margin-left:15px;
        
    }

    

`
const PontoPisca = keyframes`
  0% {opacity : 0;}
  50% {opacity : 1;}
  100% {opacity : 0;}
`
const P = styled.p`
    font-size: 32px;
    animation: ${PontoPisca} 1.5s infinite;
`
const LoadingAnimation = styled.div`
    display:flex;
`
export default (Form)