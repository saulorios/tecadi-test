import { useNavigate } from "react-router-dom"

const Unauthorized = () => {
    const navigate = useNavigate();
    const goBack = () => navigate("/");

    return (
        <section className="container mt-5">
            <h1>Restrito</h1>
            <hr />
            <br />
            <p>Você não tem acesso a esta página</p>
            <div className="flexGrow">
                <button className="btn btn-primary" onClick={goBack}>Fazer login</button>
            </div>
        </section>
    )
}

export default Unauthorized