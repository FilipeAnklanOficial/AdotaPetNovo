import java.util.Scanner;
import Enums.Status;
import Enums.Sexo;
import Enums.Especie;
import Enums.Porte;

public class UsuarioONG {

    // Atributos da classe (informações básicas da ONG)
    String nome;
    String email;
    String telefone;
    String endereco;

    // Objeto Scanner para ler o que o usuário digita
    Scanner sc = new Scanner(System.in);

    // Método para cadastrar a ONG
    void cadastrarOng() {
        System.out.println("=== CADASTRO DE ONG ===");
        
        System.out.print("Digite o nome da ONG: ");
        nome = sc.nextLine();

        System.out.print("Digite o e-mail da ONG: ");
        email = sc.nextLine();

        System.out.print("Digite o telefone da ONG: ");
        telefone = sc.nextLine();

        System.out.print("Digite o endereço da ONG: ");
        endereco = sc.nextLine();

        System.out.println("ONG cadastrada com sucesso!");
    }

    // Método para cadastrar um animal
    void cadastrarAnimal() {
        System.out.println("\n=== CADASTRO DE ANIMAL ===");

        System.out.print("Digite o nome do animal: ");
        String nomeAnimal = sc.nextLine();

        System.out.print("Digite a espécie do animal: ");
        String especie = sc.nextLine();

        System.out.print("Digite a idade do animal: ");
        String idade = sc.nextLine();

        System.out.print("Digite o porte do animal (Pequeno, Médio ou Grande): ");
        String porte = sc.nextLine();

        System.out.println("Animal cadastrado com sucesso!");
    }

    // Método para criar um formulário
    void criarFormulario() {
        System.out.println("\n=== FORMULÁRIO DE ADOÇÃO ===");

        System.out.print("Digite o nome do adotante: ");
        String nomeAdotante = sc.nextLine();

        System.out.print("Digite o nome do animal que deseja adotar: ");
        String nomeAnimal = sc.nextLine();

        System.out.print("Por que deseja adotar este animal? ");
        String motivo = sc.nextLine();

        System.out.println("Formulário criado com sucesso!");
    }

    // Método principal para testar
    public static void main(String[] args) {
        UsuarioONG ong = new UsuarioONG();

        // Chamando os métodos para testar
        ong.cadastrarOng();
        ong.cadastrarAnimal();
        ong.criarFormulario();
    }
}
