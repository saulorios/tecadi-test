import { useState, useEffect, useContext, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../contexts/authContext"
import DropDown from "../components/DropDown";
import SearchInput from "../components/SearchInput";
import request from "../stack/request";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPenToSquare, faTrash } from "@fortawesome/free-solid-svg-icons";
import Swal from "sweetalert2";
import MenuDropDown from "../components/MenuDropDown";

function Home() {
    const [currentPage, setCurrentPage] = useState(1);
    const navigate = useNavigate();
    const limit = 10; 
    const recordPage = [5,10,15,20,30]
    const authContext = useContext(AuthContext);
    const [products, setProducts] = useState([])
    const [pageSize, setPageSize] = useState({qtd: 5})
    const lastIndex = currentPage * pageSize.qtd;
    const firstIndex = lastIndex - pageSize.qtd;
    const [balance, setBalance] = useState(products)
    const records = balance.slice(firstIndex, lastIndex);
    const npage = Math.ceil(balance.length / pageSize.qtd);
    const numbers = [...Array(npage + 1).keys()].slice(1)
    const choiceFilter = ['Total', 'Positivo', 'Negativo']
    const [filterName, setFilterName] = useState('Total')
    const [findName, setFindName] = useState()
    const start = Math.max(0, currentPage - Math.floor(limit / 2));
    const end = Math.min(start + limit, numbers.length);
    // console.log("token",authContext.loggedInUser.access_token)

    useEffect(() => {
        
        async function fetchProducts() {
            try {
                const response = await request.list(authContext.loggedInUser.access_token)
                setProducts(Object.values(response.list))
                setBalance(Object.values(response.list))
            } catch(err) {
                console.log(err.message)
            }
        }
        fetchProducts();
    }, []);
    
    
    
    function callsScreen(value) {
        navigate("/update", {state:value})
    }
    function filterSize(name, value) {

        setPageSize({
            ...pageSize,
        [name]: value,
        })
    }

    function positiveBalance(name, value) {

        if(value == 'Total') {
            setBalance(products)
            setFilterName('Total')
        } else if(value == 'Positivo') {
            let balancePlus = products.filter((key, value) => key.saldo > 0)
            setBalance(balancePlus)
            setFilterName('Positivo')
        } else {
            let balanceLess = products.filter((key, value) => key.saldo < 1)
            setBalance(balanceLess)
            setFilterName('Negativo')
        }
    }

    const findTheProduct = (event) => {
        let word = event.target.value
        word = word.toUpperCase()
        let findO = products.filter((key, value) => key.codigo.includes(word))
        setBalance(findO)
    }

    const deleteProduct = (codigo) => {
        try {
            Swal.fire({
                title: 'Você certeza de que quer deletar?',
                text: "Você não poderá reverter isso!",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Sim, deletar!'
              }).then((result) => {
                  const res = request.delete(authContext.loggedInUser.access_token, codigo)
                  console.log("DELETE: ", res)
                if (result.isConfirmed) {
                  Swal.fire(
                    'Deleted!',
                    'Your file has been deleted.',
                    'success'
                  )
                }
              })
        } catch (error) {
            console.error(error)
        }
    }
    

    return (
        <div className="container mt-5">

        <h1>Tecadi</h1>
        <hr />

        <p>
            <strong>User: </strong>
            001161
        </p>

        <div className="py-4">
            <h3>Lista de Produtos</h3>

        </div>
        <div className="menu-btn">
        <div class="btn-group" role="group">
            <div className="drop-down">
                <div className="drop-down-btn" onClick={() => navigate('/create')}>
                    Cadastrar Produto
                </div>
            </div>
        
        <DropDown
            label={"Visualizando " + pageSize.qtd} 
            options={recordPage}
            onChange={filterSize}
            name="qtd"                
        /> 
        <DropDown
            label={"Filtro Saldo " + filterName} 
            options={choiceFilter}
            onChange={positiveBalance}
            name="filter" 
        />
        </div>
        <div className="space"></div>
        <SearchInput
          placeholder="Buscar Produto"
          type="text"
          name="findname"
          id="FormFindName"
          value={findName}
          onChange={findTheProduct}
        />
        </div>
        <br/>
        <table className="table table-striped">
            <thead>
                <tr>
                <th scope="col">Codigo Cliente</th>
                <th scope="col">Desc</th>
                <th scope="col">UM</th>
                <th scope="col">Grupo</th>
                <th scope="col">PB</th>
                <th scope="col">PL</th>
                <th scope="col">Saldo</th>
                <th scope="col">#</th>
                </tr>
            </thead>
            <tbody>
                {records.map((value, key) => (
                    <tr key={key}>
                    <th scope="row">{value.codigoCliente}</th>
                    <td>{value.descricao}</td>
                    <td>{value.um}</td>
                    <td>{value.grupo}</td>
                    <td>{value.pesoBruto}</td>
                    <td>{value.pesoLiquido}</td>
                    <td>{value.saldo}</td>
                    <td>
                    <div className="d-flex flex-row bd-highlight mb-3">
                        <div className="p-2 d-flex">
                            <a href="#" onClick={() => {callsScreen(value)}}>
                                <FontAwesomeIcon icon={faPenToSquare} />      
                            </a>
                        </div>
                        <div className="p-2 d-flex">
                            <a href="#" onClick={() => {deleteProduct(value.codigo)}}>
                                <FontAwesomeIcon icon={faTrash} />
                            </a>
                        </div>
                    </div>                        
                    </td>
                    </tr>
                 ))}
            </tbody>
            </table>
            <div className="mx-auto col-md-12 container clearfix">
                <nav aria-label="Page navigation example">
                    <ul className="mx-auto pagination">
                        <li className="page-item">
                            <a className="page-link" href="#" onClick={prevPage}>Previous</a>
                        </li>
                        {/* {numbers.map((n, i) => (
                            <li className={`page-item ${currentPage === n ? 'active' : ''}`} key={i}>
                                <a className="page-link" href="#" onClick={() => changeCPage(n)}>{n}</a>
                            </li>

                        ))} */}
                        {numbers.slice(start, end).map((n, i) => (
                            <li className={`page-item ${currentPage === n ? 'active' : ''}`} key={i}>
                                <a className="page-link" href="#" onClick={() => changeCPage(n)}>{n}</a>
                            </li>
                        ))}
                        <li className="page-item">
                            <a className="page-link " href="#" onClick={nextPage}>Next</a>
                        </li>
                    </ul>
                </nav>
            </div>
        </div>
    );

    function prevPage() {
        if(currentPage !==  firstIndex) {
            setCurrentPage(currentPage - 1)
        }
    }
    function nextPage() {
        if(currentPage !==  lastIndex) {
            setCurrentPage(currentPage + 1)
        }
    }
    function changeCPage(id) {
        setCurrentPage(id)
    }
}

export default Home;