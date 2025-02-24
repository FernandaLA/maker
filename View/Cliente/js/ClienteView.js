$(function() {
    $("#nroCpfCli").mask('999.999.999-99');
    $("#dtaNascimentoCli").mask('99/99/9999');
    $("#nroCepCli").mask('99999-999');
    $("#nroTelefoneCli").mask('(99) 99999-9999');

    $("#btnEditarPerfilCli").click(function () {
        $("#editarCadastro").show('fade');
    });

    $("#btnCancelaEdicao").click(function () {
        $("#editarCadastro").hide('fade');
    });

    $("#btnSalvarCadastro").click(function () {
        salvarCadastro();
    });

});

function montaTelaCliente(dados) {
    preencheCamposForm(dados[1][0], "Cli");
    var dadosPre = dados[1][0];
    var codUsuario = dadosPre['COD_USUARIO'];
    var nmeCompleto = dadosPre['NME_USUARIO_COMPLETO'];
    var endereco = dadosPre['ENDERECO_COMPLETO'];
    var caminhoFoto = dadosPre['DSC_CAMINHO_FOTO'];
    var sglUf = dadosPre['SGL_UF'];
    var nota = dadosPre['NOTA_AVALIACAO'];
    var icon = $("#avaliacaoCliente").html();
    
    $("#codUsuarioCli").html(codUsuario);
    $("#sglUfCli").html(sglUf);
    $("#nmeClienteCompleto").html(nmeCompleto);
    $("#enderecoCliente").html("<b>Endereço:</b> "+endereco);
    $("#avaliacaoCliente").html("Avaliação: "+ nota + icon);
    if(caminhoFoto !== '') {
        $("#fotoPerfil").attr("src", caminhoFoto);
    }
}

function MontaComboUF(arrDados) {
    CriarComboDispatch('sglUfCli', arrDados, 0, 'cadCliente', true);
}


function salvarCadastro() {
    var parametros = retornaParametros("cadCliente");
    ExecutaDispatch('Usuario','UpdateUsuario', parametros, retornoSalvarCadastro, "Aguarde, atualizando seu cadastro", "Cadastro atualizado com sucesso!");
}

function retornoSalvarCadastro() {
    $("#editarCadastro").hide();
}

$(document).ready(function() {
    ExecutaDispatch('Cliente', 'CarregaDadosCliente', undefined, montaTelaCliente);
    ExecutaDispatch('UnidadeFederativa','ListarUnidadeFederativa', undefined, MontaComboUF);
    $("#editarCadastro").hide();
});
