package br.com.coldigogeladeiras.rest;

import java.util.List;
import java.sql.Connection;
import java.util.ArrayList;

import javax.ws.rs.Consumes;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.QueryParam;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;

import com.google.gson.Gson;

import br.com.coldigogeladeiras.bd.Conexao;
import br.com.coldigogeladeiras.jdbc.JDBCMarcaDAO;
import br.com.coldigogeladeiras.modelo.Marca;

@Path("marca")
public class MarcaRest extends UtilRest{

	@GET
	@Path("/buscar")
	@Produces(MediaType.APPLICATION_JSON)
	public Response buscar() {
		
		try {
			List<Marca> listaMarcas = new ArrayList<Marca>();
			
			Conexao conec = new Conexao();//Instancia o objeto conec com os parâmetros da conexão com o bd
			Connection conexao = conec.abrirConexao();
			JDBCMarcaDAO jdbcMarca = new JDBCMarcaDAO(conexao);// Instancia objeto jdbcMarca para executar as instruções SQL 
			listaMarcas = jdbcMarca.buscar(); // Armazena os dados retirados do método buscar () na listaMarcar 
			conec.fecharConexao();
			return this.buildResponse(listaMarcas); //Retorna lista de marcas armazenadas em um JSON
		}catch(Exception e){
			e.printStackTrace();
			return this.buildErrorResponse(e.getMessage());
		}
		
	}
	
	@POST
	@Path("/inserir")
	@Consumes("application/*")
	public Response inserir(String marcaParam) {
		
		try {
			Marca marca = new Gson().fromJson(marcaParam, Marca.class);
			Conexao conec = new Conexao();
			Connection conexao = conec.abrirConexao();
			
			JDBCMarcaDAO jdbcMarca = new JDBCMarcaDAO(conexao);
			boolean retorno = jdbcMarca.inserir(marca);
			
			String msg = "";
			
			if (retorno) {
				msg = "Produto cadastrado com sucesso!";
			}else {
				msg = "Erro ao cadastrar produto!";
			}
			
			conec.fecharConexao();
			
			return this.buildResponse(msg);
		}catch(Exception e) {
			e.printStackTrace();
			return this.buildErrorResponse(e.getMessage());
		}
	}
	
	
	@GET
	@Path("/buscar")
	@Consumes("application/*")
	@Produces(MediaType.APPLICATION_JSON)
	public Response buscarPorNome(@QueryParam("valorBusca") String nome) {
		
		try {
			
			List<Marca> listaMarcas = new ArrayList<Marca>();
			
			Conexao conec = new Conexao();
			Connection conexao = conec.abrirConexao();
			JDBCMarcaDAO jdbcMarca = new JDBCMarcaDAO(conexao);
			listaMarcas = jdbcMarca.buscarPorNome(nome);
			conec.fecharConexao();
			
			return this.buildResponse(listaMarcas);
			
		}catch(Exception e) {
			e.printStackTrace();
			return this.buildErrorResponse(e.getMessage());
		}
	}
	

}
