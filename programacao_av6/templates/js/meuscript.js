$(function() { 
    
    function exibir_profissoes() {
        mostrar_conteudo('TabelaProfissoes')
        $.ajax({
            url: 'http://localhost:5000/listar_profissoes',
            method: 'GET',
            dataType: 'json', 
            success: listar_profissoes, 
            error: function() {
                alert("erro ao ler dados, verifique o backend");
            }
        });
         
        function listar_profissoes (profissoes) {
            $('#corpoTabelaProfissoes').empty();
            mostrar_conteudo("cadastroProfissoes");      
            for (var i in profissoes) { 
                lin = '<tr id="linha_'+profissoes[i].id+'">' + 
                '<td>' + profissoes[i].nome + '</td>' + 
                '<td>' + profissoes[i].funcao + '</td>' + 
                '<td>' + profissoes[i].detalhe + '</td>' + 
                '<td>' + profissoes[i].caracteristica + '</td>' + 
                '<td><a href=# id="excluir_' + profissoes[i].id + '" ' + 
                  'class="excluir_profissao"><img src="img/excluir.png" height=20 width= 20'+
                  'alt="Excluir profissão" title="Excluir profissão" ></a>' + 
                '</td>' + 
                '</tr>';
                $('#corpoTabelaProfissoes').append(lin);
            }
        }
    }

    function mostrar_conteudo(identificador) {
        $("#cadastroProfissoes").addClass('invisible');
        $("#cadastroProfissionais").addClass('invisible');
        $("#cadastroCargos").addClass('invisible');
        $("#cadastroEmpresas").addClass('invisible');
        $("#conteudoInicial").addClass('invisible');
        $("#"+identificador).removeClass('invisible');      
    }

    $(document).on("click", "#linkListarProfissoes", function() {
        exibir_profissoes();
    });
    
    $(document).on("click", "#linkInicio", function() {
        mostrar_conteudo("conteudoInicial");
    });

    $(document).on("click", "#btIncluirProfissao", function() {
        nome = $("#campoNome").val();
        funcao = $("#campoFuncao").val();
        detalhe = $("#campoDetalhe").val();
        caracteristica = $("#campoCaracteristica").val();
        var dados = JSON.stringify({ nome: nome, funcao: funcao, detalhe: detalhe, caracteristica: caracteristica });
        $.ajax({
            url: 'http://localhost:5000/incluir_profissao',
            type: 'POST',
            dataType: 'json', 
            contentType: 'application/json', 
            data: dados, 
            success: profissaoIncluida, 
            error: erroAoIncluir
        });
        function profissaoIncluida (retorno) {
            if (retorno.resultado == "ok") { 
                alert("Profissao incluída com sucesso!");
                $("#campoNome").val("");
                $("#campoFuncao").val("");
                $("#campoDetalhe").val("");
                $("#campoCaracteristica").val("");
            } else {
                alert(retorno.resultado + ":" + retorno.detalhes);
            }            
        }
        function erroAoIncluir (retorno) {
            alert("ERRO: "+retorno.resultado + ":" + retorno.detalhes);
        }
    });

    $('#modalIncluirProfissao').on('hide.bs.modal', function (e) {
        if (! $("#cadastroProfissoes").hasClass('invisible')) {
            exibir_profissoes();
        }
    });

    mostrar_conteudo("conteudoInicial");

    $(document).on("click", ".excluir_profissao", function() {
        var componente_clicado = $(this).attr('id'); 
        var nome_icone = "excluir_";
        var id_profissao = componente_clicado.substring(nome_icone.length);
        $.ajax({
            url: 'http://localhost:5000/excluir_profissao/'+id_profissao,
            type: 'DELETE', 
            dataType: 'json', 
            success: profissaoExcluida, 
            error: erroAoExcluir
        });
        function profissaoExcluida (retorno) {
            if (retorno.resultado == "ok") { 
                $("#linha_" + id_profissao).fadeOut(1000, function(){
                    alert("Profissão removida com sucesso!");
                });
            } else {
                alert(retorno.resultado + ":" + retorno.detalhes);
            }            
        }
        function erroAoExcluir (retorno) {
            alert("erro ao excluir dados, verifique o backend: ");
        }
    });

    function exibir_profissionais() {
        $.ajax({
            url: 'http://localhost:5000/listar_profissionais',
            method: 'GET',
            dataType: 'json', 
            success: listar, 
            error: function(problema) {
                alert("erro ao ler dados, verifique o backend: ");
            }
        });

        function listar (profissionais) {
            $('#corpoTabelaProfissionais').empty();
            mostrar_conteudo("cadastroProfissionais");      
            for (var i in profissionais) {
                lin = '<tr id="linha_profissional_'+profissionais[i].id+'">' + 
                '<td>' + profissionais[i].nome_profissional + '</td>' + 
                // dados da profissao
                '<td>' + profissionais[i].profissao.nome + '</td>' + 
                '<td>' + profissionais[i].profissao.funcao + '</td>' + 
                '<td>' + profissionais[i].profissao.detalhe + '</td>' + 
                '<td>' + profissionais[i].profissao.caracteristica + '</td>' + 
                '<td><a href=# id="excluir_profissional_' + profissionais[i].id + '" ' + 
                  'class="excluir_profissional"><img src="img/excluir.png" height=20 width= 20'+
                  'alt="Excluir profissional" title="Excluir profissional" ></a>' + 
                '</td>' + 
                '</tr>';
                // adiciona a linha no corpo da tabela
                $('#corpoTabelaProfissionais').append(lin);
            }
        }
    }

    // código para mapear o click do link Exames Realizados
    $(document).on("click", "#linkListarProfissionais", function() {
        exibir_profissionais();
    });

    function exibir_cargos() {
        $.ajax({
            url: 'http://localhost:5000/listar_cargos',
            method: 'GET',
            dataType: 'json', 
            success: listar, 
            error: function(problema) {
                alert("erro ao ler dados, verifique o backend: ");
            }
        });

        function listar (cargos) {
            $('#corpoTabelaCargos').empty();
            mostrar_conteudo("cadastroCargos");      
            for (var i in cargos) {
                lin = '<tr id="linha_cargo_'+cargos[i].id+'">' + 
                '<td>' + cargos[i].nome_cargo + '</td>' + 
                '<td>' + cargos[i].salario + '</td>' + 
                // dados da profissao
                '<td>' + cargos[i].profissao.nome + '</td>' + 
                '<td>' + cargos[i].profissao.funcao + '</td>' + 
                '<td>' + cargos[i].profissao.detalhe + '</td>' + 
                '<td>' + cargos[i].profissao.caracteristica + '</td>' + 
                '<td><a href=# id="excluir_cargo_' + cargos[i].id + '" ' + 
                  'class="excluir_cargo"><img src="img/excluir.png" height=20 width= 20 '+
                  'alt="Excluir cargo" title="Excluir cargo"></a>' + 
                '</td>' + 
                '</tr>';
                // adiciona a linha no corpo da tabela
                $('#corpoTabelaCargos').append(lin);
            }
        }
    }

    // código para mapear o click do link Exames Realizados
    $(document).on("click", "#linkListarCargos", function() {
        exibir_cargos();
    });

    
    function exibir_empresas() {
        $.ajax({
            url: 'http://localhost:5000/listar_empresas',
            method: 'GET',
            dataType: 'json', 
            success: listar, 
            error: function(problema) {
                alert("erro ao ler dados, verifique o backend: ");
            }
        });

        function listar (empresas) {
            $('#corpoTabelaEmpresas').empty();
            mostrar_conteudo("cadastroEmpresas");      
            for (var i in empresas) {
                lin = '<tr id="linha_empresa_'+empresas[i].id+'">' + 
                '<td>' + empresas[i].nome_empresa + '</td>' + 
                // dados da profissao
                '<td>' + empresas[i].cargo.nome_cargo + '</td>' + 
                '<td>' + empresas[i].cargo.salario + '</td>' + 
                '<td><a href=# id="excluir_empresa_' + empresas[i].id + '" ' + 
                  'class="excluir_empresa"><img src="img/excluir.png" height=20 width= 20'+
                  'alt="Excluir empresa" title="Excluir empresa"></a>' + 
                '</td>' + 
                '</tr>';
                // adiciona a linha no corpo da tabela
                $('#corpoTabelaEmpresas').append(lin);
            }
        }
    }

    // código para mapear o click do link Exames Realizados
    $(document).on("click", "#linkListarEmpresas", function() {
        exibir_empresas();
    });
});
