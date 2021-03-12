import React , {Component} from 'react'
import "./style.css"

export default class Patio extends Component
{

    constructor(props)
    {
        super(props)

        this.state = {
            carrosEstacionados : []
        }
    }

    componentDidMount()
    {
        return this.loadApi()

    }

    dateNow()
    {
        let dataHoraAtual = new Date()
        let dataHoraTratada = dataHoraAtual.getDate() + "/" +
                              dataHoraAtual.getMonth() + "/" +
                              dataHoraAtual.getFullYear() + " " +
                              dataHoraAtual.getHours() + ":" +
                              dataHoraAtual.getMinutes() + ":" +
                              dataHoraAtual.getSeconds();
                              
                              return dataHoraTratada
    }

    changeStatus(carroSelecionado)
    {
        
        let carrosState = this.state.carrosEstacionados

        let carroSaida = {
            placa : carroSelecionado.placa,
            cor : carroSelecionado.cor,
            marca : carroSelecionado.marca,
            modelo : carroSelecionado.modelo,
            dataHoraEntrada : carroSelecionado.dataHoraEntrada,
            dataHoraSaida : this.dateNow(),
            status:"false"
        }

        fetch('http://localhost:3001/carrosEstacionados/'+carroSelecionado.id , 
        {
            method: "put",
            headers : {
                "Content-Type" : "application/json"
            },
            body: JSON.stringify(carroSaida)
        }).then(()=>{
        
            for(let index in carrosState) 
            {
                if(carrosState[index].id === carroSelecionado.id)
                {
                    carrosState[index].status === "false" ? carrosState[index].status = "true" : carrosState[index].status = "false"

                    this.setState({
                        carrosEstacionados : carrosState
                    })
                }
            }

        })
    }



    loadApi() 
    {
        fetch('http://localhost:3001/carrosEstacionados')
        .then(res => res.json())
        .then(res => this.setState({
            carrosEstacionados : res
        }))
    }


    renderCars()
    {
        let carrosEstacionados = this.state.carrosEstacionados


            
        
        return carrosEstacionados.map((index)=>{

          if(index.status === "true")
            {
            return(
                <tr key={index.id}>
                    <td>{index.placa}</td>
                    <td>{index.cor}</td>
                    <td>{index.marca}</td>
                    <td>{index.modelo}</td>
                    <td>{index.dataHoraEntrada}</td>
                    <td><button className="btn btn-success" onClick={()=>{this.changeStatus(index)}}>Saida</button></td>
                </tr>
            )
        }

        return false;
        })
    }
    

    render() 
    {
        return(
            <div id="patioCarrosEstacionados">
                <div>
                    <h4>Carros Estacionados</h4>
                </div>
                <div>
                    <table className="table table-hover">
                        <thead className="table-dark">
                            <tr>
                                <th scope="col">Placa</th>
                                <th scope="col">Modelo</th>
                                <th scope="col">Marca</th>
                                <th scope="col">Cor</th>
                                <th scope="col">Data/Hora de Entrada</th>
                                <th scope="col"></th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.renderCars()}
                        </tbody>
                    </table>        
                </div>
            </div>
        )
    }
}