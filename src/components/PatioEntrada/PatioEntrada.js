import React, { Component } from 'react'
import './style.css';

export default class PatioEntrada extends Component
{
    constructor(props)
    {

        super(props)

        this.state={
            placa :"",
            cor :"",
            marca :"",
            modelo :"",
            dataHoraEntrada : this.dateNow()
        }

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

    insertCar()
    {
        let carroAAdicionar = this.state;

        let carroEntradaObj = {
            placa : carroAAdicionar.placa,
            cor : carroAAdicionar.cor,
            marca : carroAAdicionar.marca,
            modelo : carroAAdicionar.modelo,
            dataHoraEntrada : carroAAdicionar.dataHoraEntrada,
            dataHoraSaida : "",
            status : "true"
        }

        fetch("http://localhost:3001/carrosEstacionados" , {
            method : "post",
            headers : {
                "Content-Type" : 'application/json'                
            },
            body: JSON.stringify(carroEntradaObj)
        }).then(()=>{
            this.setState({
                placa : '',
                cor : '',
                marca : '',
                modelo : '',
                dataHoraEntrada : '',            
            })

            alert("Entrada efetuada com sucesso!")

        })


    }

    changeState(event)
    {
        this.setState({
            [event.target.name] : event.target.value
        })
    }
    
    render()
    {
        return(
            <div id="entradaDeVeiculos">
                <div>
                    <h4>Entrada de Veículos</h4>
                </div>
                <div className="row col-md-12">
                    <div className="row">
                        <div className="col-md-2">
                            <span>Placa </span>                        
                            <input value={this.state.placa} onChange={(event)=>{this.changeState(event)}} type="text" name="placa" className="form-control"/>
                        </div>
                        <div className="col-md-2">
                            <span>Cor</span>                        
                            <input value={this.state.cor} onChange={(event)=>{this.changeState(event)}} type="text" name="cor" className="form-control"/>
                        </div>
                        <div className="col-md-2">
                            <span>Marca</span>                        
                            <input value={this.state.marca} onChange={(event)=>{this.changeState(event)}} type="text" name="marca" className="form-control"/>
                        </div>                     
                    </div>
                    <div className="row">
                        <div className="col-md-2">
                            <span>Modelo </span>                        
                            <input value={this.state.modelo} onChange={(event)=>{this.changeState(event)}} type="text" name="modelo" className="form-control"/>
                        </div>
                        <div className="col-md-3">
                            <span>Data/Hora Entrada</span>                        
                            <input value={this.state.dataHoraEntrada} readOnly={true} onChange={(event)=>{this.changeState(event)}} type="text" name="dataHoraEntrada" className="form-control"/>
                        </div>
                        <div className="col-md-1 mt-3">
                            <button className="btn btn-success" onClick={()=>{this.insertCar()}}>Entrada</button>
                        
                        </div> 
                    </div>

                </div>
            </div>

            
            

        )
    }


    
}
