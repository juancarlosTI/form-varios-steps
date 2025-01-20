//
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import styled from "styled-components";



// Images
import sideBar from '../../assets/images/bg-sidebar-desktop.svg'
import arcadeIcon from '../../assets/images/icon-arcade.svg'
import advancedIcon from '../../assets/images/icon-advanced.svg'
import proIcon from '../../assets/images/icon-pro.svg'


const Form = () => {

    const { register, handleSubmit, formState: { errors }, getValues } = useForm();

    const [formInfo, setFormInfo] = useState({
        stepActive: 1,
        selectedPlan: { name: null, price: null },
        planDuration: false,
        addons: []
    })

    const handleBackStep = () => {
        if (formInfo.stepActive <= 4) {
            setFormInfo((prevState) => ({ ...prevState, stepActive: formInfo.stepActive - 1 }));
        }
    }

    const handleNextStep = () => {
        if (formInfo.stepActive === 1) {
            //Validar forms
            handleSubmit(handleSubmitForm())

        } else if (formInfo.stepActive === 4) {

            console.log('Formulário enviado');
            console.log(formInfo);
            console.log(getValues());
        } else {
            setFormInfo((prevState) => ({ ...prevState, stepActive: formInfo.stepActive + 1 }));
        }
    }

    const handlePlan = (selectedPlan) => {
        if (formInfo.selectedPlan.name === selectedPlan.name) {
            setFormInfo((prevState) => ({
                ...prevState,
                selectedPlan: { name: null, price: null }
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
                ...prevState, addons: [...prevState.addons, addons]
            }))
        }
    }

    const handlePlanDuration = (e) => {
        // Verificar quais addons existem no state e salvar o nome;
        // Quando a duração do plano mudar, os addons tambem mudam; Como a precificação do add-on tambem muda, atualizar os addons com a nova informação;

        const priceMap = e.target.checked ? { Arcade: 90, Advanced: 120, Pro: 150 } : { Arcade: 9, Advanced: 12, Pro: 15 };
        const newPlan = { name: formInfo.selectedPlan.name, price: priceMap[formInfo.selectedPlan.name] };
        const addonMap = e.target.checked ? { 'Online service': 10, 'Larger Storage': 20, 'Customizable profile': 20 } : { 'Online service': 1, 'Larger Storage': 2, 'Customizable profile': 2 };

        if (e.target.checked) {
            setFormInfo((prevState) => ({
                ...prevState,
                addons: prevState.addons.map(addon => ({
                    ...addon,
                    price: addonMap[addon.name]
                })),
                selectedPlan: newPlan,
                planDuration: true
            }))
        }
        else {
            setFormInfo((prevState) => ({
                ...prevState,
                addons: prevState.addons.map(addon => ({
                    ...addon,
                    price: addonMap[addon.name]
                })),
                selectedPlan: newPlan,
                planDuration: false
            }))
        }

    }

    const handleSubmitForm = () => {
        // Opcional: estruturar um objeto contendo a informação do react-hook-form com o state.
        console.log('Formulário registrado no react-hook-form');

        setFormInfo((prevState) => ({ ...prevState, stepActive: formInfo.stepActive + 1 }));
    }


    return <Container>
        <FormCard className="main-box">
            <SideBar className="sidebar">
                <img src={sideBar} alt="Side bar" />
                <div className="steps">
                    <div className="step">
                        <p className={`${formInfo.stepActive === 1 ? 'numbers active' : 'numbers'}`}>1</p>
                        <div className="step-content">
                            <p className="step-name">STEP 1</p>
                            <p className="description-step">YOUR INFO</p>
                        </div>
                    </div>
                    <br />
                    <div className="step">
                        <p className={`${formInfo.stepActive === 2 ? 'numbers active' : 'numbers'}`}>2</p>
                        <div className="step-content">
                            <p className="step-name">STEP 2</p><p className="description-step">SELECT PLAN</p>
                        </div>
                    </div>
                    <br />
                    <div className="step">
                        <p className={`${formInfo.stepActive === 3 ? 'numbers active' : 'numbers'}`}>3</p>
                        <div className="step-content">
                            <p className="step-name">STEP 3</p><p className="description-step">ADD-ONS</p>
                        </div>
                    </div>
                    <br />
                    <div className="step">
                        <p className={`${formInfo.stepActive === 4 ? 'numbers active' : 'numbers'}`}>4</p>
                        <div className="step-content">
                            <p className="step-name">STEP 4</p><p className="description-step">SUMMARY</p>
                        </div>
                    </div>

                </div>
                <div className="image-side">


                </div>
            </SideBar>
            <FormBar className="form">
                <div key='1' className={`your-info ${formInfo.stepActive === 1 ? 'form-step enabled' : 'form-step disabled'}`}>

                    <h1 className="title-description">Personal info</h1>
                    <h3 className="subtitle-description">Please, provide your name, email adress and phone number.</h3>

                    <form onSubmit={handleSubmit(handleSubmitForm)}>
                        <label htmlFor="name" className="name description-field">Name {errors.name && <p>{errors.name.message}</p>}</label>
                        <input
                            type="text"
                            id="name"
                            placeholder="Full Name: "
                            className={`field ${errors.name ? 'error-input' : ''}`}
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
                            className={`field ${errors.email ? 'error-input' : ''}`}
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
                            className={`field ${errors.phone_number ? 'error-input' : ''}`}
                            {
                            ...register('phone_number', {
                                required: 'This field is required'
                            })
                            }
                        />
                    </form>

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
                            <img className="plan-image" src={arcadeIcon} alt="Arcade" />
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
                            <img className="plan-image" src={advancedIcon} alt="Advanced" />
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
                            <img className="plan-image" src={proIcon} alt="Pro" />
                            <p className="plan-name">Pro</p>
                            <p className="price-description-plan">{formInfo.planDuration ? '150$/Year' : '15$/Mon'}</p>
                        </div>
                        <div className="plan-duration">
                            <span className={`switch-label-month ${formInfo.planDuration ? 'not-selected' : ''}`}>Monthly</span>
                            <label className="switch-toggle">
                                <input type="checkbox" id="toggle" onClick={(e) => handlePlanDuration(e)} />
                                <span className="slider"></span>
                            </label>
                            <span className={`switch-label-year ${formInfo.planDuration ? '' : 'not-selected'}`}>Yearly</span>
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
                                        return handleAddons({ name: 'Customizable profile', price: 2 })
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
                                <p className="plan-final">{formInfo.selectedPlan.name} {formInfo.planDuration ? '(Yearly)' : '(Monthly)'}</p>
                                <p className="btn-change-plan" onClick={() => {
                                    setFormInfo((prevState) => ({ ...prevState, stepActive: 2 }))
                                }}>Change</p>
                            </div>
                            <p className="price-plan">{formInfo.selectedPlan.price}${formInfo.planDuration ? '/yr' : '/mo'}</p>
                        </div>
                        <div className="other-services">
                            {formInfo.addons.length > 0 ? formInfo.addons.map((addon, index) => (
                                <div className="service" key={index}>
                                    <p className="plus-service-name">{addon.name}</p>
                                    <p className="plus-service-price">+${addon.price}{formInfo.planDuration ? '/yr' : '/mo'}</p>
                                </div>)) : 'Nenhum add-on'}
                        </div>
                    </div>
                    <div className="total-billing">
                        <p className="total-billing-type">Total {formInfo.planDuration ? '(Per Year)' : '(Per Month)'}</p>
                        <p className="total-price-billing">${formInfo.addons.length > 0 ? formInfo.addons.reduce((acc, addon) => acc + addon.price, 0) + formInfo.selectedPlan.price : formInfo.selectedPlan.price}{formInfo.planDuration ? '/yr' : '/mo'}</p>
                    </div>
                </div>
            </FormBar>
            <div className="form-navigation">
                <button className={`btn-nav ${formInfo.stepActive === 1 ? 'btn-backstep disabled' : 'btn-backstep'}`} onClick={(e) => {
                    e.preventDefault();
                    handleBackStep();
                }}>Go Back</button>

                <button className={`btn-nav btn-nextstep ${formInfo.stepActive === 4 ? 'color-change' : ''}`} onClick={(e) => {
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
`
const FormCard = styled.div`
    display:grid;
    grid-template-columns: 40% 60%;
    grid-template-areas: "side-bar form"
                         "side-bar navigation";
    //justify-content:center;
    //flex-direction:column;
    //align-items:center;
    max-width:800px;
    width:100%;
    height:600px;
    background-color:white;
    border-radius: 20px;
    font-size:12px;


    .form {
        grid-area:form;
        display:flex;
        flex-direction:column;
        box-sizing:border-box;
        padding:20px;
        max-width:450px;
        width:100%;
        align-items:center;
        position:relative;
        top:10%;
    }

    .your-info, .select-plan, .add-ons, .summary {
        max-width:400px;
        width:100%;
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
        justify-content:space-between;
        max-width:450px;
        width:100%;
        padding:20px;
        box-sizing:border-box;
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
        align-self:flex-end;
    }

    .btn-backstep {
    
    }

    .color-change {
        background-color:blue;
    }

    .btn-nextstep.color-change:hover {
        background-color:#3333FF;
    }

    .btn-nextstep:hover {
        background-color:#41527C;
        border-radius7px;
    }

    .btn-backstep {
        align-self:self-end;
        background-color:white;
        color:lightgrey;
    }

    .btn-backstep:hover {
        color:#1E147A;
    }

    .btn-backstep.disabled {
        opacity:0;
        pointer-events:none;
    }
`
const FormBar = styled.div`
    font-family:'Ubuntu';
    color:#1E147A;
    

    label.description-field {
        display:flex;
        align-items:center;
        justify-content:space-between;
        padding: 3px 0;
        margin-top:15px;
    }

    label.description-field p{
        font-weight:bold;
        color:red;
        margin:0;
    }

    .title-description {
        font-size:28px;
        margin:0;
        font-family:'Ubuntu Bold';
    }

    .subtitle-description {
        color:#B6B6B6;
        font-size:14px;
        font-weight:normal;
        margin:20px 0;
    }

    .field {
        border-radius:10px;
        color:black;
        border-width:1px;
        border-style:solid;
        height:32px;
        padding:5px 0;
        font-size:16px;
        max-width:100%;
        width:100%;
        text-indent:10px;
        border-color:#B6B6B6;
    }

    .field:focus {
        outline:none;
        border-color:blue;
    }

    .field::placeholder {
        color:#B6B6B6;
        font-size: 16px; 
    }

    .field:hover {
        cursor:pointer;
    }

    .field.error-input {
        border-color:red;
    }

    label.description-field p.active {
        display:block;
        color:red;
    }

    .select-plan.enabled{
        display:block;
        box-sizing:border-box;
        max-width:400px;
        width:100%;
        flex-shrink:1;
    }

    .select-plan-description {
        display:flex;
        flex-wrap:wrap;
        //justify-content:center;
        gap:20px;
        align-items:center;
    }

    .plan-option {
        max-width:150px;
        min-width:70px;
        width:100%;
        max-height:180px;
        height:100%;
        flex: 1 1 0;
        background-color:white;
        color:black;
        border:1px solid #F0F0F0;
        border-radius:10px;
        padding:10px;
        transition:border 0.2s ease-in-out;
        display:grid;
        grid-template-rows: 80px 30px 30px;
        box-sizing:border-box;
    }

    .plan-option.checked {
        border:1px solid blue;
    }

    .plan-option:hover {
        cursor:pointer;
        border: 1px solid blue;
    }

    .plan-image {
        width:40px;
        height:40px;
        // margin-bottom:50px;
    }

    .plan-name {
        font-size:16px;
        color:#1E147A;
        align-self:flex-end;
        grid-area: plan-name;
    }

    .price-description-plan {
        font-size:14px;
        color:#B6B6B6;
        grid-area: price;
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

    .switch-label-month.not-selected, .switch-label-year.not-selected {
        color:lightgrey;
    }


    .add-on-description {
        width:100%;
    }

    .add-on-option {
        width:100%;
        //height:60px;
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
        box-sizing:border-box;
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
        color:#B6B6B6;
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
        word-break: break-all;
    }

    .summary {
    }

    .summary-description {
        background-color:#F0F0F0;
        padding:20px;
        border-radius:10px;
    }

    .summary-description, .total-billing {
        font-size:18px;
    }

    .main-plan {
        display:grid;
        grid-template-columns: 90% 10%;
        grid-template-areas: "plan price";
        align-items:center;
        // padding:20px;
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

    .btn-change-plan {
        cursor:pointer;    
        width:fit-content;
        text-decoration-line:underline;
        text-decoration-color: blue;
        font-family:'Ubuntu Regular';
        color:blue;
    }

    .plan-final {
        color:#1E147A;
    }

    .price-plan {
        grid-area:price;
        justify-self:end;
        font-family:'Ubuntu Bold';
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
        // margin: 10px 0;
        padding: 10px 0;
    }

    .plus-service-name {
        color:#B6B6B6;
    }

    .plus-service-price {
        font-family:'Ubuntu';
    }

    .total-billing {
        padding:20px;
        display:flex;
        justify-content:space-between;
    }

    .total-billing .total-billing-type {
        color:#B6B6B6;
    }

    .total-price-billing {
        color:blue;
        font-size:22px;
        font-family:'Ubuntu Bold';
    }

    @media(max-width:768px){

        .select-plan-description{
            flex-direction:column;
            //align-items:center;
            
        }
    }

    @media(max-width:768px){
        .plan-option {
            max-width:300px;
            max-height:60px;
            display:flex;
            flex-direction: column;
            // // grid-template-columns: repeat(2,50%);
            // grid-template-areas: "image plan-name"
            //                       "image price";
        }

        .price-description-plan {
            align-self:flex-end;
        }
    }

    @media(max-width:375px){
        .plan-option {
            max-width:120px;
        }

        .plan-name {
            align-self:flex-start;
        }

        .price-description-plan {
            align-self:flex-start;
        }
    }

`
const SideBar = styled.div`
    display:flex;
    grid-area:side-bar;
    justify-content:center;
    font-family:'Ubuntu Regular';
    max-width:100%;
    position:relative;

    img {
        //align-self:center;
        max-width:240px;
        width:100%;
        height:540px;
        //position:relative;
        object-fit:cover;
        border-radius:10px;
    }

    .steps {
        position:absolute;
        display:flex;
        flex-direction:column;
        color:white;
        overflow-wrap:break-word;
        word-break:break-all;
        width:75%;
        top:20%;
        // left:15%;
        gap:10px;
    }

    img, .steps {
        align-self:center;
    }

    .step {
        display:flex;
        align-items:center;
        gap:25px;
    }

    .step-name {
        margin:0;
        font-size:12px;
        color:lightgrey;
    }

    .description-step {
        font-size:14px;
        font-family:'Ubuntu Regular';
        font-weight:bold;
        letter-spacing:2px;
    }

    .numbers {
        font-size:16px;
        align-self:center;
        padding:5px 10px;
        border: 1px solid white;
        border-radius:50%;
        margin:0 0 0 20px;
        font-family:'Ubuntu Bold';
    }

    .numbers.active {
        background-color:lightblue;
        color:black;
    }

    // .sidebar img {
    //     margin-left:15px;
    // }
`

export default (Form)