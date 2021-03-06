COLDIGO.marcas = new Object();

$(document).ready(function() {

    COLDIGO.marcas.cadastrar = function () {
        
        var marca = new Object();
        marca.nome = document.frmAddMarca.nome.value;

        if(marca.nome==""){
            COLDIGO.exibirAviso("Preencha todos os campos!")
        }else{

            $.ajax({
                type: "POST",
                url: COLDIGO.PATH + "marca/inserir",
                data: JSON.stringify(marca),
                success: function (msg) {
                    COLDIGO.exibirAviso(msg);
                    COLDIGO.marcas.buscar();
                    $("#addMarca").trigger("reset");
                },
                error: function (info) {
                    
                    COLDIGO.exibirAviso("Erro! "+info.responseText)
                }
            })


        }

    }

     //Busca no bd e exibe na página as marcas que atendem a busca
     COLDIGO.marcas.buscar = function(){

        var valorBusca = $("#campoBuscaMarca").val();         

        $.ajax({
            type: "GET",
            url: COLDIGO.PATH + "marca/buscar",
            data: "valorBusca="+valorBusca,
            success: function(dados){                

                $("#listaMarcas").html(COLDIGO.marcas.exibir(dados));           

            },
            error: function(info){
                COLDIGO.exibirAviso("Erro: "+ info.status + " - " + info.statusText);
            }
        })

    }

    COLDIGO.marcas.buscar();

    COLDIGO.marcas.exibir = function(listaDeMarcas) {
        
        var tabela = "<table>" +
        "<tr>"+
        "<th>Status</th>"+
        "<th>Nome das marcas</th>" +
        "<th class='acoes'>Ações</th>" +
        "</tr>";

        if(listaDeMarcas != undefined && listaDeMarcas.length > 0){

            for (var i=0; i<listaDeMarcas.length; i++){

                var status = "";
                if (listaDeMarcas[i].status == 1){
                    status = "checked";
                }
                    
                tabela +=  "<tr>" +
                "<td>"+
                    "<div class=\"onoffswitch\" >"+
                        "<input type=\"checkbox\" name=\""+listaDeMarcas[i].nome+"\" class=\"onoffswitch-checkbox\" id=\""+listaDeMarcas[i].id+"\" onclick=\"COLDIGO.marcas.ativoInativo('"+listaDeMarcas[i].id+"')\" "+status+">"+
                        "<label class=\"onoffswitch-label\" for=\""+listaDeMarcas[i].id+"\">" +
                            "<span class=\"onoffswitch-inner\"></span>"+
                            "<span class=\"onoffswitch-switch\"></span>"+
                        "</label>"+
                    "</div>"+
        
                "</td>"+
                "<td>"+listaDeMarcas[i].nome+"</td>"+
                "<td>" +
                    "<a onclick=\"COLDIGO.marcas.exibirEdicao('"+listaDeMarcas[i].id+"')\"><img src='../../imgs/edit.png' alt='Editar registro'></a>" +
                    "<a onclick=\"COLDIGO.marcas.excluir('"+listaDeMarcas[i].id+"')\"><img src='../../imgs/delete.png' alt='Deletar registro'></a>" +
                "</td>" +
                "</tr>"
            }

        }else if(listaDeMarcas==""){
            tabela += "<tr><td colspan='2'>Nenhum registro encontrado</td></tr>"
        }
        tabela += "</table>";

        return tabela;
    }

    COLDIGO.marcas.excluir = function (id) {

        var modalExcluiMarca = {
            title: "Excluir marca",
            height: 200,
            width: 550,
            modal: true,
            buttons: {
                "Sim": function () {
                    $.ajax({
                        type: "DELETE", //Define metodo de envio
                        url: COLDIGO.PATH + "marca/excluir/"+id, //Define url de envio e passa o valor id 
                        success: function(msg){
                            COLDIGO.exibirAviso(msg); // Exibe msg retornada do servidor em caso de sucesso
                            COLDIGO.marcas.buscar(); // Atualiza lista de produtos
                            $("#modalExcluiMarca").dialog("close"); //Fecha modal de edição
                        },
                        error: function(info){
                            COLDIGO.exibirAviso("Erro! "+info.responseText); //Exibe mensagem de erro
                            $("#modalExcluiMarca").dialog("close"); //Fecha modal de edição
                        }
                    })
                },
                "Cancelar": function () {
                    $(this).dialog("close");
                }
            },
            close: function() {
                
            }
        }
        
        $("#modalExcluiMarca").dialog(modalExcluiMarca);

    }

    COLDIGO.marcas.exibirEdicao = function(id) {
        $.ajax({
            type: "GET", //Define metodo de envio como GET
            url: COLDIGO.PATH + "marca/buscarPorId/"+id, //define a url de envio
            success: function(marca){

                document.frmEditaMarca.idMarca.value = marca.id
                document.frmEditaMarca.nomeMarca.value = marca.nome

                var modalEditaMarca = {
                    title: "Editar Marca",
                    height: 200,
                    width: 450,
                    modal: true,
                    buttons:{
                        "Salvar": function(){
                            COLDIGO.marcas.editar();
                        },
                        "Cancelar": function() {
                            $(this).dialog("close");
                        }
                    },
                    close: function(){
                        //Fazer nada
                    }
                }

                $("#modalEditaMarca").dialog(modalEditaMarca);
                
            },

            error: function(info){
                COLDIGO.exibirAviso("Erro! "+info.responseText);
                $("#modalEditaMarca").dialog(modalEditaMarca);
            }
        })
        
    }

    COLDIGO.marcas.editar = function(){

        var marca = new Object();
        marca.id = document.frmEditaMarca.idMarca.value;
        marca.nome = document.frmEditaMarca.nomeMarca.value;
        
        $.ajax({
            type: "PUT",
            url: COLDIGO.PATH + "marca/alterar",
            data: JSON.stringify(marca),
            success: function(msg){
                
                COLDIGO.exibirAviso(msg);
                COLDIGO.marcas.buscar();
                $("#modalEditaMarca").dialog("close");

            },
            error: function(info){
                COLDIGO.exibirAviso("Erro! "+info.responseText);
                $("#modalEditaMarca").dialog("close");
            }
        })

    }

    COLDIGO.marcas.ativoInativo = function(id){
        
        $.ajax({
            type: "PUT", //Define metodo de envio
            url: COLDIGO.PATH + "marca/alterarStatus/"+id, //Define url de envio e passa o valor id 
            success: function(msg){
                // COLDIGO.exibirAviso(msg); // Exibe msg retornada do servidor em caso de sucesso
            },
            error: function(info){
                COLDIGO.exibirAviso("Erro! "+info.responseText); //Exibe mensagem de erro
                document.getElementById(id).checked=!document.getElementById(id).checked;                

            }
        })

    }
    
})