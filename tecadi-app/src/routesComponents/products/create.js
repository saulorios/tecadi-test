import { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../contexts/authContext"
import request from "../../stack/request";
import TextInput from "../../components/TextInput";
import DropDown from "../../components/DropDown";
import Swal from "sweetalert2";

function Create() {
    const navigate = useNavigate();
    const authContext = useContext(AuthContext);
    const [state, setState] = useState({
        codigoCliente: "",
        descricao: "",
        pesoBruto: "",
        pesoLiquido: "",
        grupo: [],
        um: []
    })
    const [error, setError] = useState(null);
    // console.log(state)
    const [choice, setChoice] = useState({grupo: [], um: []})
    
    useEffect(() => {
        async function getGroupAndUm() {
            try {
                const respGroup = await request.group(authContext.loggedInUser.access_token)
                const respUm = await request.um(authContext.loggedInUser.access_token)
                // console.log("GROUP", respGroup)
                if(respGroup.message || respUm.message) {
                    navigate("/")
                    throw new Error('Token has expired!')
                } else {
                    setChoice({
                        grupo: Object.values(respGroup.list),
                        um: Object.values(respUm.list)
                    })                    
                }
                // setProducts(Object.values(response.list))
            } catch(err) {
                console.error(err.message);
            } 
        }

        getGroupAndUm();
    }, [])

    function handleChange(event) {        
        setState({
            ...state,
            [event.currentTarget.name]: event.currentTarget.value,
        })
    }
    function dropDownChange(name, value) {
       setState({
            ...state,
            [name]: value,
        })
    }
    async function sender(event) {
        event.preventDefault();
        try {
            const data = {
                codigoCliente: state.codigoCliente.toUpperCase(),
                descricao: state.descricao.toUpperCase(),
                pesoBruto: parseInt(state.pesoBruto),
                pesoLiquido: parseInt(state.pesoLiquido),
                grupo: state.grupo,
                um: state.um
            }
            const resp = await request.register(authContext.loggedInUser.access_token, data)
            
            if(resp == 'Created') {
                Swal.fire({
                    icon: 'success',
                    title: 'Sucesso!',
                    text: 'Produto cadastrado!',
                  })
                  navigate("/")
            }
            
            setError(null);
            // console.log(response)
        } catch (error) {
            console.error(error.message)
            setError(error.message);
        }
       
    }
      

    return (
        <div className="container mt-5">

        <h1>Tecadi</h1>
        <hr />

        <div className="py-4">
            <h3>Cadastrar Produto</h3>

        </div>
        <form onSubmit={sender}>
            <div className="form-group">
                <TextInput 
                    label="Codigo Cliente"
                    type="text"
                    name="codigoCliente"
                    id="formCodClient"
                    value={state.codigoCliente}
                    onChange={handleChange}
                />
            </div>
            <div className="form-group">
                 <TextInput 
                    label="Descrição"
                    type="text"
                    name="descricao"
                    id="formDescricao"
                    value={state.descricao}
                    onChange={handleChange}
                />
            </div>
            <div className="menu-btn">
                <div className="form-group">
                    <label>Grupo</label>
                    <DropDown
                        label={Array.isArray(state.grupo)? "Selecionar": state.grupo} 
                        options={choice.grupo}
                        onChange={dropDownChange}
                        name="grupo"                 
                    />                
                </div>
                <div className="space"></div>
                <div className="form-group">
                    <label>Unidade de Medida</label>
                    <DropDown
                        label={Array.isArray(state.um)? "Selecionar": state.um} 
                        options={choice.um}
                        onChange={dropDownChange}
                        name="um"                 
                    />                
                </div>
            </div>
            <br/>
            <div className="form-group">
                 <TextInput 
                    label="Peso Bruto"
                    type="number"
                    name="pesoBruto"
                    id="formPesoBruto"
                    value={state.pesoBruto}
                    onChange={handleChange}
                />
            </div>
            <div className="form-group">
                 <TextInput 
                    label="Peso Líquido"
                    type="number"
                    name="pesoLiquido"
                    id="formPesoLiquido"
                    value={state.pesoLiquido}
                    onChange={handleChange}
                />
            </div>
            
            <div className="form-group">
                <br/>
            <button className="btn btn-primary" type="submit">
                Cadastrar
            </button>
            </div>
        </form>        
        <br/>
        <br/>
        </div>
    );
}

export default Create;