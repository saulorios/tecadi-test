import { useState, useEffect, useContext } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { AuthContext } from "../../contexts/authContext"
import request from "../../stack/request";
import TextInput from "../../components/TextInput";
import DropDown from "../../components/DropDown";
import SearchInput from "../../components/SearchInput";
import Swal from "sweetalert2";

function Update() {
    const location = useLocation();
    const navigate = useNavigate();
    const authContext = useContext(AuthContext);
    const [state, setState] = useState({
        codigo: "",
        descricao: "",
        pesoBruto: "",
        pesoLiquido: "",
        um: []
    })
    // console.log(authContext.loggedInUser.access_token)
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
        setState({
            codigo: location.state?.codigo,
            descricao: location.state?.descricao,
            pesoBruto: location.state?.pesoBruto,
            pesoLiquido: location.state?.pesoLiquido,
            um: location.state?.um
        })
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
    
    async function updateProduct(event) {
        event.preventDefault();
        // try {
            const data = {
                codigo: state.codigo,
                descricao: state.descricao,
                pesoBruto: parseInt(state.pesoBruto),
                pesoLiquido: parseInt(state.pesoLiquido),
                um: state.um
            }
            const resp = await request.update(authContext.loggedInUser.access_token, data);
            console.log("outside",resp)
           

            // if(resp !== 'OK') {
            //     Swal.fire({
            //         icon: 'err',
            //         title: 'Erro!',
            //         text: 'Ocorreu algum ao erro ao atualizar',
            //       })
            // } else {
            //     Swal.fire({
            //         icon: 'success',
            //         title: 'Sucesso!',
            //         text: 'Produto atualizado!',
            //       })
            //       navigate("/")
            // }
        // } catch (error) {
        //     console.error(error)
        // }


    }

    return (
        <div className="container mt-5">

        <h1>Tecadi</h1>
        <hr />

        <div className="py-4">
            <h3>Atualizar Produto</h3>

        </div>
        {/* <form> */}
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
                    type="text"
                    name="pesoBruto"
                    id="formPesoBruto"
                    value={state.pesoBruto}
                    onChange={handleChange}
                />
            </div>
            <div className="form-group">
                 <TextInput 
                    label="Peso Líquido"
                    type="text"
                    name="pesoLiquido"
                    id="formPesoLiquido"
                    value={state.pesoLiquido}
                    onChange={handleChange}
                />
            </div>
            
            <br/>
            
            <br/>
            <div className="form-group d-flex">
                <br/>
                <button className="btn btn-primary" type="submit" onClick={updateProduct}>
                    Atualizar
                </button>
                <div className="space"></div>
                <button className="btn btn-danger" onClick={() => navigate("/")} >
                    Cancelar
                </button>
            </div>
        {/* </form>         */}
        <br/>
        <br/>
        </div>
    );
}

export default Update;