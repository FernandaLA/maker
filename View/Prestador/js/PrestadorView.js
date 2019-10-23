$(function() {
    $("#btnEditarPerfilPre").click(function () {
        $("#editarCadastro").show('fade');
    });

    $("#btnCancelarEdicao").click(function () {
        $("#editarCadastro").hide('fade');
    });

    $("#btnSalvarCadastro").click(function () {
        salvarCadastro();
    });

    $("#btnMeusServicos").click(function () {
        $("#CadServicoPrestador").show('fade');
    });

    $("#btnEditarJornada").click(function () {
        ExecutaDispatch('JornadaPrestador', 'CarregaJornadaPrestador', undefined, carregaDadosJornada);
        $("#CadJornadaPrestador").show('fade');
    });
});

function montaTelaPrestador(dados) {
    var dadosPre = dados[1][0];
    var nmeCompleto = dadosPre['NME_USUARIO_COMPLETO'];
    var jornada = dadosPre['HRA_INICIO']+" às "+dadosPre['HRA_FIM'];
    var DIAS = dadosPre['DIAS_ATENDIMENTO'];
    var endereco = dadosPre['ENDERECO_COMPLETO'];
    // var nota = dadosPre['NOTA_AVALIACAO'];
    // var icon = $("#avaliacaoPrestador").html();
    
    var jornadaDias = "";
    if (DIAS != null) {
        for (var i=0;i<DIAS.length;i++) {
            jornadaDias += DIAS[i]['DSC_DIA']+'-';
        }
        jornadaDias = jornadaDias.substr(0, jornadaDias.length-1);
    }
    $("#nmePrestadorCompleto").html(nmeCompleto);
    $("#jornadaPrestador").html(jornada);
    $("#diasAtendimento").html(jornadaDias);
    $("#enderecoPrestador").html("<b>Endereço:</b> "+endereco);
    // $("#avaliacaoPrestador").html("Avaliação: "+ nota + icon);
}

function listaCategorias(dados) {
    montaComboCategoria(dados);
    var lista = "";
    for(var i = 0; i<dados[1].length; i++) {
        if(dados[1][i]['COD'] != 0) {
            lista += "<u>"+dados[1][i]['DSC']+"</u> - ";
        }
    }
    var html = lista.substr(0, lista.length-3);
    $("#servicosPrestador").html(html)
}

function MontaComboUF(arrDados) {
    CriarComboDispatch('sglUf', arrDados, 0, 'cadPrestador');
}

function montaBoxCategoria(categorias) {
    var count = 5;
    var html = "";

    for (var i=0; i<categorias[1].length; i++ ) {
        if(count == 5){
            html += "<tr>";
            count = 0;
        }
        html += "<td width='300px'>";
        html += "<strong class='checkbox'>";
        html += "<input type='checkbox' name='codCategoria' id='codCategoria' value='"+categorias[1][i]['COD']+"'class='cadPrestador'>"+categorias[1][i]['DSC']+"";
        html += "</strong>";
        html += "</td>"
        count++;
        if(count == 5){
            html += "</tr>";
        }
    }
    $("#servicosBox").html(html);
}

function salvarCadastro() {
    
    $("#editarCadastro").hide();
}

$(document).ready(function() {
    ExecutaDispatch('Prestador', 'CarregaDadosPrestador', undefined, montaTelaPrestador);
    ExecutaDispatch('CategoriaServico','ListarCategoriaServicoPrestador', undefined, listaCategorias);
    ExecutaDispatch('CategoriaServico','ListarCategoriaServicoAtivo', undefined, montaBoxCategoria);
    ExecutaDispatch('UnidadeFederativa','ListarUnidadeFederativa', undefined, MontaComboUF);
    $("#editarCadastro").hide();
});