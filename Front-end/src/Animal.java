import Enums.Status;
import Enums.Sexo;
import Enums.Especie;
import Enums.Porte;

public class Animal {

    // Atributos da Classe
    private long id;
    private String nome;
    private String raca;
    private double idade;
    private String historicoSaude;
    private String comportamento;
    private String fotos;
    private boolean possuiChip;
    private String localizacao;
    private boolean vacinado;
    private Especie especie;
    private Porte porte;
    private Sexo sexo;
    private Status status;
    private UsuarioONG ongResponsavel;

    //Construtor Vazio
    public Animal() {
        
    }

    //Construtor com parâmetros
    public Animal (long id, String nome, String raca, double idade, String historicoSaude, String comportamento, String fotos, boolean possuiChip, String localizacao, boolean vacinado, Especie especie, Porte porte, Sexo sexo, Status status /*UsuarioONG ongResponsavel*/) {

        this.id = id;
        this.nome = nome;
        this.raca = raca;
        this.idade = idade;
        this.historicoSaude = historicoSaude;
        this.comportamento = comportamento;
        this.fotos = fotos;
        this.possuiChip = possuiChip;
        this.localizacao = localizacao;
        this.vacinado = vacinado;
        this.especie = especie;
        this.porte = porte;
        this.sexo = sexo;
        this.status = status;
        this.ongResponsavel = ongResponsavel;

    }

    //SETTERS
    public void setId(long id) {
        this.id = id;
    }
    public void setNome(String nome) {
        this.nome = nome;
    }
    public void setRaca(String raca) {
        this.raca = raca;
    }
    public void setIdade(double idade) {
        if (idade < 0 || idade > 30) {
            System.out.println("Idade Invalida, informe uma idade entre 0 e 30 anos");
        }else{
            this.idade = idade;
        }
    }
        
    public void setHistoricoSaude(String historicoSaude) {
        this.historicoSaude = historicoSaude;
    }
    public void setComportamento(String comportamento) {
        this.comportamento = comportamento;
    }
    public void setFotos(String fotos) {
        this.fotos = fotos;
    }
    public void setPossuiChip(boolean possuiChip) {
        this.possuiChip = possuiChip;
    }
    public void setLocalizacao(String localizacao) {
        this.localizacao = localizacao;
    }
    public void setVacinado(boolean vacinado) {
        this.vacinado = vacinado;
    }
    public void setEspecie(Especie especie) {
        this.especie = especie;
    }
    public void setPorte(Porte porte) {
        this.porte = porte;
    }
    public void setSexo(Sexo sexo) {
        this.sexo = sexo;
    }
    public void setStatus(Status status) {
        this.status = status;
    }
    public void setOngResponsavel(UsuarioONG ongResponsavel){
        this.ongResponsavel = ongResponsavel;
    }


    //GETTERS
    public long getId() {
        return id;
    }
    public String getNome() {
        return nome;
    }
    public String getRaca() {
        return raca;
    }
    public double getIdade() {
        return idade;
    }
    public String getHistoricoSaude() {
        return historicoSaude;
    }
    public String getComportamento() {
        return comportamento;
    }
    public String getFotos() {
        return fotos;
    }
    public String getStatusChip() {
        return possuiChip ? "Sim" : "Não";
    }
    public String getLocalizacao() {
        return localizacao;
    }
    public String getStatusVacina() {
        return vacinado ? "Sim" : "Não";
    }
    public Especie getEspecie() {
        return especie;
    }
    public Porte getPorte() {
        return porte;
    }
    public Sexo getSexo() {
        return sexo;
    }
    public Status getStatus() {
        return status;
    }
    public UsuarioONG getOngResponsavel() {
    return ongResponsavel;
    }


    void exibirInformacoes(){
        System.out.println("---*---*---*---*---*---*---*---*---");
        System.out.println("Informações do animal");
        System.out.println("ID: " + getId());
        System.out.println("Nome: " + getNome());
        System.out.println("Raca: " + getRaca());
        System.out.println("Idade: " + getIdade());
        System.out.println("Historico de Saude: " + getHistoricoSaude());
        System.out.println("Comportamento: " + getComportamento());
        System.out.println("Fotos: " + getFotos());
        System.out.println("Possui Chip: " + getStatusChip());
        System.out.println("Localizacao: " + getLocalizacao());
        System.out.println("Vacinado: " + getStatusVacina());
        System.out.println("Especie: " + getEspecie());
        System.out.println("Porte: " + getPorte());
        System.out.println("Sexo: " + getSexo());
        System.out.println("Status: " + getStatus());
        System.out.println("ONG Responsável: " + getOngResponsavel());
    }

    public void atualizarStatus(Status novoStatus){
        System.out.println("--* Atualizar Status de animal *--");
        System.out.println("Status atual: " + this.status);
        System.out.println("Novo Status Desejado: " + novoStatus);

        if (this.status == Status.DISPONIVEL && novoStatus == Status.EM_ANDAMENTO) {
            this.status = novoStatus;
            System.out.println("Adoção iniciada com suceso!");
        }else if (this.status == Status.EM_ANDAMENTO && novoStatus == Status.DISPONIVEL) {
            this.status = novoStatus;
            System.out.println("Adoção cancelada. :( ");
        }else if (this.status == Status.EM_ANDAMENTO && novoStatus == Status.ADOTADO) {
            this.status = novoStatus;
            System.out.println("Adoção finalizada com sucesso!!!");
        }else if (this.status == Status.ADOTADO && novoStatus == Status.DISPONIVEL) {
            System.out.println("Não é possivel retornar o Status ADOTADO para DISPONIVEL");
        }else if (this.status == novoStatus) {
            System.out.println("o Animal ja está com o Status: " + novoStatus);
        }else {
            System.out.println("Alteração de Status inválida!");
        }
    }


}
